$(function(){  
// $.ajax({
//     type: "post",
//     url: "query/initSeletor",
//     success: function(result){
//         $('#Spacegroup_Number').magicSuggest({
//             data : result.Spacegroup_Number,
//             displayField: 'Spacegroup_Number',
//             valueField: 'Spacegroup_Number',
//             sortDir: 'asc',
//             strictSuggest:true,
//             toggleOnClick: true,
//             expand: true,
//             maxSelection: 1,
//         });
//         $('#Band_Gap').magicSuggest({
//             data : result.Band_Gap,
//             displayField: 'Band_Gap',
//             maxSelection: 1,
//         });
//         $('#E_Above_Hull').magicSuggest({
//             data : result.E_Above_Hull,
//             displayField: 'E_Above_Hull',
//             maxSelection: 1,
//         });
//     },
//     error: function(msg){
//         console.log(msg);
//     }
// });
   
    $.ajax({
      type: "post",
      url: "query/initSeletor",
      success: function(result){
          initSeletor('Spacegroup_Number',result.Spacegroup_Number);
          initSeletor('Band_Gap', result.Band_Gap);
          initSeletor('E_Above_Hull',result.E_Above_Hull);
      },
      error: function(msg){
          console.log(msg);
      }
   });
    
    function initSeletor(seletorName, data){
        for(var i = 0 ; i < data.length ; i++){
            var option = document.createElement('option');
            switch(seletorName){
                case 'Spacegroup_Number':
                    option.innerText = data[i].Spacegroup_Number;
                    break;
                case 'Band_Gap':
                    option.innerText = data[i].Band_Gap;
                    break;
                case 'E_Above_Hull':
                    option.innerText = data[i].E_Above_Hull;
                    break;
            }
            $('select[name='+seletorName+']').append(option);
        }
    
   }
    
    clearinfo();
    $(".element").click(function(e){
      var symbol = $(this).children(".symbol").text();
      makediv(symbol);
      $("#elementId").val($("#elementId").val()+symbol+" ");
    });
    
    $("#clear").click(function(){
        clearinfo();
    });
    
    function clearinfo(){
        $('#selectedelement').children().remove();
        $("#elementId").val("");
    }
    
    function makediv(symbol){
      var pdiv =$('<div></div>');
      pdiv.attr('class','selement');
      pdiv.appendTo("#selectedelement");
      var cdiv = $('<div>'+symbol+'</div>');
      cdiv.attr('class','ssymbol');
      cdiv.appendTo(pdiv);
    }
});
