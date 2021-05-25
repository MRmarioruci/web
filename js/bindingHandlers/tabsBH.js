define(['knockout'],(ko) => {
	ko.bindingHandlers.tabs = {
		update: function (element, valueAccessor, allBindingsAccessor, data, context) {
			let tabs = $(element);
			setTimeout( () => {
				let activeItem = tabs.find('.active');
				let activeWidth = activeItem.innerWidth();
				$(element).find(".selector").css({
					"left": activeItem.position().left + "px",
					"width": activeWidth + "px"
				});
			}, 300)

			$(element).on("click","a", function(e){
				$(element).find('a').removeClass("active");
				$(this).addClass('active');

				var activeWidth = $(this).innerWidth();
				var itemPos = $(this).position();
				$(element).find(".selector").css({
					"left":itemPos.left + "px",
					"width": activeWidth + "px"
				});
			});
		},
	};
});
