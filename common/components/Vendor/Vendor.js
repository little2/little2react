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

const Vendor = ({
  recipes,
}) =>  (
    <BootstrapTable
      data={ recipes2 }
      options={ RBTP.defaultOptions() }
      insertRow deleteRow search pagination hover
      searchPlaceholder='請輸入查詢的關鍵字...'
      selectRow={{ mode: 'checkbox' }}
    >
          <TableHeaderColumn dataField='vendorId' isKey>代號</TableHeaderColumn>
          <TableHeaderColumn dataField='vendorTitle'>名稱</TableHeaderColumn>
          <TableHeaderColumn dataField='contacts'>聯絡人</TableHeaderColumn>
          <TableHeaderColumn dataField='phone'>電話</TableHeaderColumn>
          <TableHeaderColumn dataField='mobilephone'>手機</TableHeaderColumn>
          <TableHeaderColumn dataField='address'>地址</TableHeaderColumn>
          <TableHeaderColumn dataField='siteURL'>廠牌官網</TableHeaderColumn>
          <TableHeaderColumn dataField='memo'  editable={ { type: 'textarea'} }>備註</TableHeaderColumn>
      </BootstrapTable>

);

/*
CREATE TABLE `vendor` (
  `vendorId` varchar(2) NOT NULL COMMENT '代號',
  `vendorTitle` varchar(16) NOT NULL COMMENT '名稱',
  `contacts` varchar(8) NOT NULL COMMENT '聯絡人',
  `phone` varchar(12) NOT NULL COMMENT '電話',
  `mobilephone` varchar(10) NOT NULL COMMENT '手機',
  `address` varchar(50) NOT NULL COMMENT '地址',
  `siteURL` varchar(120) NOT NULL COMMENT '廠牌官網',
  `memo` text NOT NULL COMMENT '備註'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='廠牌資料(供貨商)';


*/




export default Vendor;
