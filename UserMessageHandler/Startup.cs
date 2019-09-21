using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using UserMessageHandler.Controllers;

[assembly: OwinStartup(typeof(UserMessageHandler.Startup))]

namespace UserMessageHandler
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            log4net.Config.DOMConfigurator.Configure();
        }
    }
}
