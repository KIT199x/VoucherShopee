$(".btn-login").click(function(){
	var username=$('.username').val();
	var password=$('.password').val();
	$.ajax({
		method: "POST",
		url: "https://bsite.net/apiquanly/api/tai_khoan/dang_nhap",
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
function init(){	
	var check=localStorage.getItem("checkbox");
	if(check!="0"&& check!=null){
		$('.login').addClass('d-none');
		$('.voucher').removeClass('d-none');
	}
}
init();