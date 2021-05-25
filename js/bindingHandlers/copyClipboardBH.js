define(['knockout','jquery'], function(ko,$){
	function getSpanElement(element) {
		var tmp = $(element).find('span').first();
		return tmp.length?tmp:null;
	}
	function clicked($button) {
		$button.removeClass('btn-primary');
		$button.addClass('btn-success');
		$button.html('Copied!');
		window.getSelection().removeAllRanges();
		setTimeout(function(){
			$button.html('Copy');
			$button.removeClass('btn-success');
			$button.addClass('btn-primary');
		},3000);
	}
	ko.bindingHandlers.copyClipboardBH = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			$(element).empty();
			var $span = $('<span style="display: inline-block;width: 1px;height: 1px;opacity:0;overflow: hidden;"></span>');
			$(element).append($span);
			var $button = $('<button class="btn btn-sm btn-primary" style="margin: 5px;">Copy</button>');
			$(element).append($button);
			$button.on('click',function(){
				if( typeof navigator !== 'undefined' && navigator.clipboard ){
					navigator.clipboard.writeText(ko.unwrap(valueAccessor()))
					.then(function(){
						clicked($button);
					})
					.catch(function() {});
				}else{
					var range = document.createRange();
					range.selectNode($span[0]);
					window.getSelection().removeAllRanges();
					window.getSelection().addRange(range);
					document.execCommand("copy");
					clicked($button);
				}
			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$button.off();
			});
		},
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var e = getSpanElement(element);
			if(e){
				e.text(ko.unwrap(valueAccessor()));
			}
		},
	};
});
