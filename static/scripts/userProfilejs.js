console.log("hey");

function about(){
	const pages = document.querySelectorAll('.pages');
	const menu = document.querySelectorAll('.menu');
	pages.forEach((item, index)=>{
		item.style.display = 'none';
	})
	menu.forEach((item, index)=>{
		item.style.borderBottom = '1px solid grey';
		item.style.backgroundColor = '#E9EBEC';
	})
	document.getElementsByClassName('about')[0].style.display = 'block';
	document.getElementsByClassName('aboutmenu')[0].style.borderBottom = 'none';
	document.getElementsByClassName('aboutmenu')[0].style.backgroundColor = 'white';
}

function academics(){
	const pages = document.querySelectorAll('.pages');
	const menu = document.querySelectorAll('.menu');
	pages.forEach((item, index)=>{
		item.style.display = 'none';
	})
	menu.forEach((item, index)=>{
		item.style.borderBottom = '1px solid grey';
		item.style.backgroundColor = '#E9EBEC';
	})
	document.getElementsByClassName('academics')[0].style.display = 'block';
	document.getElementsByClassName('academicmenu')[0].style.borderBottom = 'none';
	document.getElementsByClassName('academicmenu')[0].style.backgroundColor = 'white';
}

function skills(){
	const pages = document.querySelectorAll('.pages');
	const menu = document.querySelectorAll('.menu');
	pages.forEach((item, index)=>{
		item.style.display = 'none';
	})
	menu.forEach((item, index)=>{
		item.style.borderBottom = '1px solid grey';
		item.style.backgroundColor = '#E9EBEC';
	})
	document.getElementsByClassName('skills')[0].style.display = 'block';
	document.getElementsByClassName('skillmenu')[0].style.borderBottom = 'none';
	document.getElementsByClassName('skillmenu')[0].style.backgroundColor = 'white';
}

function achievements(){
	const pages = document.querySelectorAll('.pages');
	const menu = document.querySelectorAll('.menu');
	pages.forEach((item, index)=>{
		item.style.display = 'none';
	})
	menu.forEach((item, index)=>{
		item.style.borderBottom = '1px solid grey';
		item.style.backgroundColor = '#E9EBEC';
	})
	document.getElementsByClassName('achievements')[0].style.display = 'block';
	document.getElementsByClassName('achievementmenu')[0].style.borderBottom = 'none';
	document.getElementsByClassName('achievementmenu')[0].style.backgroundColor = 'white';
}

function addEducation(){
	document.getElementById('id01').style.display = "block";
}

var noOfEducations = 0;
function saveEducation(){
	noOfEducations++;
	var institute = document.getElementById('Institute').value.toUpperCase();;
	var program = document.getElementById('program').value;
	var start = document.getElementById('Start').value;
	var end = document.getElementById('End').value;
	var scale = document.getElementById('Scale').value;
	var grade = document.getElementById('Grade').value;
	var major1 = document.getElementById('major1').value;
	var major2 = document.getElementById('major2').value;

	document.getElementById('id01').style.display = "none";

	
	var temp = `<div class="educate" id=edu${noOfEducations}> <button onclick=deleteEducation(edu${noOfEducations})>Delete</button> <p><b>${institute}</b><i>(${start} to ${end})</i></p> <p></p> ${program}<p>Grade : ${grade} ${scale}</p> <p>Major Subject I - ${major1}</p> <p>Major Subject II - ${major2}</p>

						</div>`
	document.getElementsByClassName('edu')[0].innerHTML += temp;
}

var deleteEducation = (id) =>{
	console.log(id);
	id.style.display = "none";
}

function addExperience(){
	document.getElementById('id02').style.display = "block";
}

var noOfExperience = 0;
function saveExperience(){
	noOfExperience++;
	var company = document.getElementById('company').value.toUpperCase();;
	var start = document.getElementById('Start1').value;
	var end = document.getElementById('End1').value;
	var desc = document.getElementById('desc').value;	

	document.getElementById('id02').style.display = "none";

	
	var temp = `<div class="exp" id=exp${noOfExperience}><button onclick=deleteexp(exp${noOfExperience})>Delete</button><p><b>${company}</b></p><p><i>${start} to ${end}</i></p><p>${desc}</p></div>`;
	document.getElementsByClassName('experiences')[0].innerHTML += temp;
}

var deleteexp = (id) =>{
	console.log(id);
	id.style.display = "none";
}

var close = [true, true, true, true, true, true];

var dropmenu = (id) => {
	if(close[id-1]){
		for(var i=0; i<close.length; i++){
			document.getElementsByClassName('dropdown')[i].style.animationName = 'animateclose';
			document.getElementsByClassName('dropdown')[i].style.animationDuration = '0.4s';
			document.getElementsByClassName('dropdown')[i].style.display = 'none';
			close[i-1] = true;
		}
		
		document.getElementsByClassName('dropdown')[id-1].style.animationName = 'animateopen';
		document.getElementsByClassName('dropdown')[id-1].style.animationDuration = '0.4s';
		document.getElementsByClassName('dropdown')[id-1].style.display = 'block';
		close[id-1] = false;
	}
	else{
		document.getElementsByClassName('dropdown')[id-1].style.animationName = 'animateclose';
		document.getElementsByClassName('dropdown')[id-1].style.animationDuration = '0.4s';
		setTimeout(() => {
			document.getElementsByClassName('dropdown')[id-1].style.display = 'none';
		}, 300)
		

		close[id-1] = true;
	}
	
}

function addprop(id) {
	var obj = document.getElementsByClassName('dropdown')[id-1].childNodes;

	console.log(obj.length/2);
	document.getElementsByClassName('input')[id-1].innerHTML = "";
	for(var i=0; i<(obj.length/2)-1; i++){
		console.log(i);
		var obj2 = obj[2*i + 1].childNodes;
		if(obj2[0].checked){
			document.getElementsByClassName('input')[id-1].innerHTML += `<span style="background-color: #EAEFF1; padding-left: 5px; padding-right: 5px; margin-left: 5px; margin-bottom: 5px;"> ${obj2[1].data} </span>`;
		}
	}
	
}

function addProject(){
	document.getElementById('id03').style.display = "block";
}

var noOfProjects = 0;
function saveProject(){
	noOfProjects++;
	var title = document.getElementById('title').value.toUpperCase();
	var guide = document.getElementById('guide').value;
	var start = document.getElementById('Start2').value;
	var end = document.getElementById('End2').value;
	var desc = document.getElementById('desc1').value;	

	document.getElementById('id03').style.display = "none";

	var temp = `<div class="project" id=pro${noOfProjects}><button onclick=deletepro(pro${noOfProjects})>Delete</button><p><b>${title}</b><i>(${start} to ${end})</i></p><p>${guide}</p><p>${desc}</p></div>`
	document.getElementsByClassName('projects')[0].innerHTML += temp;
}

function deletepro(id){
	id.style.display = 'none';
}