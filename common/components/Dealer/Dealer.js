import React from 'react';
import ReactDOM from 'react-dom';

//import { Grid, Row, Col, Image } from 'react-bootstrap';
import _ from 'react-bootstrap';
//import { Table, Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
//import { Table, Column, Cell } from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
let RBTP = new ReactBoostrapTablePlugins();

/*
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
*/

//recipes refer to /sever/cotrollers/api.js

var FakeObjectDataListStore = require('../../../helpers/FakeObjectDataListStore');
let recipes2= new FakeObjectDataListStore(15,"dealer").getAll();

const Dealer = ({
  recipes,
}) =>  (
    <BootstrapTable
      ref='BootstrapTabletableRef'
      data={ recipes2 }
      options={ RBTP.defaultOptions() }
      insertRow deleteRow search pagination hover
      searchPlaceholder='請輸入查詢的關鍵字...'
      selectRow={{ mode: 'checkbox' }}
    >
          <TableHeaderColumn dataField='dealerId' isKey>專分銷代號</TableHeaderColumn>
          <TableHeaderColumn dataField='sort'>排序</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerTypeId'>專分銷分類</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerTitle'>車行名稱</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerShortTitle'>簡稱</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerBoss'>負責人</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerTel'>電話</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerFax'>傳真</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerMobilePhone'>手機</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerAddress'>車行地址</TableHeaderColumn>
          <TableHeaderColumn dataField='VATNumber'>統一編號</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerBossBirth'>負責人生日</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerLongitude'>經度</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerLatitude'>緯度</TableHeaderColumn>
          <TableHeaderColumn dataField='dealerURL' hidden>官網</TableHeaderColumn>
          <TableHeaderColumn dataField='deviceOSType' editable={ { type: 'select', options: { values: [ 'Android', 'iOS', 'Windows', 'Others' ] } } }>手機作業系統</TableHeaderColumn>
          <TableHeaderColumn dataField='deviceId'>手機id</TableHeaderColumn>
          <TableHeaderColumn dataField='memo'>備註</TableHeaderColumn>
      </BootstrapTable>
);

export default Dealer;
