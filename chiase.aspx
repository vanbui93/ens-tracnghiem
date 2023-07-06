<%@ Page Language="C#" AutoEventWireup="true" CodeFile="chiase.aspx.cs" Inherits="chiase" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  
    <title>
        Chia sẻ kết quả trắc trên Ecommerce & Marketing  ENS
    </title>
    <meta id="pageMetaDesc" name="description" />
    <meta id="pageMetaNewsKeyword" name="news_keywords" />
    <meta http-equiv="content-language" content="vi" />
    <meta http-equiv="EXPIRES" content="10000" />
    <meta name="resource-type" content="Document" />
    <meta name="distribution" content="Global" />
    <meta name="generator" content="enschannel.com" />
    <meta name="copyright" content="Ecommerce & Marketing  ENS" />
    <meta name="author" content="enschannel.com" />
    <meta name="robots" content="index,follow" />
    <meta http-equiv="audience" content="General" />
    <meta name="revisit-after" content="1 days" />
    <meta name="RATING" content="GENERAL" />

    <meta id="idOgIitle" property="og:title" content="[Trắc nghiệm] Bạn là người thế nào trong công việc?" />
     <% 
      var corr=Int32.Parse(Request.Params["corr"]);
      string titleR="";
         if (corr >= 0 && corr <= 2) {
                                titleR="Bài test này không thể làm khó bạn, bạn như một chú lính chì luôn kiên cường trong mọi hoàn cảnh.";
                            }
                            else if (corr >= 3 && corr <= 5) {
                                titleR="Bạn cũng có một chút sáng tạo, một chút thông minh, một chút tinh tế. Nói chung cái gì cũng có một chút. Nền tảng của bạn rất tốt rồi, hãy tìm một môi trường tốt làm bệ phóng cho bạn tỏa sáng nhé.";
                            }
                            else {
                               titleR="Yayyyyyy. Bạn là một thiên tài, óc sáng tạo khủng khiếp và khả năng xử lý công việc tuyệt vờiii.";
                                
                            }
         String wurl = String.Format("<meta id='idOgUrl' property='og:url' content='{0}' /> ", Request.Url.AbsoluteUri);
         String desc = String.Format("<meta id='idOgDesc' property='og:description' content='{0}' />", titleR);
         String img= String.Format(" <meta id='idOgImg' property='og:image' content='https://event.enschannel.com/source/thum-fb-{0}.jpg' />",Request.Params["ia"]);
         %>
       <%Response.Write(wurl); %> 
   <%Response.Write(img); %> 
     <%Response.Write(desc); %> 
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="event.enschannel.com" />
   
</head>
<body onload="window.location.href = 'https://event.enschannel.com/game'">

    <form id="form1" runat="server">

   
  
    </form>
</body>
</html>