var max_height = document.documentElement.clientHeight;
var jumbotron_height = document.getElementById("webpage-header").clientHeight;
var footer_position = document.getElementById("footer").offsetTop;
var sidenav = document.getElementById("sidenav");
var window_height = window.innerHeight;
var bottom_of_sidenav = window_height - footer_position;
var scale_vh = 100 / max_height;
var need_to_resize_sidenav = true;
var sidenav_activator = document.getElementById("sidenav-activator")

function debounce(f, t) {
	return function (args) {
		let previousCall = this.lastCall;
		this.lastCall = Date.now();
		if (previousCall && ((this.lastCall - previousCall) <= t)) {
			clearTimeout(this.lastCallTimer);
		}
		this.lastCallTimer = setTimeout(() => f(args), t);
	}
}

window.onscroll = sidenav_height_adj;

function sidenav_height_adj() {
	var scroll_location = document.documentElement.scrollTop;
	var amount_of_visible_footer = scroll_location + bottom_of_sidenav;
	if (scroll_location >= jumbotron_height || amount_of_visible_footer <= 0) {
		if (need_to_resize_sidenav) {
			sidenav.style.top = "0px";
			sidenav.style.bottom = "0px";
			sidenav_activator.style.top = "0px";
			sidenav_activator.style.bottom = "0px";
			need_to_resize_sidenav = false;
		}
	}
	if (scroll_location < jumbotron_height) {
		let new_top = jumbotron_height - scroll_location + "px";
		sidenav.style.top = new_top;
		sidenav_activator.style.top = new_top;
		need_to_resize_sidenav = true;
	}
	if (amount_of_visible_footer > 0) {
		let new_bottom = amount_of_visible_footer + "px";
		sidenav.style.bottom = new_bottom;
		sidenav_activator.style.bottom = new_bottom;
		need_to_resize_sidenav = true;
	}
	sidenav.style.zIndex = -1;
}

window.onresize = debounce(change_max_height, 50);

function change_max_height() {
	window_height = window.innerHeight;
	jumbotron_height = document.getElementById("webpage-header").clientHeight;
	footer_position = document.getElementById("footer").offsetTop;
	bottom_of_sidenav = window_height - footer_position;
	max_height = document.documentElement.clientHeight;
	scale_vh = 100 / max_height;
	sidenav_height_adj();
}

sidenav_activator.onmousemove = function() {
	sidenav.style.zIndex = 2;
}

sidenav.onmouseleave = function() {
	sidenav.style.zIndex = -1;
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(sidenav_height_adj)
