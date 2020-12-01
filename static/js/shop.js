function get_get_query(more) {
	var more = more || false
	var filters = $('form.filtering').serialize();
	var page = $('.pagination li.active a').attr('data-page');
	var sort = $('div.sort-parameters__order-by span.active');
	if (sort.attr("data-val"))  {
		sort = '&sort=' + sort.attr("data-val")
	} else {
		sort = false;
	}
	var card_type = $('.sort-parameters__layout-types .active').attr('data-type')
	if (card_type) {
		card_type = '&card_type=' + card_type;
	}
	if (more)
        page = $('#show_more').attr('data-page');
    
    if (!(page))
		page = 1
		
	// var type_display = $('.sort-parameters').find('button.active').attr('data-type');
	/*let wheel_count = $("form.count-filters input[name='count']:checked").val();
	if (wheel_count) {
		wheel_count = "&wheel_count=" + wheel_count;
	}*/
	/*let wheel_count_str = get_wheel_count_str();
	let wheel_count_list = $("form.count-filters input[name='count']:checked")
	for (let wheel_count of wheel_count_list.toArray()) {
		if (wheel_count.value) {
			wheel_count_str += "&wheel_count=" + wheel_count.value;
		}
	}*/
	return filters + '&page=' + page + (sort ? sort : '') +  card_type + get_wheel_count_str() + get_free_montage_str();
}

//execute filtering
function updateCatalog(event,first) {
    first = first || false
	toggleCatalogPreloader();
	document.querySelectorAll(".whitewall").forEach(element => { element.classList.add("active"); });
    if (event) {
        event.preventDefault();
    }
    if (!first){
        query_string = get_get_query();
        window.history.pushState(null, null, window.location.pathname + "?" + query_string);
    } else {
        query_string = window.location.search
        query_string = query_string.substr(1);
    }
	query_string += "&ajax=Y";

	$.ajax({
		url: window.location.pathname,
		type: 'GET', 
		dataType: 'json',
		data: query_string,
		success: function(data) {
			replaceCatalogData(event, data);
			holdFilterButton();
			document.querySelectorAll(".product-card").forEach(element => {
				element.href += "?" + get_wheel_count_str() + get_free_montage_str();
			});
			document.querySelectorAll(".product-card-wide-body").forEach(element => {
				element.href += "?" + get_wheel_count_str() + get_free_montage_str();
			});
			document.querySelectorAll(".product-card-add").forEach(element => {
				element.href += "?" + get_wheel_count_str() + get_free_montage_str();
			});
		},
		error: function(error) { console.log(error);},
		complete: () => { document.querySelectorAll(".whitewall").forEach(element => { element.classList.remove("active"); }); }
	});
}

function holdFilterButton() {
	let filterItemInput = document.querySelectorAll('.count-filters__item input')
		filterItemInput.forEach( (e) => {
			e.addEventListener('change', () => {
				if (event.target.checked) {
					event.target.parentElement.classList.add('checked-filter-item')
					event.target.parentElement.querySelector('label').classList.add('checked-label')
					event.target.parentElement.querySelector('svg').classList.add('checked-svg')
					event.target.parentElement.querySelector('span').style.opacity = "1"
				} else {
					event.target.parentElement.classList.remove('checked-filter-item')
					event.target.parentElement.querySelector('label').classList.remove('checked-label')
					event.target.parentElement.querySelector('svg').classList.remove('checked-svg')
					event.target.parentElement.querySelector('span').style.opacity = "0"
				}
			})
		})
}

function loadData(event, data, more) {
	var more = more || false
	$('.filter-counter').fadeOut(200);  
	
	if(data['products'].length != 0) {
		var html_products = data['products'];
		if (more)
			$('.sn-products-container').append(html_products);
		else
            $('.sn-products-container').html(html_products);
        $('.paginationBlock').html(data['pagination']);
        
        $('.filterBlock').replaceWith(data['template_filters']);

		// range slider init
		Array.prototype.slice.call( document.querySelectorAll(".range-slider-field") ).forEach(function(elem) {
			new RangeSliderField( elem );
		});
	} else {	
		$('.paginationBlock').html("");
		$('.sn-products-container').html('<div class="products-container">\
            <div class="row sn-products-container">\
                <div class="col-12">\
                <p class="empty-category__title">По данному запросу товаров не найдено.</p>\
                </div>\
            	</div>\
    		</div>');
		}
}

