
window.onload=function(){
///global variables////
	var masterWidth = window.innerWidth;
	var masterHeight = window.innerHeight;
	var meterOptions = {'animDeclare' : {}, 'animMix' : {}, 'type' : {}, 'duration' : {}, 'anim' : {}, 'sync' : {}, 'order' : {}, 'permanence' : {}, 'division' : {}};
	var gatheredAnimations = animationHunter();
	initializeGradients();
	$("linearGradient .verticalG").attr('x1', masterHeight);
	function initializeGradients()
	{
	    var elements = document.getElementsByClassName("horizontalG");
	    for(var i = elements.length - 1; i >= 0; --i)
	    {
	        elements[i].setAttribute('x1', masterWidth+300);
	    }
	}

////////////////////////////////////////////
//////Initialize Animations/////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////
	animationHunter.prototype = new Object;
	animationHunter.prototype.constructor = animationHunter;
	function animationHunter() {
		///an unorganized array of unfiltered animation object
		this.allAnimations = [];
		
		///an array object that is indexed by mix and points to created animation, use this to trigger/calculate///
		this.namespaceGroup = [];
		
		///just a simple reference of all the mixes available used by the controller to calculate mix transitions
		this.mixGroup = [];
		this.mixGroup.push('default');
		
		///an array that points from the animation namespace to the different possible mixes(including default)
		///for easy reference in the mix transition calculation
		this.namespaces = [];
		
		
		this.getAllAnimations = function() {
			var animationRE = /^animDeclare_/;
			var animations=[],els=document.getElementsByTagName('*');
			for (var i=els.length;i--;) {
				if (animationRE.test(els[i].id)){
					animations.push(els[i]);
				} 
			} 
			this.allAnimations =  animations;
			this.makeAnimationObjects();
			/*thanks, Phrogz*/
		}
		this.makeAnimationObjects = function() {
			/* this function makes the animation Objects that the animation 
			trigger refers to know what and when to fire every object
			this object later will calculate all the time divisions,
			sychronicity, and order of the animations */
			var processedAnimations = [];
				for(var anim in this.allAnimations) {
					/*create key/value pairing of arguments/values gathered by the html classes
					  this will be passed to the object constructor later */
					var keyVals = this.allAnimations[anim].className.baseVal.split(" ");
					var animationDomElement = this.allAnimations[anim];
					var uneditedAnimationName = this.allAnimations[anim].id;
					var animationName = uneditedAnimationName.split('_')[1];
					var notEvenMyFinalForm = {'name' : animationName.split("+")[0].toString(), 'mix' : animationName.split("+")[1].toString(), 'specifications' : []};
						notEvenMyFinalForm['specifications']['dom'] = animationDomElement;
					for(var i in keyVals) {
						var tempKey = keyVals[i].split("_")[0];
						var tempVal = keyVals[i].split("_")[1];
						////////////////////////////////////////////
						//___________extensions go here___________//
						////////////////////////////////////////////
						
						/*{I really don't think this is 
						  the most optimal
						  way to handle 
						  this process, which I do use multiple times 
						  in this digital poem
				  
						  perhaps I'll find another
						  perhaps not
				 
						  I want to functionalize it
				  		  but the scope of it scares me
				  
				  		hesitantly,
				  		I present
				  		the process: }*/
						if(!(tempKey in notEvenMyFinalForm['specifications'])) {
							notEvenMyFinalForm['specifications'][tempKey] = [];
							notEvenMyFinalForm['specifications'][tempKey].push(tempVal);
						} else {
							notEvenMyFinalForm['specifications'][tempKey].push(tempVal);
						}
					}
			
				/*{arguments she's ACTUALLY looking for
		  other arguments are nice
		  but they'll confuse the hell 
		  out of her modest functions
		  they exist:
		  	animDeclare = name of the animation
		  					the same namespace
		  					can be used
		  						in a different Mix
		  						it will assume
		  						you want to overwrite tracks with the same namespace
		  						in the same Mix
		  						because you wanted to do that, right?
		  	animMix = animation mix to which this animation belongs
		  					this is a competitive namespace
		  					survival of the newest
		  	type = the nice and easy way to format your run-of-the-mill animations
		  					types supported
		  						repeatableAnimation = will repeat the animations at the end
		  									of its duration it will hard-transition between
		  									its end state and its beginning so 
		  									make a beautiful pattern, please?
		  						oneshotAnimation = you only get the one moment to show your 
		  									animation's worth.
		  	duration = this animation, your song, the duration, your meter length.
		  				from here, all timing relativity flows
		  				so choose wisely
		  				Milliseconds and Mandatory
		  	anim = what do you want to do? You can do all sorts of things, if only
		  				you put your mind to it.
		  				until she learns how to be open and accepting
		  				of your methods and ideal, temporal forms
		  				you'll have to allow her to be the authority.
		  				doing things like
		  					draw = trail+length, permanent
		  					undraw = trail+length, permanent
		  					fadeto = +end
		  					colorshift = relative+measure, absolute+measure
		  					svg = matrix transformations of svg elements
		  				cool thing is, she'll take all the animations you can give
		  				if you want, control them harshly
		  				or she will control them gently
		  	noteSync = tell her the grouping pattern. of your notes
		  				and note multiples.
		  				hard-ordered notes will always have priority,
		  				but if they can be paired according to the sync
		  				they will 
		  				and if there aren't enough things to pair
		  				she won't pull them from air
		  				and if there are too many
		  				she'll drop them like a bad habit
		  				synchronized patterns
		  					pair+num-pair+num-etc
		  					concerted all at the same time
		  					for only the duration 
		  					they want to take
		  					if the time has been divided
		  						as if you were aligning every note
		  						with its duration
		  						with the start of the meter
		  	order = used for soft ordering of elements, hard order will always be prioritized
		  				if you have your elements ordered yourself
		  				you can set this to tell it to cycle through
		  				your ordered elements foreward
		  					order types are
		  						foreward
		  						backward
		  						randomDecay
		  						randomPersist
		  							
		  	permanence = used to determine how the display of your animation, 
		  														in its inactive moments
		  														is handled
		  														wether the first frame
		  														is the keyframe
		  														or the last frame is
		  							much like the positional setting, this is soft setting 
		  							these transformations
		  							all of this can be individually determined
		  							by the individual note's duration
		  							the options are
		  								she will assume you want the persist
		  							
		  							
		  								persist = state of the animation at the beginning
		  											as though this animation 
		  											were just an interruption
		  											in the state of how things should be
		  								decay = state of the animation at the end
		  											as though the animation
		  											your animation
		  											shook the state of the user experience
		  											into another state for the duration of
		  											the animation
		  											at least until it's repeated unless
		  											that animation, too, is a oneshot
		  											well, then it's forever
		  								none = repeat all the time ever forever because
		  										it has no memory of having fired every 
		  										time it has before
		  division = the sacred meter.
		  			this specifies the length of an individual beat
		  			you can do some cool things here
		  			from a simple 3/4 time
		  			to a less-simple 9/8
		  			to a rediculous 111/4(really?)
		  			to functiona things
		  			check it
		  				meter+duple
		  				meter+triple
		  				meter+simple
		  				meter+compound-num-num
		  				
		  				use these wisely, longer times are better
		  				fib+collect
		  				fib+disperse
		  				fib+polarize
		  				
		  				linear
		  				multiple+num
		  repeat = number of times repeated
		  			oneshot default to 0 with a persist
		  			sequential has a default of 0 with a decay
		  			repeat defaults to infinity with permanence none
		  measures = number of "stages" for the transformation before all
		  			of the transformations end or are repeated. This makes every animation
		  			into a sequential animation and so the extra separation isn't necessary.
		  			a measure duration is the entire duration. If multiple are given, but
		  			not defined, this acts as a repeat count. So a measure 4 with a repeat
		  			of 2 without any defined measures will repeat the same thing 8 times.
		  			Likewise, if the animation itself is a multiple of repeated animations
					it will fire that many more times.
		  			
		  
		  
		  Now to actually get them and check that they're okay... you know
		  	that nothing bad's happened to them since you've given them
		  	cleanly to her... I mean, do you really want her to be doing all
		  	the heavy lifting?}
		  */
				processedAnimations.push(notEvenMyFinalForm);
			
			}
		
			////give values to the constructor/////////
			////////add to ticker//////////////////////
			////send argument to the creation methods//
			this.allAnimations = processedAnimations;
			this.setNamespaceMix();
			}
		this.setNamespaceMix = function() {
			
			/* needs correct animation creation function... I was lazy*/
			for(var individualAnimation in this.allAnimations) {
				///formats the namespace group to be namespace[name][mix] = animation;
				///adds the namespace to the namespace group to be referenced by the animation timer later.
				if(!(this.allAnimations[individualAnimation]['name'] in this.namespaceGroup)){
					this.namespaceGroup[this.allAnimations[individualAnimation]['name']] = [];
					this.namespaces[this.allAnimations[individualAnimation]['name']] = [];
					if(!(typeof this.allAnimations[individualAnimation]['mix'] == 'string')) {
						this.namespaces[this.allAnimations[individualAnimation]['name']].push('default');
						this.namespaceGroup[this.allAnimations[individualAnimation]['name']]['default'] = createAnimation(this.allAnimations[individualAnimation]['specifications']);
					} else {
						this.namespaces[this.allAnimations[individualAnimation]['name']].push(this.allAnimations[individualAnimation]['mix']);
						this.namespaceGroup[this.allAnimations[individualAnimation]['name']][this.allAnimations[individualAnimation]['mix']] = createAnimation(this.allAnimations[individualAnimation]['specifications']);
					}
				} else {
					if(!(typeof  this.allAnimations[individualAnimation]['mix'] =='string')) {
						this.namespaces[this.allAnimations[individualAnimation]['name']].push('default');
						this.namespaceGroup[this.allAnimations[individualAnimation]['name']]['default'] = createAnimation(this.allAnimations[individualAnimation]['specifications']);
					} else {
						this.namespaces[this.allAnimations[individualAnimation]['name']].push(this.allAnimations[individualAnimation]['mix']);
						this.namespaceGroup[this.allAnimations[individualAnimation]['name']][this.allAnimations[individualAnimation]['mix']] = createAnimation(this.allAnimations[individualAnimation]['specifications']);
					}
				}
				
				if(!(this.allAnimations[individualAnimation]['mix'] in this.mixGroup)) {
					this.mixGroup.push(this.allAnimations[individualAnimation]['mix']);
				}
			}
			}
		this.getAllAnimations();
	
	
		///test with multiple animations///
		///test with duplicate named animations too///
		///test with duplicate name but different mix///
		///now to create the controller///
	}
	
	

	animationController.prototype = new Object;
	animationController.prototype.constructor = animationController;
	function animationController() {
		////this is what switches between animations//
		///this also has all time signatures//////////
		///it also contains the ability to respond////
		///this is the 'animation group'//////////////
	}


	function createController(func){
		//if it has a type, set it and remove it from the argument array, if not, default to oneshot.
		//furthermore, remove that element from the arguments if it exists.
		var args = Array.prototype.slice.call(arguments, 0);
		var typeToSet = (args['type'] != 'undefined') ? args['type'] : 'oneshotAnimation';
		if(args.indexOf('type') != 'undefined'){
			args = Array.prototype.slice.call(args.indexOf('type'), 1);
		} 
		console.log(typeToSet);
		var object = Object.create(typeToSet.prototype);
		console.log(object);
		typeToSet.apply(object, args);
		return object;
	}


	function respond() {
	
	}






/////////////////////////////////////////////
//////Animation/////////////////////////////////////////////////
//////Options///////////////////////////////////////////////////
/////////////////////////////////////////////
	function purpledraw() {
		///array of progress is a horrible idea?///
		animationGroupGroup['purple'].setProgress('tick');
	  /* if (animationGroupGroup['purple'].master >= animationGroupGroup['purple'].loop) {
	
	     window.cancelAnimationFrame(handle);
		 animationGroupGroup['purple'].setProgress('reset');
		 purpledraw();
	   } else {*/
	   	purpleBottomBar.fire();
	   	purpleBackground.fire();
	   	purpleTopBars.fire();
	   	purpleTransitionIn.fire();
	    handle = window.requestAnimationFrame(purpledraw);
	   //}
	};

/*class Game {
   constructor() {
      // Holds a timestamp indicating when the last tick occurred.
      // Initially set to null, indicating that no tick has taken place.
      this.time = null;

      // Holds the accumulative time remaining for physics steps.
      this.accumulator = 0.0;

      // Holds the size of a single timestep in milliseconds, in this
      // case we will perform around 60 steps per second.
      this.stepSize = 60 / 1;

      // Request an animation frame to invoke this.tick
      requestAnimationFrame(this.tick.bind(this));
   }

   step(deltaTime) {
      // ...
   }

   draw(deltaTime) {
      // ...
   }

   tick(time) {
      // requestAnimationFrame's callback gives a very high resolution
      // timestamp (DOMHighResTimeStamp) as an argument. The timestamp
      // is accurate to a microsecond so we no longer need, nor want to
      // call Date.now as it is only accurate to the millisecond.

      // On the first tick delta time should be 0.
      var deltaTime = time - (this.time || time);
      this.time = time;

      // Add delta time to our accumulator, iterate over the steps we
      // can do, and carry the leftovers over to the next frame.
      this.accumulator += this.deltaTime;
      while(this.accumulator >= this.stepSize) {
         this.step(this.stepSize);
         this.accumulator -= this.stepSize;
      }

      this.draw(deltaTime);

      // Request an animation frame to invoke this.tick again
      requestAnimationFrame(this.tick.bind(this));
   }
}
*/







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
	///check which arguments a function receives ////
	function checkArgument(argumentToCheck) {
		if (typeof argumentToCheck == "undefined") {
			return false;
		}	else {
			return true;
		}
	}
	
///////////////////////////////////////////
///////////////////////////////////////////








/////////////////////////////////////////////////////
////////Individual Animation Prototypes//////////////
/////////////////////////////////////////////////////



	function TemporalPattern(temporalArgs) {
		///this turns the arguments into an array to be cleaned.
		this.initialArgs = Array.prototype.slice.call(arguments, 0)[0];
		
		//The following are hidden attributes to the temporal pattern object.
		//initialize presets, possibility and numbers//
		Object.defineProperty(this, 'presets', {
			value : {
				'duration' : 0, 
				'anim' : 'particular', 
				'noteSync' : 'concerted', 
				'order' : 'forward', 
				'permanence' : 'persist', 
				'division' : 'linear', 
				'repeat' : 'none',
				'dom' : null,
				'measures' : 1,
				'type' : 'oneshot'
			},
			enumerable : false 
		});
		Object.defineProperty(this, 'possibilities',  {
			value : {
				'duration' : 'number', 
				'anim' : ['draw', 'undraw', 'fadeto', 'colorshift', 'svgMatrix', 'particular'], 
				'noteSync' : [ 'pair', 'random', 'concerted'], 
				'order' : ['forward', 'backward', 'randomEach', 'randomOnce'], 
				'permanence' : ['persist', 'decay', 'none'], 
				'division' : ['meter', 'fib', 'linear', 'mult'], 
				'repeat' : 'number',
				'dom' : 'object',
				'measures' : 'number',
				'type' : ['repeatable', 'oneshot', 'chained']
			},
			enumerable : false
		});
		Object.defineProperty(this, 'numbers', {
			value: {
			'duration' : 1, 
			'anim' : 0, 
			'noteSync' : 1, 
			'order' : 1, 
			'permanence' : 1, 
			'division' : 1, 
			'repeat' : 1,
			'dom' : 1,
			'measures' : 1,
			'type' : 1
			},
			enumerable : false 
		});
		
		///validation functions////
		Object.defineProperty(this, 'validateArgArray', {
			value :
		 		function(unparsedArgs, countOfArgs, possibleArgs) {
					var cleanedArray = new SpecialArray();
					for(var parse in unparsedArgs) {
						if(! possibleArgs[parse]) {
							throw new Error("invalid argument attribute '"+parse );
						} 
						try {
							this.validateArgContent(unparsedArgs[parse], countOfArgs[parse], possibleArgs[parse]);
							cleanedArray.add(parse, unparsedArgs[parse]);
						
						}
						catch(e) {
							throw new Error("invalid options attribute '" + parse + "'");
						}
						
					}
						return cleanedArray;
						
				}, 
			enumerable : false 
		});
		Object.defineProperty(this, 'validateArgContent', {
			value : 
		 		function(argToParse, numArgs, argToCrossCheck) {
			if(typeof argToParse == 'object' && numArgs == 0) {
		
				for(var parsee in argToParse) {
					switch (typeof argToCrossCheck){
		    			// Case validation function.
    					case 'function':
    	     				argToCrossCheck.call(this, argToParse);
    	     				break;            	
    					// Case direct type. 
    	    			case 'string':
		    	    		if (typeof argToParse !== argToCrossCheck){
		    		    		throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		    	    		}
		    	    	//case array of possibilities	
		    	    	case 'object':
		    	    		var objectCheck = argToCrossCheck.length;
		       		 		for(var possibility in argToCrossCheck) {
		       		 			if(argToParse[parsee].substring(0, argToCrossCheck[possibility].length) == argToCrossCheck[possibility]){
		        					continue;
		        				} else {
		        					objectCheck --;
		        				}
		        			}
		        			if (objectCheck = 0){
		    		    		throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		    		    	}
			    		break;
					}		
				}
			} else if(typeof argToParse == 'object' && numArgs == 1) {	
			
					switch (typeof argToCrossCheck){
		    			// Case validation function.
    					case 'function':
    	     				argToCrossCheck.call(this, argToParse);
    	     				break;            	
    					// Case direct type. 
    	    			case 'string':
    	    				if(typeof parseInt(argToParse) == argToCrossCheck) {
    	    					break;
    	    				}else if (typeof argToParse != argToCrossCheck){
		    		    		throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		    	    		}
		    	    		break;	
		    	    	//case array of possibilities	
		    	    	case 'object':
		    	    		var objectCheck = argToCrossCheck.length;
		       		 		for(var possibility in argToCrossCheck) {
		       		 			if(argToParse.toString().substring(0, argToCrossCheck[possibility].length) == argToCrossCheck[possibility]){
		        					continue;
		        				} else {
		        					objectCheck --;
		        				}
		        			}
		        			if (objectCheck = 0){
		    		    		throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		    		    	}
			    		break;
					}		
			}else if (typeof argToParse != 'object') {
			
				switch (typeof argToCrossCheck){
					
		    		// Case validation function.
    				case 'function':
    	     			argToCrossCheck.call(this, argToParse);
    	     			break;            	
    				// Case direct type. 
    	    		case 'string':
    	    			if(argToCrossCheck == 'number' ) {
    	    				if (parseInt(argToParse) == 'NaN'){
		    	    			throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		        			}
    	    			} else {
    	    				if (typeof argToParse !== argToCrossCheck){
		    	    			throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		        			}
    	    			}
		        	case 'number': 
		        		if(argToCrossCheck == 'number') {
		        			break;
		        		}
		        	//case array of possibilities
		        	case 'object':
		        		var objectCheck = argToCrossCheck.length;
		        		for(var possibility in argToCrossCheck) {
		        			if(argToParse.substring(0, argToCrossCheck[possibility].length) == argToCrossCheck[possibility]){
		        				continue;
		        			} else {
		        				objectCheck --;
		        			}
		        		}
		        		if (objectCheck = 0){
		    	    		throw new Error("Invalid argument '" + Object.toJSON(argToParse) + "' expected type " + argToCrossCheck);
		    	    	}
			    	break;
				}	
			} else {
			
				throw new Error("Too many arguments '" + Object.toJSON(argToParse) + "' expected number of arguments " + numArgs);
			}
			 
		},
		 	enumerable : false
		 });
		
		///this calls the cleaning function on the arguments AND mixes it with the presets, overwriting as it goes.
		this.allArgs = this.validateArgArray(this.initialArgs, this.numbers, this.possibilities);	
	
		///add whichever fields pass the validation, if the argument isn't given, it uses a default////
		///////this is the setter mechanism to this prototype
		for(var field in this.presets) {
			if(field == 'dom' ) {
				if(this.allArgs.contains(field)) {
					this[field] = this.allArgs[field];
					this.allArgs.remove(field);
					continue;
				} else {
					this[field] = this.presets[field];
					continue;
				}
				
			} else if(typeof this.allArgs[field] == 'object' && this.allArgs[field].length > 1) {
				if(this.allArgs.contains(field)) {
					this[field] = this.allArgs[field];
					this.allArgs.remove(field);
					continue;
				} else {
					this[field] = this.presets[field];
					continue;
				}
			} else {
				if(this.allArgs.contains(field)) {
					this[field] = this.allArgs[field][0];
					this.allArgs.remove(field);
					continue;
				} else {
					this[field] = this.presets[field];
					continue;
				}
			}
		}
		///return any type-specific arguments to the prototype to handle///
		this.typeArgs = this.allArgs;
		
	}
		TemporalPattern.prototype.fire = function(){};
		TemporalPattern.prototype.calculate = function(){};
		TemporalPattern.prototype.gather = function(){
			var typeElems = document.getElementsByClassName(this.type);
    		var colorElems = document.getElementsByClassName(this.color);
    		var returnedElems = [];
    		var checkedElems = [];
    		for (var j in colorElems) {
        		checkedElems[colorElems[j]] = colorElems[j];
      		}
     		for (var i in typeElems) {
        		if (typeof checkedElems[typeElems[i]] != 'undefined' && typeof checkedElems[typeElems[i]] == 'object') {
        	    	if(this.lineId == false) {
        	    		var tempClass = typeElems[i].className.baseVal.split(" ")[2];
        	    		if(typeof returnedElems[tempClass] == 'undefined') {
        	    	 	 returnedElems[tempClass] = [];
        	    	 	 returnedElems[tempClass].push(typeElems[i]);
        	    		}else {
        	    	  	returnedElems[tempClass].push(typeElems[i]);
        	    		}
        	    	}else {
        	    	  	returnedElems.push(typeElems[i]);
        	    	}
       			}
     		}
    		this.elems = returnedElems;
		};
		TemporalPattern.prototype.particularize = function(){
		var lengths = [];
			for(var paths in this.elems) {
				////cycle through all the elements that are tagged to the animation///
				///determine if each one is a path, a stop, or a shape///
				///set particle variables thusly.
				
				if(this.elems[paths].tagName.toLowerCase() == 'path') {
					///dot vs trail vs degradeable vs length
					var length = this.elems[paths].getTotalLength();
					lengths.push(length);
					this.elems[paths].temporality = this.elems[paths].className.baseVal.split(" ")[1];
					this.elems[paths].style.strokeDasharray = length + ' ' + length;
					this.elems[paths].style.strokeDashoffset = length;
					this.elems[paths].totallength = this.elems[paths].getTotalLength();
					this.elems[paths].style.opacity = 1;
				}else if(this.elems[paths].tagName.toLowerCase() == 'stop') {
					
				}
				////these variables control the element's life from the animation type to the animation stage to how it degrades///
				////should these values be set by their container or by the individual?///
				////what happens when the delay types are granularly decided?///
				////maybe have a class fallback or "if" statement controlling if the animation is granular or not////
				////this would mean that the classname positioning would not be an accurate way to query this setting////
				////data-type might be necessary////
				this.elems[paths].degradeDelayType = this.elems[paths].className.baseVal.split(" ")[3];
				this.elems[paths].degradeDurationType = this.elems[paths].className.baseVal.split(" ")[4];
				this.elems[paths].finished = 'first'; 
				this.elems[paths].halfLife;
				this.elems[paths].getParticleDetails = function() {
					this.tempSpecifications = this.className.baseVal.split(" ");
					this.specifications = []
					for(var specification in this.tempSpecifications) {
						this.specifications[this.tempSpecification[specification].split("_")[0]].push(this.tempSpecification[specification].split("_")[1]);
					}
				}
				this.elems[paths].setHalfLife = function(halfLifeTimeMaster, position, quantity) {
					////problem: they don't know their delay.
					///the most optimal solution will not have a 'delay' time
					///it will switch the particle on or off at the right time.
					///two times: delay (till start, not a count, an integer
					///second time is duration
					///this will allow for a "delay" or "simultaneous" "triplet" "alternate" "etc" approach to the animations
					
					///start time and duration////
					 if(this.degradeType == 'parabolic') {
					 		//parabolic disperse where delay = 0, all happen simultaneous and slow down
					 				// collect where delay = master - duration
					 				// centered where delay is half of collect duration
					 				// intermitten where it is perpetually "on" delay = 'false'
							var parabolaOne = 0;	
							var parabolaTwo = 1;	
							var parabolaThree = 2;
						for(i = 0; i<position; i++) {
	    					parabolaThree = parabolaOne + parabolaTwo;
	    					parabolaOne = parabolaTwo;
	    					parabolaTwo = parabolaThree;
	    				}
	    				this.halfLife = halfLifeTimeMaster/parabolaOne;
						////this should be a simple formula that adds a self-contained timer to the element in an n=n+n function
					}else if(this.degradeType == 'linear') {
						///
						////this should be a simple formula that sets the timer to an n = n + delay fashion.
					}else if(this.degradeType == 'exponential') {
						////this should be a simple n = n*n+delay fashion
					if(this.degradeType == 'reverseLinear') {
					
					}else if(this.degradeType == 'reverseExponential') {
					
					}
				}
				this.elems[paths].check = function() {	
					/* change required */
					/// have to have a stage controller that does not rely on properties but on internal timings.
					if(this.finished == 'first') {
						var useable = parseInt(this.style.strokeDashoffset.substring(0, this.style.strokeDashoffset.length - 2));
						if(useable < 0){
							this.finished = 'second'; 
						}
					}else if(this.finished == 'second') {
						if(this.opacity < 0) {
							this.finished = 'third';
						}
					}else if(this.finished == 'third') {
							
					}
				}
				this.elems[paths].reset = function() {
					if(this.tagName.toLowerCase() == 'path') {
						this.style.strokeDashoffset = length;
						this.style.opacity = 1;
					}else if(this.tagName.toLowerCase() == 'stop') {
					
					}
					this.finished = 'first';
				}
			}
					
			} };
		
		
		


	oneshot.prototype = new TemporalPattern();
	function oneshot(oneshotArguments) {
		///these are the initial/expected/default arguments and numbers of arguments.
		
		
		this.makeObject = function () {
		
		}
		
		///just need to create a function that makes each argument that passes through parseArgs()
		//////into an object property... not too hard, right?
		this.currentMeasure = 0;
		this.measures = 0;
		this.direction = direction;
	
		this.elems = [];
	}
		oneshot.prototype.fire = function() {};
		oneshot.prototype.calculate = function() {};

	chained.prototype = new TemporalPattern();
	function chained(chainedArguments){
		this.prevStage = -1;
		this.measureLength = 0; ///dependent on division type///
		this.local_initial = new Date().getTime();
		this.delay = 0;///do I need delay?///
		this.type = 'chained';
		this.elems = [];
		///the compost holds the previous stage of the animation, which allows it to deteriorate during the next stage
		this.compost =[];
		this.gather = function() {
			var typeElems = document.getElementsByClassName(this.type);
			var colorElems = document.getElementsByClassName(this.color);
			var returnedElems = [];
			var checkedElems = [];
			for (var j in colorElems) {
    		  checkedElems[colorElems[j]] = colorElems[j];
  			}
 			for (var i in typeElems) {
 			     if (typeof checkedElems[typeElems[i]] != 'undefined' && typeof checkedElems[typeElems[i]] == 'object') {
 			     	var tempClass = typeElems[i].className.baseVal.split(" ")[2];
 			     	if(typeof returnedElems[tempClass] == 'undefined') {
 			     		returnedElems[tempClass] = [];
 			     		returnedElems[tempClass].push(typeElems[i]);
 			     	}else {
 			     		returnedElems[tempClass].push(typeElems[i]);
 			     	}
	
				 }
	 		}
			this.elems = returnedElems;
	
		}
		this.purifyPaths = function() {
			var lengths = [];
				for(var i in this.elems) {
					for(var paths in this.elems[i]) {
					var length = this.elems[i][paths].getTotalLength();
						lengths.push(length);
						this.elems[i][paths].temporality = this.elems[i][paths].className.baseVal.split(" ")[1];
						this.elems[i][paths].style.strokeDasharray = length + ' ' + length;
						this.elems[i][paths].style.strokeDashoffset = length;
						this.elems[i][paths].totallength = this.elems[i][paths].getTotalLength();
					}
				}
	
	
		}
		///send to compost should be called as the stage is changed.
		this.sendToCompost = function() {
			this.compost.length = 0;
			this.direction *= -1;
			for(var compostable in this.elems['stage_'+this.prevStage]) {
				if(this.elems['stage_'+this.prevStage][compostable].className.baseVal.split(" ")[1] == 'temporary') {
					this.compost.push(this.elems['stage_'+this.prevStage][compostable]);
				} else {
					this.elems['stage_'+this.prevStage][compostable].style.strokeDashoffset = 0;
				}
			}
		}
	}
		chained.prototype.fire = function() {};
		chained.prototype.calculate = function() {};
		
	repeatable.prototype = new TemporalPattern();
	function repeatable(repeatableArguments){
		TemporalPattern.call(this, repeatableArguments);
	///do a for var in args to get all properties///
	///need to skip over helper methods/////////////
	/////object properties/////
		this.measureLength = 0; ///dependent on division type///
		this.local_initial = new Date().getTime();
		this.delay = 0;///do I need delay?///
		this.type = 'repeatable';
 		this.local_initial = new Date().getTime();
		this.elems = [];
		this.initialAsyncTimer = new Date().getTime()
		this.currentAsync = Date.now() - this.initialAsyncTimer;
		this.individTime = this.duration/this.elems.length;
 		
 		
    /////object methods//////
 
			
	};	
		repeatable.prototype.fire = function() {};
		repeatable.prototype.calculate = function() {};


//////////////////////////////////////////////
/////////////Animation Creator////////////////
//////////////////////////////////////////////




	function createAnimation(func){
		//if it has a type, set it and remove it from the argument array, if not, default to oneshot.
		//furthermore, remove that element from the arguments if it exists.
		var args = new SpecialArray();
		var animationTypes = {
		///need this switch board to point to a function of creating the object, it doesn't now and
		///new oneshot() creates 
			'oneshot' : function(animationProperties) {return new oneshot(animationProperties)},
			'chained' : function(animationProperties) {return new chained(animationProperties)},
			'repeatable' : function(animationProperties) {return new repeatable(animationProperties)}
		}
	
		///every time I have to use this pattern, it's because javascript is wrapping the 
		///array of arguments in an object that's position 0 is an array. fucking javascript.
		for(var argus in arguments[0]) {
			args.add(argus, arguments[0][argus]);
		}
	
		var typeToSet = (func['type'] != 'undefined') ? func['type'] : 'oneshotAnimation';
		if(args.contains('type')){
			args.remove('type');
		} 
		var objectName = typeToSet.toString();
	
		var object = animationTypes[objectName](args);
		///success, victory is yours today. Now the objects correctly create themself
		///with all arguments. The only tasks left for you down here are:
		/////creating a group of functions to determine base values based on arguments
		/////finding a way to pass class-specific options through validation
		/////dividing the object into moving parts.
		/////particularizing the arguments by comparing the children against the parent.
		console.log(object);

		return object;
	}








//////////////////////////////////////////////
///////////Animation Group Prototype//////////
///This is one whole section's animations/////
//////////////////////////////////////////////
	function createAnimationGroup(func){
		var args = Array.prototype.slice.call(arguments, 1);
		var object = Object.create(func.prototype);
		func.apply(object, args);
		return object;
	}
	var animationGroup = function(color){
		//this is the switching mechanism to control which animations are actively being manipulated
		//these properties are referenced (and the animations thusly) to set local time, get divisional information
		//this type of group structure is needed, but should be altered to be more fluid. 
		//i.e. not just my required groups in not just my required mixings.
		this.state = color;
		this.background = backgroundGroup[color];
		this.bottomBar = bottomBarGroup[color];
		this.topBars = topBarsGroup[color];
		this.centerContent = centerContentGroup[color];
		this.centerFlair = centerFlairGroup[color];
		this.transitionIn = transitionInGroup[color];
		this.transitionOut = transitionOutGroup[color];
		this.loop = loopGroup[color];
		this.frame = 0;
		this.randomizer = function(min, max) {
   		 	return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		/*needs to be modified to take a varying amount of perameters
		  also will change based on groups active, so perhaps overlapping namespaces aren't great? */	
		this.progress = { 'background' : '', 'bottomBar' :  '', 'topBars' : '', 'centerContent' : '', 'centerFlair' : '', 'transitionIn' : '', 'transitionOut' : ''};
		this.setProgress = function(command, data) {
			//need to formulate bpm to something that can take the place of 10000 and 6000
			//This is the stage progress. From the initial tick all other timing events should be derrived from their individual duration and their delay.
			if(command == 'initialize') {
				this.initial = new Date().getTime();
				this.master = (Date.now() - this.initial)/(this.loop * 1000);
				this.progressLoop();
			} else if (command == 'tick') {
				this.master = (Date.now() - this.initial)/(this.loop * 1000);
				this.progressLoop();
				if(this.master >= this.frame+1) {
					///forward the frame each interval it should appear, this is used to calculate
					///chained Animation Progress and scrub position.
					this.frame += 1;
				}
			}else if (command == 'reset') {
				this.initial = new Date().getTime();
				this.master = (Date.now() - this.initial)/(this.loop * 1000);
				this.progressLoop();
			} else if (command == 'scrub') {
				this.frame = data;
				this.initial = new Date().getTime();
				this.master = (Date.now() - this.initial) + (this.frame * 1000);
				this.progressLoop();
			}	
		}
		this.progressLoop = function() {
			for(var property in this.progress) {
				if(this[property] !== undefined && this[property] instanceof chainedAnimation) {
					this.progress[property] = ((Date.now() - this[property].local_initial)/this[property].stageLength);
					//for chained animations, set the stage to the nearest previous stage after scrub(defined by the frame set)
					if(Date.now() - this[property].local_initial >= this[property].stageLength) {
	          this[property].currentStage = Math.floor((this.master * 1000)/this[property].stageLength);
	          this[property].prevStage = this[property].currentStage - 1;
						this[property].local_initial = new Date().getTime();
						this.progress[property] = ((Date.now() - this[property].local_initial)/this[property].stageLength);
						this[property].sendToCompost();
					}
					//set the animation's progress to the % that it should be at the scrubbed time.
				} else if(this[property] !== undefined && this[property] instanceof repeatableAnimation) {
					this.progress[property] = ((Date.now() - this[property].local_initial)/this[property].duration);
	        if (this.progress[property] >= 1) {
	          this[property].calculate('reset')
	          this[property].local_initial = new Date().getTime();
	          this.progress[property] = ((Date.now() - this[property].local_initial)/this[property].stageLength);
	        }
				} else {
					this.progress[property] = ((Date.now() - this.initial)/this[property].duration);
				}
			}
		}
		this.setProgress('initialize');
	}
	
////////////////////////////////////////////////////////////












///////////////////////////////////////////
////Animation group setting and firing/////
///////////////////////////////////////////
///fire should be the basic animation time check/update. It should check which elements to fire and fire them.
///calculate is all about element ordering and handling the overarching animation counts that affect the particles.
///it also can control the repetition/cancellation of the particles
///////////////////////////////////////////////////////////////
////multiples of 16ms preferred 320 is one beat////
//////////////////////////////////////////////////
/*var purpleBackground = createAnimation(repeatableAnimation, 20000, 200, false, 'all', 1, true, 'purple', 'background');
	purpleBackground.fire = function() {
		for(var j in this.randomElems) {
			if(this.randomElems[j].finished == 'first') {
   				this.randomElems[j].style.strokeDashoffset = Math.floor(this.randomElems[j].totallength * ((1 - (animationGroupGroup[this.color].progress[this.type]* this.parabolaArray[j] )) ));
   				this.randomElems[j].check();
   			} else if(this.randomElems[j].finished == 'second') {
   				this.randomElems[j].style.opacity = 1 - ((animationGroupGroup[this.color].progress[this.type]* this.randomElems[j].modifier)/2);
   				this.randomElems[j].check();
   			} else if(this.randomElems[j].finished == 'third') {
				this.randomElems[j].reset();
   			}
   		}
	};
	purpleBackground.calculate = function(command, leaf) {
		if(command == 'initialize') {
			var randomElementCount = 10;
			this.randomElems = [];
			this.gather();

			this.purifyPaths();
			var elemListLength = this.elems.length;
			
			//////I have to number the indices and have a new array with the parabola points in the same indices I want to use, it seems////
			////this array points to functions for the elements?////
			
			var ix = Math.floor(Math.random() * elemListLength);
			this.randomElems.push(this.elems[ix]);
			this.randomElems[this.randomElems.length-1];
			this.parabolaArray.push(parabolaOne);

			if (elemListLength > 1) {
				for(var o = 0; o<randomElementCount; o++) {
					var anotherElement = this.elems[(ix + 1 + Math.floor(Math.random() * (elemListLength - 1))) % elemListLength];				
    				if(this.checkElem(anotherElement, this.randomElems) == true) {
    					o--;
    					continue;
    				} else {
    					this.randomElems.push(anotherElement);
    					this.randomElems[this.randomElems.length-1].modifier = parabolaOne;
    				
    				}
    			}
			}
			console.log(this.elems);
		} else if(command == 'tick') {

		} else if(command == 'reset') {

		} else if(command == 'rakeTheLeaf') {
			
			var finished = false; 
			var location_to_go = 1;
			while(finished == false) {
				switch (location_to_go){
					case 1:
						//first time through
						var aNumber = Math.floor(Math.random() * this.elems.length);
						var replacement = this.elems[aNumber];
						var remembered;
						location_to_go = 2;
						break;
					
					case 2:
						//check if new element exists in the random array already, if so, go back to one, if not, finish the loop
						//if all was successful, go to 3 if not, go back to start
						if(this.checkElem(replacement, this.randomElems) == true) {
							location_to_go = 1;
						} else {
							location_to_go = 3;
						}
						break;
					case 3:
						for(var random in this.randomElems) {
							if(this.randomElems[random] == leaf) {
								leaf.reset;
								leaf.finished ='first';
								this.randomElems[random] = replacement;
								
							}
						}
						finished = true;
						break;
					}
				}
		}
	}
 purpleBackground.calculate('initialize');


var purpleBottomBar = createAnimation(repeatableAnimation, 800, 200, false, 'all', 1, false, 'purple', 'bottomBar');
	purpleBottomBar.fire = function() {
		for(var i=0;i<this.borderlength; i++) {
   			 var tempMeasure = Math.floor( this.bottomLineOffsetArray[i] + animationGroupGroup[this.color].progress[this.type] * 200 );
   			this.bottomBorder[i].setAttribute('offset', ' '+ tempMeasure +'%');

   		}
   		for(var i=0;i<this.innerlength; i++) {
   			 var tempMeasure = Math.floor( this.bottomFillOffsetArray[i] + animationGroupGroup[this.color].progress[this.type] * 200 );
   			this.bottomFill[i].setAttribute('offset', ' '+ tempMeasure +'%');
   		}
	};
	purpleBottomBar.calculate = function(command) {
		if(command == 'initialize') {
			this.elems = fetchPreparedSVGElementsByType(this.type);
			this.bottomBorder = fetchPreparedSVGElementsByType('bottom_border', this.type);
			this.bottomFill = fetchPreparedSVGElementsByType('bottom_fill', this.type);
			this.borderlength = this.bottomBorder.length;
			this.innerlength = this.bottomFill.length;
			this.bottomLineOffsetArray = {0 : -100, 1 : -75, 2 : 0};
			this.bottomFillOffsetArray = { 0 : -100, 1 : -85, 2 : -50, 3 : -30, 4 : -20};
		}else if (command =='tick') {
			this.fire();
		} else if (command == 'reset') {

		}
	};
	purpleBottomBar.calculate('initialize');





//make it so only one is on the screen at the time, but so that one is always up and fades out//
var purpleTopBars = createAnimation(repeatableAnimation, 4000, 200, false, 'all', 1, false, 'purple', 'topBars');
	purpleTopBars.fire = function() {
	
		for(var u=0;u<this.sync.length; u++) {
			for(var part in this.elems['anim_'+this.sync[u]]) {
          ///need to find standarized way to deal with the gradient offsets
          ///ideal solution will allow a class pairing to control the gradient
          ///without setting this.lineoffsetarray.
   				var tempMeasure = Math.floor( this.LineOffsetArray[u][part] + animationGroupGroup[this.color].progress[this.type] * (this.delay * this.sync[u]));
           		this.elems['anim_'+this.sync[u]][part].setAttribute('offset', ' '+ tempMeasure +'%');
   			}
   		}
	};
	purpleTopBars.calculate = function(command) {
	
		if(command == 'initialize') {
			this.sync = [ 1, 2, 3];
			this.gather();

			this.LineOffsetArray = {0 :{0 : -80, 1 : -40, 2 : -20, 3 : -85, 4 : -75, 5 : -55, 6 : -35, 7 : -20}, 1 :{0 : -40, 1 : -30, 2 : -20, 3 : -45, 4 : -40, 5 : -30, 6 : -25, 7 : -20}, 2 :{ 0 : -60, 1 : -40, 2 : -10, 3 : -65, 4 : -60, 5 : -55, 6 : -15, 7 : -10}};
		}else if (command =='tick') {
		} else if (command == 'reset') {
			var theOrder = this.sync;
      var currentIndex = theOrder.length;
			var randOrder = [];
			for(i = 0; i < this.sync.length; i++) {
        //problems, looping through the group(of which there are only 0,1,2) while looping through all 6 elements (fills and strokes)
        ///best solution would grab ONLY topbar groups, translate them, then order them correctly as a pair of fills and strokes
        $('g#'+i).attr('transform', 'translate('+animationGroupGroup[this.color].randomizer(-60, 0)+','+animationGroupGroup[this.color].randomizer(-20, 50)+')');
        while(0 !== currentIndex){
          var randNum = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          randOrder = theOrder[currentIndex];
          theOrder[currentIndex] = theOrder[randNum];
          theOrder[randNum] = randOrder;
        }
			}
			this.sync = theOrder;
		}
	};
	purpleTopBars.calculate('initialize');

var purpleTransitionIn = createAnimation(chainedAnimation, 7000, 1000, false, 6, 1, 'purple', 'transitionIn');
	purpleTransitionIn.gather();
	purpleTransitionIn.purifyPaths();

	purpleTransitionIn.fire = function() {
			for(var j in this.elems['stage_'+this.currentStage]) {
   				this.elems['stage_'+this.currentStage][j].style.strokeDashoffset = Math.floor(this.elems['stage_'+this.currentStage][j].totallength * ((1- animationGroupGroup[this.color].progress[this.type] ) ));
   			}
   			for(var k in this.compost) {
   				this.compost[k].style.strokeDashoffset = Math.floor(this.compost[k].totallength * ((animationGroupGroup[this.color].progress[this.type] )));
   			}
	};





///animationGroupGroup['purple'].background.fire////
var backgroundGroup = {
	'purple' : purpleBackground,
	
};

var bottomBarGroup = {
	'purple' : purpleBottomBar,
	
};
var topBarsGroup = {
	'purple' : purpleTopBars,
	
};
var centerContentGroup = {
	'purple' : purpleCenterContent,
	
};
var centerFlairGroup = {
	'purple' : purpleCenterFlair,
	
};

var transitionInGroup = {
	'purple' : purpleTransitionIn,
	
};

var transitionOutGroup = {
	'purple' : purpleTransitionOut,

};
////multiples of 16ms preferred 320 is one beat////
//in seconds
var loopGroup = {
	///this is for the scrubber, the time here (in seconds) identifies the intervals to which the scrubber will scrub
	///this is necessary for chained animation staging
	'purple' : 1,
	
};


///this is how to group all animations by color/////
/////each animation should be an animation object////////
var animationGroupGroup = {
	'purple' : createAnimationGroup(animationGroup, 'purple'),
	

};



////to call a function purpleGroup.background.fire/////


///////////colors/////////////
var c = pusher.color("#FF0000").hue(40).hex6();


//////////Listening//////////

sizeSVG();

purpledraw();*/
}

/////////Helper Functions//////////////////

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
    return (SpecialArray);
}).call( {} );


////////Request Animation Frame Shim///////
(function () {
   window.performance = (window.performance || {});

   window.performance.now = (function () {
      return (
         window.performance.now ||
         window.performance.webkitNow ||
         window.performance.msNow ||
         window.performance.mozNow ||
         Date.now ||
         function () {
            return +new Date();
         });
   })();

   window.requestAnimationFrame = (function () {
      return (
         window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function (callback) {
            return setTimeout(function () {
               var time = window.performance.now();
               callback(time);
            }, 16);
         });
   })();


   window.cancelAnimationFrame = (function () {
      return (
         window.cancelAnimationFrame ||
         window.webkitCancelAnimationFrame ||
         window.msCancelAnimationFrame ||
         window.mozCancelAnimationFrame ||
         function (id) {
            clearTimeout(id);
         });
   })();
})();

///////////////////////////////////////////
///////////////////////////////////////////


