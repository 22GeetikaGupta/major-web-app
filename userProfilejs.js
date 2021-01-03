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