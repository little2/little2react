import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Button }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
class VehicleRBTP extends ReactBoostrapTablePlugins {
  onRowClick(rows)
  {
    location.href='/ContractDetail';
  }
}
let RBTP = new VehicleRBTP();

export default class ContractList extends Component {
  constructor(props) { super(props) }
  componentDidUpdate() { RBTP.init(this);}
  componentWillMount() { RBTP.loadData(this);}
  render() {
    const { dataRows } = this.props;
    let BootstrapTableData=[];
    if(typeof(dataRows)=== 'object' && dataRows.constructor.name==='Array')
      BootstrapTableData=dataRows;

    return (
      <BootstrapTable
        ref='BootstrapTabletableRef'
        data={ BootstrapTableData }
        options={ RBTP.defaultOptions() }
        insertRow deleteRow search pagination hover
        searchPlaceholder='請輸入查詢的關鍵字...'
        selectRow={{ mode: 'checkbox' }}
      >
        <TableHeaderColumn dataField='contractId' isKey className="td-plugins-hidden">合約號碼</TableHeaderColumn>
        <TableHeaderColumn dataField='dealerId'>專分銷代號</TableHeaderColumn>
        <TableHeaderColumn dataField='createDate' >合約日期</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
