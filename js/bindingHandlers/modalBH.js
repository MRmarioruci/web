define(['knockout','css!css/partials/modal'],function(ko){
	ko.bindingHandlers.modal = {
		update: function (element, valueAccessor, allBindingsAccessor, data, context) {
			if(valueAccessor()()){
				$(element).addClass('active');
				$(element).find('.modal').addClass('active');
				setTimeout(() => {
					$(element).find('.modal--x').on('click', () => {
						valueAccessor()(false);
					});
				}, 300);
			}else{
				$(element).removeClass('active');
				$(element).find('.modal').removeClass('active');
			}
		},
	};
});
