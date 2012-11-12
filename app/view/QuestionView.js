/**
 *file:QestionView.js
 *author:James Lee
 *email:james.donghawn.lee@gmail.com
 **/

Ext.define('PracticeBrain.view.QuestionView',{
	extend:'Ext.Container',
	alias:'widget.questionview',
 	fullscreen:'true',
	layout:'fit',
	
	initialize:function(){

		console.log('init_questionview');
		var startStore = Ext.getStore('BrainStore');
		var startModel = startStore.findRecord('id',0);
		if(startModel==null)
			console.log('empty model');
		var numbers = startModel.get('numbers');
		var num_stat = startModel.get('status');
		var numbers_len = numbers.length;

		/* Question buttons include numbers choosed randomly
		 * Hide buttons include no numbers*/
		var hbutton = new Array();
		
		for(var i=0;i<numbers_len;i++)
		{
			if(num_stat[i]==true)
			{
				hbutton[i] = Ext.create('Ext.Button',{
						text:''+numbers[i],
		    				ui:'action',
						id:''+i,
						flex:1
						});
			}else{
				hbutton[i] = Ext.create('Ext.Button',{
						text:'?',
		    				ui:'action',
						id:''+i,
						flex:1,
						handler:this.onTouchNum,
						scope:this
						});
			}
		}

		/*Create container for grid UI buttons
		 * Grid compose of vertical boxes including horizontal boxes having buttons */
		var hview=Ext.create('Ext.Container',{layout:{type:'vbox'}});
		
		/*numbers have same row and column length thus 4,9,16...*/
		var grid_rowcolum = Math.sqrt(numbers_len);

		var hcont = new Array();
		var button_cnt=0;

		for(var k=0;k<grid_rowcolum;k++)
		{
			hcont[k] = Ext.create('Ext.Container',{layout:{type:'hbox'},flex:1});
			for(var j=0;j<grid_rowcolum;j++)
			{
				hcont[k].add(hbutton[button_cnt]);
				button_cnt++;
			}
			hview.add(hcont[k]);
		}

		var questionNum
		if(startModel.get('success')==true || startModel.get('init')==true)
			questionNum = startModel.getNextQuestionNum();
		else
			questionNum = startModel.get('question');
		startModel.set('init',false);
		if(questionNum == 99999)
			this.SuccessandBackHome();
		else{
			/*Insert delay due to UI display problem*/
			var duration = 100; // = 0.1 seconds
			window.setTimeout(function() {
   	 			Ext.Viewport.setActiveItem(hview);
				Ext.Msg.alert('Question', 'Where is '+questionNum+'?', Ext.emptyFn);
			}, duration);
		}
	
	},

	onTouchNum:function(arg){
		console.log('touched ');
		this.fireEvent('touchedButton',arg);
	},

	SuccessandBackHome:function(){
		console.log('success and back to home');
		this.fireEvent('successBack');
	}
});
