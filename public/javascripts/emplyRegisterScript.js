var validateSpan='<span class="span-validation">*</span>';

$(function(){

  $('.newEmployee').on('submit',function(e){
    e.preventDefault();
    var userdata=$(this).serializeArray();


    if(userdata[0].value==''){
      input_validate('.name-label',"name");
        return false;
    }else{
      remove_validate('.name-label');
    }

    if(userdata[1].value==''){
      input_validate('.email-label',"email");
      return false;
    }else{
      remove_validate('.email-label');
    }

    if(userdata[2].value==''){
      input_validate('.password-label',"password");
        return false;
    }else{
      remove_validate('.password-label');
    }

    if(userdata[3].value==''){
      input_validate('.mobileno-label',"mobile_no");
        return false;
    }else{
      remove_validate('.mobileno-label');
    }

    if(userdata[4].value==''){
      input_validate('.dob-label',"dob");
        return false;
    }else{
      remove_validate('.dob-label');
    }

    if(userdata[5].value==''){
      input_validate('.department-label',"department");
        return false;
    }else{
      remove_validate('.department-label');
    }

    if(userdata[6].value==''){
      input_validate('.age-label',"age");
        return false;
    }else{
      remove_validate('.age-label');
    }

    if(userdata[7].value==''){
      input_validate('.gender-label',"gender");
        return false;
    }else{
      remove_validate('.gender-label');
    }

    $.ajax({
      url:'/newEmployee',
      type:'POST',
      data:userdata,
      success:function(data){

        location.reload();
      }
    });
  });
});

function input_validate(selector,inputname){
  $(selector).next('.span-validation').remove();
  $(selector).after(validateSpan);
  $('input[name="'+inputname+'"]').focus();

}

function remove_validate(selector){
    $(selector).next('.span-validation').remove();
}
