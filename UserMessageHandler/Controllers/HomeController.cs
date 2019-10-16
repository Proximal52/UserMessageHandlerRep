using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using UserMessageHandler.Models;

namespace UserMessageHandler.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(HomeController));
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void SendUserMessage(int userId, string message, string contactInfo)
        {
            try
            {
                using (AppDbContext db = new AppDbContext())
                {
                    MessageInfo newMessageInfo = new MessageInfo();
                    newMessageInfo.Message = message;
                    newMessageInfo.UserId = userId;
                    newMessageInfo.ContactInfo = contactInfo;
                    db.Messages.Add(newMessageInfo);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }

        [HttpPost]
        public JsonResult GetMessages(int[] statusInfo, int messagesCount)
        {
            try
            {
                using (AppDbContext db = new AppDbContext())
                {
                    List<MessageInfo> messages = db.Messages
                        .Where(p => statusInfo.Contains(p.Status))
                        .Take(messagesCount)
                        .ToList();
                    return Json(messages);
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
                return Json(null);
            }
        }

        [HttpPost]
        public void ChangeMessageStatus(int messageId, int newMessageStatus)
        {
            try
            {
                using (AppDbContext db = new AppDbContext())
                {
                    MessageInfo message = db.Messages.Find(messageId);
                    message.Status = newMessageStatus;
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }

    }
}