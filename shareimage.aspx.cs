using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class shareimage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string name = "";
        try
        {
            if (Request.Params["name"] != null)
            {
                name = (string)Request.Params["name"];
            }
            else if (Request.Params["namecode"] != null)
            {
                var base64EncodedBytes = System.Convert.FromBase64String(Request.Params["namecode"]);
                name = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
            }
        }
        catch (Exception ex) { 
        
        }
        // Load image
        System.Drawing.Image image = System.Drawing.Image.FromFile(Server.MapPath("source/share.jpg"), true);
        // Create graphics from image
        System.Drawing.Graphics graphics = System.Drawing.Graphics.FromImage(image);
        // Create font
        System.Drawing.Font font = new System.Drawing.Font("Times New Roman", 16.5f, System.Drawing.FontStyle.Bold);
        // Create text position
        System.Drawing.PointF point = new System.Drawing.PointF(75, 150);
        // Draw text
        graphics.DrawString(name.ToUpper(), font, System.Drawing.Brushes.Black, point);

        // clear http output
        Response.Clear();
        // set the content type to JPEG
        Response.ContentType = "image/jpeg";
        // add content type header
        Response.AddHeader("Content-Type", "image/jpeg");
        // set the content disposition
        Response.AddHeader("Content-Disposition", "inline;filename=share.jpg");
        // Save image
        image.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Jpeg);

        Response.End();
    }
}