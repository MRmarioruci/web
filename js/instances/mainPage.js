define([
	'knockout',
	'toggleComp',
	'toggler',
	'dropdown',
	'modal',
	'typedBH'
], (ko) => {
	class MainPage {
		constructor(){
			this.isLightTheme = ko.observable(false);
			this.isLightTheme.subscribe( (newVal) => {
				const html = document.querySelector('html');
				if(!newVal){
					html.dataset.theme = 'theme-light';
				}else{
					html.dataset.theme = 'theme-dark';
				}
			})
			this.strings = ko.observableArray([
				'web apps',
				'desktop apps',
				'small business websites',
				'complex interactive apps',
				'anything you need'
			])
			this.skills = ko.observableArray([]);
			this.experience = ko.observableArray([]);
			this.education = ko.observableArray([]);
			this.projects = ko.observableArray([]);
			this.intro = ko.observable(null);
			this.links = ko.observable();
			this.profile = ko.observable();
			this.languages = ko.observableArray([]);
			this.name = ko.observable(null);
			this.surname = ko.observable(null);
			this.email = ko.observable(null);
			this.message = ko.observable(null);
			this.canSend = ko.pureComputed( () => {
				let email = this.email();
				let message = this.message();
				return email && message;
			})
		}
		init(){
			this._getData()
			.then( (data) => {
				let sk = data.skills.map( (skill) => {
					return new Skill(skill, this);
				})
				this.skills(sk);

				let exp = data.experience.map( (exp) => {
					return new Experience(exp, this);
				})
				this.experience(exp);

				let edu = data.education.map( (edu) => {
					return new Education(edu, this);
				})
				this.education(edu);

				let pro = data.projects.map( (project) => {
					return new Project(project, this);
				})
				this.projects(pro);
				this.intro(data.intro);

				this.links(data.links);
				this.languages(data.languages.map( (language) => {
					return language;
				}))
				this.profile(data.profile);
			})
			.catch( (err) => {
				console.error(err);
			})
		}
		_getData(){
			return new Promise( (resolve, reject) => {
				$.post( '/php/controller.php', {
					'action': 'getData'
				})
				.done( (data) => {
					if(data.status=='ok'){
						resolve(data.data);
					}
				})
				.fail( (err) => {
					reject(err);
				})
			});
		}
		_sendMessage(){
			return new Promise( (resolve, reject) => {
				$.post( '/php/controller.php', {
					'action': 'sendMessage',
					'name': this.name(),
					'surname': this.surname(),
					'email': this.email(),
					'message': this.message()
				})
				.done( (data) => {
					if(data.status=='ok'){
						resolve(data.data);
					}
				})
				.fail( (err) => {
					reject(err);
				})
			});
		}
	}
	class Skill{
		constructor(data, parent){
			this.id = data.id;
			this.text = data.text;
			this.icon = data.icon;
		}
	}
	class Experience{
		constructor(data, parent){
			this.id = data.id;
			this.text = data.text;
			this.title = data.title;
			this.year = data.year;
			this.link = data.link;
		}
	}
	class Education{
		constructor(data, parent){
			this.id = data.id;
			this.text = data.text;
			this.title = data.title;
			this.year = data.year;
		}
	}
	class Project{
		constructor(data, parent){
			this.id = data.id;
			this.logo = data.logo;
			this.text = data.text;
			this.link = data.link;
			this.image = data.image;
		}
	}
	return new MainPage;
});