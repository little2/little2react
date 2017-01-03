import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button}  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
class VehicleRBTP extends ReactBoostrapTablePlugins {}
let RBTP = new VehicleRBTP();


export default class MobileControlPanel extends Component {
  constructor(props) { super(props) }
  componentDidUpdate() { RBTP.init(this);}
  componentWillMount() { RBTP.loadData(this);}
  goMobileVehicleInventory() {
    location.href='/MobileVehicleInventory';
  }
  goMobileDispatch() {
    location.href='/MobileDispatch';
  }
  goMobileRecall() {
    location.href='/MobileRecall';
  }
  render() {
    const { dataRows } = this.props;
    let BootstrapTableData=[];
    if(typeof(dataRows)=== 'object' && dataRows.constructor.name==='Array')
      BootstrapTableData=dataRows;

    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    return (
      <div>
      <div className="well" style={wellStyles}>
        <Button bsStyle="primary" bsSize="large" block onClick={this.goMobileVehicleInventory}>盤點</Button>
        <Button bsStyle="primary" bsSize="large" block onClick={this.goMobileDispatch}>調車</Button>
        <Button bsStyle="primary" bsSize="large" block onClick={this.goMobileRecall}>召回/售出</Button>
      </div>
      </div>
    );
  }
}
