export default class ReactBoostrapTablePlugins{

  constructor(props) {

     this.onAddRow = this.onAddRow.bind(this);
     this.onAddRowByRBT = this.onAddRowByRBT.bind(this);
     this.onDelRow = this.onDelRow.bind(this);
     this.onSetRow = this.onSetRow.bind(this);
     this.onAfterSetRow = this.onAfterSetRow.bind(this);
     this.init = this.init.bind(this);

     this.config = {
       keyName:'',
       column: {},
       saveAfterEdit: true,
       insertButtonVisible: true,  //是否出現在工具列出現新增按鈕
       editModalText: "編輯資料",
     };

     this.BootStrapTableObj = {} ;
     this.listData = [];
  }



//Check Default Custom the Footer of Insert Modal
  defaultOptions() {
    const defaultOptions = {
      afterInsertRow: this.onAfterInsertRow,   // A hook for after insert rows
      afterTableComplete: this.onAfterTableComplete,
      handleConfirmDeleteRow: this.customConfirmDeleteRow,
      clearSearch: true,
      onRowClick: this.onRowClick,
      onAddRow: this.onAddRowByRBT,
      paginationShowsTotal: true ,
      exportCSVText: '匯出',
      insertText: '新增',
      deleteText: '刪除',
      saveText: '儲存',
      closeText: '關閉',
      classThis: this,
    };
    //var options = Object.assign(defaultOptions, customerOptions);
    return defaultOptions;
  }



  customConfirmDeleteRow(next, dropRowKeys) {
    const dropRowKeysStr = dropRowKeys.join(',');

    if (confirm(`確認刪除以下訊息:\r\n\r\n ${dropRowKeysStr}`)) {
      this.classThis.onDelRow(dropRowKeys);
      // If the confirmation is true, call the function that
      // continues the deletion of the record.
      next();
    }
  }

  loadData(object) {
    if(typeof object.props.onGetRow == "function")
    {
      object.props.onGetRow();
    }

    const { dataRows } = object.props;



  }

  /* 和 connect 的綁定 */
  init(object) {
    if(typeof object.props.onAddRow == "function")
    {
      this.onAddRow = object.props.onAddRow;
    }

    if(typeof object.props.onDelRow == "function")
    {
      this.onDelRow = object.props.onDelRow;
    }

    if(typeof object.props.onSetRow == "function")
    {
      this.onSetRow = object.props.onSetRow;
    }

    if(typeof object.refs.BootstrapTabletableRef == "object")
    {
      this.BootStrapTableObj=object.refs.BootstrapTabletableRef;
    }

    if(this.config.insertButtonVisible==false)
    {
      $('.react-bs-table-add-btn').addClass('hide');
    }




  }

  getListData() {
    return this.listData;
  }


  onDelRow(dropRowKeys) {
    console.log(dropRowKeys);
  }

  // 自定義的創建函數
  onAddRow(rowsObj){
    /*
        axios.post('/api/createUser', rowobj)
        .then((response) => {
          if(response.data.success === false) {
          //  dispatch(authError({errmsg:response.data.message}));
          //  dispatch(hideSpinner());
          //  window.location.reload();
          } else {

          }
        })
        .catch(function (error) {
        //  dispatch(authError({errmsg: error}));
        });


        //console.log('onAddRow');
        //console.log(colInfos);
        */
  }

  onSetRow(rows)
  {
    console.log(rows);
  }

  onAfterSetRow(rows)
  {
    let storeRow=this.BootStrapTableObj.store.data;


    let keyIndex=this.config.column[this.config.keyName];
    let keyValue=rows[this.config.keyName];

    for (var index in storeRow) {

      if(storeRow[index][this.config.keyName]==keyValue)
      {
        for (var rows_index in rows) {
          this.BootStrapTableObj.store.data[index][rows_index]=rows[rows_index];
        }
        this.BootStrapTableObj.setState({
          data: this.BootStrapTableObj.store.data
        });
      }
    }

    /*
    //修改table
    let parentThis=this;
    $("tr",$('.react-bs-container-body')).each(function(row_index,row_element){
      let rowValue=$("td:eq("+keyIndex+")",this).html();
      if(rowValue==keyValue)  //是修改的值
      {
        //代入表格中的數據
        for (var field in rows) {
          if (rows.hasOwnProperty(field)) {

            $("td:eq("+parentThis.config.column[field]+")",this).html(rows[field])
          }
        }
      }
    });
    */
    $('.editModal0').modal('hide');
  }


