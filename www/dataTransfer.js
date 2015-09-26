/*
     uploadData:function uploadData
     @param postURL, postData, uploadSuccess, uploadFail
         postURL:the server's url, you want to post data;
         postData:the data, you want to post to server;
         uploadSuccess:when upload sccuess, then callback this function;
         uploadFail:when upload fail, then callback this function;
     example:dataTransfer.uploadData(postURL, postData, uploadSuccess, uploadFail);
 
     var registerData = {
         "user_name" : UserName,
         "status" : 0,
         "user_type" : UserType,
         "user_mobile" : Phone,
         "IsReg" : 1,
         "user_password" : Passcode,
         "user_id" : null,
         "user_org" : Companyname,
         "user_email" : Email,
         "user_photoid" : null
     };
 
     var testname="test";
     var testpasscode="testpasscode";
 
     //var postData = "para1's name=" + para1 + "&para2's name=" + para2 + ... + "&paraN's name=" + paraN;
     var postData = "json=" + JSON.stringify(registerData) + "&testname=" + testname + "&testpasscode=" + testpasscode;
 
     dataTransfer.uploadData(postURL, postData, uploadSuccess, uploadFail);
 */

var dataTransfer = new Object ({
    uploadData : function (postURL, postData, uploadSuccess, uploadFail){
        console.log("upLoadData is begin!");
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.timeout = 2000;
        xmlhttp.ontimeout = timeout;
        xmlhttp.onreadystatechange = received;
        xmlhttp.open("POST", postURL, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(postData);
        console.log("web post is done!");

        function timeout() {
            console.log("web post was aborted!");
            var response = "request is timeout!";
            uploadFail(response);
        }

        function received(){
            console.log("response was received!");
            console.log("xmlhttp.readyState:" + xmlhttp.readyState);
            console.log("xmlhttp.status:" +xmlhttp.status);
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var response = xmlhttp.responseText;
                    uploadSuccess(response);
                }
                else {
                    var response = "error code:" + xmlhttp.status;
                    uploadFail(response);
                }
            }
        }
    },
    
    loadXML : function (xmlurl, loadSuccess){
        console.log("load xml is begin!");
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlurl, false);
        xmlhttp.send()
        xmlDoc = xmlhttp.responseXML.documentElement;
        if (xmlDoc == null) alert("read xml is error!");
        console.log("load xml is done!");
        loadSuccess(xmlDoc);
    }
});