var csrftoken = $("[name=csrfmiddlewaretoken]").val();
var page_in_url = new URL(window.location)
let selected_options = ''//{{ selected_options|safe }}
let selected_ids = ''
var range = false;

if (page_in_url.searchParams.has('page')) {
	var page = parseInt(page_in_url.searchParams.get('page'))
	if (isNaN(page)) page = 1
} else {
	var page = 1;
}
var ajax_blocked = false;
var pagin_blocked = false;

function getRange(){
	let searchParams =  new URL(window.location).searchParams
	range = searchParams.get('range')
	return range
}

function btnTextChanger(btn) {
	btn.find('span').html("Добавить в корзину")
}

function toggleProductPreloader() {
	if (typeof current_id !== 'undefined') {
		var data = {product: current_id}
		$.ajax({
			url: '/api/catalog/GetFirstSelected/',
			type: 'POST',
			headers:{
				"X-CSRFToken": csrftoken
			},
			data,
			success: data => {
				document.getElementsByClassName('product-order')[0].classList.toggle('loading');
				document.getElementsByClassName('product-params__wrapper')[0].innerHTML = data.attrs;
				update_selected_options();
				window.initDropDown();
				initListener();
			},
			error: function(error) { console.log(error);}
		});
	}
}

toggleProductPreloader()

