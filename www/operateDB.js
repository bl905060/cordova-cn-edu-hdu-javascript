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
    @param tablename, insertFields, insertParams, callback
        tablename:表名
        insertFields:需要插入的字段
        insertParams:需要插入的数据
        callback:插入成功后调用的函数
    example:
        var insertField = ['user_id', 'goods_id', 'goods_name', 'goods_barcode', 'goods_brand', 'goods_category', 'goods_descr', 'goods_unit', 'goods_manufacturer', 'goods_stockprice', 'goods_saleprice', 'quantity', 'goods_status', 'goods_remark', 'photo_id', 'photo_url', 'timestamp', 'delflag', 'goods_ntu'];
        var insertParam = [user_id, goods_id, goods_name, goods_barcode, goods_brand, goods_category, goods_descr, goods_unit, goods_manufacturer, goods_stockprice, goods_saleprice, quantity, goods_status, goods_remark, photo_id, photo_url, timestamp, delflag, goods_ntu];
         
        operateDB.saveData('goodslist', insertField, insertParam, saveSuccess);

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

    saveData : function (count, tableName, insertFields, insertParams, callback) {
        console.log("saveDB is begin!");
        
        var mydb = operateDB.openDB();
        
        var sql = 'INSERT INTO ' + tableName + ' (';
        var params = ' (';
        
        for (i in insertFields) {
            sql += insertFields[i] + ', ';
            params += '?, ';
        }
        sql = sql.substr(0, sql.length - 2);
        params = params.substr(0, params.length - 2);
        sql += ')';
        params += ')';
        
        var temp = params;
                           
        while (count > 1) {
            temp = temp + ', ' + params;
            count--;
        }
                           
        params = temp;
        
        console.log(sql + ' VALUES ' + params);
        console.log(insertParams);
        
        mydb.transaction(insertData, errorData);
        
        function insertData(tx) {
            console.log("sql is ready to run!");
            tx.executeSql(sql + ' VALUES ' + params, insertParams, insertSuccess, errorData);
            console.log("sql is executed!");
        }
        
        function insertSuccess() {
            console.log("Data write Success!");
            callback();
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
            callback();
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