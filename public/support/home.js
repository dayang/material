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
        url: "/queryddd",
        data: {
          elementArray : elementArray
        },
        success: function(result){
            
        },
        error:function(info){
          location.href="/meterialTable";
        }
      });
    });

    $("#clear").click(function(){
        $('#selectedelement').children().remove();
        elementArray = '';
    });
    function makediv(symbol){
      var pdiv =$('<div></div>');
      pdiv.attr('class','selement');
      pdiv.appendTo("#selectedelement");
      var cdiv = $('<div>'+symbol+'</div>');
      cdiv.attr('class','ssymbol');
      cdiv.appendTo(pdiv);
    }
});
