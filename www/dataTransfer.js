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
 
     var uploadDataURL = "http://10.1.17.22/dingdong/index.php/Home/Save/savegoods";
 
     //var postData = "para1's name=" + para1 + "&para2's name=" + para2 + ... + "&paraN's name=" + paraN;
     var postData = "json=" + JSON.stringify(registerData) + "&testname=" + testname + "&testpasscode=" + testpasscode;
 
     dataTransfer.uploadData(postURL, postData, uploadSuccess, uploadFail);
 */

var dataTransfer = new Object ({
    //receiveData : '',
            
    download : function (responseData) {
        console.log("begin to download!");
        
        var downloadURL = "http://115.159.76.70/dingdong/index.php/Home/Getdata/getbasicdata";
        var date = new Date(new Date().getTime() - 15 * 60 *1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        
        var timestamp = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
                               
        var json = {
            "user_id" : responseData.user_id,
            "org_id" : responseData.org_id,
            "timestamp" : timestamp
        };
        
        var sendData = {
            "json" : json
        };
        
        dataTransfer.requestData(downloadURL, sendData, requestSuccess);
        
        function requestSuccess(receiveData) {
            alert("responseData:" + JSON.stringify(receiveData));
        }
    },
                               
    requestData : function (downloadURL, sendData, requestSuccess) {
                               
        //var receiveData;
                               //var that = this;
                               
        dataTransceiver.upload(downloadURL, sendData, downloadSuccess, downloadFail);

        function downloadSuccess(responseData) {
            //alert("responseData:" + JSON.stringify(responseData));
            requestSuccess(responseData);
        }

        function downloadFail(response) {
            alert(response);
        }
    }
});