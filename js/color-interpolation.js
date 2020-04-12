// Next four functions from https://css-tricks.com/converting-color-spaces-in-javascript/
// with modifications
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

function hexToRGB(h) {
	let r = 0, g = 0, b = 0;

	// 3 digits
	if (h.length == 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];

	// 6 digits
	} else if (h.length == 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}
	return [r, g, b]
}

function RGBToHex(r,g,b) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	return "#" + r + g + b;
}

function RGBToHSL(r,g,b) {
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin = Math.min(r,g,b),
			cmax = Math.max(r,g,b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

	// Calculate hue
	// No difference
	if (delta == 0)
		h = 0;
	// Red is max
	else if (cmax == r)
		h = ((g - b) / delta) % 6;
	// Green is max
	else if (cmax == g)
		h = (b - r) / delta + 2;
	// Blue is max
	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0)
		h += 360;

	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return [h, s, l]
}

function HSLToHex(h,s,l) {
	// Must be fractions of 1
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c/2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return RGBToHex(r, g, b);
}

function interpolate(c1, c2, t) {
	var new_color = [0, 0, 0];
	var i;
	for (i = 0; i < 3; i++) {
		new_color[i] = t * c1[i] + (1 - t) * c2[i];
	}
	return new_color;
}

function interpolate_colors(color2, color1, num_intermediates) {
	c1 = hexToRGB(color1);
	c2 = hexToRGB(color2);
	c1 = RGBToHSL(c1[0], c1[1], c1[2]);
	c2 = RGBToHSL(c2[0], c2[1], c2[2]);
	min_color = Math.min(c1, c2);
	max_color = Math.max(c1, c2);
	if (max_color - min_color < min_color - max_color + 360) {
		console.log("Weird Colors");
	}

	out_array = [];

	var i;
	for (i = 0; i <= num_intermediates + 1; i++) {
		interpolated_color = interpolate(c1, c2, (1.0 * i) / (num_intermediates + 1));
		console.log(interpolated_color);
		out_array.push(HSLToHex(interpolated_color[0], interpolated_color[1], interpolated_color[2]));
	}
	return out_array;
}

function color_squares() {
	c1 = document.getElementById("first-color").value;
	c2 = document.getElementById("second-color").value;
	num_intermediates = +document.getElementById("num-intermediates").value;
	colors = interpolate_colors(c1, c2, num_intermediates);
	squares = "";
	for (var i = 0; i < num_intermediates + 2; i++) {
		squares += "<div class=\"color-interpolation-square\" style=\"width: calc(100% / " + (num_intermediates + 2) + "); background: " + colors[i] + "\">"
			+ "<div class=\"color-interpolation-data\"><div class=\"color-interpolation-textbox\">"
			+ colors[i]
			+ "</div></div>"
		+ "</div>";
	}
	document.getElementById("color-squares").innerHTML = squares;
}

addLoadEvent(color_squares);
