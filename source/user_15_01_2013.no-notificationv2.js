var isloggedin = false;
var userInfo = null;
var scrollApi = null;
var vietID = 0;
var KeepLoginKey = "k14_npb25bbgxps2vlcfnlc3";
var isLoginedReload = false;
var mingCheckSessionUrl = 'http://vietid.net/login/Checksession';

jQuery(document).ready(function ($) {
    if ($.cookie(KeepLoginKey) != "1") {
    //if (!($.cookie("vid_uid") > 0)) {
        try {
            getUserInformation();
        }
        catch (aa)
        { }
    }
    else {
        $(".notlogged").show();
        $(".logged").hide();
        isloggedin = false;
        $(document).trigger("done-login");
        strLogin = "";
        // Login callback for Get Vote Style
        if (typeof (getVoteStyle_LoginCallback) == 'function') {
            getVoteStyle_LoginCallback();
        }
    }
});

function False() { }
function True() { }
/// End HieuLQ

function getUserInformation() {
    $.getScript(mingCheckSessionUrl);
    mingAuthCallBack = function(data1) {
        if (data1 != 'null') {
            //co session tren ming se tu dong login
            var rels = eval('(' + data1 + ')');

            // Request live info
            //            var strQuery1 = "http://live.kenh14.vn/service.ashx?username=" + rels.username + "&email=" + rels.email + "&avatar=&birthday=&full_name=" + rels.full_name + "&gender=" + ((rels.gender == 1) ? "true" : "false") + "&catid=1"

            //            //$.getScript(strQuery1);
            //            var sl = new JSONscriptRequest(strQuery1);
            //            sl.buildScriptTag();
            //            sl.addScriptTag();

            // Bind userinformation info
            strQuery = "username=" + rels.username + "&email=" + encodeURIComponent(rels.email) + "&full_name=" + encodeURIComponent(rels.full_name) + "&id=" + rels.id + "&checksum=" + rels.checksum + "&avatar=" + rels.avatar;
            $.getScript("/SSOLogin/doLogin.aspx?" + strQuery);
            //console.log('call login k14');
            a = function(data) {
                if (data != null) {
                    var userlink = "http://my.soha.vn/" + data.UName + "/profile.html";
                    $("#UID").val("" + rels.id);
                    $("#userhomepage").attr("href", userlink).attr("target", "_blank").text("Chào " + data.UName);
                    $(".notlogged").hide();
                    $(".logged").show();
                    isloggedin = true;
                    $(document).trigger("done-login");
                    strLogin = data.UName + "|" + "http://avatar.my.soha.vn/" + data.UName + ".png|" + data.UName;
                    //$(".toolbox").slideDown();

                }
                else {
                    $(".notlogged").show();
                    $(".logged").hide();
                    isloggedin = false;
                    $(document).trigger("done-login");
                    strLogin = "";
                    $.cookie("IsFunnyReloadAfterLogin", "0");
                }
            };
            $.cookie("vid_uid", rels.id);
            vietID = rels.id;
            // For jqk funny
            if (typeof(Funny_LoginCallback) == 'function') {
                Funny_LoginCallback(vietID);
            }

        }
        else {
            $(".notlogged").show();
            $(".logged").hide();
            isloggedin = false;
            $(document).trigger("done-login");
            strLogin = "";
            $.cookie("IsFunnyReloadAfterLogin", "0");
            $.cookie("vid_uid", "0");
        }
        // Login callback for Get Vote Style
        if (typeof(getVoteStyle_LoginCallback) == 'function') {
            getVoteStyle_LoginCallback();
        }
        //loadNotify();

        // Profile_LoginCallback
        if (typeof(Profile_LoginCallback) == 'function') {
            Profile_LoginCallback();
        }


    };
}
function getDirectUserInformation(rels) {
    strQuery = "username=" + rels.username + "&email=" + rels.email + "&full_name=" + rels.full_name + "&id=" + rels.id + "&checksum=" + rels.checksum + "&avatar=" + rels.avatar;
    $.getScript("/SSOLogin/doLogin.aspx?" + strQuery);
    a = function (data) {
        if (data != null) {
            var userlink = "http://my.soha.vn/" + data.UserName + "/profile.html";
            $("#UID").val("" + rels.id);
            $("#userhomepage").attr("href", userlink).attr("target", "_blank").text("Chào " + data.UserName);
            $(".notlogged").hide();
            $(".logged").show();
            isloggedin = true;
            $(document).trigger("done-login");
            strLogin = data.UserName + "|" + "http://avatar.my.soha.vn/" + data.UserName + ".png|" + data.UserName;
            //$(".toolbox").slideDown();
        }
        else {
            $(".notlogged").show();
            $(".logged").hide();
            isloggedin = false;
            $(document).trigger("done-login");
            strLogin = "";
            //if(readCookie("forceLogout")==null || readCookie("forceLogout") == '') checkMingLogin();
            //else $(".toolbox").slideDown();
            checkMingLogin();
            //$(".toolbox").slideDown();
        }
    }
    vietID = rels.id;
}
function rebindCommentBox() {
    if ($('#mingid_comment_iframe')) {
        $('#mingid_comment_iframe').attr("src", $('#mingid_comment_iframe').attr("src"));
    }
    if ($('div[id^="mingid_comments_content_"] > iframe').length > 0) {
        $('div[id^="mingid_comments_content_"] > iframe').each(function () {
            $(this).attr('src', $(this).attr('src'));
        });
    }

}
function CheckLogin() {
    if (!isloggedin) return false;
    else {
        var obj = new JSONscriptRequest('/Ajax/UserInfoHandler.ashx');
        obj.buildScriptTag(); // Build the script tag
        obj.addScriptTag(); // Execute (add) the script tag
        UserInfo = function (data) {
            if (data != null) return true;
            else return false;
        }
    }
    isloggedin = false;
    return false;
}

