using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RTCBackend.Signaling.Models.ICE;

namespace RTCBackend.Signaling.Hubs
{
    public class CallHub : Hub
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        
        public async Task SendOffer(RTCSessionDescription sessionDescription)
        {
            await Clients.OthersInGroup("TestGroup").SendCoreAsync("OfferReceive", new object[] {sessionDescription});
        }

        public async Task SendAnswer(RTCSessionDescription sessionDescription)
        {
            await Clients.OthersInGroup("TestGroup").SendCoreAsync("AnswerReceive", new object[] {sessionDescription});
        }

        public async Task SendIceCandidate(RTCIceCandidate candidate)
        {
            await Clients.OthersInGroup("TestGroup").SendCoreAsync("IceCandidateReceive", new object[] {candidate});
        }
    }
}