function defaultval(){
	var name2 = document.getElementsByClassName("name2")[0].innerHTML;
	var email1 = document.getElementsByClassName("email1")[0].innerHTML;
	var comp1 = document.getElementsByClassName("comp1")[0].innerHTML;
	var phone2 = document.getElementsByClassName("phone2")[0].innerHTML;
	var address2 = document.getElementsByClassName("address2")[0].innerHTML;

	document.getElementsByClassName("username")[0].value = name2;
	document.getElementsByClassName("emailid")[0].value = email1;
	document.getElementsByClassName("company")[0].value = comp1;
	document.getElementsByClassName("telephone")[0].value = phone2;
	document.getElementsByClassName("address")[0].value = address2;
}

function checkstrength(){
	var s = document.getElementById("pswd").value;
	console.log(s);
	var pattern = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]).+$"
        );

	if(s.length!=0){
		if(!pattern.test(s) || s.length<8){
			document.getElementsByClassName("pswdStrength")[0].innerHTML = "*Weak Password";
		}
		else{
			document.getElementsByClassName("pswdStrength")[0].innerHTML = "";
		}
	}
	else{
		document.getElementsByClassName("pswdStrength")[0].innerHTML = "";
	}
}

function pswdEqual(){
	var s1 = document.getElementById("confirmpswd").value;
	var s2 = document.getElementById("pswd").value;

	if(s2.length>0 && s1!=s2){
		document.getElementsByClassName("pswdEqual")[0].innerHTML = "Passwords do not match"
	}
	else{
		document.getElementsByClassName("pswdEqual")[0].innerHTML = "";
	}
}