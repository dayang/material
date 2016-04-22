$(function(){
    $.ajax({
      type: "get",
      url: "query/queryTable",
      success: function(result){
          showtable(result.data);
      },
      error:function(info){
          alert("请求失败");
      },
       beforeSend : function(){
                $("#dataTables_processing").show();
            },
        complete : function(){
            $("#dataTables_processing").hide();
        } 
   });
   function showtable(result){
       $("#meterialTable").dataTable({
             data:result,
             columns:[
                 {title:"Materials Id",data:"Materials_Id"},
                 {title:"Formula",data:"Formula"},
                 {title:"Spacegroup",data:"Spacegroup"},
                 {title:"Formation Energy",data:"Formation_Energy"},
                 {title:"E Above Hull",data:"E_Above_Hull"},
                 {title:"Band Gap",data:"Band_Gap"},
                 {title:"Nsites",data:"Nsites"},
                 {title:"Density",data:"Density"},
                 {title:"Volume",data:"Volume"},
                 {title:"Zip",data:"zip_dir"},
                 {title:"kpoint",data:"kpoint_dir"}
             ],
             
                "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "对不起，查询不到相关数据！",
                    "sEmptyTable": "表中无数据存在！",
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "末页"
                        }
                },
                "bDeferRender" : true, 
                "bProcessing": true, 
                "bInfo": true,
                //下拉列表中的选项(每页显示的行数)
                "aLengthMenu": [
                    [10, 20,50, 100, 1000, -1],
                    [10, 20,50, 100, 1000, "All"] // change per page values here
                ],
                
                initComplete: function () {
                    this.api().columns([0,1,2,3,4,5,6,7,8]).every( function () {
                        var column = this;
                        var select = $('<select ><option value="">ALL</option></select>')
                            .appendTo( $(column.header()))
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
        
                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            } );
        
                        column.data().unique().sort().each( function ( d, j ) {
                            select.append( '<option value="'+d+'">'+d+'</option>' );
                        } );
                    } );
                }
          });
   }
});