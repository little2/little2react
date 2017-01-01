import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Button }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';


var FakeObjectDataListStore = require('../../../helpers/FakeObjectDataListStore');
let recipes2= new FakeObjectDataListStore(15,"dispatchlog").getAll();

class VehicleRBTP extends ReactBoostrapTablePlugins {

}


let RBTP = new VehicleRBTP();

const Model = ({
  recipes,
}) =>  (
    <BootstrapTable
      data={ recipes2 }
      options={ RBTP.defaultOptions() }
      insertRow deleteRow search pagination hover
      searchPlaceholder='請輸入查詢的關鍵字...'
      selectRow={{ mode: 'checkbox' }}
    >
          <TableHeaderColumn dataField='modelId' isKey>機型代碼</TableHeaderColumn>
          <TableHeaderColumn dataField='sort'>排列位置</TableHeaderColumn>
          <TableHeaderColumn dataField='vendorId'>廠牌代號</TableHeaderColumn>
          <TableHeaderColumn dataField='modelTitle'>機型名稱</TableHeaderColumn>
          <TableHeaderColumn dataField='modelColor'>生產顏色</TableHeaderColumn>
          <TableHeaderColumn dataField='fitting'>標準配件</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerCost'>收款價</TableHeaderColumn>
          <TableHeaderColumn dataField='listPrice'>建議售價</TableHeaderColumn>
          <TableHeaderColumn dataField='referURL'>參考網站</TableHeaderColumn>
          <TableHeaderColumn dataField='attachment'>下載文件DM</TableHeaderColumn>
          <TableHeaderColumn dataField='receiverTypeId'>適用車行</TableHeaderColumn>
          <TableHeaderColumn dataField='operatorName'>承辦人</TableHeaderColumn>
          <TableHeaderColumn dataField='modelStatus'>庫存狀態</TableHeaderColumn>
          <TableHeaderColumn dataField='memo'  editable={ { type: 'textarea'} }>備註</TableHeaderColumn>
      </BootstrapTable>

);



export default Model;
