var urlAPI="https://bsite.net/apiquanly/";
// var urlAPI="https://localhost:44355/";
$(".btn-login").click(function(){
	var username=$('.username').val();
	var password=$('.password').val();
	$.ajax({
		method: "POST",
		url: urlAPI+"api/tai_khoan/dang_nhap",
		contentType: "application/json",
		data: JSON.stringify({ 
			company: "KIT",
			username: username,
			password: password
		})
	  })
		.done(function( response ) {
			if(response.code==200){
				$('.login').addClass('d-none');
				$('.voucher').removeClass('d-none');
				var checkbox=$("#CheckDefault").get(0).checked;
				if(checkbox!=false){
					localStorage.setItem("checkbox","1");
				}else{
					localStorage.setItem("checkbox","0");
				}
			}else{
				$('.alert').html(response.message);
				$('.alert').removeClass('d-none');
			}
		});
})
$('.rigister').click(function(){
	$('.login').addClass('d-none');
	$('.form-register').removeClass('d-none');
})
$('.btn-register-callback').click(function(){
	$('.login').removeClass('d-none');
	$('.form-register').addClass('d-none');
})
$('.logout').click(function(){
	localStorage.removeItem("checkbox");
	$('.login').removeClass('d-none');
	$('.voucher').addClass('d-none');
})
$('.btn-register').click(function(){
	var email=$('.emailreg').val();
	var username=$('.usernamereg').val();
	var password=$('.passwordreg').val();
	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if(email=="" || email==undefined){
		alert("Email không được để trống");
		return false;
	}
	if (!email.match(validRegex)) {
		alert("Email không đúng định dạng");
		return false;
	}
	if(username=="" || username==undefined){
		alert("Tên đăng nhập không được để trống");
		return false;
	}	
	if(password=="" || password==undefined){
		alert("Mật khẩu không được để trống");
		return false;
	}		
	if(password.length<6){
		alert("Mật khẩu phải dài hơn 6 ký tự");
		return false;
	}
	var data= JSON.stringify({ 
		company: "KIT",
		Email: email,
		username: username,
		password: password
	})
	console.log(data);
	$.ajax({
		method: "POST",
		url: urlAPI+"api/tai_khoan/dang_ky",
		contentType: "application/json",
		data:data
	  })
		.done(function( response ) {
			if(response.code==200){
				$('.form-register').addClass('d-none');
				$('.voucher').removeClass('d-none');
				var checkbox=$("#CheckDefault").get(0).checked;
				if(checkbox!=false){
					localStorage.setItem("checkbox","1");
				}else{
					localStorage.setItem("checkbox","0");
				}
			}else{
				$('.alert').html(response.message);
				$('.alert').removeClass('d-none');
			}
		});
})
function getVoucher(){	
	$.ajax({
		method: "GET",
		url: urlAPI+"api/shopee/get_voucher",
		contentType: "application/json"
	  }).done(function( response ) {
			console.log(response);
			$('.total').html(response.length)
			var html="";
			for (var i = 0; i < response.length; i++) {
				var startdate=new Date(response[i].start_time*1000);
				var dateStart =startdate.toLocaleString('vi-VN');
				dateStart=dateStart.split(',')[1]+" "+dateStart.split(',')[0];
				var startdate=new Date(response[i].end_time*1000);
				var dateEnd =startdate.toLocaleString('vi-VN');
				dateEnd=dateEnd.split(',')[1]+" "+dateEnd.split(',')[0];
				var usage_terms=response[i].usage_terms;
				html+=
					'<div class="card my-1 p-1" data-toggle="tooltip" data-placement="top" title="'+usage_terms+'">\
						<div class="d-flex">Loại:<span class="text-danger" style="margin-left:5px"> '+response[i].icon_text+'</span></div>\
						<div class="d-flex">Mã: <span class="font-weight-bold" style="margin-left:5px; cursor: pointer">'+response[i].voucher_code+'</span></div>\
						Ngày bắt đầu: '+dateStart+'</br>\
						Ngày kết thúc: '+dateEnd+'</br>\
					</div>'
			}
			$(".response_voucher").html(html)
		});
}
function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
}
function init(){
	$('[data-toggle="tooltip"]').tooltip();
	var check=localStorage.getItem("checkbox");
	if(check!="0"&& check!=null){
		$('.login').addClass('d-none');
		$('.voucher').removeClass('d-none');
	}
	var date=new Date();
	date=date.toLocaleString('vi-VN');
	date=date.split(',')[1]
	$('.date').html(date);
	getVoucher();
}
init();