function loadDataNews(event, data, target) {
	if(data['objects'].length != 0) {
		var html_objects = "";
		$.each(data['objects'], function(key, value) {
			html_objects += value;
		});
		html_objects += data['pagination'];
		target.closest(".row").append(html_objects);
		target.parents(".parentMore").remove()
	}
}

//function change page 
function changePage(event) {
	event.preventDefault();
	var target = $(event.target);
	$('.pagination li').removeClass('active');
	$(target).closest('li').addClass('active');
	updateCatalog(event, false);
	$('body,html').animate({scrollTop: 0}, 400);
}

//set csrf to data
function csrf(str) {
	var input = $('.csrf_token').find('input');
	return str + "&" + $(input).attr('name') + "=" + $(input).attr('value');
}



function scroll() {
	$("body").animate({"scrollTop":400}, "slow");
}




//submit ajax forms
function submitAjaxForm(event, funcCall) {
	
	event.preventDefault();
    
    var form = event.target.closest("form")
    var serial = $(form).serialize();
    var url = form.action;
	var method = form.method;

    clearForm(form)
    form.classList.add("load")

	$.ajax({
		url: url, 
		type: method,
		dataType: 'json',
		data: csrf(serial),
		success: function(response) {
            if (response.errors) {
                validateForm(form, response.fields)
            } else {
                if (response.redirect !== undefined) {
                    window.location.pathname = response.redirect
                } else {
					form.classList.add("success")
					ym(53660539, 'reachGoal', 'tradein'); 
                }
            }
            form.classList.remove("load")
		},
		error: function(error) { 
            form.classList.remove("load")
			console.log(error)
		}
	});

}

// (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(53660539, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); 
// function submitAjaxFormYandex(event, funcCall) {
	
// 	event.preventDefault();
    
//     var form = event.target.closest("form")
//     var serial = $(form).serialize();
//     var url = form.action;
// 	var method = form.method;

//     clearForm(form)
//     form.classList.add("load")

// 	$.ajax({
// 		url: url, 
// 		type: method,
// 		dataType: 'json',
// 		data: csrf(serial),
// 		success: function(response) {
//             if (response.errors) {
//                 validateForm(form, response.fields)
//             } else {
//                 if (response.redirect !== undefined) {
//                     window.location.pathname = response.redirect
//                 } else {
// 					form.classList.add("success");
//                 }
//             }
//             form.classList.remove("load")
// 		},
// 		error: function(error) { 
//             form.classList.remove("load")
// 			console.log(error)
// 		}
// 	});

// }

// function showErrors(event, data) {
// 	var error_message = "";
// 	$.each(data['errors'], function(key, value) {
// 		if(event.target.tagName == "BUTTON" || event.target.tagName == "A")
// 			target = $(event.target).closest("form");
// 		else
// 			target = $(event.target);
// 		$(target).find('input[name=' + key +  ']').addClass('error');
// 		$(target).find('textarea[name=' + key +  ']').addClass('error');
// 		$.each(value, function(key1, value1) {
// 			error_message += value1 + "</br>";
// 		});
// 	});
// 	var err = $(target).find('.error_message');
	
// 	$(err).html(error_message);
// 	$(err).addClass('active');
// }

function showErrors(event, data) {
    if(event.target.tagName == "BUTTON" || event.target.tagName == "A")
        target = $(event.target).closest("form");
    else
        target = $(event.target);
    $(target).find('input').removeClass("is-invalid is-valid");
    $(target).find('input').addClass("is-valid");
    $(target).find('div.state').removeClass("valid-feedback invalid-feedback");
    $(target).find('div.state').text("Готово!");
    $(target).find('div.state').addClass("valid-feedback");
    
    $.each(data['fields'], function(key, value) {
        var input_error = $(target).find('input[name=' + key +  ']')
        input_error.removeClass("is-valid");
        input_error.addClass("is-invalid");
        var div_error = $(input_error.siblings('div'));
        $(div_error).addClass('invalid-feedback');
        div_error.text(value);
        $(target).find('textarea[name=' + key +  ']').addClass('error');
    });

}

