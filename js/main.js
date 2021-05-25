define(function (require) {
	let pager = require('pager');
	let ko = require('knockout');
	let fontawesome = require('fontawesome');

	/* CSS */
	let fontawesomeCss = require('css!css/fontawesome');
	const html = document.querySelector('html');
	html.dataset.theme = `theme-light`;
	let mainCss = require('css!css/main');

	let o = {
		loadPage: function (callback,page) {
			require(['mainPage'], function (mainPage) {
				mainPage.init();
				callback(mainPage);
			});
		},
	};
	// extend your view-model with pager.js specific data
	pager.extendWithPage(o);
	// apply the view-model using KnockoutJS as normal
	ko.applyBindings(o);
	// start pager.js
	pager.start();
});
