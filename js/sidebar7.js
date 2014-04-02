
window.onload=function(){
///global variables////
	var masterWidth = window.innerWidth;
	var masterHeight = window.innerHeight;
	var meterOptions = {'animDeclare' : {}, 'animMix' : {}, 'type' : {}, 'duration' : {}, 'anim' : {}, 'sync' : {}, 'order' : {}, 'permanence' : {}, 'division' : {}};
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


	var animationHunter = {
		create : function() {
			this.extend({
				///an unorganized array of unfiltered animation object
				allAnimations : [],
				///an array object that is indexed by mix and points to created animation, use this to trigger/calculate///
				namespaceGroup : [],
				
				///just a simple reference of all the mixes available used by the controller to calculate mix transitions
				mixGroup : ['default'],
				
				///an array that points from the animation namespace to the different possible mixes(including default)
				///for easy reference in the mix transition calculation
				namespaces : []
			
			});
			this.getAllAnimations();
			return this;
		}, 
		getAllAnimations : function() {
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
		}, 
		makeAnimationObjects : function() {
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
			
	
				processedAnimations.push(notEvenMyFinalForm);
			
			}
		
			////give values to the constructor/////////
			////////add to ticker//////////////////////
			////send argument to the creation methods//
			this.allAnimations = processedAnimations;
			this.setNamespaceMix();
		},
		setNamespaceMix : function() {
			
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

		///test with multiple animations///
		///test with duplicate named animations too///
		///test with duplicate name but different mix///
		///now to create the controller///
		///which should be relatively identical to the animation group group/// 
	}
	
	var gatheredAnimations = animationHunter.create();
	var animationController = animationHunter.extend({
		create: function(args) {
			var self = animationHunter.create.call(this);
			///make sure it inherits these: namespaceGroup : [],mixGroup : ['default'],namespaces : []
			return self;
		},
		randomizer: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		setAnimationControllerAttributes : function() {
			//this is the switching mechanism to control which animations are actively being manipulated
			//these properties are referenced (and the animations thusly) to set local time, get divisional information
			//this type of group structure is needed, but should be altered to be more fluid. 
			//i.e. not just my required groups in not just my required mixings.
			this.state = color;
			///how does state relate to the new adding/subtracting mixes ideaology?///
			///what I'm losing by losing these groups:
			////the ability to control by color alone
			////how to bring this in the remix...
		
			///can still reference it by calling
			///however, it will not look for the default fallback or previous animation...
			///the animations should not be interrupted, so maybe this should have a garbage collection 
			///that collects once the time loop is finished?
			this.animationNamespaces[namespace][mix];
			///generate these for each animationNamespaces[namespace]
			this.background = backgroundGroup[color];
			this.bottomBar = bottomBarGroup[color];
			this.topBars = topBarsGroup[color];
			this.centerContent = centerContentGroup[color];
			this.centerFlair = centerFlairGroup[color];
			this.transitionIn = transitionInGroup[color];
			this.transitionOut = transitionOutGroup[color];
			this.loop = loopGroup[color];
			this.frame = 0;
			
			/*needs to be modified to take a varying amount of perameters
			  also will change based on groups active, so perhaps overlapping namespaces aren't great? */	
			this.progress = { 'background' : '', 'bottomBar' :  '', 'topBars' : '', 'centerContent' : '', 'centerFlair' : '', 'transitionIn' : '', 'transitionOut' : ''};
			this.setProgress('initialize');
		
		},
		setProgress : function(command, data) {
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
		}, 
		progressLoop : function() {
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
		},
		remix : function(operation, mix) {
		
		}
		
		
	});
	eventEmitter.define("addEventListener", eventEmitter.on);
	animationController.addEventListener("resize", function (oldSize, newSize) {
    	//do something
	});
	var  controller = animationController.create();



	function createAnimationGroup(func){
		var args = Array.prototype.slice.call(arguments, 1);
		var object = Object.create(func.prototype);
		func.apply(object, args);
		return object;
	}


	///the blueprint for an event responder and validator
	 var eventEmitter = blueprint(function () {
	     var events = Object.create(null);
	 
	     this.on = function (event, listener) {
	         if (typeof events[event] !== "undefined")
	             events[event].push(listener);
	         else events[event] = [listener];
	     };
	 
	     this.emit = function (event) {
	         if (typeof events[event] !== "undefined") {
   	          var listeners = events[event];
   	          var length = listeners.length, index = length;
   	          var args = Array.prototype.slice.call(arguments, 1);
	 
   	          while (index) {
   	              var listener = listeners[length - (index--)];
   	              listener.apply(this, args);
   	          }
   	      }
   	  };
 	});
 	///should be able to add a validator to any object so long as I use 
 		//something.addArrayValidator('args')
		//not quite sure how to call it this way...
 	var validator = blueprint(function() {
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
 	});
 	validator.define("addArrayValidator", validator.validateArgArray);
 	validator.define("addSingletonValidator", validator.validateArgContent);






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
	var rectangle = {
 		//define rectangle.create(); so we can pass arguments to generate a unique object on creation.
     	create: function (width, height) {
         	return this.extend({
             	height: height,
             	width: width
         	});
     	},
    	 area: function () {
        	 return this.width * this.height;
     	}
 	};
 
 	




	var TemporalPattern : {
		create : function(temporalArgs) {
			return this.extend({
				//The following are hidden attributes to the temporal pattern object.
				//initialize presets, possibility and numbers might not actually set well.
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
					///this turns the arguments into an array to be cleaned.
					initialArgs : Array.prototype.slice.call(arguments, 0)[0],
				});
			},
			setInitials : function() {
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
			},
			gather : function() {
				///uses this.dom
				var child = this.dom.firstChild;
				var measureRE = /^measureDeclare_/;
				while(child){
					var theseClasses = child.className.split(' ');
					for (var i=theseClasses.length;i--;) {
						if (measureRE.test(theseClasses[i])){
							console.log('why yes it does');
						} 
					} 
					
   					if(hasClass(child, 'measureDeclare')){
        			//do your stuff here
    				}
    				child = child.nextSibling;
				}			
				///no longer needs to find all elements
				///instead, needs to take dom and sort it.
				/////parse through elements
				////////if measureDeclare, make subanimation and parse it, add fire to array
				////////if not, parse element and add to array.
				//////////this is in animations/divisions/element/end/begin only only argument it should take is % of completion.
				////////array is {timetofire : fire()}
				////////if fire is a subanimation, it has one as well
				/////construct ending/transition
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
				},
				particularize : function(){
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
					
			} },
		
		
		
		
		///this calls the cleaning function on the arguments AND mixes it with the presets, overwriting as it goes.
		this.allArgs = this.validateArgArray(this.initialArgs, this.numbers, this.possibilities);	
	
		
		
	}
		
		
		
		
		


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
	//	repeatable.prototype.fire = function() {};
	//	repeatable.prototype.calculate = function() {};
	//	repeatable.prototype.gather = function(){
			///uses this.dom
			var child = this.dom.firstChild;
			var measureRE = /^measureDeclare_/;
			while(child){
				var theseClasses = child.className.split(' ');
				for (var i=theseClasses.length;i--;) {
					if (measureRE.test(theseClasses[i])){
						console.log('why yes it does');
					} 
				} 
				
   				if(hasClass(child, 'measureDeclare')){
        		//do your stuff here
    			}
    			child = child.nextSibling;
			}			
			///no longer needs to find all elements
			///instead, needs to take dom and sort it.
			/////parse through elements
			////////if measureDeclare, make subanimation and parse it, add fire to array
			////////if not, parse element and add to array.
			//////////this is in animations/divisions/element/end/begin only only argument it should take is % of completion.
			////////array is {timetofire : fire()}
			////////if fire is a subanimation, it has one as well
			/////construct ending/transition
		/*	var typeElems = document.getElementsByClassName(this.type);
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
    		this.elems = returnedElems;*/
