var div_ready = false;
var debug_mode = true;

$(document).ready(function()
{
	if (debug_mode) {
		setInterval(function() {
			$('#error_block').fadeTo(500, 0).fadeTo(500, 1);
		},100);
	}
});

function cblink(element_id) {
	setInterval(function() {
		$('#error_block').fadeTo(500, 0).fadeTo(500, 1);
	},100);
}

function ajax_add_peple()
{
	if (!div_ready) {
		div_ready = !div_ready;
		//ajax_add_event();
	}
	
	if ($('#add_new_user').val() == 'Добавить') {
		$('#add_new_user').attr("value", "Скрыть");
	} else {
		$('#add_new_user').attr("value", "Добавить");
	}
	
	$('#add_new_user').slideToggle('fast', function() {});
	$('#add_new_user').slideToggle('fast', function() {});
	
	$('#fio_block').slideToggle('fast', function() {});
	$('#oklad_block').slideToggle('fast', function() {});
	$('#stavka_block').slideToggle('fast', function() {});
	$('#radio_block').slideToggle('fast', function() {});
	$('#button_block').slideToggle('fast', function() {});

}

function ajax_add_event()
{
	if (!div_ready) {
		div_ready = !div_ready;
		//ajax_add_peple();
	}
	
	if ($('#add_new_event').val() == 'Добавить') {
		$('#add_new_event').attr("value", "Скрыть");
	} else {
		$('#add_new_event').attr("value", "Добавить");
	}
	
	$('#add_new_event').slideToggle('fast', function() {});
	$('#add_new_event').slideToggle('fast', function() {});
	
	$('#event_name_block').slideToggle('fast', function() {});
	$('#event_datein_block').slideToggle('fast', function() {});
	$('#event_dateout_block').slideToggle('fast', function() {});
	$('#event_add_users_block').slideToggle('fast', function() {});
	$('#event_add_users_button_block').slideToggle('fast', function() {});
	update_event_user_list();

}

function edit_add() {

	$('#return_code').slideDown('fast', function() {});
	
	$("div[id='return_code']").replaceWith("<div id=\"return_code\" class=\"grid_3\"><img src=\"/beta2/img/ajax_load.gif\" /></div>");

	var fio_block_value = document.getElementById('fio_input').value;
	if (!fio_block_value) {
		alert("No fio_block found");
	}
	
	var oklad_block_value = document.getElementById('oklad_input').value;
	if (!oklad_block_value) {
		alert("No oklad_block found");
		exit;
	}
	
	var stavka_block_value = document.getElementById('stavka_input').value;
	if (!stavka_block_value) {
		alert("No stavka_block found");
		exit;
	}
	
	var radio_z = document.getElementById('radio_z');
	var radio_s = document.getElementById('radio_s');
	var radio_v = document.getElementById('radio_v');
	var radio_g = document.getElementById('radio_g');
	
	var radio_value;
	
	if (radio_z.checked) {
		radio_value = "z";
	} else if (radio_s.checked) {
		radio_value = "s";
	} else if (radio_v.checked) {
		radio_value = "v";
	} else if (radio_g.checked) {
		radio_value = "g";
	}
	
	if (!radio_value) {
		alert("No radio_block found");
		exit;
	}

	$.post("edit.php", {
		fio_block: fio_block_value,
		oklad_block: oklad_block_value,
		stavka_block: stavka_block_value,
		radio_block: radio_value
	}, function(data) {
		if (data != "FAIL" && data != "MAINTENANCE") {
			$("div[id='return_code']").replaceWith("<div id=\"return_code\" class=\"grid_3\"><span id=\"blink\">" + data + "</span></div>");
			$("#blink").fadeIn(400).delay(100).fadeOut(400).fadeIn(400).delay(100).fadeOut(400).fadeIn(400).delay(100).fadeOut(400, function() {
				clear_controls();
				update_user_list();
				//ajax_add_peple();
			});
		} else {
			if (data == "MAINTENANCE") {
				alert("Repository closed to read-only for maintenance. You will be able to login later.");
			} else {
				alert("Login failed: incorrect username or password");
			}
		}
	});
}