$('body').on('click', '.cart-btn', function(e) {
	e.preventDefault();
	var amount = ($('#amount_mobile').val() >= $('#amount').val()) ? $('#amount_mobile').val() : $('#amount').val()
	let btn = $(this)
	var id = $(this).attr('data-id')//e.data('id')
	let sale = $('[name="sale"]');
	if (sale){
		sale = sale.val()
	} else {
		sale = '';
	}
	data = 'product_id=' + id + '&' + 'product_count=' + amount + '&sale=' + sale;

	$.ajax({
		url: '/api/shop/cart/add/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			console.log(btn, btn.find('span'))
			btn.find('span')[0].innerHTML = "Добавлено в корзину"
			setTimeout(btnTextChanger, 2500, btn)
			setCountCart(data.count);
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.minus.cart, .plus.cart', function (e) {
	let elem = ($(this).hasClass('minus')) ? this.nextElementSibling : this.previousElementSibling;
	$(elem).trigger('change');
});

$('body').on('change', '.amount__field.cart', function (e) {
	let count = $(this).val();
	let id = $(this).attr('data-id');
	console.log(count, id);
	data = Object();
	data.product_count = count;
	data.product_id = id;
	$.ajax({
		url: '/api/shop/cart/update/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			$('#total-cost').html(data.total + ' руб.')
			$('.total__cost.' + id).html(data.price + ' руб.')
			setCountCart(data.count)
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.total-remove', function(e) {
	e.preventDefault();
	var id = $(this).attr('data-id')//e.data('id')
	data = 'product_id=' + id

	$.ajax({
		url: '/api/shop/cart/delete/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			$('.product-card-in-cart[data-id='+ id + ']').detach()
			setCountCart(data.count)
			if (data.empty){
				document.querySelector('section.page-cart.page-bg > div.container').innerHTML = data.empty
			}
		},
		error: function(error) { console.log(error);}
	});
});

function setLocation(curLoc) {
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}

function initCollapse() {
	const collapses = document.querySelectorAll('.custom-collapse');

	collapses.forEach(collapse => {
		const childs = collapse.children;
		const header = childs[0];
		const body = childs[1];
	
		header.addEventListener('click', event => {
			event.preventDefault();
	
			closeActive(body);
			$(body).stop().slideToggle(300);
			collapse.classList.toggle('active');
		});
	});
	
	function closeActive(thisBody) {
		const activeCollapses = document.querySelectorAll('.custom-collapse.active');
	
		activeCollapses.forEach(collapse => {
			const childs = collapse.children;
			const body = childs[1];
	
			$(body).not(thisBody).stop().slideUp(300);
			$(body).not(thisBody).parent().removeClass('active');
		});
	}
}

$('body').on('click', '.pagination-list > li > a', function(e) {
	e.preventDefault();
	let page_l = $(this).data('page')
	range = getRange()
	data = 'page=' + page_l + '&ajax=Y'
	console.log(range)
	if (range){
		data += '&range=' + range
	}
	$.ajax({
		url: window.location.pathname,
		type: 'GET',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			page = page_l
			let loc = '?page=' + page_l
			if (range){
				loc += '&range=' + range
			}
			setLocation(loc)

			$('.products-wrapper, .videos-preview, .informations-wrapper, .did-orders').html(data.objects);
			$('.navigation, .page-pagination, .lc-pagination').html(data.pagination);
			window.initModalEvents();
			window.dispatchEvent(new Event('resize'));
			
			initCollapse();
			checkHeigth();
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.pagination-arrow.prev', function(e) {
	e.preventDefault();
	if (pagin_blocked) return;
	pagin_blocked = true;
	range = getRange();
	data = 'page=' + (page - 1) + '&ajax=Y'
	if (range){
		data += '&range=' + range
	}
	$.ajax({
		url: window.location.pathname,
		type: 'GET',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			pagin_blocked = false;
			page = page - 1
			let loc = '?page=' + page
			if (range){
				loc += '&range=' + range
			}
			setLocation(loc)

			$('.products-wrapper, .videos-preview, .informations-wrapper, .did-orders').html(data.objects);
			$('.navigation, .page-pagination, .lc-pagination').html(data.pagination);
			window.initModalEvents();
			window.dispatchEvent(new Event('resize'));
			
			initCollapse();
			checkHeigth();
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.pagination-arrow.next', function(e) {
	e.preventDefault();
	if (pagin_blocked) return;
	pagin_blocked = true;
	range = getRange();
	data = 'page=' + (page + 1) + '&ajax=Y'
	if (range){
		data += '&range=' + range
	}
	$.ajax({
		url: window.location.pathname,
		type: 'GET',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {

			page = page + 1
			let loc = '?page=' + page
			if (range){
				loc += '&range=' + range
			}
			setLocation(loc)

			$('.products-wrapper, .videos-preview, .informations-wrapper, .did-orders').html(data.objects);
			$('.navigation, .page-pagination, .lc-pagination').html(data.pagination);
			window.initModalEvents();
			window.dispatchEvent(new Event('resize'));
			
			initCollapse();
			checkHeigth();
			pagin_blocked = false;
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.show-more', function(e) {
	e.preventDefault();
    if (ajax_blocked){
    	console.log('blocked')
    	return ajax_blocked
		console.log('not')
	}
	data = 'page=' + (page + 1) + '&ajax=Y'
	ajax_blocked = true;
	$.ajax({
		url: window.location.pathname,
		type: 'GET',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			page = page + 1
			setLocation('?page=' + page)
			$('.products-wrapper').append(data.objects)
			$('.navigation').html(data.pagination)
			ajax_blocked = false;

			initCollapse()
		},
		error: function(error) {
			console.log(error);
			ajax_blocked = false;
		}
	});
});

function modal_form_errors (form_id, errors, is_class=false) {
	let sel = ''
	if (is_class){
		sel = '.'
	}
	else{
		sel = '#'
	}
	inputs = $(sel + form_id + ' > div > div > input');
	errors = Object.keys(errors);
	for(let i=0;i<inputs.length; i++){

		if (errors.indexOf(inputs[i].name) != -1){
			jq_input = $(inputs[i]);
			if (!$(jq_input.parent()).hasClass('error')){
				$(jq_input.parent()).addClass('error');
			}
		}
		else{
			jq_input = $(inputs[i]);
			if ($(jq_input.parent()).hasClass('error')){
				$(jq_input.parent()).removeClass('error');
			}
		}
	}
}

$('body').on('submit', '#register-form', function (e) {
	e.preventDefault();
	let form = $(this)
	data = form.serialize();
	$.ajax({
		url: '/api/account/register/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (data.errors){
				modal_form_errors('register-form', data.fields);
				if (data.message){
					let message_container = form.find('.error_message')
					message_container.html(data.message)
					message_container.css('display', 'block')
				}
			}
			else {
				document.querySelector('.login-register').innerHTML = data.lc;
				document.querySelector('.close-modal').click();
			}
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('submit', '#password-recovery-form', function (e) {
	e.preventDefault();
	let form = $(this)
	data = form.serialize();
	$.ajax({
		url: form.attr('action'),
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			console.log(form.attr('action'))
			if (data.errors){
				if (data.message){
					let message_container = form.find('.error_message')
					console.log(message_container)
					message_container.html(data.message)
					message_container.css('display', 'block')
					message_container.css('color', '#dc3545')
				}
			}
			else {
				if (data.form){
					form.html(data.form)
				}
				else{
					document.querySelector('.login-register').innerHTML = data.lc;
					document.querySelector('.close-modal').click();
				}
				console.log(data)
				if (data.url){
					form.attr('action', data.url)
				}

			}
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('submit', '.lc-form', function (e) {
	e.preventDefault();
	data = $(this).serialize();
	$.ajax({
		url: '/api/account/password/change/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (data.errors){
				modal_form_errors('lc-form', data.fields, true);
			}
			else {
				this.innerHTML = data.success
			}
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.replace-order__more', function (e) {
	e.preventDefault();
	data = Object()
	data.order = $(this).attr('data-id')
	$.ajax({
		url: '/api/shop/order/repeat/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			window.location.replace("http://standart-znak.ru.drv3.place-start.ru/shop/cart");
		},
		error: function(error) { console.log(error);}
	});
});

$('body').on('click', '.did-order-body__button', function (e) {
	e.preventDefault();
	submit_button = $('.replace-order__more').attr('data-id', $(this).attr('data-id'));
	$('.replace-order__more > span').html("Поместить в корзину")
});

$('body').on('submit', '#login-form', function (e) {
	e.preventDefault();
	let form = $(this)
	data = form.serialize();
	$.ajax({
		url: '/api/account/login/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (data.errors){
				modal_form_errors('login-form', data.fields);
				if (data.message){
					let message_container = form.find('.error_message')
					message_container.html(data.message)
					message_container.css('display', 'block')
				}
			}
			else {
				document.querySelector('.login-register').innerHTML = data.lc;
				document.querySelector('.close-modal').click();
			}
		},
		error: function(error) { console.log(error);}
	});

});

$('body').on('submit', '.form-order', function (e) {
	e.preventDefault();
	data = $(this).serialize();
	$.ajax({
		url: '/api/shop/order/create/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (data.errors){
				fields = $('.fields__wrap > div > input');
				for (var i = 0; i < fields.length; i++){
					if (data.fields.hasOwnProperty($(fields[i]).attr('name'))){
						jq_input = $(fields[i]);
						if (!$(jq_input.parent()).hasClass('error')){
							$(jq_input.parent()).addClass('error');
						}
					}
				}
			}
			else{
				document.querySelector('section.page-cart.page-bg > div.container').innerHTML = data.template;
				document.querySelector('.login-register').innerHTML = data.lc;
				setCountCart(0);
			}
		},
		error: function(error) { console.log(error);}
	});

});

$('body').on('submit', '#lc_form', function (e) {
	e.preventDefault();
	data = $(this).serialize();
	$.ajax({
		url: '/api/account/data/change/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (data.errors){
				modal_form_errors('lc_form', data.fields);
			}
			else{
				this.innerHTML = data.success
			}
		},
		error: function(error) { console.log(error);}
	});

});

$('body').on('submit', '.text-page-form.scroll-part', function (e) {
	e.preventDefault();
	data = $(this).serialize();
	$.ajax({
		url: '/api/feedback/recall/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (!data.errors){
				let fc = this.firstElementChild.outerHTML
				$(this).html(fc + '<p class="text-page-form__title">Заявка успешно отправлена!</p>')
			}
		},
		error: function(error) { console.log(error);}
	});

});

$('body').on('submit', '.contact-form', function (e) {
	e.preventDefault();
	data = $(this).serialize();
	$.ajax({
		url: '/api/feedback/question/',
		type: 'POST',
		headers:{
        	"X-CSRFToken": csrftoken
     	},
		data,
		success: data => {
			if (!data.errors) {
				$('.contacts-part-title').html(data.message)
				$(this).detach()
			}
			modal_form_errors('contact-form', data.fields, true);
		},
		error: function(error) { console.log(error);}
	});

});

function update_selected_options() {
	for (key in selected_options){
		obj = $('#' + key);
		if (obj.length > 0){
			obj.text(selected_options[key])
		}
	}
}

function initListener() {
	const parent = document.querySelector('.product-order');

	document.querySelectorAll('.custom-select').forEach(el => {
		el.addEventListener('changeValue', event => {
			console.log('change')
			const target = event.detail.target;

			parent.classList.add('loading');

			if (selected_options){
				selected_options = JSON.stringify(selected_options)
			}
			if (target.innerText === "Выберите параметр"){
				var mode = 'exclude'
			}
			// else if (target.classList.contains('disabled')){
			// 	var mode = 'alternative'
			// }
			else{
				var mode = 'include'
			}
			var curr_id = target.dataset.id == -1 ? current_id : target.dataset.id
			data = {
				product_id: curr_id,
				mode,
				group: target.dataset.group,
				value: target.innerText,
				selected_options
			}

			$.ajax({
				url: '/api/catalog/ProductSearchBySelectedAttrs/',
				type: 'POST',
				headers:{
					"X-CSRFToken": csrftoken
				 },
				data,
				success: data => {
					$('div.product-params__wrapper').html(data.options)
					update_selected_options()
					if (data.price){
						$('#cost').text(data.price + " ")
						if (data.price.toString().startsWith('Товар')){
							$('.rub').html('')
						} else {
							$('.rub').html('руб.')
						}
					} else {
						$('#cost').text(target.dataset.price + ' ')
					}
					if (data.product_id){
						$('.cart-btn').attr('data-id', data.product_id)
					} else {
						$('.cart-btn').attr('data-id', target.dataset.id)
					}
					window.initDropDown();
					initListener();

					parent.classList.remove('loading');
				},
				error: function(error) { console.log(error);}
			});
		})
	})
}

initListener();

$('#datepicker').datepicker({
  onSelect: function onSelect(formattedDate, date, inst) {
    if (date.length == 2) {
      var container = document.querySelector('.did-orders');
      var pagination = document.querySelector('.lc-pagination');
      var token = document.getElementById('datepicker-token').value;
      var url = '';
      var data = 'range=' + formattedDate
      $.ajax({
			type: 'GET',
			data,
			success: response => {
				container.innerHTML = response.objects;
				pagination.innerHTML = response.pagination;
				setLocation('?' + data);
				window.initModalEvents();
				initCollapse();
				checkHeigth();
			},
			error: function(error) { console.log(error);}
		});


    }
  }
});

function checkHeigth() {
	const scrollBlock = document.querySelector('.lc-wrapper .scroll-part');
	const track = document.querySelector('.lc-wrapper .track');

	if( track.clientHeight <= scrollBlock.clientHeight ) {
		scrollBlock.removeAttribute('style');
	}
}

// $('body').on('changeValue', '.custom-select', function(e){
// 	console.log('Working')
// 	elem = $(this)

// 	data = 'product_id=' + elem.data('id') + '&mode=include&' + 'group=' + elem.data('group') + '&value=' + elem.text() + '&selected_options=' + selected_options

// 	$.ajax({
// 		url: '/api/catalog/ProductSearchBySelectedAttrs/',
// 		type: 'POST',
// 		headers:{
//         	"X-CSRFToken": csrftoken
//      	},
// 		data,
// 		success: data => {
// 			$('div.product-params__wrapper').html(data.options)
// 			selected_options = selected_options.split("'").join('"')
// 			selected_options = JSON.parse(selected_options.replace("'", "\""))
// 			for (key in selected_options){
// 				obj = $('#' + key)
// 				if (obj.length > 0){
// 					obj.text(selected_options[key])
// 				}
// 			}
// 			window.initDropDown()
// 		},
// 		error: function(error) { console.log(error);}
// 	});
// });

// function formOrder() {
// 	const form = document.querySelector('.form-order');

// 	if( !form ) return;
// 	form.addEventListener('submit', event => {
// 		event.preventDefault();

// 		let data = new FormData(form);


// 		$.ajax({
// 			url: '',
// 			type: 'POST',
// 			data,
// 			success: resp => {
// 				console.log( resp );
// 			},
// 			error: function(error) { console.log(error);}
// 		});
// 	})
// }
// formOrder();






// function pagination() {
// }
// pagination();