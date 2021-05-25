define([
	'knockout',
	'moment',
	'css!css/eventInfo',
	'pausableUpdate',
	'toggleComp',
	'toggler',
	'dateTimepicker',
	'timezonePicker',
	'copyClipboard'
], (ko, moment) => {
	class EventInfo {
		constructor(conference){
			this.conference_id = conference.id;
			this.postPone = ko.observable(false);
			this.compAppLink = ko.pureComputed( () => {
				return window.location.origin+'/app/'+this.url();
			})
			this.compWebsiteLink = ko.pureComputed( () => {
				return window.location.origin+'/eventPage/'+this.url();
			})
			this.name = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('name', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.title = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('title', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.url = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('url', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.start = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('start', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.startTime = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('startTime', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.end = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('end', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.endTime = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('endTime', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.timezone = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('timezone', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.closeAfterEnd = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('closeAfterEnd', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.usePassword = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('usePassword', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.password = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('password', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.venue = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('venue', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
			this.location = ko.observable().extend({
				'pausableUpdate':{
					callback: (newVal) => {return this.editValue('location', newVal) },
					preventCallback: this.postPone,
					isPromise: true,
				}
			});
		}
		init(){
			this.postPone(true);
			this._get()
			.then( (data) => {
				this.name(data.name);
				this.title(data.title);
				this.url(data.url);
				this.start(data.start);
				this.startTime(data.start_time);
				this.end(data.end);
				this.endTime(data.end_time);
				this.timezone(data.timezone);
				this.closeAfterEnd(data.closeAfterEnd=='1');
				this.usePassword(data.usePassword=='1');
				this.password(data.password);
				this.venue(data.venue);
				this.location(data.location);
				console.log(data);
			})
			.catch( (err) => {
				console.error(err);
			})
			.finally( () => {
				this.postPone(false);
			})
		}
		editValue(key, value) {
			let o = {};
			o[key] = value;
			return this._edit(o);
		}
		_get(){
			return new Promise( (resolve, reject) => {
				$.post( '/cms2/index.php/event/get/'+this.conference_id, {'getLoginPage':1})
				.done( (data) =>  {
					if(data.status == 'ok'){
						resolve(data.data);
					}else{
						reject(data.status);
					}
				})
				.fail( (err) => {
					reject(err);
				})
			})
		}
		_edit(changes){
			return new Promise( (resolve, reject) => {
				$.post( '/cms2/index.php/conferences/edit', {
					'conf': this.conference_id,
					'changes':changes
				}).done((data) => {
					if( data.status=='ok' ){
						resolve(data.data);
					}else {
						reject(data.status);
					}
				}).fail( (err) => {
					reject(err);
				})
			})
		}
	}
	return EventInfo;
});