function FocusCommentCheckLogin() {
    if (!CheckLogin()) {
        alert("Bạn phải đăng nhập trước khi gửi comment");
        Logout(0);
    }
}
function SubmitCommentCheckLogin() {
    if (CheckLogin()) {

    }
}
function doLogin() {
    $.cookie("IsFunnyReloadAfterLogin", "0");
    //    popup1(strHost + '/loginming.aspx',550,510);var src = strHost + '/loginming.aspx';

    // ThanhDT update for login ming
    var src = '/SSOLogin/LoginMing.aspx';

    var overlay = $("<div />").addClass("overlay").css("width", $(document).width()).css("height", $(document).height()).css("zIndex", 9999).appendTo($("body"));
    var loginBox = $("<div />").addClass("loginbox").css("zIndex", 9999).appendTo($("body"));
    var loginContainer = $("<div />").addClass("loginboxcontainer").appendTo(loginBox);
    var loginIframe = $("<iframe />").attr("src", src).appendTo(loginContainer);
    var closeButton = $("<a />").addClass("close_login").attr("href", "javascript:void(0)").bind("click", function () {
        overlay.fadeOut(800);
        loginBox.fadeOut(800, function () {
            loginBox.remove();
            overlay.remove();
        });
    }).appendTo(loginContainer);
    var left = ($(window).width() - loginBox.width()) / 2;
    var top = ($(window).height() - loginBox.height()) / 2;
    loginBox.css("top", top).css("left", left).fadeIn();
    return false;

}

function doHideLoginBox() {
    if ($(".overlay").length > 0) {
        $(".overlay").fadeOut(800, function () {
            $(this).remove();
        });
    }
    if ($(".loginbox").length > 0) {
        $(".loginbox").fadeOut(800, function () {
            $(this).remove();
        });
    }
}
function Logout(c) {
    $.cookie("vid_uid", "0");
    var src = '/SSOLogin/DoLogout.aspx';

    var overlay = $("<div />").addClass("overlay").css("width", $(document).width()).css("height", $(document).height()).css("zIndex", 9999).appendTo($("body"));
    var loginBox = $("<div />").addClass("loginbox").css("zIndex", 9999).appendTo($("body"));
    var loginContainer = $("<div />").addClass("loginboxcontainer").appendTo(loginBox);
    var loginIframe = $("<iframe />").attr("src", src).appendTo(loginContainer);
    var closeButton = $("<a />").addClass("close_login").attr("href", "javascript:void(0)").bind("click", function () {
        overlay.fadeOut(800);
        loginBox.fadeOut(800, function () {
            loginBox.remove();
            overlay.remove();
        });
    }).appendTo(loginContainer);
    var left = ($(window).width() - loginBox.width()) / 2;
    var top = ($(window).height() - loginBox.height()) / 2;
    loginBox.css("top", top).css("left", left).fadeIn();
    //    createCookie("forceLogout", "true", false);
    //    isloggedin = false;
    //    var obj = new JSONscriptRequest('/Ajax/UserLogoutHandler.ashx?c=' + Math.random());
    //    obj.buildScriptTag(); // Build the script tag     
    //    obj.addScriptTag(); // Execute (add) the script tag
    //    abc = function (data) {
    //        var b = 1;
    //        while (data == null) {
    //            b++;
    //            if (b > 200) {
    //                break;
    //            }

    //        }

    //        if (c != 1) {
    //            LoadAllComment(10);
    //        }
    //        $(".notlogged").show();
    //        $(".logged").hide();
    //    }
    //    var logoutMing = new Image();
    //    logoutMing.src = "http://vietid.net/login/LogoutService";

    //    setTimeout(function () {
    //        rebindCommentBox();
    //        // Remove VietId
    //        vietID = 0;
    //        loadNotify();
    //    }, 2000);
}

