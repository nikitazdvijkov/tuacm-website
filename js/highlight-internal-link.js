var hl_timeout_counter = 0;
function highlight_link_timeout(link, color, normal_color) {
	setTimeout(function() {
		setTimeout(function () {
			link.color = normal_color;
		}, 1000);
		link.color = color;
		hl_timeout_counter++;
		if (hl_timeout_counter < 2) {
			highlight_link_timeout(link, color, normal_color);
		}
	}, 2000);
}


function highlight_link(element, color) {
	var link = element.getAttribute("href").substr(1);
	var cur_link = document.getElementById(link).style;
	var cur_color = cur_link.background;
	var cur_text_color = cur_link.color;
	hl_timeout_counter = 0;
	cur_link.color = "#FFFFFF";
	cur_link.background = color;
	highlight_link_timeout(cur_link, "#FFFFFF", cur_text_color);
	setTimeout(function() {
		cur_link.background = cur_color;
	}, 10000);
	cur_link.color = cur_text_color;
}