function showErrorsButton(target, data) {
	var error_message = "";
	$.each(data['errors'], function(key, value) {
		$(target).find('input[name=' + key +  ']').addClass('error');
		$.each(value, function(key1, value1) {
			error_message += value1 + "</br>";
		});
	});
	var err = $(target).find('.error_message');
	
	$(err).html(error_message);
	$(err).addClass('active');
}

function offForm(form) {
	$(form).find('input').attr('disabled', true);
	//$(form).animate({opacity:0.5}, 500);
}

function onForm(form) {
	$(form).find('input').attr('disabled', false);
	//$(form).animate({opacity:1.0}, 0);
}



//call form
$('#callForm, #consForm').on('submit', function(event) {
	submitAjaxForm(event, callBackForm)
})
// $('form[action="/api/shop/order/create/"]').on('submit', function(event){
// 	submitAjaxFormYandex(event, callBackForm);
// })

function callBackForm(event, data) {
	if(event.target.tagName == "BUTTON")
		target = $(event.target).closest("form");
	else
		target = $(event.target);
	onForm(target);
	$(".error_message").removeClass('active');
	if(data['error'] != 0) {
		showErrors(event, data);
		console.log('error');
	} else $(target).html('<h3 style="color:white;">Заявка отправлена. Наш менеджер свяжется с вами в ближайшее время</h3>');
}






//execute filtering
function showMore(event) {
	event.preventDefault();

    // Блокировака для избежания нажатия несколько раз
	blockingPagination()

	// Включение прелоадера
	toggleCatalogPreloader();

    $('a.ajax_page').addClass('ajax');
	query_string = get_get_query(true);
	window.history.pushState(null, null, window.location.pathname + "?" + query_string);
	query_string += "&ajax=Y";
	$.ajax({
		url: window.location.pathname,
		type: 'GET', 
		dataType: 'json',
		data: query_string,
		success: function(data) {
			replaceCatalogData(event, data, true);
            
            // Разблокировка
            unblickingPagination()
		},
		error: function(error) { console.log(error);}
	});
}



function countProducts(event) {
		// $(".tooltip_count").fadeOut();
		query_string = get_get_query();
		query_string += "&ajax=Y";
		$.ajax({
			url: window.location.pathname,
			type: 'GET', 
			dataType: 'json',
			data: query_string,
			success: function(data) {
				if (data['count']>0) 
				{
					$('.filter-counter span').text("Показать "+data['count']+ " " +data['word_count'])
				}
				else
				{
					$('.filter-counter span').text("Товаров не найдено ")
				}

			},
			error: function(error) { console.log(error);}
		});
}


function addProductInCart(event) {
    event.preventDefault();
    var form = $(event.currentTarget).closest('form');
    var data = form.serialize();
    var url = form.attr('action');
    var product = event.currentTarget.closest(".product-card")
    if (product === null)
		product = event.currentTarget.closest(".product-card-wide")
	if (product === null)
		product = event.currentTarget.closest(".product-form")
	console.log(data, form, product)
	$.ajax({
		url: url,
		type: 'POST', 
		dataType: 'json',
		data: csrf(data),
		success: function(data) {
			dataLayer.push({
			    "ecommerce": {
			        "add": {
			            "products": [
			                    data["ecommerce-product"],
			            ]
			        }
			    }
			});
            $('div.order-table').replaceWith(data['dropdown']);
            changeCartCount(data['count'])
            productCartAdded(product)
			console.log('succes');
		},
		error: function(error) { console.log(error);}
	});
}



