var dataTransfer = new Object ({
    uploadData : function (postURL, jsonData, uploadSuccess, uploadFail){
        console.log("upLoadData is begin!");
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.timeout = 2000;
        xmlhttp.ontimeout = timeout;
        xmlhttp.onreadystatechange = received;
        xmlhttp.open("POST", postURL, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("json=" + JSON.stringify(jsonData));
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