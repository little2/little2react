import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Button }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';


var FakeObjectDataListStore = require('../../../helpers/FakeObjectDataListStore');
let recipes2= new FakeObjectDataListStore(15,"dispatchlog").getAll();

class VehicleRBTP extends ReactBoostrapTablePlugins {
  onRowClick(rows) {}
}


let RBTP = new VehicleRBTP();

const DispatchLog = ({
  recipes,
}) =>  (
    <BootstrapTable
      data={ recipes2 }
      options={ RBTP.defaultOptions() }
      insertRow deleteRow search pagination hover
      searchPlaceholder='請輸入查詢的關鍵字...'
      selectRow={{ mode: 'checkbox' }}
    >
          <TableHeaderColumn dataField='dispatchId' isKey>調度序號</TableHeaderColumn>
          <TableHeaderColumn dataField='activeDate'>調度日期</TableHeaderColumn>
          <TableHeaderColumn dataField='engBodyNo'>引擎號碼</TableHeaderColumn>
          <TableHeaderColumn dataField='oriDealerId'>原經銷商</TableHeaderColumn>
          <TableHeaderColumn dataField='newDealerId'>新經銷商</TableHeaderColumn>
          <TableHeaderColumn dataField='operatorName'>調車人員</TableHeaderColumn>
          <TableHeaderColumn dataField='memo'  editable={ { type: 'textarea'} }>備註</TableHeaderColumn>
      </BootstrapTable>

);

export default DispatchLog;
