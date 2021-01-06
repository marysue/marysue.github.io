// $(document).ready(function() {
// 	$(".hamburger-icon").on('click', function() {

// 		/*alert("HELLO!!!");*/
// 		$(".menu").toggleClass("responsive");
// 	});
// });

window.addEventListener('DOMContentLoaded', () => {
	let rootEvent = document.getElementById("rootElement");
	let burgerNav = document.getElementById("burger-time");

	burgerNav.addEventListener("click", function(e) {
		console.log("adding open to class list")
		document.querySelector('nav').classList.add('open');
		//burgerNav.style.visibility ='hidden';

		$(".menu").toggleClass("responsive");

		e.preventDefault();
		e.stopPropagation();


	});

	closeNav = function(){
		if (burgerNav.style.visibility === "hidden"){
		console.log("removing open from class list")
		   document.querySelector('nav').classList.remove('open');
		   //burgerNav.style.visibility ='visible';
		}
	};

	rootEvent.addEventListener("click", closeNav);
	rootEvent.addEventListener("touchend", closeNav);
});
