using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace UserMessageHandler.Models
{
    public enum Status : int
    {
        First = 0,
        Second
    }

    class MessageContext : DbContext
    {
        public MessageContext() : base("DbConnection")
        { }
        public DbSet<MessageInfo> Messages { get; set; }
    }

    public class MessageInfo
    {
        [Key]
        public int MessageId { get; set; }
        public string Message { get; set; }
        public int UserId { get; set; }
        public int Status { get; set; }
        public string ContactInfo { get; set; }
    }

    public class Data
    {
        static public string connectionString = ConfigurationManager.AppSettings["ConnectionString"];
    }
}