var convertToNumbers = function(insert) {
	var output = [];
	var table = [
		[' '],
		[''],
		['a', 'b', 'c'],
		['d', 'e', 'f'],
		['g', 'h', 'i'],
		['j', 'k', 'l'],
		['m', 'n', 'o'],
		['p', 'q', 'r', 's'],
		['t', 'u', 'v'],
		['w', 'x', 'y', 'z']
	];
	for (var i = 0; i < insert.length; i++) {
		var char = insert.charAt(i).toLowerCase();
		for (var l = 0; l < table.length; l++) {
			if (table[l].includes(char)) {
				output.push(l);
			}
		}
		if (!isNaN(char)) {
			output.push(char);
		}
	}
	return output.join('');
};
var navigate = function(url) {
	chrome.tabs.getSelected(null, function(tab) {
		console.log(tab);
		chrome.tabs.update(tab.id, { url: url });
	});
};

chrome.runtime.onInstalled.addListener(function() {
	chrome.omnibox.onInputChanged.addListener(function(value) {
		console.log('changed to', value);
	});
	chrome.omnibox.onInputEntered.addListener(function(value) {
		// check if has first port and convert to port
		var values = value.split(' ');
		if (values.length == 2) {
			if (values[0] === 'port' && values[1].length == 4) {
				var el = document.createElement('textarea');
				el.value = convertToNumbers(values[1]);
				document.body.appendChild(el);
				el.select();
				document.execCommand('copy');
				document.body.removeChild(el);

				alert(`${convertToNumbers(values[1])} is copied to your clipboard.`);
				return;
			}
		}

		// Redirect to port
		let port = value;
		// Limit to 4 numbers
		if (port.length > 4) {
			port = port.substring(0, 4);
			console.log('localhost: too long, so shortened and kept at 4 numbers');
		} else if (port.length < 4) {
			alert("ports with less then 4 numbers won't work");
		}
		//
		var url = 'http://localhost:' + convertToNumbers(port);
		console.log(url);
		navigate(url);
	});
});
