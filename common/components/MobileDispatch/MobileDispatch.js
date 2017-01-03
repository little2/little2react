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

export default class MobileDispatch extends Component {
  constructor(props) { super(props) }
  componentDidUpdate() {
    RBTP.init(this);

  }
  componentWillMount() { RBTP.loadData(this);}

  onChangeDealerIdSelect() {
      const { onGetInventory } = this.props;
      onGetInventory();
      const { inventoryRows } = this.props;
      console.log(inventoryRows);
  }

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

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>原專分銷</ControlLabel>

          <FormControl componentClass="select" placeholder="select"
            ref="dealerIdSelect" onChange={this.onChangeDealerIdSelect.bind(this)}>
            {
              dataRows.map(obj => {
                return (
                    <option key={obj.dealerId} value={obj.dealerId}>{obj.companyName}</option>
                )
              })
            }
          </FormControl>
        </FormGroup>

        <BootstrapTable
          ref='BootstrapTabletableRef'
          data={ BootstrapTableData }
          options={ RBTP.defaultOptions() }
          insertRow
          selectRow={{ mode: 'checkbox' }}
        >
              <TableHeaderColumn dataField='dealerId' hidden >專分銷代號</TableHeaderColumn>
              <TableHeaderColumn dataField='vNo' hidden isKey>車牌 (領牌車)</TableHeaderColumn>
              <TableHeaderColumn dataField='vendorId' hidden>廠牌</TableHeaderColumn>
              <TableHeaderColumn dataField='engBodyNo' >引擎號碼</TableHeaderColumn>
              <TableHeaderColumn dataField='modelId' hidden>機型代號</TableHeaderColumn>
              <TableHeaderColumn dataField='vColor' hidden>顏色</TableHeaderColumn>
              <TableHeaderColumn dataField='vInDate' hidden>進車日期</TableHeaderColumn>
              <TableHeaderColumn dataField='vOutDate' editable={ { type: 'datetime' } } hidden>出廠日期</TableHeaderColumn>
              <TableHeaderColumn dataField='memo'  editable={ { type: 'textarea'} } hidden>備註</TableHeaderColumn>
          </BootstrapTable>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>後專分銷</ControlLabel>

            <FormControl componentClass="select" placeholder="select"
              ref="dealerIdSelect" >
              {
                dataRows.map(obj => {
                  return (
                      <option key={obj.dealerId} value={obj.dealerId}>{obj.companyName}</option>
                  )
                })
              }
            </FormControl>
          </FormGroup>

        <Button bsStyle="primary" bsSize="large" block>確認調車</Button>
      </div>
      </div>
    );
  }
}