function edit_add_users_to_event() {

	$('#return_code_event').slideDown('fast', function() {});
	
	$("div[id='return_code_event']").replaceWith("<div id=\"return_code_event\" class=\"grid_3\"><img src=\"/beta2/img/ajax_load.gif\" /></div>");

	var event_name_value = document.getElementById('event_name').value;
	if (!event_name_value) {
		alert("No event_name found");
	}
	
	var event_datein_value = document.getElementById('event_datein').value;
	if (!event_datein_value) {
		alert("No event_datein found");
		exit;
	}
	
	var event_dateout_value = document.getElementById('event_dateout').value;
	if (!event_dateout_value) {
		alert("No stavka_block found");
		exit;
	}

	$.post("add_users_to_event.php", {
		fio_block: fio_block_value,
		oklad_block: oklad_block_value,
		stavka_block: stavka_block_value,
		radio_block: radio_value
	}, function(data) {
		if (data != "FAIL" && data != "MAINTENANCE") {
			$("div[id='return_code']").replaceWith("<div id=\"return_code\" class=\"grid_3\"><span id=\"blink\">" + data + "</span></div>");
			$("#blink").fadeIn(400).delay(100).fadeOut(400).fadeIn(400).delay(100).fadeOut(400).fadeIn(400).delay(100).fadeOut(400, function() {
				clear_controls();
				update_user_list();
				//ajax_add_peple();
			});
		} else {
			if (data == "MAINTENANCE") {
				alert("Repository closed to read-only for maintenance. You will be able to login later.");
			} else {
				alert("Login failed: incorrect username or password");
			}
		}
	});
}

function update_user_list() {
	//start
	//TODO Сделать обновление дива со списком людей сдесь
	// id="users_list"
	$.post("update_users.php", {}, function(data) {
		if (data != "FAIL" && data != "MAINTENANCE") {
			$("#users_list").replaceWith("<select id=\"users_list\" name=\"one_list\" style=\"width: 200px;\">" + data + "</select>");
		} else {
			if (data == "MAINTENANCE") {
				alert("Repository closed to read-only for maintenance. You will be able to login later.");
			} else {
				alert("Login failed: incorrect username or password");
			}
		}
	});
}

function update_event_list() {
	$.post("update_events.php", {}, function(data) {
		if (data != "FAIL" && data != "MAINTENANCE") {
			$("#event_list").replaceWith("<select id=\"event_list\" name=\"event\" style=\"width: 300px;\">" + data + "</select>");
		} else {
			if (data == "MAINTENANCE") {
				alert("Repository closed to read-only for maintenance. You will be able to login later.");
			} else {
				alert("Login failed: incorrect username or password");
			}
		}
	});
}

function update_event_user_list() {
	$.post("get_user_to_event.php", {}, function(data) {
		if (data != "FAIL" && data != "MAINTENANCE") {
			$("#event_users_list").replaceWith("<select id=\"event_users_list\" name=\"event_users_list\" multiple=\"true\" size=\"9\">" + data + "</select>");
		} else {
			if (data == "MAINTENANCE") {
				alert("Repository closed to read-only for maintenance. You will be able to login later.");
			} else {
				alert("Login failed: incorrect username or password");
			}
		}
	});
}

function get_user_data() {
	//start
	$.post("get_user_data.php", {user_id: $("#users_list").val()}, function(data) {
		if (data != "FAIL" && data != "MAINTENANCE") {
			$("#fio_input").attr("value", mysql_fio_input);
			$(".container_12").replaceWith(data);
		} else {
			if (data == "MAINTENANCE") {
				alert("Repository closed to read-only for maintenance. You will be able to login later.");
			} else {
				alert("Login failed: incorrect username or password");
			}
		}
	});
	
}

function set_user_data(element_id, user_value) {
	$("#" + element_id).attr("value", user_value);
	var set_user_data_value = getElementById(element_id).value;
	
	set_user_data_value = user_value;
}

function clear_controls() {
	$(".worked_input").attr("value", "");
	$("#radio_z").attr("checked", "checked");
}
