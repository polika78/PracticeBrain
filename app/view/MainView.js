/**
 *file:MainView.js
 *author:James
 *email:polika78@gmail.com
 **/

Ext.define('PracticeBrain.view.MainView',{
	extend:'Ext.Panel',
	alias:'widget.mainview',
	controllers:['Start'],

	initialize:function(){
	    var Main = this;

	    var tabPanel = {
            	xtype: 'tabpanel',
            	fullscreen: true,
	        tabBar:{
			docked:'bottom',
	    		layout:{
				pack:'center',
	    			align:'center'
			},
	    		scrollable:{
				direction:'horizontal',
	    			indicators:false
			}
		},
	    	ui:'light',

		items: [
                	{
				xtype: 'formpanel',
                   		title: 'Home',
                    		iconCls: 'home',
				pack:'center',
				align:'center',
                    		layout: 'vbox',
				items:[
				   {
					   docked:'top',
					   html: [
                        			'<img height=220 width=320 src="resources/img/PracticeBrain.png" />',
                    			   ].join("")
				   },
				   {
					xtype: 'button',
					text:'START',
                			ui: 'action',
					id: 'new-game',
					left:120,
					height:50,
					width:100,
					scrollable:false,
					handler:this.onStartButton,
					scope:this
				   },
				]
                	},
	    		{
				title: 'Introduction',
                    		iconCls: 'info',
                    		cls: 'info',
                    		scrollable: true,
                    		html: [
                        	'<h2>You remember the position of numbers. And please touch the number asked.</h2>',
                    		].join("")
			},
			{
				xtype: 'formpanel',
                   		title: 'Settings',
                    		iconCls: 'settings',
                    		layout: 'vbox',
				items:[
				   {
					xtype: 'fieldset',
                			title: 'Sound',
                			items: [
                    			   {
                        			xtype: 'togglefield',
                        			name: 'sound',
						ui:'action',
						id:'soundset',
                        			value: 0,
						listeners:{
							change:function(){
								console.log('onoff');
								var onoff = Ext.getCmp('soundset').getValue();
								var store = Ext.getStore('BrainStore');
								var model = store.findRecord('id',0);
								if(model==null)
									console.log('empty model');
								model.set('sound',onoff);

								if(onoff==true)
								{
									console.log('sound on');
									Main.fireEvent('playsound');
								}else{
									console.log('sound off');
									Main.fireEvent('stopsound');
								}
						}
					}
                   			   }
                			]
				   },
				   {
					xtype: 'selectfield',
					id:'difficultyvalue',
                        		name: 'difficulty',
                        		label: 'Difficulty',
					options:[
						{text: 'easy', value: 0},
						{text: 'medium', value: 1},
						{text: 'hard', value: 2}
				   	],
					listeners:{
						change:function(){
							var setValue = Ext.getCmp('difficultyvalue').getValue();
							var store = Ext.getStore('BrainStore');
							var model = store.findRecord('id',0);
							if(model==null)
								console.log('empty model');
							console.log(setValue);
							model.set('difficulty',setValue);
						}
					}
				   }
				]
			}
		]
	    }
	    Ext.Viewport.add(tabPanel);
	    /*Insert delay due to UI display problem*/
	    var duration1 = 100; // = 0.1 seconds
	    var Main = this;
	    window.setTimeout(function() {

		Ext.Viewport.setActiveItem(tabPanel);
	    }, duration1);
    	    
	     var duration1 = 2000; // = 2 seconds
	     var Main = this;
	     window.setTimeout(function(){
		var store = Ext.getStore('BrainStore');
	        var model = store.findRecord('id',0);
	        if(model.get('sound')==true)
		   Main.fireEvent('playsound');
	        else
		   console.log('off bgsound');
	     }, duration1);
	},

	launch: function(){
		var store = Ext.getStore('BrainStore');
		var model = store.findRecord('id',0);
		if(model.get('sound')==true)
			this.playSound();
		else
			console.log('off bgsound');
	},

	onStartButton:function(){
		console.log('startbutton');
		this.fireEvent('startgame');
	},

	onoffSound:function(arg){
		console.log('onoff');
		var onoff = arg.getValue();
		var store = Ext.getStore('BrainStore');
		var model = store.findRecord('id',0);
		if(model==null)
			console.log('empty model');
		model.set('sound',onoff);

		if(onoff==true)
		{
			console.log('sound on');
			this.fireEvent('playsound');
		}else{
			console.log('sound off');
			this.fireEvent('stopsound');
		}
	}
});
