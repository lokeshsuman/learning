$(function(){
  $('.changepassword').on('submit',function(e){
    e.preventDefault();
    var formData=$(this).serializeArray();
    if(formData[0].value!==formData[1].value){
      alert('Both value is not match');
      return false;
    }

    $.ajax({
      url:'/employee/change-password',
      type:'put',
      data:formData,
      success:function(res){
        if(res){
          alert("Password Change password");
          location.href='/employee/employee-profile';
        }else{
          alert("Please Try after some time");
        }
      }
    });
  });
});
