Ext.application({
	name:'PracticeBrain',
	controllers:['ChangeViews'],
	views:['MainView','StartView','QuestionView'],
	stores:['BrainStore'],
	models:['Brain'],

	launch:function(){
		var newModel;
		var store = Ext.getStore('BrainStore');
		var model = store.findRecord('id',0);
		if(model == null)
		{
			console.log('generate model');
			newModel = Ext.create('PracticeBrain.model.Brain');
			newModel.set('id',0);
			newModel.set('sound',false);
			newModel.set('difficulty',0);
			newModel.set('success',false);
			newModel.set('init',true);
			newModel.set('trialcnt',0);
			store.add(newModel);
			store.sync();
		}
		var mainView={
			xtype:'mainview'
		};

		Ext.Viewport.add(mainView);
	},

});
