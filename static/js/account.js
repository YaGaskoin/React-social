function handlerAccountForm(event) {
    event.preventDefault()

    const form = event.currentTarget
    const data = $(form).serialize()

    clearForm(form)
    $.ajax({
		url: form.action,
		type: form.method, 
		dataType: 'json',
		data: data,
		success: function(response) {
            if (response.errors) {
                validateForm(form, response.fields)
            } else {
                successForm(form, response.message)
            }
		},
		error: function(error) {}
	});
}

document.querySelectorAll(".sn-account-data-form, .sn-account-password-form").forEach(form => {
    form.onsubmit = handlerAccountForm
})
