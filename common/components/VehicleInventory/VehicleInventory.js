import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Button }  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactBoostrapTablePlugins from '../../utils/react-boostrap-table-plugins.js';


var FakeObjectDataListStore = require('../../../helpers/FakeObjectDataListStore');
let recipes2= new FakeObjectDataListStore(15,"vehicleinventory").getAll();

class VehicleRBTP extends ReactBoostrapTablePlugins {
  onRowClick(rows) {
    if ($(".editModal0").length <=0){
      //根據每個class進行, <TableHeaderColumn dataField='vNo' columnClassName={ columnClassNameFormat }>
      let tdObj=$("td",$("tbody tr:first-child"));
      let classRow=[];
      $(tdObj).each(function(i,val){
        classRow[i]=$(val).attr('class');
      });

      //找到原生的Modal,並複製
      let modalObj=$('.react-bs-table-add-btn').attr('data-target');
      let newModalObj=$(modalObj).clone();
      newModalObj.removeClass((modalObj.replace('.',''))).addClass('editModal0');

      let btngroup=`<div class='btn-group  btn-group-justified'>
        <a href="javascript:showContent('Update')" class="btn btn-default" role="button">修改</a>
        <a href="javascript:showContent('Dis')" class="btn btn-default" role="button" >調車</a>
        <a href="javascript:showContent('Status')" class="btn btn-default" role="button" >狀態</a>
      </div><Br>`;
      $('.modal-body',newModalObj).prepend(btngroup);

      $('.modal-title',newModalObj).text("資料管理");


            $("th").each(function(i,val){
                let title= $(this).attr('title');
                let datafield= $(this).attr('data-field');
                let datatype= $(this).attr('data-type');

                if(title!=undefined)
                {
                  let scope=($("label:contains('"+title+"')",newModalObj).parent());
                  $(scope).find("input").attr('data-field',datafield);
                  //{ columnClassNameFormat }
                  switch(classRow[i])
                  {
                    case "td-plugins-disabled":
                      $(scope).find("input").attr('disabled','disabled');
                    break;
                  }
                }
            });

            $('form',newModalObj).attr("id","contentUpdate");




      $(".modal-body",$(newModalObj)).append(`<form id="contentDis" class="hidden">
                            <div class="form-group">
                            <label>原專分銷代號</label><input type="text" placeholder="專分銷代號" class=" form-control editor edit-text" data-field="dealerId"></div>
                            <div class="form-group">
                            <label>新專分銷代號</label><input type="text" placeholder="專分銷代號" class=" form-control editor edit-text" data-field="dealerId">
                            </div><form>`)
      $(".modal-body",$(newModalObj)).append(`<form id="contentStatus" class="hidden">
        <div class="form-group"><label>請選擇車輛目前狀態</label><select placeholder="動作" class=" form-control editor edit-select"><option value="在庫">在庫</option><option value="召回">召回</option><option value="售出">售出</option></select></div>
      <form>`)
      $(modalObj).parent().append(newModalObj);

      $('body').append(`
        <script>
          function showContent(obj){
            $('form').addClass('hidden');
            $('#content'+obj).removeClass('hidden');
          }
        </script>
        `);


    }


    //代入表格中的數據
    let dataFieldObj=$("form",$('.editModal0'));
    for (var key in rows) {
      if (rows.hasOwnProperty(key)) {
        $("input[data-field='"+key+"']",$('.editModal0')).val(rows[key]);
        $("input[data-field='"+key+"']",$('#contentUpdate')).val(rows[key]);
        //console.log(key + " -> " + rows[key]);
      }
    }
  //  $('#contentUpdate').empty()

  //  $('#contentUpdate').html( $('form', $('.editModal0')).html() );
  console.log($('#contentUpdate').html())
    //展示表格
    $('.editModal0').modal('show');
  }
}

let RBTP = new VehicleRBTP();

const VehicleInventory = ({
  recipes,
}) =>  (
    <BootstrapTable
      data={ recipes2 }
      options={ RBTP.defaultOptions() }
      insertRow deleteRow search pagination hover
      searchPlaceholder='請輸入查詢的關鍵字...'
      selectRow={{ mode: 'checkbox' }}
    >
          <TableHeaderColumn dataField='dealerId' isKey>專分銷代號</TableHeaderColumn>
          <TableHeaderColumn dataField='vNo'>車牌 (領牌車)</TableHeaderColumn>
          <TableHeaderColumn dataField='vendorId' hidden>廠牌</TableHeaderColumn>
          <TableHeaderColumn dataField='engBodyNo'>引擎號碼</TableHeaderColumn>
          <TableHeaderColumn dataField='modelId'>機型代號</TableHeaderColumn>
          <TableHeaderColumn dataField='vColor'>顏色</TableHeaderColumn>
          <TableHeaderColumn dataField='vInDate'>進車日期</TableHeaderColumn>
          <TableHeaderColumn dataField='vOutDate' editable={ { type: 'datetime' } }>出廠日期</TableHeaderColumn>
          <TableHeaderColumn dataField='memo'  editable={ { type: 'textarea'} }>備註</TableHeaderColumn>
      </BootstrapTable>

);

export default VehicleInventory;