function sendCreateOrder(event) {
	event.preventDefault();
	var target = $(event.target).closest('form');
	var data = $(target).serialize();
	var url = $(target).attr('action');
	toggleCheckoutFormStatus();
	// $(target).find(".error_message").detach();
	// $(target).find(".error").removeClass("error");
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: csrf(data),
		success: function(data) {
			if(data['errors']) {
                target.find("input").removeClass("is-invalid");
                // target.find("input").addClass("is-valid");
                // target.find("input").siblings("div").removeClass("invalid-feedback");
                // target.find("input").siblings("div").addClass("valid-feedback");
				$.each(data['fields'], function(key, value) {
                    inp = target.find("input[name=" + key + "][type!=hidden][disabled!=disabled]").addClass('is-invalid');
                    inp.removeClass("is-valid");
                    inp.siblings("div:not(.suggestions-wrapper)").removeClass("valid-feedback");
                    inp.siblings("div:not(.suggestions-wrapper)").addClass("invalid-feedback");
                    inp.siblings("div:not(.suggestions-wrapper)").text(value);
				});
				scroll();
				var error_text = document.getElementsByClassName('error_text')[0];
				console.log(error_text)
				error_text.style.display = 'block';
				

			} else  {
				dataLayer.push(
                	data['ecommerce-product']
				)
				ym(53660539, 'reachGoal', 'zakaz');
                $('.removeSuccess').remove();
                $('.orderContainer').append(data['template']);
                changeCartCount(0)
                if (data['redirect'])
					window.location = data['redirect'];

			}
			toggleCheckoutFormStatus();
		},
		error: function(error) { 
			console.log(error); 
			toggleCheckoutFormStatus();
		}
	});
}

var AJAX_SEARCH_MUTEX = false;

function smartAjaxSearch(event) {

    var search = $.trim($(event.target).val());
    var url = $(event.target).closest('form').attr('url-api');
    if ($(event.target).closest('form').attr('data-attr') == "desc")
    	class_block = ".header-search__ajax-search"
    else
    	class_block = ".ajax_search"
    console.log(class_block);
	if(search.length == 0) { 
				AJAX_SEARCH_MUTEX = false; 
				$('#navbarNavDropdown').html('');
				 $(class_block + ' ul').slideUp(150);
				return true;
	}
	if(AJAX_SEARCH_MUTEX && AJAX_SEARCH_MUTEX != event) {
		AJAX_SEARCH_MUTEX = event;
		return true;
	} 
	AJAX_SEARCH_MUTEX = event;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: csrf($(event.target).closest('form').serialize()),
		success: function(data) {
			 console.log(data)
			if(AJAX_SEARCH_MUTEX == event) { AJAX_SEARCH_MUTEX = false;}
			else { smartAjaxSearch(AJAX_SEARCH_MUTEX); return true; }
			var result_html = "";
			if(data['template']) {
				result_html = data['template']
				$(class_block).html(result_html);
				$(class_block + ' ul').slideDown();
			} else {
				$(class_block).html('');
				$(class_block + ' ul').slideUp(150);

			}
		},
		error: function(error) { console.log(error); }
	});
}

function resetFilter(event){
	window.location = window.location.pathname;
}






function addProductFromCart(event) {
    var form = $(event.target).closest('form');
    var data = form.serialize();
    var url = form.attr('action');

    $.ajax({
		url: url,
		type: 'POST', 
		dataType: 'json',
		data: csrf(data),
		success: function(data) {
            form.find('.cart-item-total').text(data['price']);
            $('.cart-total').text(data['total']);
		},
		error: function(error) { console.log(error);}
	});
}

function changeCardType(event) {
	if (event.target.tagName == "BUTTON")
        var target = $(event.target);
    else
        var target = $(event.target).closest('button');
    var url = $(target).attr('data-url');
    var type = $(target).attr('data-type');

	$.ajax({
		url: url,
		type: 'POST', 
		dataType: 'json',
		data: csrf("type="+type),
		success: function(data) {
            if (data['change']) 
            	console.log(11)
            	updateCatalog(event);
		},
		error: function(error) { console.log(error);}
		});
}

function addInAccount(event, setState) {
	event.preventDefault()
	if (event.target.tagName === "BUTTON")
        var button = $(event.target);
    else
        var button = $(event.target).closest('button');
    var product = button.closest(".product-card, .product-card-wide").attr('data-product');

    if (product == undefined)
    	product = button.attr("data-product");
    var url = button.attr('data-url');

    console.log(button)

	$.ajax({
		url: url, 
		type: "POST",
		dataType: 'json',
		data: csrf('product='+product),
		success: function(data) {
            setState(data['count'])
            miniButtonHandler(button[0])
		},
		error: function(error) { 
			console.log(error);
		}
	});
}

