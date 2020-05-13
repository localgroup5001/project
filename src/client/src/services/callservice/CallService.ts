/* eslint-disable @typescript-eslint/consistent-type-assertions */
import * as signalR from '@microsoft/signalr'
import { HubConnection } from '@microsoft/signalr'
import adapter from 'webrtc-adapter'
import { ip }  from  '@/ipconfig'

declare global {
    interface Window { stream: any; }
    interface Navigator {}
}

interface CallServiceProps {
    window: Window;
    navigator: Navigator;
}

export class CallService {
    private readonly _window: Window;
    private readonly _navigator: Navigator;
    private _hubConnection!: HubConnection;
    private readonly _constraints: MediaStreamConstraints = {
        audio: true,
        video: true
    }
    private _localMediaStream!: MediaStream;
    private _peerConnection!: RTCPeerConnection;
    
    private _configuration = {
        'iceServers': [
            {
                "urls": "stun:vc.example.com:3478"
            },
            {
                "urls": "stun:stun2.l.google.com:19302",
            }
        ]
    };

    private _audioElement!: HTMLMediaElement;
    private _videoElement!: HTMLMediaElement;
    private _isReadyToSendICE: boolean = false;

    constructor(props: CallServiceProps) {
        this._window = props.window;
        this._navigator = props.navigator;
        this._peerConnection = new RTCPeerConnection();
    }

    public async initialize() {
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://${ip}:5566/chathub`)
            .build();
        try {
            await this._hubConnection.start()
            await this._hubConnection.send("JoinGroup", "TestGroup");
            await this.initCallback();
            console.log(this._peerConnection.iceConnectionState)
        }
        catch(err) {
            console.log(err)
        }
    }

    public async setAudioElement() {
        try {
            const audioEl: Element | null = document.querySelector('#localAudioPlayback');
            if (audioEl) {
                this._audioElement = <HTMLMediaElement> audioEl;
                console.log(this._audioElement.srcObject)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    public async setVideoElement() {
        try {
            const videoEl: Element | null = document.querySelector('#localVideoPlayback');
            if (videoEl) {
                this._videoElement = <HTMLMediaElement> videoEl;
                console.log(this._videoElement.srcObject)
            }
        }
        catch(ex) {
            console.log(ex);
        }
    }

    public async startCall() {
        await this.makeOffer();
        await this.setAudioElement();
        await this.initMediaDevices();
    }

    public async initMediaDevices() {
        const stream = await this.getMediaDevice()
        this._peerConnection.addTrack(stream.getAudioTracks()[0])
    }

    private async getMediaDevice(): Promise<MediaStream> {
        return await this._navigator.mediaDevices.getUserMedia(this._constraints);
    }

    private async initCallback() {

        this._hubConnection.on("OfferReceive", async (response: RTCSessionDescriptionInit) => {
            try {
                await this._peerConnection.setRemoteDescription(new RTCSessionDescription(response));

                this._localMediaStream = await this.getMediaDevice();

                this._localMediaStream
                    .getTracks()
                    .forEach(track => this._peerConnection.addTrack(track, this._localMediaStream));

                const answer = await this._peerConnection.createAnswer();
                await this._peerConnection.setLocalDescription(answer);

                const type = this._peerConnection.localDescription?.type;
                console.log('Local description in Offer Receive: ' + type);

                await this._hubConnection.send("SendAnswer", answer);
                this._isReadyToSendICE = true;
            } catch (err) {
                console.log(err)
            }
        });

        this._hubConnection.on("AnswerReceive", async (response: RTCSessionDescriptionInit) => {
            try {
                await this._peerConnection.setRemoteDescription(new RTCSessionDescription(response))
                const type = this._peerConnection.localDescription?.type;
                console.log('Local description in Offer Receive: ' + type);
            } catch (e) {
                console.log(e)
            }
        });

        this._hubConnection.on('IceCandidateReceive', async (message: RTCIceCandidate) => {
            console.log("Received an ICE candidate and added ");
            if (message && this._isReadyToSendICE) {
                try {
                    console.log("ICE candidate received: " + message)
                    await this._peerConnection.addIceCandidate(message);
                } catch (e) {
                    console.error('Error received ice candidate: ', e);
                }
            }
        });

        this._peerConnection.addEventListener('icecandidate', async event => {
            if (event.candidate && this._isReadyToSendICE) {
                try {
                    await this._hubConnection.send('SendIceCandidate', event.candidate);
                    console.log("Ice candidate discovered: " + event.candidate.candidate);
                }
                catch (e) {
                    console.log(e)
                }
            }
        });

        this._peerConnection.ontrack = (event) => {
            if (event.streams.length > 0) {
                console.log(event.streams);
                this._audioElement.srcObject = event.streams[0];
            }
        };

        this._peerConnection.addEventListener('connectionstatechange', event => {
            console.log(event.type)
            if (this._peerConnection.connectionState === 'connected') {
                try {
                    this._localMediaStream.getTracks().forEach(track => {
                        this._peerConnection.addTrack(track, this._localMediaStream);
                    });
                }
                catch(ex) {
                    console.log(this._peerConnection.getSenders());
                    console.log(ex)
                }
            }
        });

        const remoteAudioStream = new MediaStream();
        this._audioElement.srcObject = remoteAudioStream;

        const remoteVideoStream = new MediaStream();
        this._videoElement.srcObject = remoteVideoStream;

        this._peerConnection.addEventListener('track', async (event: { track: MediaStreamTrack; }) => {
            if (event.track.kind === "audio") {
                remoteAudioStream.addTrack(event.track);
                await this._audioElement.play();
            }
            
            if (event.track.kind === "video") {
                remoteVideoStream.addTrack(event.track);
                await this._videoElement.play();
            }
        });

        this._peerConnection.addEventListener('iceconnectionstatechange', event => {
            console.log(event)
            console.log("Connection state: " + this._peerConnection.iceConnectionState)
        });

        // this._peerConnection.addEventListener('track', event => {
        //     let remoteAudio = this._audioElement.srcObject;
        //     if (remoteAudio !== event.streams[0]) {
        //         remoteAudio = event.streams[0];
        //     }
        // });
    }

    private async makeOffer() {
        if (this._peerConnection) {
            try{
                this._localMediaStream = await this.getMediaDevice();

                console.log(this._localMediaStream.getTracks())

                this._localMediaStream
                    .getTracks()
                    .forEach(track => this._peerConnection.addTrack(track, this._localMediaStream));

                const offer = await this._peerConnection.createOffer();
                await this._peerConnection.setLocalDescription(new RTCSessionDescription(offer))

                console.log(`Connection state in makeOffer: ${this._peerConnection.iceConnectionState}`);

                await this._hubConnection.send("SendOffer", offer);
                this._isReadyToSendICE = true;
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}