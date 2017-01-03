import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button , ButtonToolbar , FormGroup , ControlLabel , FormControl  }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
class VehicleRBTP extends ReactBoostrapTablePlugins {}
let RBTP = new VehicleRBTP();
RBTP.config.saveAfterEdit=false;
RBTP.config.editModalText="查詢資料";
RBTP.config.insertButtonVisible=false;

export default class MobileRecall extends Component {
  constructor(props) { super(props) }
  componentDidUpdate() {
    RBTP.init(this);

  }
  componentWillMount() { RBTP.loadData(this);}


  goHome(){
    location.href='/MobileControlPanel';
  }

  render() {
    const dealerOptionData = [];

    const { dataRows, inventoryRows } = this.props;
    let BootstrapTableData=[];
    if(typeof(inventoryRows)=== 'object' && inventoryRows.constructor.name==='Array')
      BootstrapTableData=inventoryRows;

    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    return (
      <div>
      <div className="well" style={wellStyles}>

        <ButtonToolbar className='text-right'>
          {/* Indicates a successful or positive action */}
          <Button bsStyle="success" onClick={this.goHome}>首頁</Button>
        </ButtonToolbar>

        <FormGroup controlId="yrcy">
          <ControlLabel>調車或售出的引擎號碼</ControlLabel>
          <FormControl />
      
        </FormGroup>

        <Button bsStyle="primary" bsSize="large" block>確認售出或召回</Button>
      </div>
      </div>
    );
  }
}
