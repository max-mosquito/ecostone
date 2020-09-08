$(document).ready(function(){

// slider1
	$('.slider1').slick({
		arrows:false,
		dots: true,
		slidesToShow:1,
		autoplay: true,
		variableWidth:false,
		fade:true,
	});

	//Burger
	$('.burger').click(function(event){
		$('.burger, .nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.nav').click(function(event){
		$('.burger, .nav').removeClass('active');
		$('body').removeClass('lock');
	});

	// slider2
	$('.slider2').slick({
		arrows:true,
		dots: false,
		slidesToShow:3,
		slidesToScroll:1,
		autoplay: false,
		variableWidth:false,
		fade:false,
		responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
	});
});
// Animation
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++){
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				animItem.classList.remove('_active')
			}
		}
	}
	function offset(el){
		const rect = el.getBoundingClientRect(),
			scrollleft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollleft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);

	// slider3
	$('.slider3').slick({
		arrows:false,
		dots: true,
		slidesToShow:1,
		autoplay: false,
		variableWidth:false,
		fade:true,
		asNavFor: ".slider4",
	});

	// slider4
	$('.slider4').slick({
		arrows:true,
		dots: false,
		slidesToShow:1,
		autoplay: false,
		variableWidth:false,
		fade:true,
		asNavFor: ".slider3",
	});

	//popup
	$('.contacts_popup').magnificPopup();

	// $("#contacts_form").submit(function() {
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php",
	// 		data: $(this).serialize()
	// 	}).done(function() {
	// 		$(this).find("input").val("");
	// 		alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
	// 		$("#contacts_form").trigger("reset");
	// 	});
	// 	return false;
	// });

	jQuery("form").submit(function() { // Событие отправки с формы
		var form_data = jQuery(this).serialize(); // Собираем данные из полей
		jQuery.ajax({
			type: "POST", // Метод отправки
			url: "telegram.php", // Путь к PHP обработчику sendform.php
			data: form_data,
			success: swal({
				title: "Спасибо за заявку!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })
        });
        $(this).find('input, textarea').prop('disabled', true);
        event.preventDefault();
    });
    
}