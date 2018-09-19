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
		chrome.tabs.update(tab.id, { url: url });
	});
};

chrome.runtime.onInstalled.addListener(function() {
	chrome.omnibox.onInputChanged.addListener(function(e) {
		console.log('changed to', e);
	});
	chrome.omnibox.onInputEntered.addListener(function(e) {
		var url = 'http://localhost:' + convertToNumbers(e);
		navigate(url);
	});
});
