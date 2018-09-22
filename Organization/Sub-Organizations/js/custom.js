/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Loaders


******************************/

$(document).ready(function()
{
	"use strict";

	/*

	1. Vars and Inits

	*/

	var header = $('.header');
	var menu = $('.menu');
	var burger = $('.hamburger');
	var menuActive = false;
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		if(window.innerWidth > 1280)
		{
			if(menuActive)
			{
				closeMenu();
			}
		}
		setTimeout(function()
		{
			jQuery(".main_content_scroll").mCustomScrollbar("update");
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initLoaders();

	/*

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/*

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length && $('.menu').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
				else
				{
					closeMenu();
				}
			});
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/*

	4. Init Loaders

	*/

	function initLoaders()
	{
		if($('.loader').length)
		{
			var loaders = $('.loader');

			loaders.each(function()
			{
				var loader = this;
				var endValue = $(loader).data('perc');

				var loaderScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var bar = new ProgressBar.Circle(loader,
					{
						color: '#8583e1',
						// This has to be the same size as the maximum width to
						// prevent clipping
						strokeWidth: 1,
						trailWidth: 20,
						trailColor: '#e5e6e8',
						easing: 'easeInOut',
						duration: 1400,
						text:
						{
							autoStyleContainer: false
						},
						from:{ color: '#8583e1', width: 1 },
						to: { color: '#8583e1', width: 1 },
						// Set default step function for all animate calls
						step: function(state, circle)
						{
							circle.path.setAttribute('stroke', state.color);
							circle.path.setAttribute('stroke-width', state.width);

							var value = Math.round(circle.value() * 100);
							if (value === 0)
							{
								circle.setText('0%');
							}
							else
							{
								circle.setText(value + "%");
							}
						}
					});
					bar.text.style.fontFamily = '"Montserrat", sans-serif';
					bar.text.style.fontSize = '44px';
					bar.text.style.fontWeight = '700';
					bar.text.style.color = "#100f3a";


					bar.animate(endValue);  // Number from 0.0 to 1.0
		    	})
			    .addTo(ctrl);
			});
		}
	}

});


function initMap() {
	var chicago = new google.maps.LatLng(41.850, -87.650);

	var map = new google.maps.Map(document.getElementById('map'), {
		center: chicago,
		zoom: 3
	});

	var coordInfoWindow = new google.maps.InfoWindow();
	coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
	coordInfoWindow.setPosition(chicago);
	coordInfoWindow.open(map);

	map.addListener('zoom_changed', function() {
		coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
		coordInfoWindow.open(map);
	});
}

var TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
	var scale = 1 << zoom;

	var worldCoordinate = project(latLng);

	var pixelCoordinate = new google.maps.Point(
			Math.floor(worldCoordinate.x * scale),
			Math.floor(worldCoordinate.y * scale));

	var tileCoordinate = new google.maps.Point(
			Math.floor(worldCoordinate.x * scale / TILE_SIZE),
			Math.floor(worldCoordinate.y * scale / TILE_SIZE));

	return [
		'Chicago, IL',
		'LatLng: ' + latLng,
		'Zoom level: ' + zoom,
		'World Coordinate: ' + worldCoordinate,
		'Pixel Coordinate: ' + pixelCoordinate,
		'Tile Coordinate: ' + tileCoordinate
	].join('<br>');
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
	var siny = Math.sin(latLng.lat() * Math.PI / 180);

	// Truncating to 0.9999 effectively limits latitude to 89.189. This is
	// about a third of a tile past the edge of the world tile.
	siny = Math.min(Math.max(siny, -0.9999), 0.9999);

	return new google.maps.Point(
			TILE_SIZE * (0.5 + latLng.lng() / 360),
			TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}