// Функции добавления, удаления, восстановления избранных товаров
$('body').on('click', '.sn-add-to-favorites, .favorite-remove, .favorite-restore',  function(event) {
	addInAccount(event, changeFavoritesCount)
});

$('body').on('click', '.compare, .sn-add-to-compare, .compare-remove, .compare-restore',  function(event) {
	addInAccount(event, changeCompareCount)
});


//Личный кабинет

function loginCallback(event,data) 
{
    if (data['reload'])
    {
        window.location = window.location;
    }
}

$('#custom_modal-1 form').on('submit', function(event) {
    event.preventDefault();
    console.log("popopp")
	submitAjaxForm(event, loginCallback)
})

$('#custom_modal-3 button').on('click', function(event) {
    event.preventDefault();
    console.log("popopp")
	submitAjaxForm(event, loginCallback)
})


$('#custom_modal-4 button').on('click', function(event) {
    event.preventDefault();
    console.log("popopp")
	submitAjaxForm(event, loginCallback)
})

//call form
$('#recall_modal button').on('click', function(event) {
	submitAjaxForm(event, callBackForm)
})

$('#product-nutify form').on('submit', function(event) {
	submitAjaxForm(event, callBackForm)
})






function delProductFromCart(event) {
	var form = $(event.target).closest('form');
    var data = form.serialize();

    // Блокировка элемента корзины для избежания нескольких нажатий на кнопку
    // удаление товара из корзины
    blockedCartItem(form[0])

	$.ajax({
		url: "/api/shop/cart/delete/",
		type: 'POST', 
		dataType: 'json',
		data: csrf(data),
		success: function(response) {
            $('.cart-total').text(response['total']);
            changeCartCount(response['count'])
            
            if (response['count'] > 0) {
                deleteCartItem(form[0])
            } else {
                clearCart(response["empty"])
            }
            
            console.log(response)
		},
		error: function(error) { console.log(error);}
		});
}

function selectShipping(event) {
    var link = event.currentTarget
    var container = link.closest(".nav").parentElement
    var tabContent = container.querySelector(".tab-content")
    var pane = container.querySelector(link.attributes.href.textContent)

    Array.prototype.slice.call( tabContent.querySelectorAll(".tab-pane") ).forEach(function(item) {
        Array.prototype.slice.call( item.querySelectorAll("input, select, textarea") ).forEach(function(element) {
            element.disabled = true
        })
    })

    Array.prototype.slice.call( pane.querySelectorAll("input, select, textarea") ).forEach(function(element) {
        element.disabled = false
    })
}


function startFilters(event) {
	event.preventDefault();
    var form = $(event.target.closest('form'));
    var query = "?"
    $.each(form.serializeArray(), function(key, value) {
    	if (value['value'])
			query += "&" + value['value'] + "=on";
		});
    window.location = form.attr('action') + query;
}

