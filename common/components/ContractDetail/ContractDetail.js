import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Form , Panel, Checkbox, Breadcrumb, ButtonToolbar, Button }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';
class VehicleRBTP extends ReactBoostrapTablePlugins {}
let RBTP = new VehicleRBTP();


const FormTextarea = (props) => (
  <FormGroup controlId="{props.controlId}">
    <ControlLabel>{props.Label}</ControlLabel>
    <FormControl componentClass="textarea" placeholder={props.placeholder}/><HelpBlock></HelpBlock>
  </FormGroup>
)

const FormField = (props) => (
  <div>
    <FormGroup controlId="{props.controlId}">
      <ControlLabel>{props.Label}</ControlLabel>
      <FormControl/><HelpBlock></HelpBlock>
    </FormGroup>
  </div>
);

/*
買方資料
*/
const ContractBuyer = (props) => (
  <Panel>
    <Form>
      <FormField controlId="contractId" Label="合約編號"/>
      <FormField controlId="dealerId" Label="專分銷代號"/>
      <FormField controlId="createDate" Label="合約日期"/>
      <FormGroup controlId="vClassId">
        <ControlLabel>車輛分類</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value="select">新車(汽油)</option>
          <option value="other">電動車</option>
          <option value="other">中古車</option>
          <option value="other">重機</option>
          <option value="other">其他</option>
        </FormControl>
      </FormGroup>
      <FormField controlId="buyerName" Label="買方姓名"/>
      <FormField controlId="buyerPhone" Label="買方電話"/>
      <FormField controlId="buyerMobilePhone" Label="買方手機"/>
      <FormField controlId="buyerAddress" Label="買方地址"/>
      <FormField controlId="buyerBirthday" Label="買方生日"/>
      <FormField controlId="buyerPID" Label="買方身份證"/>
      <FormField controlId="contractorName" Label="簽約人的姓名"/>
      <FormField controlId="contractorPID" Label="簽約人的身份証字號"/>
      <FormField controlId="usedIdTypeId" Label="已收的證件類型"/>
    </Form>
  </Panel>
);

/*
模型
*/
const ContractModel = (props) => (
  <Panel>
    <Form>
      <FormField controlId="contractId" Label="購買廠牌"/>
      <FormField controlId="contractId" Label="購買機型"/>
      <FormField controlId="contractId" Label="機型名稱"/>
      <FormField controlId="contractId" Label="購買顏色"/>
      <Checkbox >領牌車</Checkbox>
      <Checkbox >是否買牌</Checkbox>

      <FormField controlId="contractId" Label="本車售價"/>
      <FormField controlId="contractId" Label="標準配件"/>

    </Form>
  </Panel>
);


/*
保險費規劃
*/
const ContractInsu = (props) => (
  <Panel>
    <Form>
      <Checkbox >含強制險</Checkbox>
      <Checkbox >含領牌規費</Checkbox>
      <FormTextarea controlId="contractId" Label="補助明細"/>
      <FormField controlId="contractId" Label="補助總計"/>
    </Form>
  </Panel>
);

/*
加購項目明細
*/
const ContractPlus = (props) => (
  <Panel>
    <Form>
      <FormTextarea controlId="contractId" Label="加保險種"/>
      <FormField controlId="contractId" Label="加保總計"/>

      <FormTextarea controlId="contractId" Label="加購配件"/>
      <FormField controlId="contractId" Label="配件總計"/>

      <FormTextarea controlId="contractId" Label="加購精品"/>
      <FormField controlId="contractId" Label="精品總計"/>



    </Form>
  </Panel>
);

/*
付款方式明細
*/
const ContractPay = (props) => (
  <Panel>
    <Form>
      <FormField controlId="contractId" Label="全部總計"/>
      <FormField controlId="contractId" Label="訂金"/>
      <FormField controlId="contractId" Label="尾款"/>
      <FormField controlId="contractId" Label="付款方式"/>
      <FormField controlId="contractId" Label="付款明細"/>

    </Form>
  </Panel>
);

/*
合約完成註記
*/
const ContractMemo = (props) => (
  <Panel>
    <Form>
      <FormField controlId="contractId" Label="車牌"/>
      <FormField controlId="contractId" Label="引擎/車身"/>
      <FormField controlId="contractId" Label="承辦人"/>
      <FormField controlId="contractId" Label="保固說明"/>
      <FormTextarea controlId="contractId" Label="備註"/>
    </Form>
  </Panel>
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
      <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#"> Home </Breadcrumb.Item>
        <Breadcrumb.Item href="/ContractList"> 合約查詢 </Breadcrumb.Item>
        <Breadcrumb.Item href="#"> 合約詳情 </Breadcrumb.Item>
      </Breadcrumb>
      <ButtonToolbar className='text-right'>
          {/* Indicates a successful or positive action */}
          <Button bsStyle="success">儲存</Button>
          {/* Standard button */}
          <Button>放棄</Button>
        </ButtonToolbar>

      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="合約_買方資料"><ContractBuyer /></Tab>
        <Tab eventKey={2} title="購買車型資料"><ContractModel/></Tab>
        <Tab eventKey={3} title="保險規費輔助"><ContractInsu/></Tab>
        <Tab eventKey={4} title="加購項目明細"><ContractPlus/></Tab>
        <Tab eventKey={5} title="付款方式明細"><ContractPay/></Tab>
        <Tab eventKey={6} title="合約完成註記"><ContractMemo/></Tab>
      </Tabs>
      </div>
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
