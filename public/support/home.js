$(function(){
    var elementArray = '';
    $(".element").click(function(e){
      var symbol = $(this).children(".symbol").text();
      makediv(symbol);
      elementArray = elementArray + symbol + ' ';
    });


    $("#submitbtn").click(function(e){
      $.ajax({
        type: "post",
        url: "/query",
        data: {
          elementArray : elementArray
        },
        success: function(result){
          $('.showtable tr').not(':first').remove();
            var data = result.data;
            var table = $('.showtable');
            for(var i = 0; i < data.length; i++){
                var tr = $('<tr></tr>');
                for(var p in data[i]){
                    console.log(p)
                    tr.append('<td>'+data[i][p] + '</td>');
                }
                table.append(tr);
            }
            $('.opcpanel').show();
        },
        error:function(info){
          alert("请求失败!");
        }
      });
    });

    $("#clear").click(function(){
        $('#selectedelement').children().remove();
        elementArray = '';
        $('.showtable tr').not(':first').remove();
        $('.opcpanel').hide();
    });


    function makediv(symbol){
      var pdiv =$('<div></div>');
      pdiv.attr('class','selement');
      pdiv.appendTo("#selectedelement");
      var cdiv = $('<div>'+symbol+'</div>');
      cdiv.attr('class','ssymbol');
      cdiv.appendTo(pdiv);
    }
})