$(window).on('load',function() {

	// //set events
    // $('form.filtering').on('submit', updateCatalog);
    $('body').on('submit', 'form.filtering', updateCatalog);
    $('body').on('click', '#reset_filter', resetFilter);
	$('body').on('click', '.sort-parameters__layout-types button', changeCardType);
	$('body').on('change', 'form.count-filters input', updateCatalog);
	// $('body').on('change', '#type_category', changeType);
    // $('.filters input').on('change', countProducts);
    
    $('.nav-link').on('click', selectShipping);
    $('#form-shiny button, #form-diski button').on('click', startFilters)


    
	// $('#base_search').on('click',baseSearch);
	// $('#base_map').on('click',baseSearchMap);

	// $('.trigger-link').on('click',vacancyInput);

	// $('#main_cats input').on('change', checkMainCat);
	// // $('.select2-selection').on('click', countProducts);
	// //activate filters
	// //2017$('#filters_form input[type=checkbox]').on('click', updateCatalog);
	// $('#sorting').on('change', updateCatalog);
	// $('button.add, button.reduce').on('click', changeCountProduct);

    // $('form.checkout_form .submit-button').on('click', sendCreateOrder);
    $('form.sn-order-form').on('submit', sendCreateOrder);
    
    // $('form.sort-parameters button').on('click', updateCatalog);
    $('form.sort-parameters span').on('click', function (event) {
    	$(event.currentTarget.closest("div")).find("span").removeClass("active");
    	$(event.target).addClass("active");
     	updateCatalog();
	});


	$('.header-search input').on('input', smartAjaxSearch);

	$('body').on('click', '.pagination li a', changePage);

	Array.prototype.slice.call( document.querySelectorAll('.sn-add-to-cart') ).forEach(function(button) {
		button.onclick = addProductInCart
	})

	

	$('body').on('change', 'input.change-count', addProductFromCart);
    $('body').on('click', '.cart-item-delete', delProductFromCart);
	
	
    $('body').on('click', '#show_more', showMore);
    

    $("body").on('click',".modal_product_trigger", function (event) {
        var product = event.currentTarget.closest(".product-card")
        if (product === null)
            product = event.currentTarget.closest(".product-card-wide")

        var productId = product.getAttribute('data-product')
        var input = document.querySelector('#product-nutify [name="product_id"]')

        if (input !== null)
            input.value = productId
	});

	function disableCountFilter(element) {
		element.checked = false;
		element.disabled = true;
		let label = element.closest("label");
		label.classList.remove("checked-filter-item");
		label.querySelector("svg").classList.remove("checked-svg");
		label.querySelector("label").classList.remove("checked-label");
		label.querySelector("span").style = "opacity: 0;";
		label.closest("div").querySelector(".buttonwall").style.display = "block";
		//label.hidden = true;
	}

	function enableCountFilter(element) {
		element.disabled = false;
		let label = element.closest("label");
		//label.hidden = false;
		label.closest("div").querySelector(".buttonwall").style.display = "none";
		/*label.classList.add("checked-filter-item");
		label.querySelector("svg").classList.add("checked-svg");*/
	}

	function checkFreeMontage() {
		let element = document.getElementById("count_free_montage");
		if (element.checked) {
			disableCountFilter(document.getElementById("count_two"));
			disableCountFilter(document.getElementById("count_one"));
		} else {
			enableCountFilter(document.getElementById("count_two"));
			enableCountFilter(document.getElementById("count_one"));
		}

		if (document.getElementById("count_two").checked || document.getElementById("count_one").checked) {
			disableCountFilter(document.getElementById("count_free_montage"));
		} else {
			enableCountFilter(document.getElementById("count_free_montage"));
		}
	}

	checkFreeMontage();
	
	document.getElementById("count_free_montage").addEventListener("change", event => {
		checkFreeMontage();
	});

	document.getElementById("count_one").addEventListener("change", event => {
		checkFreeMontage();
	});

	document.getElementById("count_two").addEventListener("change", event => {
		checkFreeMontage();
	});
});

$('.cart-item').on('submit',function(event) {
	event.preventDefault()
})




function searchFilters(event) {
    var $this = $(event.target);
    var $groupContainer = $this.siblings('.filter-group');
    var query = $this.val();

    if (!query) {
        $groupContainer.find('.custom-checkbox').each(function (i, el) {
            $(el).removeAttr('style');
        });
    } else {
        $groupContainer.find('.custom-checkbox').each(function (i, el) {
            var title = $(el).find('.custom-control-label').text();
            var regex = new RegExp(query, 'i');
            if (title.search(regex) >= 0) {
                $(el).removeAttr('style');
            } else {
                $(el).css('display', 'none');
            }
        });
    }

    $(window).resize();
}

$('body').on('input', '.search_field', function (event) {searchFilters(event);});
$('input[type="tel"]').mask('9 (999) 999-99-99');




// Прелоадер
window.onload = function() {
	setTimeout(function() {
		const preloader = document.querySelector('.preloader');
		if (!preloader.classList.contains('done') ) 
		{
			preloader.classList.add('done');
		}
	}, 500);

}
