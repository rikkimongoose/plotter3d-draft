/** @namespace */
var THREEx	= THREEx || {};

THREEx.ColorPalette = {
	GGPLOT2 : 1
};

THREEx.getColorPalette = function(n, palette) {

	if(typeof palette == "undefined" || !palette)
		palette = THREEx.ColorPalette.GGPLOT2;
	var seq = function(from, to, length){
		if(!length)
			return [];

		if(from == to)
			return from;

		var output = [];

		var step = (to - from) / length;
		for(; from <= to; from += step)
			output.push(from);
		return output;
	};

	var hcl = function(h, c, l) {
		return { h : h, c : c, l : l};
	};

	var rgb = function(r, g, b) {
		return { r : r, g : g, b : b};
	};

	var rgbtonum = function(rgb) {
		return rgb.r * 0x10000  + rgb.g * 0x100 + rgb.b;
	}

	var hcltorgb = function(hcl) {
		var r, g, b;
		var h = hcl.h, s = hcl.c, l = hcl.l;

		console.log(hcl);

	    if(s == 0){
	        r = g = b = l; // achromatic
	    }else{
	        function hue2rgb(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);

	    	console.log({ r : r, g : g, b : b });
	    }
    	return { r : Math.round(r), g : Math.round(g), b : Math.round(b) };
	}

	var hcltonum = function(hcl) {
		return rgbtonum(hcltorgb(hcl));
	}

	var getGGPlot2Palette = function(n) {
		var hue_from = 15,
			hue_to = 375,
			hue = seq(hue_from, hue_to, n),
			luminance = 65,
			chroma = 100;

		var colors_result = [];

		for(var i = 0; i < hue.length; i++)
			colors_result.push(hcltonum(hcl(hue[i], luminance, chroma)));

		return colors_result;
	};

	switch(palette)
	{
		default:
			return getGGPlot2Palette(n);
	}
};