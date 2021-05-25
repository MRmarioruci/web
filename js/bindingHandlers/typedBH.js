define(['knockout', 'typed'],function(ko, Typed){
	ko.bindingHandlers.typed = {
		update: function (element, valueAccessor, allBindingsAccessor, data, context) {
			setTimeout( () => {
				let typed = new Typed(element, {
					strings: valueAccessor()(),
					typeSpeed: 90,
					loop: true
				});
			}, 250)
		},
	};
});
