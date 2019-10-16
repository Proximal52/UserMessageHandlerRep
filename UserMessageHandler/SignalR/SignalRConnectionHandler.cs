using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace UserMessageHandler.SignalR
{
    [HubName("MainHub")]
    public class SignalRConnectionHandler : Hub
    {
        public void SendMessage()
        {
            Clients.Caller.Test();
        }
    }
}