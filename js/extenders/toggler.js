define(['knockout'],function(ko){
	ko.extenders.toggler = function(target, option) {
		var options = ( option && option.options && option.options.length )?option.options:null;
		var i = 0;
		if( options && options.length ){
			for (var j = options.length - 1; j >= 0; j--) {
				if( options[j] == target() ){
					i = j;
				}
			}
		}
		target.toggle = function () {
			/* If no options where given toggle between true/false */
			if(!options){
				target( !target() );
			}
			/* If the options array exists toggle between the array's values */
			else{
				i++;
				if(i>=options.length || i<0) i=0;
				if(i<options.length){
					target( options[i] );
				}else{
					target( undefined );
				}
			}
		}
		return target;
	};
});