$(function(){

  var file_upload=function(e){
    e.preventDefault();
    $.ajax({
      url:'/employee/profile-pic',
      type:'POST',
      data: new FormData(this),
      contentType:false,
      cache:false,
      processData:false,
      success:function(src){
        console.log(src)
        $('.myprofile').attr('src','/uploads/'+src);
      }

    });
  };
  $('.dpform').on('submit',file_upload)
});
