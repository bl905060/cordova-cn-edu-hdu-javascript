var fileManage = new Object ({
    //use mode to select mimetype
    uploadFile : function (mode, fileURL, postURL) {
        var mimeType;
        
        switch(mode)
        {
            case 1:
                mimeType = "image/jpeg";
                break;
            default:
                console.log("mode is error!");
        }
        
        console.log(fileURL);
        
        window.resolveLocalFileSystemURL(fileURL, resolveOnSuccess, resOnError);
        
        //Callback function when the file system url has been resolved
        function resolveOnSuccess(fileEntry){
            console.log("fileUpload is begin!");
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileEntry.name;
            console.log(options.fileName);
            options.mimeType = mimeType;
            
            console.log("upload options is set!");
            
            var ft = new FileTransfer();
            
            ft.upload(fileURL, postURL, uploadSuccess, uploadFail, options);
            
            function uploadSuccess() {
                console.log("file upload is success!");
                console.log(fileURL);
                console.log(postURL);
            }
            
            function uploadFail() {
                console.log("file upload is fail!");
            }
        }
        
        function resOnError() {
            console.log("file resolve is failed!");
        }
    },
                             
    downLoadFile : function () {

    }

    deleteFile : function (fileURL) {
        
        window.resolveLocalFileSystemURL(fileURL, resolveOnSuccess, resOnError);
        
        //Callback function when the file system url has been resolved
        function resolveOnSuccess(fileEntry){
            console.log("delete file is begin!");
            fileEntry.remove(removeSuccess, removeFailed);
            
            function removeSuccess() {
                console.log("file remove is success!");
            }
            
            function removeFailed() {
                console.log("file remove is failed!");
            }
        }
        
        function resOnError() {
            console.log("file resolve is failed!");
        }
    }
});
