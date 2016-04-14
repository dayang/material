$(function(){
    $(".element").click(function(e){
      var symbol = $(this).children(".symbol").text();
      makediv(symbol);
      $("#elementId").val($("#elementId").val()+symbol+" ");
    });
    
    $("#clear").click(function(){
        $('#selectedelement').children().remove();
        $("#elementId").val("");
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