function doFav(type) {
    if (isloggedin) {
        var url = document.getElementById("hfFav").value + "&UID=" + $("#UID").val() + "&type=" + type;
        var t = new Image();
        t.src = "http://profile.kenh14.vn/services/K14NewsHandler.ashx?" + url;
        document.getElementById("doFavSuccess").style.display = "block";
    }
    else {
        popup1('http://profile.kenh14.vn/loginming.aspx?dofav=1', 550, 510);
    }
}
function doFavThenClose(type) {
    var url = document.getElementById("hfFav").value + "&UID=" + $("#UID").val() + "&type=" + type;
    var t = new Image();
    t.src = "http://profile.kenh14.vn/services/K14NewsHandler.ashx?" + url;
    document.getElementById("doFavSuccess").style.display = "block";
    return true;
}
function ObjectPosition(obj) {
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [curleft, curtop];
}
function checkMingLogin() {
    //var api = "http://vietid.net/login/checksession"; //obsolete
    var api = "http://vietid.net/login/checksession";
    var obj = new JSONscriptRequest(api);
    obj.buildScriptTag();
    obj.addScriptTag();
    mingAuthCallBack = function (stringdata) {
        if (stringdata != undefined && stringdata.length > 0) {
            mingData = eval("(" + stringdata + ")");
            if (mingData != undefined && mingData.checksum.length > 0) {
                getDirectUserInformation(mingData);
                //                var silentLoginPath = "/SilentLogin.aspx";
                //                var silentLoginQuery = silentLoginPath + "?id=" + mingData.id + "&username=" + encodeURIComponent(mingData.username)
                //                    + "&email=" + encodeURIComponent(mingData.email) + "&type=" + 0 + "&checksum=" + mingData.checksum;
                //                var sl = new JSONscriptRequest(silentLoginQuery);
                //                sl.buildScriptTag();
                //                sl.addScriptTag();
                //                silentLogin = function (data) {
                //                    if (data != null && data.UName != null && data.UName.length > 0) {
                //                        getUserInformation();
                //                    }
                //                    else $(".toolbox").slideDown();
                //                };
            }
            else $(".toolbox").slideDown();
        }
        else $(".toolbox").slideDown();
    };
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function populateNotifications(data) {
    if (data.count > 0) {
        if (data.read == 0) $(".notification_number").text("" + data.count).addClass("active");
        $(".notificationbox").removeClass("no_notification");
        if (data.list != null && data.list.length > 0) {
            for (var i = 0; i < data.list.length; i++) {
                var $container = $("<a />").addClass("item clearfix").attr("href", data.list[i].news_url);
                var $img = $("<img />").addClass("avatar").attr("src", data.list[i].news_avatar).appendTo($container);
                var $info = $("<span />").addClass("noti_info").appendTo($container);
                var $message = $("<span />").addClass("noti_message").appendTo($info);
                var $time = $("<span />").addClass("noti_action").text(data.list[i].create_time).appendTo($info);
                if (data.list[i].type == "1") {
                    $time.addClass("like");
                    var text = "Có " + data.list[i].count + " người thích bình luận của bạn trong bài viết <span class='postname'>&ldquo;" + data.list[i].news_title + "&rdquo;</span>";
                    $message.html(text);
                }
                else if (data.list[i].type == "0") {
                    $time.addClass("message");
                    var text = "Có " + data.list[i].count + " người trả lời bình luận của bạn trong bài viết <span class='postname'>&ldquo;" + data.list[i].news_title + "&rdquo;</span>";
                    $message.html(text);
                }
                $container.appendTo($(".noti_pop_list"));
            }
            if (scrollApi != null) scrollApi.reinitialise();
        }
    }
}

/* Blog information*/
var blogCookieKey = "blog_count_cookie";

function doGetNotifyCount(vietId) {
    $.ajax({
        url: "/Ajax/BlogHandler.ashx",
        data: { vietid: vietId },
        cache: false,
        timeout: 15000,
        dataType: "json",
        success: function (data) {
            var count = parseInt(data);
            if (count > 0) {
                $("#pnlBlogCount").html(count);
                $("#pnlBlogCount").show();
            }
            else {
                $("#pnlBlogCount").html(0);
                $("#pnlBlogCount").hide();
            }
        }
    });
}

function doRemoveNotify() {
    if (typeof (vietID) != "undefined" && vietID > 0) {
        $.ajax({
            url: "/Ajax/BlogActionHandler.ashx",
            data: { m: "removenotify", vietid: vietID },
            cache: false,
            timeout: 15000,
            dataType: "json",
            success: function (data) {
                $("#pnlBlogCount").html(0);
                $("#pnlBlogCount").hide();
            }
        });
    }
    else {
        if ($.cookie(blogCookieKey) != "1") {
            $("#pnlBlogCount").html(0);
            $("#pnlBlogCount").hide();
            $.cookie(blogCookieKey, "1");
        }
    }
}
function loadNotify() {
    if (typeof (vietID) != "undefined" && vietID > 0) {
        doGetNotifyCount(vietID);
    }
    else {
        var value = $.cookie(blogCookieKey);
        if (value == "1") {
            $("#pnlBlogCount").html("0");
            $("#pnlBlogCount").hide();
            return;
        }
        else {
            doGetNotifyCount(0);
        }
    }
    //sl.addScriptTag();
}

function removeKeepLogin() {
    $.cookie(KeepLoginKey, '', { expires: -1, path: '/' });
}

function doLoginCallback() {
    removeKeepLogin();
    if (isLoginedReload) {
        window.location.reload();
        return;
    }
    getUserInformation();
    //console.log('call Profile_LoginCallback form call back js');
    Profile_LoginCallback();
}