
window.onload=function(){
	
window.SpecialArray = (function() {
	function SpecialArray() {
		var special = Object.create( Array.prototype);
		special = (Array.apply(special, arguments) || special);
		SpecialArray.injectClassMethods(special);
		return(special);
	};
	SpecialArray.injectClassMethods = function(special) {
		for(var method in SpecialArray.prototype) {
			if(SpecialArray.prototype.hasOwnProperty(method)){
				special[method] = SpecialArray.prototype[method];
			}	
		}
		return(special);
	};
	SpecialArray.fromArray = function( array ){
        var special = SpecialArray.apply( null, array );
        return( special );
    };
 
    SpecialArray.isArray = function( value ){
        var stringValue = Object.prototype.toString.call( value );
        return( stringValue.toLowerCase() === "[object array]" );
    };
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
    			console.log('shifted forward from: '+from+'  shifted to: '+to);
    			return from;
    		} else if(direction == 'backward'){
    			var to = this[end];
    			this.pop();
    			this.unshift(to);
    			console.log('shifted backward from: '+from+'  shifted to: '+to);
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
    		console.log('populated '+count+' elements to the special array');
    		return false;
    	}
    });
    return (SpecialArray);
}).call( {} );


///global variables////
	var masterWidth = window.innerWidth;
	var masterHeight = window.innerHeight;
	var navoptions = {
		current : 'normal',
		list : ['normal', 'hidden2', 'design', 'green', 'simple']
	}
	var finished = 'nope';
	var coordinates = {
		'normal' : [120, 35, 330],
		'hidden' : [45, 0, 430],
		'design' : [120, 150, 200],
		'green' : [230, 260, 0],
		'simple' : [0, 0, 475]
	}
	
	var designhrefs = {
		'first' : 'http://www.ipoquest.com',
		'second' : 'http://www.annacolibri.com',
		'third' : 'http://www.growthstarsawards.com'
	}
	var hidden2hrefs = {
		'first' : '../images/study1large.jpg',
		'second' : '../images/secondcoloredlarge.jpg',
		'third' : '../images/thirdcoloredlarge.jpg'
	}
	
	
