export default class sqlplugins  {

    constructor(props) {

        this.getInsertSQL = this.getInsertSQL.bind(this);
        this.getUpdateSQL = this.getUpdateSQL.bind(this);
    }

    getInsertSQL(table, rowobj) {
        let sql_key, sql_value;
        for (let key in rowobj) {
            // skip loop if the property is from prototype
            if (!rowobj.hasOwnProperty(key)) continue;
            let value = rowobj[key];
            //console.log(key+ "=>" + obj);

            sql_key = sql_key && (sql_key + ",") || "";
            sql_key += "`" + key + "`";

            sql_value = sql_value && (sql_value + ",") || "";
            sql_value += "\'" + value + "\'";
        }
        const sql = "INSERT INTO `" + table + "` (" + sql_key + ") VALUES (" + sql_value + ");";
        return sql;
    }

    getUpdateSQL(table, rowobj, whereStr = '1') {
        let sql_key, sql_value;
        for (let key in rowobj) {
            // skip loop if the property is from prototype
            if (!rowobj.hasOwnProperty(key)) continue;
            let value = rowobj[key];
            //console.log(key+ "=>" + obj);

            sql_key = sql_key && (sql_key + ",") || "";
            sql_key += "`" + key + "` = \'" + value + "\'";
        }

        const sql = "UPDATE `" + table + "` SET " + sql_key + " WHERE " + whereStr;
        return sql;
    }




}
