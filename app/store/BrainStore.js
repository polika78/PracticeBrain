/**
 *file:BrainStore.js
 *author:James Lee
 *email:james.donghawn.lee@gmail.com
 **/

Ext.define('PracticeBrain.store.BrainStore',{
	extend:'Ext.data.Store',
	requires:'Ext.data.proxy.LocalStorage',
	config:{
		model:'PracticeBrain.model.Brain',
		proxy:{
			type:'localstorage'
		}
	}
});