/////create the navigation arrays////////////
		var siteState = {
			'current' : 'normal',
			'ispurple' : -1,
			'isgreen' : 1,
			'isend' : -1
		}
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
		'hidden2' : hidden2options,
		'design' : designoptions
	}
	
	var sectionReference = {
			'normal' : normalcontent,
			'hidden2' : hidden2content,
			'design' : designcontent,
			'green2' : green2content,
			'simple' : simplecontent
		}
	var lineStates = {
		'current' : {
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
				'.option' : 'green'
			},
		'normal' : {
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
				'.option' : 'green'
			},
		'hidden2' : {
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
				'.option' : 'white'
			},
		'design' : {
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
				'.option' : 'green'
			},
		'green2' : {
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
				'.option' : 'green'
			},
		'simple' : {
		
			},
		'purple' : {
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
	

///////////////////////////////////////////////////////////////////
////////Random Functions... may not be necessary at all.../////////
///////////////////////////////////////////////////////////////////
	function sizeSVG() {
		masterWidth = window.innerWidth;
		$('linearGradient.horizontalG').attr('x1', masterWidth+"px");
		var svg = document.querySelector("svg");
		var aspect = window.innerHeight / window.innerWidth;
		svg.removeAttribute("width");
		svg.removeAttribute("height");
		svg.setAttribute("width", window.innerWidth);
		svg.setAttribute("height", window.innerWidth* aspect);
	}
	
	
///////////////////////////////////////////
///////Unorganized stuff, need to clean//////////////
///////////////////////////////////////////
	function stateAlchemy(current) {
		for(var i in current) {
			var colour = current[i];
			if(siteState.ispurple > 0){
				if(current[i] == 'green') {
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
				if(current[i] == lineStates.current[i]){
					continue;
				} else {
					makeLines(colour, i);	
				}
			}
			
		}
	}
	
	
   function makeLines(color, which){
		///takes an snap array, class or id and makes changes accordingly///
		
		///check the current colors to know what we're changing from///
		var colors = lineStates.current;
		
		///determine if it's just one change or multiple changes///
   		if(typeof which == 'string'){
   				var route = 1;
   		} else {
   				var route = 2;
   		}
   		var change = color;
   		var altcolor = color == 'purple' ? 'no' : colors[which];
   		
   		switch(route) {
   			case 2:
   				for(var e in which ) {
            		
    				if(color == 'flicker') {
            			///add purple to every class///
            			siteState.ispurple ^= true;
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
            		///add purple to every class///
            		siteState.ispurple ^= true;
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
   console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
   function remix(hashtagRemix){
   		console.log(hashtagRemix);
   		$('.'+siteState.current).addClass('out').removeClass('in');
    	$('#'+siteState.current).addClass('out').removeClass('in');
   		$('#'+siteState.current+'Content').addClass('waiting').removeClass('execute');
    	$('#'+siteState.current+'Content .'+siteState.current+'-san').addClass('waiting').removeClass('execute');
    	$('#'+hashtagRemix+'Content .'+hashtagRemix+'-san.'+sectionReference[hashtagRemix][0]).addClass('execute').removeClass('waiting');
    	$('#'+hashtagRemix).addClass('in').removeClass('out');
    	$('.'+hashtagRemix).addClass('in').removeClass('out');
   		siteState.current = hashtagRemix;
   }   
      	
   function morph(direction, hashtagMorph){
   		console.log(hashtagMorph);
   		$('.quadrant.'+hashtagMorph+'-san.'+contentReference[hashtagMorph][0]).addClass('waiting').removeClass('execute');
   			contentReference[hashtagMorph].cycle(direction);
   		$('.quadrant.'+hashtagMorph+'-san.'+contentReference[hashtagMorph][0]).addClass('execute').removeClass('waiting');
   		if(hashtagMorph == 'hidden2'){
   			$('#hidden2link').attr('href', hidden2hrefs[contentReference[hashtagMorph][0]]);
   		} else {
   			$('.target').removeClass('target');
   		}
   }
   /*to do every time*/
   
   

   
    function init() {
    	var subnavitems =  document.getElementsByClassName('option');
    	for(i=0; i < subnavitems.length; i++) {
    		subnavitems[i].addEventListener('click', function(){
    			var subhashtag = this.href.split('#')[1],
    				subaction = this.getAttribute('data-action');
 					morph(subaction, subhashtag);	
            	
    		}, false);
    	}
    	
    	
    	
    	
    	var lightitems =  document.getElementsByClassName('lighter');
    	for(i=0; i < lightitems.length; i++) {
    		lightitems[i].addEventListener('click', function(){
    			var lightindex = this.className.split(' ')[0],
    				lightelem = this.className.split(' ')[1],
    				curelems = $('.'+siteState.current+'-san.'+lightelem),
    				curelem = $('.'+siteState.current+'-san.'+lightelem+'.execute');
    				curelem.addClass('waiting').removeClass('execute');
    				$('.design.list.darker').addClass('lighter').removeClass('darker');
    				$('.design-san.darker').addClass('lighter').removeClass('darker');
    				$(curelems[lightindex]).addClass('execute').addClass('darker').removeClass('waiting');
    				$(this).addClass('darker').removeClass('lighter');
    		}, false);
    		}
    	
    	$('.quadrant.design-san.image').click(function(){
    		if($(this).hasClass('target')) {
    			$(this).removeClass('target');
    			$(this).children().removeClass('targetted');
    		} else {
    			$('.target').removeClass('target').children().removeClass('targetted');
    			$(this).addClass('target').children().addClass('targetted');
    		}
    		
    	});
    	
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
            		console.log('else');
            	}
            	
    		}, false);
    
    		
    		
    		
    		
    		function preptransition(hashtag, direction){
    			var thingsToChange =[];
    			if(direction == 'skip') {
    				$('#'+hashtag).addClass('in').removeClass('out');
    				$('.'+hashtag).addClass('in').removeClass('out');
    				
    			} else if(direction == 'foreward') {
    				///giving the chosen class to the background to change it///
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
    				
    				
    				
    				siteState.current = hashtag;
    			}
    		}
    	}

    	    s4 = Snap( document.getElementById('logo')),
    		outlines = s4.select('#linework'),
    		whitelines = s4.selectAll('path.logolinefront');
			outlines.animate({'opacity': 1}, 700);
 			makeLive();


        	delay = 0;
			function makeLive(){
				$('.dead').addClass('inactive').removeClass('dead');
				$('#normalgate').addClass('active').removeClass('inactive');
				preptransition('normal', 'skip');
			}
    	
    	
        var speed = 250,
            easing = mina.easeinout,
            delay = 100;
      
    	 var s= Snap( document.getElementById('bgtransform')), bgpaths = s.selectAll('path'), 
            bgpathsConfig = [];
            for (var i =0; i < bgpaths.length; i++) {
            	if( i == 'items') {
            		break;
            	} else {
            		bgpathsConfig[i] = {
            			from : bgpaths[i].attr('d'),
            			trans : bgpaths[i].attr('data-open'), 
            			dir : -1,
            			stage : bgpaths[i].attr('class').split(' ')[1]
            		}
            	}
            }
            
            	
            }
            init();
            
            
            
            


function hidelem() {
	document.body.lastElementChild.setAttribute('style',  'display:none;');
}
hidelem();




///////////////////////////////////////////
///////////////////////////////////////////

}
