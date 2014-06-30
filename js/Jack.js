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
	var client = new ZeroClipboard( document.getElementById('email') );
		client.on('complete', function(){
			console.log($('.unclick'));
			var clicked = $('.unclick');
			clicked.addClass('click').removeClass('unclick');
			
		});






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
					'a.navoption' : 'green',
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
					'.option' : 'green',
					'#simplebackground' : 'white',
					'.period' : 'green',
					'.simple' : 'white',
					'.dot' : 'green',
					'.click' : 'green',
					'.unclick' : 'green', 
					'#devicenav' : 'white', 
					'.device' : 'green', 
					'.subdevice' : 'green',
					'.quadrant-title' : 'green',
					'.subhead' : 'green', 
					'.number' : 'green',
					'.sub-quadrant' : 'green',
					'.name' : 'white',
					'stop.compass' : 'green',
					'stop.arrow' : 'green',
					'path.compassline' : 'green'
				},
				'normal' : {
					/*about section classes*/
					'.changeable' : 'green',
					'a.navoption' : 'green',
					'path.background_line' : 'white',
					'path.logoline' : 'green',
					'#dynamicContent' : 'white',
					'.simple' : 'white',
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green',
					'.option' : 'green',
					'#simplebackground' : 'white', 
					'.period' : 'green', 
					'.dot' : 'green', 
					'.simple' : 'white',
					'.click' : 'green',
					'.unclick' : 'green', 
					'#devicenav' : 'white', 
					'.device' : 'green', 
					'.subdevice' : 'green',
					'.quadrant-title' : 'green',
					'.subhead' : 'green', 
					'.sub-quadrant' : 'green',
					'.name' : 'white', 
					'.number' : 'green',
					'stop.compass' : 'green',
					'stop.arrow' : 'green',
					'path.compassline' : 'green'
				},
				'hidden2' : {
					/*illustration section classes*/
					'.changeable' : 'green',
					'a.navoption' : 'green',
					'path.background_line' : 'white',
					'path.logoline' : 'green',
					'#dynamicContent' : 'white',
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green',
					'#simplebackground' : 'white', 
					'.period' : 'green',
					'.simple' : 'white',
					'.dot' : 'green',
					'.click' : 'green',
					'.unclick' : 'green', 
					'#devicenav' : 'white', 
					'.device' : 'green', 
					'.subdevice' : 'green',
					'.quadrant-title' : 'green',
					'.subhead' : 'green', 
					'.sub-quadrant' : 'green',
					'.name' : 'white', 
					'.number' : 'green',
					'stop.compass' : 'green',
					'stop.arrow' : 'green',
					'path.compassline' : 'green'
				},
				'design' : {
					/*design section classes*/
					'.changeable' : 'green',
					'a.navoption' : 'green',
					'path.background_line' : 'white',
					'path.logoline' : 'green',
					'#dynamicContent' : 'white',
					'stop.rythm' : 'green',
					'path.logocolor' : 'green',
					'path.logolinefront' : 'green',
					'path.logolinemiddle' : 'green',
					'path.logolinebottom' : 'green',
					'.option' : 'green',
					'.simple' : 'white',
					'#simplebackground' : 'white', 
					'.period' : 'green',
					'.dot' : 'green',
					'.click' : 'green',
					'.unclick' : 'green', 
					'#devicenav' : 'white', 
					'.device' : 'green', 
					'.subdevice' : 'green',
					'.quadrant-title' : 'green',
					'.subhead' : 'green', 
					'.sub-quadrant' : 'green',
					'.name' : 'white', 
					'.green2' : 'green', 
					'.number' : 'green',
					'stop.compass' : 'green',
					'stop.arrow' : 'green',
					'path.compassline' : 'green'
				},
				'green2' : {
					/*development section classes*/
					'.changeable' : 'green',
					'a.navoption' : 'green',
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
					'.option' : 'green',
					'#simplebackground' : 'black',
					'.period' : 'green', 
					'.dot' : 'green',
					'.click' : 'green',
					'.unclick' : 'green', 
					'#devicenav' : 'black', 
					'.device' : 'green', 
					'.subdevice' : 'green',
					'.quadrant-title' : 'green',
					'.subhead' : 'green', 
					'.sub-quadrant' : 'green',
					'.name' : 'black', 
					'.number' : 'green',
					'stop.compass' : 'green',
					'stop.arrow' : 'green',
					'path.compassline' : 'green'
				},
				'simple' : {
					/*not actually needed*/
				},
				'purple' : {
					/*not actually needed*/
					'.changeable' : 'purple',
					'a.navoption' : 'purple',
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
					'.option' : 'purple',
					'.period' : 'purple',
					'.dot' : 'purple'
				}
			}
	
	
	
		////////////////////////////////////
    	///////////sub navigation///////////
    	////////////////////////////////////
    	
    		/*define possible subnavigation*/
			var hidden2section = new SpecialArray();
			var hidden2options = ['first', 'fourth', 'second', 'third'];
				hidden2section.populate(hidden2options);
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
				'hidden2' : hidden2section,
				'design' : designcontent,
				'green2' : green2content,
				'simple' : simplecontent
			}
			var hidden2hrefs = {
				/* for the illustration links to change with the illustration visible */
				'first' : '../images/study1large.jpg',
				'fourth' : '../images/fearlarge.jpg',
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
   				$('.'+siteState.current).addClass('out');
    			$('#'+siteState.current).addClass('out');

    			$('#'+hashtagRemix).addClass('in').removeClass('out');
    			$('.'+hashtagRemix).addClass('in').removeClass('out');
    			$('.'+siteState.current).removeClass('in');
    			$('#'+siteState.current).removeClass('in');
   				siteState.current = hashtagRemix;
   			} 
   				
   console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
   			  
   			  
   			 /* sub navigation content changes, takes two arguments:
   			 		subsection changing (hashtagMorph)
   			 		changing to which direction(direction)			*/ 
      	
   			function morph(direction, hashtagMorph){

   				contentReference[hashtagMorph].cycle(direction);

   				if(hashtagMorph == 'hidden2'){
   					$('#hidden2link').attr('href', hidden2hrefs[contentReference[hashtagMorph][0]]);
   				} else {
   					$('.target').removeClass('target');
   				}
   			}
   
   			function unpurple(){
   				$('.purple').addClass('green').removeClass('purple');
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
    					if($(this).hasClass('targetted')) {
    						$(this).addClass('nottargetted').removeClass('targetted').delay(400);
    						$(this).children().removeClass('targetted');
    						$('.design-san.image').delay(400).removeClass('nottargetted');
    					} else {
    						$('.targetted').removeClass('targetted').children().removeClass('targetted');
    						$('.design-san.image').addClass('nottargetted');
    						$(this).addClass('targetted').children().addClass('targetted').delay(400).removeClass('nottargetted');
    					}
    				});
    				
    				////////////////////////////////////
    				/////////period clicks//////////////
    				////////////////////////////////////
    				$('.period').click(function(){
    					siteState.ispurple *= -1;
    					stateAlchemy(lineStates['current']); 
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
    						/*	if(hashtag == 'normal' || hashtag == 'hidden2' || hashtag == 'design' || hashtag == 'green2' ){ */
    								remix(hashtag);
    								stateAlchemy(lineStates[hashtag])
    							/* god bless this linear navigation, no one appreciated it on testing. 
    								I'm not sure if it was a bad idea, I still love it
    								I feel the user must expect it for it to be okay, though.
    								
    							
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
    								$('#normal').addClass('end');
    								$('#green2').addClass('end');
    							}*/
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
			/*		var left = document.getElementById('rightpadder');
						left.addEventListener('click', function(){
							preptransition(inavcontent[0], 'foreward');
							inavcontent.cycle('forward');
						});
					var right = document.getElementById('leftpadder');
						right.addEventListener('click', function(){
							inavcontent.cycle('backward');
							console.log(inavcontent[0]);
							preptransition(inavcontent[0], 'foreward');
							
						}); */
				}
				
				/*detect swipes*/
				
				$(function(){
					var firstTime= 0;
				
					$("#devicenav").swipe({
						tap: function(event, target){
							$('g#onlyrose').attr('class', 'center');		
							preptransition('filler', 'foreward');
							$("body").swipe("enable");
							$('#navtitle').text('home');
							$('#navdirections').text('');
						}
					});
					$("#designwrapper").swipe({
						swipe: function(event, direction){
							if(direction == 'up' || direction == 'down'){
							siteState.ispurple *= -1;
    						stateAlchemy(lineStates[siteState.current]);
							} else{
							
							}

						}, threshold:20, allowPageScroll:"horizontal"
					});
					$("#hidden2section").swipe({
						swipe: function(event, direction){
							if(direction == 'up' || direction == 'down'){
							siteState.ispurple *= -1;
    						stateAlchemy(lineStates[siteState.current]);
							} else{
							
							}

						}, threshold:20, allowPageScroll:"horizontal"
					});
					$("body").swipe( {
       				 	tap:function(event, target) {
       				 		preptransition('simple', 'foreward');
							$('#navtitle').text('connect');
							$('#navdirections').text('');
							$("body").swipe("disable");
							firstTime = 1;
       					},
        				doubleTap:function(event, target) {
							siteState.ispurple *= -1;
    						stateAlchemy(lineStates[siteState.current]);
        				},
       					longTap:function(event, target) {
          					preptransition('simple', 'foreward');
          					$('#navtitle').text('stephen standridge'); 
          					$('#navdirections').text('');
          					$("body").swipe("disable");
        				},
        				swipe:function(event, direction) {
         				 	swipefunc(event, direction);
        				},
        				threshold:20, allowPageScroll:"horizontal"
      				});
					function swipefunc(event, direction, distance, duration, fingerCount){
				
						if(direction == 'up'){
							console.log($('g#onlyrose'));
							$('g#onlyrose').attr('class', 'up');						
							preptransition('green2', 'foreward');
							$('#navtitle').text('development');
							$('#navdirections').text('[return]');
							$("body").swipe("disable");
							firstTime = 1;
						} else if(direction == 'down'){
							$('g#onlyrose').attr('class', 'down');					
							$('#navtitle').text('stephen standridge');
							$('#navdirections').text('[return]');
							if(firstTime == 0){
								preptransition('normal', 'skip');
								firstTime = 1;
							} else {
								preptransition('normal', 'foreward');
							}
							
							$("body").swipe("disable");
						}else if(direction == 'left'){
						   $('g#onlyrose').attr('class', 'left');					
							$('#navtitle').text('design');
							$('#navdirections').text('[return]');
							preptransition('design', 'foreward');
							$("body").swipe("disable");
							firstTime = 1;
						}else if(direction == 'right'){
							$('g#onlyrose').attr('class', 'right');						
							$('#navtitle').text('illustration');
							$('#navdirections').text('[return]');
							preptransition('hidden2', 'foreward');
							$("body").swipe("disable");
							firstTime = 1;
						}
					}
					
					
					if(width > 992) {
						$("body").swipe("destroy");
					}
				});
			

            	
            	
            }
            init();
}
