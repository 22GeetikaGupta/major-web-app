function viewJobDetails(user, company, about, role, req, id, place){
	console.log("hey");
	
	document.getElementById('id01').style.display = "block";
	document.getElementsByClassName('company')[0].value = user;
	document.getElementsByClassName('companyname')[0].value = company;
	document.getElementById('id01').getElementsByClassName('role')[0].value = role;
	document.getElementById('id01').getElementsByClassName('id')[0].value = id;

	document.getElementsByClassName('nameD')[0].innerHTML = company;
	document.getElementsByClassName('aboutD')[0].innerHTML = about;
	document.getElementsByClassName('roleD')[0].innerHTML = role;
	document.getElementsByClassName('placeD')[0].innerHTML = place;
	document.getElementsByClassName('skillD')[0].innerHTML = req;
}