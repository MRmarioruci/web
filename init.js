requirejs.config({
	'baseUrl': '.',
	"paths": {
		/* Vendor libs */
		"knockout": "./js/vendor/knockout",
		"pager": "./js/vendor/pager",
		"jquery": "./js/vendor/jquery",
		"fontawesome": "./js/vendor/fontawesome",
		"text": './js/vendor/text',
		"moment": './js/vendor/moment',
		"typed": './js/vendor/typed',

		/* Instances */
		"mainPage": "./js/instances/mainPage",

		/* Classes */
		//"CmsConference": "./js/classes/CmsConference",


		/* Components */
		"toggleComp": "./js/components/toggle",

		/* Bindinghandlers */
		"dropdown": "./js/bindingHandlers/dropdownBH",
		"modal": "./js/bindingHandlers/modalBH",
		"tabs": "./js/bindingHandlers/tabsBH",
		"copyClipboard": "./js/bindingHandlers/copyClipboardBH",
		"typedBH": "./js/bindingHandlers/typedBH",

		/* Extenders */
		"toggler": "./js/extenders/toggler",

		"init": "./init",
	},
	'map': {
		'*':{
			'css': 'style/css'
		}
	},
	'shim': {
		'moment': {	exports: 'moment'},
		'jquery': {	exports: 'jQuery'},
	}
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(["./js/main"]);
