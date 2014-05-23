/* http://keith-wood.name/gsblogbar.html
   Google Search Blogbar for jQuery v2.0.0.
   See http://www.google.com/uds/solutions/blogbar/reference.html.
   Written by Keith Wood (kbwood{at}iinet.com.au) November 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */

(function($) { // hide the namespace

	var pluginName = 'gsblogbar';

	/** Create the Google Search Blogbar plugin.
		<p>Sets a <code>div</code> to display a blogbar.</p>
		<p>Expects HTML like:</p>
		<pre>&lt;div>&lt;/div></pre>
		<p>Provide inline configuration like:</p>
		<pre>&lt;div data-gsblogbar="name: 'value'">&lt;/div></pre>
	 	@module GSBlogBar
		@augments JQPlugin
		@example $(selector).gsblogbar({search: ['jquery']}); */
	$.JQPlugin.createPlugin({

		/** The name of the plugin. */
		name: pluginName,

		/** Cycle times - very short. */
	cycleVShort: 3000,
		/** Cycle times - short. */
	cycleShort: 10000,
		/** Cycle times - medium (default). */
		cycleMedium: 15000,
		/** Cycle times - long. */
	cycleLong: 30000,
		/** Cycle times - manual. */
	cycleManual: 3000000,
		/** Cycle modes - random. */
	cycleRandom: 1,
		/** Cycle modes - linear (default). */
		cycleLinear: 2,
		/** Link targets - self. */
	targetSelf: '_self',
		/** Link targets - blank. */
	targetBlank: '_blank',
		/** Link targets - top. */
	targetTop: '_top',
		/** Link targets - parent. */
	targetParent: '_parent',
		/** Results order - relevance. */
	orderRelevance: 'order-by-relevance',
		/** Results order - daye. */
	orderDate: 'order-by-date',

		/** Default settings for the plugin.
			@property [horizontal=true] {boolean} <code>true</code> for horizontal display,
						or <code>false</code> for vertical.
			@property [verticalCompressed=false] {boolean} <code>true</code> for compressed layout when vertical,
						or <code>false</code> for expanded.
			@property [title=''] {string} Title for the bar.
			@property [search='jquery'] {string|string[]} Single or list of search terms.
			@property [siteRestriction=''] {string} Specify a site to restrict searches to.
			@property [order=this.orderDate] {string} Control the order of the results.
			@property [manyResults=false] {boolean} <code>true</code> for many results,
						or <code>false</code> for only a few.
			@property [cycleTime=this.cycleManual] {number} Time between cycles of the search terms (milliseconds).
			@property [cycleMode=this.cycleLinear] {number} Mode of cycling through the search terms.
			@property [linkTarget=this.targetSelf] {string} Control where the blog links open.
			@property [currentResult=''] {string|jQuery|Element} jQuery selector, jQuery object,
						or element for additional info for current entry when horizontal. */
		defaultOptions: {
			horizontal: true,
			verticalCompressed: false,
			title: '',
			search: 'jquery',
			siteRestriction: '',
			order: this.orderDate,
			manyResults: false,
			cycleTime: this.cycleManual,
			cycleMode: this.cycleLinear,
			linkTarget: this.targetSelf,
			currentResult: ''
	},

		_init: function() {
			this.defaultOptions.order = this.orderDate,
			this.defaultOptions.cycleTime = this.cycleManual,
			this.defaultOptions.cycleMode = this.cycleLinear;
			this.defaultOptions.linkTarget = this.targetSelf;
			this._super();
	},

		_optionsChanged: function(elem, inst, options) {
		$.extend(inst.options, options);
			this._updateGSBlogbar(elem[0], inst);
	},

		/** Redisplay the blogbar with an updated display.
			@private
			@param elem {Element} The affected division.
			@param inst {object} The instance settings. */
		_updateGSBlogbar: function(elem, inst) {
		var getElement = function(selector) {
			var element = inst.options[selector];
			element = (element ? (element.jQuery ? element : $(element)) : null);
			return (element && element.length ? element[0] : null);
		};
		var search = inst.options.search;
		search = ($.isArray(search) ? search : [search]);
			inst.blogbar = new GSblogBar(elem, {largeResultSet: inst.options.manyResults,
			horizontal: inst.options.horizontal,
			resultStyle: (inst.options.verticalCompressed ?
				GSblogBar.RESULT_STYLE_COMPRESSED : GSblogBar.RESULT_STYLE_EXPANDED),
			title: inst.options.title, linkTarget: inst.options.linkTarget,
			orderBy: inst.options.order, currentResult: getElement('currentResult'),
			siteRestriction: inst.options.siteRestriction,
			autoExecuteList: {executeList: search, cycleTime: inst.options.cycleTime,
				cycleMode: inst.options.cycleMode}});
	},

		/** Perform a new search in the blogbar.
			@param elem {Element} The affected division.
			@param search {string} The new search terms. */
		search: function(elem, search) {
			var inst = this._getInst(elem);
		if (inst) {
			$.extend(inst.options, {search: search});
			inst.blogbar.execute(search);
		}
	},

		_preDestroy: function(elem, inst) {
			elem.empty();
		}
	});

	// Add required external files - note: key must be set before loading this module
	if ($('script[src*="www.google.com/uds/api?file=uds.js"]').length === 0) {
	if (!$.googleSearchKey) {
		throw 'Missing Google Search Key';
	}
	document.write('<script type="text/javascript" src="http://www.google.com/uds/' +
		'api?file=uds.js&v=1.0&key=' + $.googleSearchKey + '"></script>\n' +
		'<link type="text/css" href="http://www.google.com/uds/css/gsearch.css" rel="stylesheet"/>\n');
	}
	document.write('<script type="text/javascript" src="http://www.google.com/uds/' +
	'solutions/blogbar/gsblogbar.js"></script>\n' +
	'<link type="text/css" href="http://www.google.com/uds/solutions/blogbar/gsblogbar.css" ' +
	'rel="stylesheet"/>\n');

})(jQuery);