/*		};*/



	///the object in question
 	var rectangle = {
 		//define rectangle.create(); so we can pass arguments to generate a unique object on creation.
     	create: function (width, height) {
         	return this.extend({
             	height: height,
             	width: width
         	});
     	},
    	 area: function () {
        	 return this.width * this.height;
     	}
 	};
 
 	///extend the object prototype so it works well with multiple inheritance and extensions
	Object.prototype.extend = function () {
		var hasOwnProperty = Object.hasOwnProperty;
     	var object = Object.create(this);
     	
     	var length = arguments.length;
     	var index = length;
 		///loop through properties and inherits(by concatenation) all extended properties, allowing for multiple inheritance.
     	while (index) {
         	var extension = arguments[length - (index--)];
     
 		
         	for (var property in extension)
             	if (property !== "clones" &&
                 	hasOwnProperty.call(extension, property) ||
                 	typeof object[property] === "undefined")
                     	object[property] = extension[property];
 				
         	if (hasOwnProperty.call(extension, "clones"))
         		
             	extension.clones.unshift(object);
         	else extension.clones = [object];
         		
     	}
 
     	return object;
 	};
 	
	///fix instanceof for multiple prototype checking
 	Object.prototype.instanceof = function (prototype) {
     	if (Object.hasOwnProperty.call(prototype, "clones"))
         	var clones = prototype.clones;
     	var object = this;
 
     	do {
         	if (object === prototype ||
             	clones && clones.indexOf(object) >= 0)
                 	return true;
 
         	var object = Object.getPrototypeOf(object);
     	} while (object);
 
     	return false;
 	};

	///adds the ability to change already created objects using the define function
 	Object.prototype.define = function (property, value) {
    	 this[property] = value;
 	
 	    if (Object.hasOwnProperty.call(this, "clones")) {
 	        var clones = this.clones;
 	        var length = clones.length;
 	
 	        while (length) {
 	            var clone = clones[--length];
 	            if (typeof clone[property] === "undefined")
 	                clone.define(property, value);
 	        }
 	    }
 	};


	///make an extension of the original object
 	var square = rectangle.extend({
 		//extend the create function of rectangle so that it creates a new square
    	 create: function (side) {
    	     var self = rectangle.create.call(this, side, side);
    	     eventEmitter.call(self);
    	     return self;
    	 },
    	 ///utilize extended properties easily!
    	 resize: function (newSize) {
    	     var oldSize = this.width;
    	     this.width = this.height = newSize;
    	     this.emit("resize", oldSize, newSize);
    	 }
 	});


	///fix the prototype chaining for all blueprins
	 function blueprint(f) {
	     var g = function () {
	         f.apply(this, arguments);
	         g.clones.unshift(this);
	 
	         var hasOwnProperty = Object.hasOwnProperty;
	 
	         for (var property in g)
	             if (property !== "clones" &&
	                 hasOwnProperty.call(g, property))
	                     this[property] = g[property];
	     };
	 
	     g.clones = [];
	 
	     return g;
	 };

	///make a blueprint for a prototype extension
	 var eventEmitter = blueprint(function () {
	     var events = Object.create(null);
	 
	     this.on = function (event, listener) {
	         if (typeof events[event] !== "undefined")
	             events[event].push(listener);
	         else events[event] = [listener];
	     };
	 
	     this.emit = function (event) {
	         if (typeof events[event] !== "undefined") {
   	          var listeners = events[event];
   	          var length = listeners.length, index = length;
   	          var args = Array.prototype.slice.call(arguments, 1);
	 
   	          while (index) {
   	              var listener = listeners[length - (index--)];
   	              listener.apply(this, args);
   	          }
   	      }
   	  };
 	});
 	
 	var sq = square.create(5);
 	
 	sq.resize(7);
	



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
		object.gather();
		return object;
	}











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
//}

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


