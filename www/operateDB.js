/*
    select:function querData
    @param tablename, selectFields, whereStr, whereParams, callback
        tablename:表名
        selectFields:需要查询的字段
        whereStr:条件语句
        whereParams:条件语句中的变量
        callback:查询成功后调用的函数，并将结果返回给该函数
    example: operateDB.queryData('goodslist', '*', 'id = ?', [id], readData);

    insert:function saveData
    @param option, tablename, insertFields, insertParams, callback
        option:[需要插入的表数，第一张表需要插入的记录数，第二张表需要插入的记录数...以此类推]
        tablename:[第一张表名，第二张表名...以此类推]
        insertFields:需要插入的字段，二维数据结构存储每张表的字段
        insertParams:需要插入的数据，二维数组结构存储每张表的数据
        callback:插入成功后调用的函数
    example:
        var insertField = new Array();//生成插入字段的一维数组
        var insertParam = new Array();//生成插入数据的一位数组
        
        //以二维数组方式生成第一张数据表需要插入的字段
        insertField[1] = new Array('org_id', 'user_id', 'goods_id', 'goods_name', 'goods_barcode', 'goods_brandid', 'goods_categoryid', 'goods_unitid', 'goods_manufacturerid', 'goods_descr', 'goods_stockprice', 'goods_price', 'goods_photoidprefix', 'publishflag');
        //以二维数组方式生成第一张数据表需要插入的数据
        insertParam[1] = new Array(org_id, user_id, goods_id, goods_name, goods_barcode, goods_brandid, goods_categoryid, goods_unitid, goods_manufacturerid, goods_descr, goods_stockprice, goods_price, goods_photoidprefix, publishflag);
 
        //以二维数组方式生成第二张数据表需要插入的字段
        insertField[2] = new Array('user_id', 'photo_id', 'localurl');
        //以二维数组方式生成第二张数据表需要插入的字段
        insertParam[2] = new Array(user_id, goods_photoidprefix[1], localURL[1], user_id, goods_photoidprefix[2], localURL[2]);
        
        //将需要插入的数据表放入一维数组中
        var tableName = new Array('myshop_simplegoods', 'myshop_photo');
        //第一位为需要插入的数据表总数，第二位开始为每张表需要插入的记录条目，本例中第一张表需要插入1条记录，第二张表需要插如2条记录
        var DBoption = new Array('2', '1', '2');
         
        operateDB.saveData(option, tablename, insertField, insertParam, saveSuccess);

    update:function updateData
    @param tableName, setFileds, setParams, whereStr, whereParams, callback
        tablename:表名
        setFileds:需要修改的字段
        setParams:需要修改的数据
        whereStr:条件语句
        whereParams:条件语句中的变量
        callback:查询成功后调用的函数，并将结果返回给该函数
    example: 
        var setField = ['goods_name', 'goods_barcode', 'goods_brand', 'goods_category', 'goods_descr', 'goods_unit', 'goods_manufacturer', 'goods_stockprice', 'goods_saleprice', 'quantity', 'goods_status', 'goods_remark', 'photo_id', 'photo_url'];
        var setParam = [goods_name, goods_barcode, goods_brand, goods_category, goods_descr, goods_unit, goods_manufacturer, goods_stockprice, goods_saleprice, quantity, goods_status, goods_remark, photo_id, photo_url];
         
        operateDB.updateData('goodslist', setField, setParam, 'id = ?', [id], updateSuccess);
 
    delete:function deleteData
    @param tableName, whereStr, whereParams, callback
        tablename:表名
        whereStr:条件语句
        whereParams:条件语句中的变量
        callback:查询成功后调用的函数，并将结果返回给该函数
    example:
*/