  // react-bootstrap-table 觸發的事件
  onAddRowByRBT(rows,colInfos) {
    /*
    Assign a callback function which will be called when a row be added.
    This function taking one argument: row which presented as the new row data.
    onAddRow almost used on remote, you can check this example.
    http://allenfang.github.io/react-bootstrap-table/docs.html#onAddRow
    */

    let rowobj={};
    for (const prop in rows) {
      if (rows[prop] !== undefined) rowobj[prop] = rows[prop];
    }
    this.onAddRow(rowobj);

  }

  onAfterInsertRow(row) {
    let newRowStr = '';
    for (const prop in row) {
      newRowStr += prop + ': ' + row[prop] + ' \n';
    }
  //  console.log('onAfterInsertRow');
    //alert('The new row is:\n ' + newRowStr);
  }

  onAfterTableComplete() {

  //  console.log('Assign a callback function which will be called after table update. ');
  }




  onRowClick(rows) {
    let parentThis=this.classThis;


    if ($(".editModal0").length <=0){
      /*
      從每一列找到class的設定
      根據每個class進行, <TableHeaderColumn dataField='vNo' columnClassName={ columnClassNameFormat }>
      */
      /*
      let tdObj=$("td",$("tbody tr:first-child"));
      let classRow=[];
      $(tdObj).each(function(i,val){
        classRow[i]=$(val).attr('class');
      });
      */

      //找到原生的Modal,並複製
      let modalObj=$('.react-bs-table-add-btn').attr('data-target');
      let newModalObj=$(modalObj).clone();
      newModalObj.removeClass((modalObj.replace('.',''))).addClass('editModal0');
      $('.modal-title',newModalObj).text(parentThis.config.editModalText);

      /* 更新資料按鈕 */



      //console.log(parentThis);

      $('.btn-primary',newModalObj).attr('id','bt_update');
      $('.btn-primary',newModalObj).click(function(e){
          let editRows={};
          //代入表格中的數據
          for (var key in rows) {
            if (rows.hasOwnProperty(key)) {
              editRows[key]=$("input[data-field='"+key+"']",$('.editModal0')).val();

            //  $("input[data-field='"+key+"']",$('.editModal0')).val(rows[key]);
              //console.log(key + " -> " + rows[key]);
            }
          }
          // console.log(rows)
          // console.log(editRows);
          parentThis.onSetRow(editRows);
          parentThis.onAfterSetRow(editRows);

        }
      );

      if(parentThis.config.saveAfterEdit==false)
      {
        $('.btn-primary',newModalObj).addClass('hide');
      }





      /* 生成editModal0 */
      $(modalObj).parent().append(newModalObj);

      /* 解析欄位信息 */

      // this.BootStrapTableObj.props.children;
      let ColsProps=parentThis.BootStrapTableObj.props.children;

      for (let index in ColsProps)
      {
          let datafield= ColsProps[index].props.dataField;
          let isKey = ColsProps[index].props.isKey;

          parentThis.config.column[datafield]=index;
          if(isKey)
          {
            console.log(datafield);
            parentThis.config.keyName=datafield;
          }

      }



      $("th").each(function(i,val){
          let title= $(this).attr('title');
          let datafield= $(this).attr('data-field');
          let datatype= $(this).attr('data-type');

          let classNameRow= $(this).attr('class');  //<TableHeaderColumn className>

          if(title!=undefined)
          {

            let scope=($("label:contains('"+title+"')",$('.editModal0')).parent());
            $(scope).find("input").attr('data-field',datafield);
            //{ columnClassNameFormat }

            switch(classNameRow)
            {
              //找到editModal 中對映的欄位, 並根據class做處理
              case "td-plugins-disabled":

                $(scope).find("input").attr('disabled','disabled');
              break;

              case "td-plugins-hidden":

                $(scope).addClass('hide');
              break;

            }
          }
      });
    }


    //代入表格中的數據
    for (var key in rows) {
      if (rows.hasOwnProperty(key)) {
        $("input[data-field='"+key+"']",$('.editModal0')).val(rows[key]);
        //console.log(key + " -> " + rows[key]);
      }
    }

    //展示表格
    $('.editModal0').modal('show');
  }





}
