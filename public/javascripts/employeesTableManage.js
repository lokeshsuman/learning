$(function(){
  setInterval(function(){
      LiveEmployees();
  },1000);

  showEmployees();

$(document).on("click",".btn-delete",function(){
  var uid=$(this).data("id");
  if(confirm("Are you Sure Delete this Employee")){
    if(uid!=''){
      $.ajax({
        url:"/profile",
        type:"DELETE",
        data:{id:uid},
        success:function(data){
          if(data){
            showEmployees();
          }else{
            alert("Error ! oops Some error");
          }
        }
      });
    }
  }
});

$(document).on('click',".user-status",function(){
  var uid=$(this).data('id');
  var status=$(this).data('status');
  var curr=$(this);
  if(uid!=''){
    $.ajax({
      url:"/profile",
      type:"put",
      data:{id:uid,status:status},
      beforeSend:function(){
        curr.html("<img src='/images/preloader.gif'/>")
      },
      success:function(data){
        if(data){
          showEmployees();
        }
      }
    });
  }
});

$(document).on('click','.emp-profile',function(){
  var uid=$(this).data('id');
  if(uid){
    $.ajax({
      url:'/',
      type:'post',
      data:{id:uid},
      success:function(data){
        if(uid==data.id){
          window.open(data.url, '_blank');
        }else{
          alert("This employee is block first you active this employee");
        }

      }
    });
  }
});

$(document).on('click','.user-type',function(){
  var uid=$(this).data('id');
  var Etype=$(this).data('etype');

  var currtype=$(this);
  if(uid!=''){
    $.ajax({
      url:"/empTypeChange",
      type:"put",
      data:{id:uid,Etype:Etype},
      beforeSend:function(){
        currtype.html("<img src='/images/preloader.gif'/>")
      },
      success:function(data){
        if(data){
          showEmployees();
        }
      }
    });
  }
});

$('input[name="search-input"]').keyup(function(){
  var search_by=$('.search-by').val();
  var search_val=$(this).val();

  if(search_by!='' && search_val!=''){
    $.ajax({
      url:'/searchEmploy',
      type:'post',
      data:{search_by:search_by,search_val:search_val},
      success:function(person){
        var html_user='';
        for(var i=0; i<person[1].length; i++){
          html_user +='<tr class="user-row'+person[1][i]._id+'">';
          html_user +='<td>'+(i+1)+'</td>';
          html_user +='<td>'+person[1][i].name+'</td>';
          html_user +='<td>'+person[1][i].email+'</td>';
          html_user +='<td>'+person[1][i].mobile_no+'</td>';
          html_user +='<td>'+person[1][i].department+'</td>';
          html_user +='<td><button class="user-type btn btn-sm '+((person[1][i].usertype=='employee') ? "btn-success" : "btn-warning")+'" data-id="'+person[1][i]._id+'" data-etype="'+person[1][i].usertype+'" name="btn-status">'+((person[1][i].usertype=='employee') ? "Admin" : "Employ"); +'</button></td>';
          html_user +='<td><button class="user-status btn btn-sm '+((person[1][i].status==1) ? "btn-warning" : "btn-success")+'" data-id="'+person[1][i]._id+'" data-status="'+person[1][i].status+'" name="btn-status">'+((person[1][i].status==1) ? "Block" : "Active"); +'</button></td>';
          html_user +='<td colspan="2"><a class="emp-profile btn btn-info btn-sm" data-id="'+person[1][i]._id+'" style="margin-right:5px;">Login</a><a href="/employee-edit/'+person[1][i]._id+'" class="btn-edit btn btn-success btn-sm" data-id="'+person[1][i]._id+'" >Edit</a> <button class="btn-delete btn btn-danger btn-sm" data-id="'+person[1][i]._id+'">Delete</button></td>';
          html_user +='</tr>';
        }
        $('.user-tbody').html(html_user);

        if(person[0]){
          $('.user-row'+person[0]).addClass("table-success");
        }
      }
    });
  }else{
    showEmployees();
  }
});

});

function showEmployees(){
  $.ajax({
    url:'/alluser',
    type:'get',
  success:function(person){
    /*count employee*/
      $('.allEmp-count').text(person[1].length);

					var html_user='';
					for(var i=0; i<person[1].length; i++){
						html_user +='<tr class="user-row'+person[1][i]._id+'">';
						html_user +='<td>'+(i+1)+'</td>';
						html_user +='<td>'+person[1][i].name+'</td>';
						html_user +='<td>'+person[1][i].email+'</td>';
						html_user +='<td>'+person[1][i].mobile_no+'</td>';
						html_user +='<td>'+person[1][i].department+'</td>';
            html_user +='<td><button class="btn btn-sm on-off emp-'+person[1][i]._id+'">OFF</button></td>';
            html_user +='<td><button class="user-type btn btn-sm '+((person[1][i].usertype=='employee') ? "btn-success" : "btn-warning")+'" data-id="'+person[1][i]._id+'" data-etype="'+person[1][i].usertype+'" name="btn-status">'+((person[1][i].usertype=='employee') ? "Admin" : "Employ"); +'</button></td>';
            html_user +='<td><button class="user-status btn btn-sm '+((person[1][i].status==1) ? "btn-warning" : "btn-success")+'" data-id="'+person[1][i]._id+'" data-status="'+person[1][i].status+'" name="btn-status">'+((person[1][i].status==1) ? "Block" : "Active"); +'</button></td>';
            html_user +='<td colspan="2"><a class="emp-profile btn btn-info btn-sm" data-id="'+person[1][i]._id+'" style="margin-right:5px;">Login</a><a href="/employee-edit/'+person[1][i]._id+'" class="btn-edit btn btn-success btn-sm" data-id="'+person[1][i]._id+'" >Edit</a> <button class="btn-delete btn btn-danger btn-sm" data-id="'+person[1][i]._id+'">Delete</button></td>';
						html_user +='</tr>';
					}
          $('.user-tbody').html(html_user);

          if(person[0]){
            $('.user-row'+person[0]).addClass("table-success");
          }

    }
  })
}

function LiveEmployees(){
  $.ajax({
    url:'/liveemployee',
    type:'get',
    success:function(data){
      $('.emp-live').text(data[0]);
      $('.on-off').removeClass('btn-success').text('OFF');

      for(var i=0; i < data[1].length; i++){
        $('.emp-'+data[1][i].emp_id).addClass('btn-success').text('Live');
      }
    }
  });
}
