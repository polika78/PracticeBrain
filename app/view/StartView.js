/**
 *file:StartView.js
 *author:James Lee
 *email:james.donghawn.lee@gmail.com
 **/

Ext.define('PracticeBrain.view.StartView',{
	extend:'Ext.Container',
	alias:'widget.startview',
 	fullscreen:'true',
	layout:'fit',
	id:'startview',
	
	initialize:function(){

		console.log('init_startview');
		var startStore = Ext.getStore('BrainStore');
		var startModel = startStore.findRecord('id',0);
		if(startModel==null)
			console.log('empty model');
		var numbers = startModel.get('numbers');

		/*Create qeustion buttons
		 * Question buttons include numbers choosed randomly*/
		var qbutton = new Array();

		for(var i=0;i<numbers.length;i++)
		{
			qbutton[i] = Ext.create('Ext.Button',{
						text:numbers[i],
		    				ui:'normal',
						flex:1
						});
		}
		
		/*Create container for grid UI buttons
		 * Grid compose of vertical boxes including horizontal boxes having buttons */
		var qview=Ext.create('Ext.Container',{layout:{type:'vbox'}});
		
		/*numbers have same row and column length thus 4,9,16...*/
		var grid_rowcolum = Math.sqrt(numbers.length);

		var qcont = new Array();

		var button_cnt=0;

		for(var k=0;k<grid_rowcolum;k++)
		{
			qcont[k] = Ext.create('Ext.Container',{layout:{type:'hbox'},flex:1});
			for(var j=0;j<grid_rowcolum;j++)
			{
				qcont[k].add(qbutton[button_cnt]);
				button_cnt++;
			}
			qview.add(qcont[k]);
		}

		/*Showing button UI with grid structure
		 * Firstly, number buttons are shown, and then hide buttons are appeared 
		 * with popup message which show the question for position of number chosen randomly*/

		/*Insert delay due to UI display problem*/
		var duration1 = 100; // = 0.5 seconds
		window.setTimeout(function() {
			Ext.Viewport.setActiveItem(qview);
		}, duration1);
	
		/*View change for question*/
		var tmpthis = this;
		var duration2 = 3000; // = 3 seconds
		window.setTimeout(function() {
			tmpthis.onQuestion();
		}, duration2);
	},
	onQuestion: function(){
		this.fireEvent('goquest');
	}
	
});
