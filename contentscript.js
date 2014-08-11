// This code copyright (c) 2014 by Polly Powledge. Licensed under the MIT license.

// polyfill for Math.trunc
function trunc(x) 
{
	return x < 0 ? Math.ceil(x) : Math.floor(x);
}

// get the map scale. not currently used
function get_scale()
{
	var scale_ele = document.getElementById("widget-scale-label");
	console.log("scale: " + scale_ele.textContent);
	return scale_ele.textContent;
}

// install the mn ui component
function install_button()
{
	var text_mode_eles = document.getElementsByClassName("text-mode-left");
	var text_mode_ele = text_mode_eles[0];
	var new_item = document.createElement("div");
	new_item.className = "mn";
	new_item.id = "mn";
	new_item.innerHTML = '<div class="onoffswitch"> <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" > <label class="onoffswitch-label" for="myonoffswitch"> <span class="onoffswitch-inner" data-content="" ></span> <span class="onoffswitch-switch">MN</span> </label> </div>';
	text_mode_ele.appendChild(new_item);

	// add event listeners for user clicks (to enable/disable mn) and the custom pathname changed event
	var chkbox_ele = document.getElementById("myonoffswitch");
	chkbox_ele.addEventListener("click", function(event) {
		console.log("checkbox changed to " + chkbox_ele.checked);
		console.log("dispatching isPathnameChanged event");
		if ( chkbox_ele.checked == true )
		{
			chkbox_ele.dispatchEvent( new CustomEvent( "isPathnameChanged", { detail: { }, bubbles: true, cancelable: true }) );
		}
	});


	chkbox_ele.addEventListener("isPathnameChanged", function(event) {
		console.log("isPathnameChanged ");
		if ( orig_pathname != window.location.pathname )
		{
			orig_pathname = window.location.pathname;
			console.log("yes pathway has changed");
			// pathname changed and mn is enabled. grab the lat/long out of the pathname,
			// compute the new mn value, and display it
			var inner_eles = document.getElementsByClassName("onoffswitch-inner");
			if ( inner_eles.length > 0 )
			{
				var mapre = /^\/maps\/.*\@(.+),(.+),(.+z)/;
			
				var urlarr = mapre.exec(window.location.pathname);
				if ( urlarr.length == 4 )
				{
					console.log("url parse: " + urlarr[0] );
					console.log("url parse: " + urlarr[1] );
					console.log("url parse: " + urlarr[2] );
					chrome.runtime.sendMessage( {lat: urlarr[1], long: urlarr[2] }, function(response) {
						console.log('got response ' + response.magdec);
						if (response.magdec != null )
						{
							// format the output
							var label = "";
							if ( response.magdec < 0 )
							{
								label = Math.abs(trunc(response.magdec)) + "° " + "NW";
							}
							else
							{
								label = trunc(response.magdec) + "° " + "NE";
							}
							inner_eles[0].setAttribute("data-content",label);
							inner_eles[0].click();
							inner_eles[0].click();
						}
					});
			        }
			}
		}
	});
	return;
}

var orig_pathname = "";
window.onload = function(event) { 
			console.log("window loaded!");

			// install the mn ui component
			setTimeout( function(event) { install_button(); }, 1000 );

			// set a timer to check for changes in the lat/long
			setInterval( function() {
				document.getElementById("myonoffswitch").dispatchEvent( new CustomEvent( "isPathnameChanged", { detail: { }, bubbles: true, cancelable: true }) );
			},10000);

		};

