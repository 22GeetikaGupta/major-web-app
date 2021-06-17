function viewJobDetails(company, about, vacancy){
	console.log("hey");
	document.getElementById('id01').style.display = "block";
	document.getElementById('id01').getElementsByClassName('company').value = company;
	document.getElementById('id01').getElementsByClassName('role').value = vacancy['Role'];
	document.getElementById('id01').getElementsByClassName('id').value = vacancy['Job Id'];

	document.getElementsByClassName('nameD')[0].innerHTML = company;
	document.getElementsByClassName('aboutD')[0].innerHTML = about;
	document.getElementsByClassName('roleD')[0].innerHTML = vacancy['Role'];
	document.getElementsByClassName('placeD')[0].innerHTML = vacancy['Place'];
	document.getElementsByClassName('skillD')[0].innerHTML = vacancy['Requirements'];
}