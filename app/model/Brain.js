/**
 *file:Brain.js
 *author:James Lee
 *email:james.donghawn.lee@gmail.com
 **/

Ext.define('PracticeBrain.model.Brain',{
	extend:'Ext.data.Model',
	config:{
		idProperty: "unique",
		fields:[
			{name:'id', type:'int'},
			{name:'sound', type:'boolean'},
			{name:'difficulty', type:'int'},
			{name:'numbers', type:'auto'},
			{name:'status', type:'auto'},
			{name:'question',type:'int'},
			{name:'success',type:'boolean'},
			{name:'init',type:'boolean'},
			{name:'trialcnt',type:'int'}
		]
	},
	proxy:{
		type:'localstorage'		
	},
	
	getRandom:function(arr, size) {
    		var shuffled = arr.slice(0), i = arr.length, temp, index;
   		while (i--) {
        		index = Math.floor(i * Math.random());
        		temp = shuffled[index];
        		shuffled[index] = shuffled[i];
        		shuffled[i] = temp;
    		}
    		return shuffled.slice(0, size);
	},
	
	generateNumbers:function(){
		var seed = new Array();
		var level = this.get('difficulty');
		console.log(level);
		switch(level){
			case 0:
				seed = [1,2,3,4];
				break;
			case 1:
				seed = [1,2,3,4,5,6,7,8,9];
				break;
			case 2:
				seed = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
				break;
			default:
				console.log('No level');
				break;
		}
		console.log(seed);
		var numbers = this.getRandom(seed,seed.length);
		this.set('numbers',numbers);
		var num_stat = new Array();
		for(var i=0;i<numbers.length;i++)
		{
			num_stat[i]=false;
		}
		this.set('status',num_stat);
	},

	getNextQuestionNum:function(){
		var seed_question = new Array();
		var numbers = this.get('numbers');
		var num_stat = this.get('status');
		var j=0,l=0;
		while(j<numbers.length)
		{
			if(num_stat[j]==false)
			{
				seed_question[l++]=numbers[j];
			}
			j++;
		}
		if(l==0)
		{
			return 99999;
		}else{		
			var questionNum = this.getRandom(seed_question,seed_question.length);
			this.set('question',questionNum[0]);
			return questionNum[0];
		}
	},

	updateSuccess:function(isSucc){
		this.set('success',isSucc);
	},

	updateStatus:function(index){
		var num_stat = this.get('status');
		num_stat[index]=true;
	},

	isSuccessful: function(index,value){
		var values = this.get('numbers');
		console.log(values);
		if(values[index]==value)
			return true;
		else
			return false;
	}
});
