define(['knockout','jquery'], function(ko,$){
	function clicked(element) {
		$prevHtml = $(element).html();
		$(element).addClass('btn-success');
		$(element).html('Copied!');
		window.getSelection().removeAllRanges();
		setTimeout(function(){
			$(element).html($prevHtml);
			$(element).removeClass('btn-success');
		}, 3000);
	}
	ko.bindingHandlers.copyClipboardBH = {
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			$(element).on('click',function(){
				var $temp = $("<input>");
				$("body").append($temp);
				$temp.val(valueAccessor()).select();
				document.execCommand("copy", false, $temp.val());
				clicked(element);
				$temp.remove();
			});
		},
	};
});
