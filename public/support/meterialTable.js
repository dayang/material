$(function(){
   window.onload = $.ajax({
      type: "get",
      url: "query/queryTable",
      success: function(result){
          showtable(result.data);
      },
      error:function(info){
          alert("请求失败");
      }
   });
   
   
   function showtable(result){
       $("#meterialTable").dataTable({
             data:result,
             columns:[
                 {title:"Materials Id",data:"Materials_Id"},
                 {title:"Formula",data:"Formula"},
                 {title:"",data:"Spacegroup"},
                 {title:"Formation Energy",data:"Formation_Energy"},
                 {title:"E Above Hull",data:"E_Above_Hull"},
                 {title:"Band Gap",data:"Band_Gap"},
                 {title:"Nsites",data:"Nsites"},
                 {title:"Density",data:"Density"},
                 {title:"Volume",data:"Volume"},
                 {title:"Zip",data:"zip_dir"},
                 {title:"kpoint",data:"kpoint_dir"}
             ],
                "bFilter": true, //开关，是否启用客户端过滤器
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
                "aLengthMenu": [
                    [5, 10, 20, 100, 1000, -1],
                    [5, 10, 20, 100, 1000, "All"] // change per page values here
                ],
                initComplete: function () {
                    this.api().columns(2).every( function () {
                        var column = this;
                        var select = $('<select ><option value="">Spacegroup</option></select>')
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
                            select.append( '<option value="'+d+'">'+d+'</option>' )
                        } );
                    } );
                }
          });
   }
});