var operateDB = new Object({

    openDB : function () {
        var mydb = window.sqlitePlugin.openDatabase({name: "showapp.db", createFromLocation: 1});
        
        console.log("database is open!");
        
        return mydb;
    },

    queryData : function (tableName, selectFields, whereStr, whereParams, callback) {
        console.log("queryDB is begin!");
        
        var mydb = operateDB.openDB();
        
        var sql = 'SELECT ' + selectFields + ' FROM ' + tableName;
        if (typeof(whereStr) != 'undefined' && typeof(whereParams) != 'undefined' && whereStr != ""){
            sql += ' WHERE ' + whereStr;
        }
    
        console.log(sql + whereParams);
        
        mydb.transaction(searchData, errorData);
        
        function searchData(tx) {
            console.log("sql is ready to run!");
            tx.executeSql(sql, whereParams, searchSuccess, errorData);
            console.log("sql is executed!");
        }
        
        function searchSuccess(tx, results) {
            console.log("Query is success!");
            callback(results);
        }
        
        function errorData(err) {
            alert("Error processing SQL:" + err.code);
        }
    },

    saveData : function (option, tableName, insertFields, insertParams, callback) {
        console.log("saveDB is begin!");
        
        var mydb = operateDB.openDB();
        
        var tableCount = option[0];
        var sql = new Array();
        var params = new Array();
        var successCount = 0;
        
        alert(tableCount);
                           
        for (c=1; c<=tableCount; c++) {
             sql[c] = 'INSERT INTO ' + tableName[c-1] + ' (';
             params[c] = ' (';
                           
            for (i in insertFields[c]) {
                sql[c] += insertFields[c][i] + ', ';
                params[c] += '?, ';
            }
            
            sql[c] = sql[c].substr(0, sql[c].length - 2);
            params[c] = params[c].substr(0, params[c].length - 2);
            sql[c] += ')';
            params[c] += ')';
             
            //alert(sql[c]);
            //alert(params[c]);

            var temp = params[c];
            var recordcount = option[c];
       
            //alert(temp);
            //alert(recordcount);
                           
            while (recordcount > 1) {
                temp = temp + ', ' + params[c];
                recordcount--;
            }
       
            params[c] = temp;
       
            console.log(sql[c] + ' VALUES ' + params[c]);
            console.log(insertParams[c]);
            //alert(sql[c] + ' VALUES ' + params[c]);
            //alert(insertParams[c]);
        }
        
                
        mydb.transaction(insertData, errorData);
        
        callback();
        
        function insertData(tx) {
            console.log("sql is ready to run!");
            for (c=1; c<=tableCount; c++) {
                tx.executeSql(sql[c] + ' VALUES ' + params[c], insertParams[c], insertSuccess, errorData);
            }
            console.log("sql is executed!");
        }
        
        function insertSuccess() {
            console.log("Data write Success!");
            successCount++;
            alert(successCount);
            if (successCount == tableCount) {
                callback();
            }
        }
        
        function errorData(err) {
            alert("Error processing SQL:" + err.code);
        }
    },

    updateData : function (tableName, setFileds, setParams, whereStr, whereParams, callback) {
        console.log("updateDB is begin!");
        
        var mydb = operateDB.openDB();
        
        var sql = 'UPDATE ' + tableName + ' SET ';
        for (i in setFileds) {
            sql += setFileds[i] + '= ?, ';
        }
        sql = sql.substr(0, sql.length - 2);
        sql += ' WHERE ' + whereStr;
        setParams = setParams.concat(whereParams);
        
        console.log(sql);
        console.log(setParams);
        
        mydb.transaction(renewData, errorData);
        
        function renewData(tx) {
            console.log("sql is ready to run!");
            tx.executeSql(sql, setParams, updateSuccess, errorData);
            console.log("sql is executed!");
        }
        
        function updateSuccess() {
            console.log("Data renew is done!");
        }
        
        function errorData(err) {
            alert("Error processing SQL:" + err.code);
        }
    },

    deleteData : function (tableName, whereStr, whereParams, callback) {
        console.log("deleteDB is begin!");
        
        var mydb = operateDB.openDB();
        
        var sql = 'DELETE FROM ' + tableName + ' WHERE ' + whereStr;
        
        console.log(sql + whereParams);
        
        mydb.transaction(removeData, errorData)
        
        function removeData(tx) {
            console.log("sql is ready to run!");
            tx.executeSql(sql, whereParams, deleteSuccess, errorData);
            console.log("sql is executed!");
        }
        
        function deleteSuccess() {
            console.log("Data delete is Success!");
            callback();
        }
        
        function errorData() {
            alert("Error processing SQL:" + err.code);
        }
    }
});