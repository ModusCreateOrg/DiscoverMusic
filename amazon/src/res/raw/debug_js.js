/**
 * debug_js.js
 * 
 * Copyright (c) 2012 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * 
 * PROPRIETARY/CONFIDENTIAL
 * 
 * Use is subject to license terms.
 */
window.jsConsole = {

	/**
	 * A jQuery AJAX error handler which updates the error display
	 */
	handleError : function(jqXHR, textStatus, errorThrown) {
		$('#error').text(textStatus);
	},

	/**
	 * Returns a jQuery AJAX response handler which updates the output display
	 * 
	 * @param formatter
	 *            A formatter function, which takes the raw data and returns an
	 *            array of DOM nodes
	 * @return The response handler
	 */
	handleOutput : function(formatter) {
		return function(data, textStatus, jqXHR) {
			var output = $('#output');
			var lines = formatter(data);
			for (var i in lines) {
				output.append(lines[i]);
			}
			if (lines.length > 0) {
				var scroll = $('#scroll');
				scroll.scrollTop(scroll.prop('scrollHeight') - scroll.height());
			}
		};
	},

	/**
	 * Make a new log entry node and fill it in with the given data
	 * 
	 * @param level
	 *            The log level string
	 * @param msg
	 *            The log message
	 * @param loc
	 *            The source location of the message (may be null)
	 * @return A DOM node suitable for appending to the output display
	 */
	format : function(level, msg, loc) {
		var li = $('#template').clone();
		li.removeAttr('id');
		li.addClass('level-' + level);
		$('.level', li).text(level);
		$('.msg', li).text(msg);
		if (loc == null) {
			$('.loc', li).remove();
		} else {
			$('.loc', li).text(loc);
		}
		return li;
	},

	/**
	 * A formatter function (acceptable to handleOutput) which formats a line of
	 * input typed in by the user
	 */
	formatRequest : function(js) {
		return [ this.format('J', js, null) ];
	},

	/**
	 * Parse and format a single log line returned by the server
	 * 
	 * @param line
	 *            The raw log line (without a trailing newline)
	 * @return A DOM node suitable for appending to the output display
	 */
	formatLogLine : function(line) {
		var level = line.substring(0, 1);
		var msg;
		var at;
		var atPos = line.lastIndexOf(' at ');
		if (atPos < 0) {
			msg = line.substring(2);
			at = null;
		} else {
			msg = line.substring(2, atPos);
			at = line.substring(atPos + 1);
		}
		return this.format(level, msg, at);
	},

	/**
	 * A formatter function (acceptable to handleOutput) which formats any
	 * number of log lines returned by the server
	 */
	formatLog : function(logs) {
		// split into lines
		var lines = logs.split('\n');
		// format each line
		var ret = [];
		for (var i in lines) {
			if (lines[i].length > 0) {
				ret.push(this.formatLogLine(lines[i]));
			}
		}
		return ret;
	},

	/**
	 * Send the user's input to the server for execution
	 */
	exec : function() {
		var input = $('#input');
		var js = input.val();
		this.handleOutput(this.formatRequest.bind(this))(js);
		$.ajax("/", {
			// do not cache response data
			cache : false,
			// expected response data type
			dataType : 'text',
			// request data type
			contentType : 'text/javascript',
			// request data
			data : js,
			// do not munge request data
			processData : false,
			// request method
			type : 'POST',
			// error handler
			error : this.handleError,
			// success handler
			success : this.handleOutput(this.formatLog.bind(this))
		});
		input.val('');
		input.focus();
	},

	/**
	 * Poll the server for log output
	 */
	consume : function() {
		$.ajax('/log.txt', {
			// do not cache response data
			cache : false,
			// expected response data type
			dataType : 'text',
			// request method
			type : 'GET',
			// error handler
			error : this.handleError,
			// success handler
			success : this.handleOutput(this.formatLog.bind(this))
		});
	},

	/**
	 * Initialize the display and start polling for output
	 */
	init : function() {
		window.setInterval(this.consume.bind(this), 1000);
		$('#input').focus();
	}
};

$(document).ready(jsConsole.init.bind(jsConsole));