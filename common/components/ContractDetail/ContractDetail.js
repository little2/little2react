import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Form , Panel }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
class VehicleRBTP extends ReactBoostrapTablePlugins {}
let RBTP = new VehicleRBTP();


const FormField = ({
  controlId
}) => (
  <div>
    <FormGroup controlId="{controlId}">
      <ControlLabel>xx買方姓名</ControlLabel>
      <FormControl/><HelpBlock></HelpBlock>
    </FormGroup>
  </div>
);



export default class ContractDetail extends Component {
  constructor(props) { super(props) }
  componentDidUpdate() { RBTP.init(this);}
  componentWillMount() { RBTP.loadData(this);}
  render() {
    const { dataRows } = this.props;
    let BootstrapTableData=[];
    if(typeof(dataRows)=== 'object' && dataRows.constructor.name==='Array')
      BootstrapTableData=dataRows;

    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="合約_買方資料">
          <Panel>
            <Form>

              <FormField controlId="contractId"/>

              <FormGroup controlId="formControlsSelect">
                <ControlLabel>車輛分類</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">新車(汽油)</option>
                  <option value="other">電動車</option>
                  <option value="other">中古車</option>
                  <option value="other">重機</option>
                  <option value="other">其他</option>
                </FormControl>
              </FormGroup>



              <FormGroup controlId="contractId"><ControlLabel>合約編號</ControlLabel><FormControl/><HelpBlock></HelpBlock></FormGroup>

              <FormGroup controlId="text">
                <ControlLabel>買方姓名</ControlLabel>
                <FormControl/><HelpBlock></HelpBlock>
              </FormGroup>

              <FormGroup controlId="text">
                <ControlLabel>買方電話</ControlLabel>
                <FormControl/><HelpBlock></HelpBlock>
              </FormGroup>


            </Form>
          </Panel>
        </Tab>
        <Tab eventKey={2} title="購買車型資料">Tab 2 content</Tab>
        <Tab eventKey={3} title="保險規費輔助">Tab 3 content</Tab>
        <Tab eventKey={4} title="加購項目明細">Tab 1 content</Tab>
        <Tab eventKey={5} title="付款方式明細">Tab 2 content</Tab>
        <Tab eventKey={6} title="合約完成註記">Tab 3 content</Tab>
      </Tabs>
    );
  }
}



/*
CREATE TABLE `contract` (
  `contractId` int(11) NOT NULL COMMENT '合約號碼',
  `dealerId` varchar(8) NOT NULL COMMENT '專分銷代號',
  `vClassId` tinyint(4) NOT NULL COMMENT '機車分類',
  `createDate` date NOT NULL COMMENT '合約日期',
  `buyerName` varchar(20) NOT NULL COMMENT '買方姓名',
  `buyerPhone` varchar(12) NOT NULL COMMENT '買方電話',
  `buyerMobilePhone` varchar(10) NOT NULL COMMENT '買方手機',
  `buyerAddress` varchar(64) NOT NULL COMMENT '買方地址',
  `buyerBirthday` date NOT NULL COMMENT '買方生日',
  `buyerPID` varchar(10) NOT NULL COMMENT '買方身份證',
  `contractorName` varchar(20) NOT NULL COMMENT '簽約人的姓名',
  `contractorPID` varchar(10) NOT NULL COMMENT '簽約人的身份証字號',
  `usedIdTypeId` varchar(32) NOT NULL COMMENT '已收的證件類型',
  `brand` varchar(20) NOT NULL COMMENT '購買的品牌',
  `modelId` varchar(10) NOT NULL COMMENT '購買的機型',
  `modelTitle` varchar(32) NOT NULL COMMENT '機型名稱',
  `vColor` varchar(6) NOT NULL COMMENT '購買的顏色',
  `isHadCarNo` tinyint(1) NOT NULL COMMENT '是否領牌車',
  `isBuyCarNo` tinyint(1) NOT NULL COMMENT '是否買牌',
  `vPrice` int(4) NOT NULL COMMENT '本車售價',
  `fitting` varchar(64) NOT NULL COMMENT '標準配件',
  `isIncInsu` tinyint(1) NOT NULL COMMENT '是否含強制險',
  `isIncLICFee` tinyint(1) NOT NULL COMMENT '是否含領牌規費',
  `subsidy` text NOT NULL COMMENT '適用補助',
  `subsidyTotal` int(4) NOT NULL COMMENT '補助總計',
  `insuAdd` text NOT NULL COMMENT '加保險種',
  `insuTotal` int(4) NOT NULL COMMENT '加保總計',
  `part` text NOT NULL COMMENT '配件加購',
  `partTotal` int(4) NOT NULL COMMENT '配件總計',
  `outfit` text NOT NULL COMMENT '加購的精品',
  `outfitTotal` int(4) NOT NULL COMMENT '精品總計',
  `totalPrice` int(4) NOT NULL COMMENT '全部總計',
  `deposit` int(4) NOT NULL COMMENT '訂金',
  `oncredit` int(4) NOT NULL COMMENT '尾款',
  `payType` int(4) NOT NULL COMMENT '付款方式',
  `payDetail` varchar(64) NOT NULL COMMENT '付款明細',
  `vNo` varchar(8) NOT NULL COMMENT '車牌號碼',
  `engBodyNo` varchar(30) NOT NULL COMMENT '引擎/車身號碼',
  `operatorName` varchar(8) NOT NULL COMMENT '承辦人姓名',
  `warranty` varchar(64) NOT NULL COMMENT '保固說明',
  `memo` text NOT NULL COMMENT '備註',
  `invoiceNumber` varchar(12) NOT NULL COMMENT '發票號碼',
  `payCarStatus` tinyint(4) NOT NULL COMMENT '交車狀況',
  `payStatus` tinyint(4) NOT NULL COMMENT '收款狀態 是否已收款',
  `payeeName` varchar(8) NOT NULL COMMENT '收款人姓名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/
