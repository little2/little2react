import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Button }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
class VehicleRBTP extends ReactBoostrapTablePlugins {}
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
        <TableHeaderColumn dataField='userId' isKey className="td-plugins-hidden">使用者編號</TableHeaderColumn>
        <TableHeaderColumn dataField='userName'>使用者姓名</TableHeaderColumn>
        <TableHeaderColumn dataField='password' hidden>密碼</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
