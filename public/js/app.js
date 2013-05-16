$.tablesorter.addParser({
	// set a unique id
	id: 'snow-distance',
	is: function (s) {
		// return false so this parser is not auto detected
		return false;
	},
	format: function (s, c, t) {
		var apiRow = $(t).parent().data('connection');
		var stmp = s;

		if ( !! apiRow) {
			stmp = apiRow.distance;
		}

		return stmp;
	},
	type: 'numeric'
});
$.tablesorter.addParser({
	// set a unique id
	id: 'snow-time',
	is: function (s) {
		// return false so this parser is not auto detected
		return false;
	},
	format: function (s, c, t) {
		var apiRow = $(t).parent().data('connection');
		var stmp = s;

		if ( !! apiRow) {
			stmp = apiRow.time;
		}

		return stmp;
	},
	type: 'numeric'
});

$('#resort').tablesorter({
	sortList: [[1,0]],
	headers: {
		0: {
			sorter: 'text'
		},
		1: {
			sorter: 'snow-distance'
		},
		2: {
			sorter: 'snow-time'
		}
	}
});