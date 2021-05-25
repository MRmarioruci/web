define(['knockout','text!html/components/toggle.html'],function(ko,txt){
	ko.components.register('toggle-widget', {
		viewModel: function(params) {
			var self = this;
			self.value = params?(params.value?params.value:false):false;
			self.waiting = params?(params.waiting?params.waiting:false):false;
			self.isCheckbox = params?(params.isCheckbox?params.isCheckbox:false):false;
			if( params && params.fullPerm ){
				self.editable = params.fullPerm.e;
				self.visible = params.fullPerm.v;
			}else{
				self.editable = params?(params.editable?params.editable:false):false;
				self.visible = params?(params.visible?params.visible:true):true;
			}
			self.enabled = ko.pureComputed(function() {
				return ko.unwrap(self.editable) && !ko.unwrap(self.waiting);
			});
			self.id = ko.pureComputed(function(){
				return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			})
		},
		template: txt
	});
})
