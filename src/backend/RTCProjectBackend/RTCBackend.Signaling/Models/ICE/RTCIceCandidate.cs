namespace RTCBackend.Signaling.Models.ICE
{
    public class RTCIceCandidate
    {
        public string Candidate { get; set; }
        public string Component { get; set; }
        public string Foundation { get; set; }
        public int Port { get; set; }
        public int Priority { get; set; } 
        public string Protocol { get; set; }
        public string RelatedAddress { get; set; }
        public int RelatedPort { get; set; }
        public int SDPMLineIndex { get; set; }
        public string SDPMid { get; set; }
        public string TCPType { get; set; }
        public string Type { get; set; }
        public string UsernameFragment { get; set; }
    }
}