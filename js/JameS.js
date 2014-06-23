window.onload=function(){

	////////////////////////////////////////////
	/////define arrays that control themself////
	////////////////////////////////////////////
	
		window.SpecialArray = (function() {
		////////////////////////////////////
		////////initialize the array////////
		////////////////////////////////////
			function SpecialArray() {
				var special = Object.create( Array.prototype);
				special = (Array.apply(special, arguments) || special);
				SpecialArray.injectClassMethods(special);
				return(special);
			};
			
			
		////////////////////////////////////
		/////inject all special methods/////
		////////////////////////////////////
			SpecialArray.injectClassMethods = function(special) {
				for(var method in SpecialArray.prototype) {
					if(SpecialArray.prototype.hasOwnProperty(method)){
						special[method] = SpecialArray.prototype[method];
					}	
				}
				return(special);
			};
			
			
		////////////////////////////////////
		/////make special array an array////
		////////////////////////////////////
			SpecialArray.fromArray = function( array ){
	    	    var special = SpecialArray.apply( null, array );
	    	    return( special );
	    	};


		////////////////////////////////////
		////make it identify as an array////
		////////////////////////////////////
    		SpecialArray.isArray = function( value ){
    		    var stringValue = Object.prototype.toString.call( value );
    		    return( stringValue.toLowerCase() === "[object array]" );
    		};
    	
    	
    	////////////////////////////////////
    	/////custom array functionality/////
    	////////////////////////////////////
    		Object.defineProperty(Object.prototype, 'add', {
    			enumerable : false, 
    			value : function(key, value) {this[key] = value;}
    		});
    		Object.defineProperty(Object.prototype, 'remove', {
    			enumerable : false, 
    			value : function (key) {
    				for (var i = Object.keys(this).length; i--;) {		
    	   				 if (Object.keys(this)[i] == key) {
    	   				 	return delete this[Object.keys(this)[i]];
    	   				 }
    				}
   	 			}
    		});
    		Object.defineProperty(Object.prototype, 'contains', {
    			enumerable : false, 
    			value : function (key) {
    				for (var i = Object.keys(this).length; i--;) {
    		   			if (this[key] != undefined)  return true;
    				}
    				return false;
    			}
    		});
    		Object.defineProperty(Object.prototype, 'cycle', {
    			enumerable : false, 
    			value : function (direction) {
    				var from = this[0],
    					end = this.length - 1;
    				if(direction == 'forward'){
    					var to = this[1];
    					this.shift();
    					this.push(from);
    					return from;
    				} else if(direction == 'backward'){
    					var to = this[end];
    					this.pop();
    					this.unshift(to);
    					return from;
    				} 
    			}
    		});
    		 Object.defineProperty(Object.prototype, 'populate', {
    			enumerable : false, 
    			value : function (elements) {
    				var count = 0;
    				for(var i in elements){
    					if(!isNaN(i)){
    						this.push(elements[i]);
    						count++;
    					} else {
    						this[i] = elements[i];
    						count++;
    					}
    				}
    				return false;
    			}
    		});
    		return (SpecialArray);
	}).call( {} );







	////////////////////////////////////////////
	//////the switching mechanism variables/////
	////////////////////////////////////////////


		////////////////////////////////////
    	////////primary site states/////////
    	////////////////////////////////////
			var siteState = {
				/*used to determine if in non-class states*/
				'current' : 'normal',
				'ispurple' : -1,
				'isgreen' : 1,
				'isend' : -1
			}
			var inavcontent = new SpecialArray();
			var inavoptions = ['normal', 'hidden2', 'design', 'green2', 'simple'];
				inavcontent.populate(inavoptions);
				
			var lineStates = {
				'current' : {
					/*current section classes*/
					'.changeable' : 'green',
					'a' : 'green',
					'path.background_line' : 'white',
					'path.logoline' : 'green',
					'#dynamicContent' : 'white',
					'.simple' : 'green',
					'.design' : 'invisible', 
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green',
					'.image' : 'green',
					'.option' : 'green',
					'#simplebackground' : 'white'
				},
				'normal' : {
					/*about section classes*/
					'.changeable' : 'green',
					'a' : 'green',
					'path.background_line' : 'white',
					'path.logoline' : 'green',
					'#dynamicContent' : 'white',
					'.simple' : 'green',
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green',
					'.image' : 'green',
					'.option' : 'green',
					'#simplebackground' : 'white'
				},
				'hidden2' : {
					/*illustration section classes*/
					'.changeable' : 'white',
					'a' : 'white',
					'path.background_line' : 'white',
					'path.logoline' : 'white',
					'#dynamicContent' : 'white',
					'.simple' : 'white',
					'stop.rythm' : 'white',
					'path.logocolor' : 'white',
					'path.logolinefront' : 'white',
					'path.logolinemiddle' : 'white',
					'path.logolinebottom' : 'white',
					'.image' : 'green',
					'.option' : 'white',
					'#simplebackground' : 'black'
				},
				'design' : {
					/*design section classes*/
					'.changeable' : 'green',
					'a' : 'green',
					'path.background_line' : 'white',
					'path.logoline' : 'green',
					'#dynamicContent' : 'white',
					'.simple' : 'green',
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green',
					'.image' : 'green',
					'.option' : 'green',
					'#simplebackground' : 'white'
				},
				'green2' : {
					/*development section classes*/
					'.changeable' : 'green',
					'a' : 'green',
					'path.background_line' : 'green',
					'path.logoline' : 'green',
					'#dynamicContent' : 'black',
					'.simple' : 'green',
					'.green.in' : 'green',
					'.green.out' : 'green',
					'.green2' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green', 
					'.image' : 'green',
					'.option' : 'green',
					'#simplebackground' : 'black'
				},
				'simple' : {
					/*not actually needed*/
				},
				'purple' : {
					/*not actually needed*/
					'.changeable' : 'purple',
					'a' : 'purple',
					'path.background_line' : 'purple',
					'path.finalbg' : 'purple',
					'path.logoline' : 'purple',
					'.simple' : 'purple', 
					'.green.in' : 'purple',
					'.green.out' : 'purple',
					'.green2' : 'green',
					'path.logolinefront' : 'purple',
					'path.logolinemiddle' : 'purple',
					'stop.rythm' : 'purple',
					'path.logolinefront' : 'purple',
					'path.logolinemiddle' : 'purple',
					'path.logolinebottom' : 'purple',
					'path.logocolor' : 'black',
					'.image' : 'purple',
					'.option' : 'green'
				}
			}
	
	
	
		////////////////////////////////////
    	///////////sub navigation///////////
    	////////////////////////////////////
    	
    		/*define possible subnavigation*/
			var hidden2content = new SpecialArray();
			var hidden2options = ['second', 'third', 'fourth', 'first'];
				hidden2content.populate(hidden2options);
			var designcontent = new SpecialArray();
			var designoptions = ['first', 'second'];
				designcontent.populate(designoptions);
			var normalcontent = ['skip'];
			var green2content = ['skip'];
			var simplecontent = ['skip'];
			var contentReference = {
				/*refer to the arrays as contentReference[variable]*/
				'hidden2' : hidden2options,
				'design' : designoptions
			}
			var sectionReference = {
				/*refer to the section's content as sectionReference[variable]*/
				'normal' : normalcontent,
				'hidden2' : hidden2content,
				'design' : designcontent,
				'green2' : green2content,
				'simple' : simplecontent
			}
			var hidden2hrefs = {
				/* for the illustration links to change with the illustration visible */
				'first' : '../images/study1large.jpg',
				'second' : '../images/secondcoloredlarge.jpg',
				'third' : '../images/thirdcoloredlarge.jpg'
			}
	
	
	////////////////////////////////////////////
	//////the switching mechanism functions/////
	////////////////////////////////////////////
	
		////////////////////////////////////
    	///////////the main loop////////////
    	////////////////////////////////////
    		/* the first of the switching mechanism 
    		   functions takes one variable: 
    		   		the lineState array of any section(current [not lineStates.current])
    		   with this, it loops through the current
    		   state of the site and, if they're different
    		   it passes the current key => new value
    		   to the makeLines function
    		   
    		   this funciton also checks if the sitestate 
    		   should be purple instead of green, if so, 
    		   it replaces all 'green' with 'purple' when
    		   passing to makeLines							*/
    		   
    		   
    		   
    		   
			function stateAlchemy(change) {
				for(var i in change) {
					var colour = change[i];
					if(siteState.ispurple > 0){
						if(change[i] == 'green') {
							colour = 'purple';
							if(colour == lineStates.current[i]){
								continue;
							} else {
								makeLines(colour, i);	
							}
						} else {
							if(colour == lineStates.current[i]){
								continue;
							} else {
								makeLines(colour, i);	
							}
						}
					} else {
						if(change[i] == lineStates.current[i]){
							continue;
						} else {
							makeLines(colour, i);	
						}
					}			
				}
			}
			
			
			
			
		////////////////////////////////////
    	/////////aesthetic changes//////////
    	////////////////////////////////////
			/* the second of the switching mechanisms is the
				makeLines function. this function takes two variables :
					the value to which to change(color)
					the class of the section/s to change(which)
    		   
    		   it simply adds the new class, removes the old (lineState.current[which]),
    		   and then changes lineStates.current to be the new class.	*/
	
	
	
   			function makeLines(color, which){
				/*takes an snap array, class or id and makes changes accordingly*/
		
				/*check the current colors to know what we're changing from*/
				var colors = lineStates.current;
		
				/*determine if it's just one change or multiple changes*/
   				if(typeof which == 'string'){
   					var route = 1;
   				} else {
   					var route = 2;
   				}
   				var change = color;
   				
   				/*it's an entirely different ballgame with purple in the mix */
   				var altcolor = color == 'purple' ? 'no' : colors[which];
   		
   				/* 2 versions, same function, needs to be handled differently if it is an array */
   				switch(route) {
   					case 2:
   						for(var e in which ) {
	    					if(color == 'flicker') {
		            			/* not implemented yet */
    		        		} else if (color == 'invisible') {
        		    			$(which[e]).attr('class', this.attr('class').split('in ')[0] + 'out ');
            					lineStates.current[which] = color;
            					///change between out and in///
    						} else if (color== 'visible'){
    							$(which[e]).attr('class', this.attr('class').split('out ')[0] + 'in ');
    							lineStates.current[which] = color;
    						} else {
    							$(which).addClass(color).removeClass(colors[which]);
    							lineStates.current[which] = change;
    						}
    					}
    				case 1:	
    					if(color == 'flicker') {
            				/* not implemented yet */
            			} else if (color == 'invisible') {
            				$(which).addClass('in').removeClass('out');
            				lineStates.current[which] = color;
            				///change between out and in///
    					} else if (color== 'visible'){
    						$(which).addClass('out').removeClass('in');
    						lineStates.current[which] = color;
    					} else {
    						if(which.substring(0, 4) == "path" || which.substring(0, 4) == "stop" || typeof which == 'object'){
    							$(which).each(function(index){
    								$(this).attr('class', $(this).attr('class').split(' '+colors[which])[0]+' '+color);
    							});
    						} else {
    							$(which).addClass(color).removeClass(colors[which]);
    						}
    						lineStates.current[which] = change;
    					}
   					}
   				}
   				
   		////////////////////////////////////
    	//////////content changes///////////
    	////////////////////////////////////
    		/* main navigation content changes, takes one argument: section to change to */
   			function remix(hashtagRemix){
   				$('.'+siteState.current).addClass('out').removeClass('in');
    			$('#'+siteState.current).addClass('out').removeClass('in');
   				$('#'+siteState.current+'Content').addClass('waiting').removeClass('execute');
    			$('#'+siteState.current+'Content .'+siteState.current+'-san').addClass('waiting').removeClass('execute');
    			$('#'+hashtagRemix+'Content .'+hashtagRemix+'-san.'+sectionReference[hashtagRemix][0]).addClass('execute').removeClass('waiting');
    			$('#'+hashtagRemix).addClass('in').removeClass('out');
    			$('.'+hashtagRemix).addClass('in').removeClass('out');
   				siteState.current = hashtagRemix;
   			} 
   				
   console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
   			  
   			  
   			 /* sub navigation content changes, takes two arguments:
   			 		subsection changing (hashtagMorph)
   			 		changing to which direction(direction)			*/ 
      	
   			function morph(direction, hashtagMorph){
   				$('.quadrant.'+hashtagMorph+'-san.'+contentReference[hashtagMorph][0]).addClass('waiting').removeClass('execute');
   				contentReference[hashtagMorph].cycle(direction);
   				$('.quadrant.'+hashtagMorph+'-san.'+contentReference[hashtagMorph][0]).addClass('execute').removeClass('waiting');
   				if(hashtagMorph == 'hidden2'){
   					$('#hidden2link').attr('href', hidden2hrefs[contentReference[hashtagMorph][0]]);
   				} else {
   					$('.target').removeClass('target');
   				}
   			}
   
   


		////////////////////////////////////
    	//////////event handlers///////////
    	////////////////////////////////////
   
   			 function init() {
   			 		var width = $(window).width(); 
   			 		var height = $(window).height(); 
   			 
   			 		////////////////////////////////////
    				///////sub navigation clicks////////
    				////////////////////////////////////
    				var subnavitems =  document.getElementsByClassName('option');
    				for(i=0; i < subnavitems.length; i++) {
    					subnavitems[i].addEventListener('click', function(){
    						var subhashtag = this.href.split('#')[1],
    						subaction = this.getAttribute('data-action');
 							morph(subaction, subhashtag);	
            	
    					}, false);
    				}
    	
   			 		////////////////////////////////////
    				////////design image clicks/////////
    				////////////////////////////////////
    				$('.quadrant.design-san.image').click(function(){
    					if($(this).hasClass('target')) {
    						$(this).removeClass('target');
    						$(this).children().removeClass('targetted');
    					} else {
    						$('.target').removeClass('target').children().removeClass('targetted');
    						$(this).addClass('target').children().addClass('targetted');
    					}
    				});
    				
   			 		////////////////////////////////////
    				///////main navigation clicks///////
    				////////////////////////////////////
    				var navitems =  document.getElementsByClassName('navoption');
    				for(i=0; i < navitems.length; i++) {
    					navitems[i].addEventListener('click', function(){
    						var hashtag = this.href.split('#')[1];
    						if ($(this).hasClass('active')){
    							siteState.ispurple *= -1;
    							stateAlchemy(lineStates[hashtag]);
 								///insert flicker here////
            				} else if($(this).hasClass('inactive')) {
            					$('.active').removeClass('active').addClass('inactive');
    							$('#'+hashtag+'gate').addClass('active').removeClass('inactive');
            					preptransition(hashtag, 'foreward');
            				} else {
            					/*there was an else at one point, might be again*/
            				}
			    		}, false);
    
    		
    	   			 /* determine operations */	
    		
    					function preptransition(hashtag, direction){
    						var thingsToChange =[];
    						if(direction == 'skip') {
    							$('#'+hashtag).addClass('in').removeClass('out');
    							$('.'+hashtag).addClass('in').removeClass('out');	
		    				} else if(direction == 'foreward') {
		    					/*the site does work differently for the 'simple' section*/
    							if(hashtag == 'normal' || hashtag == 'hidden2' || hashtag == 'design' || hashtag == 'green2' ){
    								remix(hashtag);
    								stateAlchemy(lineStates[hashtag])
    							} else {
    								$('#navoptions').addClass('end');
    								$('#greenwrapper').addClass('end');
    								$('#designwrapper').addClass('end');
    								$('#hiddenwrapper').addClass('end');
    								$('#normalwrapper').addClass('end');
    								$('.in').removeClass('in').addClass('out');
    								$('#'+hashtag).addClass('in').removeClass('out');
    								$('.'+hashtag).addClass('in').removeClass('out');
    								$('#myname').addClass('end');
    							}
    						}
    					}	
    				}


 				/*remove dead links or startup touch navigation*/
 				
				function makeLive(){
					$('.dead').addClass('inactive').removeClass('dead');
					$('#normalgate').addClass('active').removeClass('inactive');
					preptransition('normal', 'skip');
				}
				if (width > 992){
					makeLive();
				} else {
					
					$('.dead').addClass('inactive').removeClass('dead');
					$('#normalgate').addClass('active').removeClass('inactive');
					var left = document.getElementById('leftwrapper');
						left.addEventListener('click', function(){
							preptransition(inavcontent[0], 'foreward');
							if(inavcontent[0] == 'simple'){
								this.removeEventListener('click');
							}
							inavcontent.cycle('forward');
						});
					var right = document.getElementById('rightwrapper');
						right.addEventListener('click', function(){
							inavcontent.cycle('backward');
							preptransition(inavcontent[0], 'foreward');
							if(inavcontent[0] == 'simple'){
								this.removeEventListener('click');
							}
						});
				}
				
				/*detect swipes*/
				$('body').touchwipe({
					    wipeLeft: function() { 
					    	preptransition(inavcontent[0], 'foreward');
							if(inavcontent[0] == 'simple'){
								this.removeEventListener('click');
							}
							inavcontent.cycle('forward');
					    
					     },
    					wipeRight: function() { 
    						inavcontent.cycle('backward');
							preptransition(inavcontent[0], 'foreward');
							if(inavcontent[0] == 'simple'){
								this.removeEventListener('click');
							}
    					},
    					wipeUp: function() { 
    					 	morph('forward', inavcontent[0]);	
    					  },
     					wipeDown: function() { 
     						morph('backward', inavcontent[0]);	
     					 },
     					min_move_x: 20,
     					min_move_y: 20,
     					preventDefaultEvents: true
				});
            	
            	
            }
            init();
}
