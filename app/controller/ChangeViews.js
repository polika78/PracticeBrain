/**
 *file:ChangeViews.js
 *author:James Lee
 *email:james.donghawn.lee@gmail.com
 **/

Ext.define('PracticeBrain.controller.ChangeViews',{
	extend:'Ext.app.Controller',
	alias:'ChangeViews',

	config:{
		refs:{
			main:'mainview',
			start:'startview',
			question:'questionview'
		},
		control:{
			main:{
				startgame:'onStartGame',
			},
			start:{
				goquest:'showQuestions'
			},
			question:{
				touchedButton:'handleTouchButton',
				successBack:'changeBackHome'
			}
		}
	},
	onStartGame: function(){
		console.log('onStartGame');
		var startStore = Ext.getStore('BrainStore');
		var startModel = startStore.findRecord('id',0);
		if(startModel==null)
			console.log('empty model');
		startModel.generateNumbers();

		var startview = Ext.create('PracticeBrain.view.StartView');
		Ext.Viewport.add([startview]);
		Ext.Viewport.setActiveItem(startview);
	},
	showQuestions: function(a){
		console.log('onQuestion');
		var questionview = Ext.create('PracticeBrain.view.QuestionView');
		Ext.Viewport.add([questionview]);
		Ext.Viewport.setActiveItem(questionview);
	},

	handleTouchButton:function(a){
		console.log('touchedButton '+a.getId());
		var store = Ext.getStore('BrainStore');
		var model = store.findRecord('id',0);
		if(model==null)
			console.log('empty model');
		console.log('trial count '+model.get('trialcnt'));
		model.set('trialcnt',model.get('trialcnt')+1);
		console.log('trial count '+model.get('trialcnt'));
		var questNum = model.get('question');
		if(model.isSuccessful(a.getId(),questNum))
		{
			model.updateStatus(a.getId());
			model.updateSuccess(true);
		}else{
			console.log('not match');
			model.updateSuccess(false);
		}
		var questionview = Ext.create('PracticeBrain.view.QuestionView');
		Ext.Viewport.add([questionview]);
		Ext.Viewport.setActiveItem(questionview);
	},

	changeBackHome:function(){
		console.log('BackHome');
		var store = Ext.getStore('BrainStore');
		var model = store.findRecord('id',0);
		Ext.Msg.alert('Conglaturation!!', 'You tried '+model.get('trialcnt')+' times!!', Ext.emptyFn);
		model.set('trialcnt',0);
		var mainview = Ext.create('PracticeBrain.view.MainView');
		Ext.Viewport.add([mainview]);
		Ext.Viewport.setActiveItem(mainview);
		
	},

	launch: function(){
		this.callParent();
		console.log('launch');
	},
	init: function(){
		this.callParent();
		console.log('init');
	}
	
});
