define(['knockout'],function(ko){
	ko.bindingHandlers.dropdown = {
		init: function (element, valueAccessor, allBindingsAccessor, data, context) {
			let postPone = ko.observable(false);
			$(element).find('.dropdown-trigger').on('click', (e) => {
				if($(element).hasClass('active')){
					$(element).removeClass('active');
				}else{
					postPone(true);
					$(element).addClass('active');
					setTimeout( () => {
						postPone(false);
					}, 150);
				}
			})
			$(document).on("click", function () {
				if(!postPone()){
					if($(element).hasClass('active')){
						$(element).removeClass('active');
					}
				}
			});
		},
	};
});
