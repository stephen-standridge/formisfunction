
window.onload=function(){
///global variables////
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
{
     $('#definitions').height(0).width(0);
}
  
    
 
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
  var designcontent = {
    'current' : 'first',
    'prev' : 'third',
    'next' : 'second'
  };
  var designhrefs = {
    'first' : 'http://www.ipoquest.com',
    'second' : 'http://www.annacolibri.com',
    'third' : 'http://www.growthstarsawards.com'
  }
  var hidden2hrefs = {
    'first' : '#illustration',
    'second' : '../images/seconduncoloredlarge.jpg',
    'third' : '../images/thirdcoloredlarge.jpg'
  }
  var hidden2content={
    'current' : 'second',
    'prev' : 'first',
    'next' : 'third'
  }

////////////////////////////////////////////
//////Initialize Animations/////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////
  var animationController = {
    create: function(args) {
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
    
    
  };
  var remote = animationController.create();

  


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
    }  else {
      return true;
    }
  }
  
///////////////////////////////////////////
///////Unorganized stuff, need to clean//////////////
///////////////////////////////////////////
    
    
    
  ///the only HORRIBLY negative thing to snap svg///
  
   
    function init() {
      var subnavitems =  document.getElementsByClassName('option');
      for(i=0; i < subnavitems.length; i++) {
        subnavitems[i].addEventListener('click', function(){
          var subhashtag = this.href.split('#')[1],
            substatus = this.className.split(' ')[2],
            subaction = this.getAttribute('data-action');
          
           if(subaction == 'prev'){
             if(subhashtag == 'design'){
               $('.design.'+designcontent.current+'.subtext').removeClass('darker').addClass('lighter');
               $('.design.'+designcontent.prev+'.subtext').addClass('darker').removeClass('lighter');
               $('.design-san.execute.'+designcontent.current).addClass('waiting').removeClass('execute');
               $('.design-san.waiting.'+designcontent.prev).addClass('execute').removeClass('waiting');
               $('.design.'+designcontent.current+'.darker').removeClass('darker').addClass('lighter');
               $('.design.'+designcontent.prev+'.0').addClass('darker').removeClass('lighter');
               $('.design.'+designcontent.current).addClass('out').removeClass('in');
               $('.design.'+designcontent.prev).addClass('in').removeClass('out');
               $('#designlink').attr('href', designhrefs[designcontent.prev]);
               change(designcontent.current, designcontent.prev, designcontent.next, 'prev');
             } else if(subhashtag == 'hidden2'){
               $('.hidden2-san.'+hidden2content.current).addClass('waiting').removeClass('execute');
               $('.hidden2-san.'+hidden2content.prev).addClass('execute').removeClass('waiting'); 
               $('#hidden2link').attr('href', hidden2hrefs[hidden2content.prev]);
               changehidden2(hidden2content.current, hidden2content.prev, hidden2content.next, 'prev');            
             }
           } else if(subaction == 'next'){
             if(subhashtag == 'design'){
               $('.design.'+designcontent.current+'.subtext').removeClass('darker').addClass('lighter');
               $('.design.'+designcontent.next+'.subtext').addClass('darker').removeClass('lighter');
               $('.design-san.execute.'+designcontent.current).addClass('waiting').removeClass('execute');
               $('.design-san.waiting.'+designcontent.next).addClass('execute').removeClass('waiting');
               $('.design.'+designcontent.current+'.darker').removeClass('darker').addClass('lighter');
               $('.design.'+designcontent.next+'.0').addClass('darker').removeClass('lighter');
               $('.design.'+designcontent.current).addClass('out').removeClass('in');
               $('.design.'+designcontent.next).addClass('in').removeClass('out');
               $('#designlink').attr('href', designhrefs[designcontent.next]);
               change(designcontent.current, designcontent.prev, designcontent.next, 'next');
               
             } else if (subhashtag == 'hidden2'){
               
               $('.hidden2-san.'+hidden2content.current).addClass('waiting').removeClass('execute');
               $('.hidden2-san.'+hidden2content.next).addClass('execute').removeClass('waiting'); 
               $('#hidden2link').attr('href', hidden2hrefs[hidden2content.next]);
               changehidden2(hidden2content.current, hidden2content.prev, hidden2content.next, 'next');
               
             }
           } else {
             console.log('no subaction indicated');
           }
              
        }, false);
      }
      function change(current, prev, next, direction){
        if(direction == 'prev'){
          designcontent.next = current;
          designcontent.current =prev;
          designcontent.prev = next;
        }else if (direction == 'next'){
          designcontent.prev = current;
          designcontent.current =next;
          designcontent.next = prev;
        }
      }
      function changehidden2(current, prev, next, direction){
        if(direction == 'prev'){
          hidden2content.next = current;
          hidden2content.current =prev;
          hidden2content.prev = next;
        }else if (direction == 'next'){
          hidden2content.prev = current;
          hidden2content.current =next;
          hidden2content.next = prev;
        }
      }
      var lightitems =  document.getElementsByClassName('lighter');
      for(i=0; i < lightitems.length; i++) {
        lightitems[i].addEventListener('click', function(){
          var lightindex = this.className.split(' ')[0],
            lightelem = this.className.split(' ')[1],
            curelems = $('.'+navoptions.current+'-san.'+lightelem),
            curelem = $('.'+navoptions.current+'-san.'+lightelem+'.execute');
            curelem.addClass('waiting').removeClass('execute');
            $('.design.list.darker').addClass('lighter').removeClass('darker');
            $('.design-san.darker').addClass('lighter').removeClass('darker');
            $(curelems[lightindex]).addClass('execute').addClass('darker').removeClass('waiting');
            $(this).addClass('darker').removeClass('lighter');
        }, false);
        }
      
      var navitems =  document.getElementsByClassName('navoption');
      for(i=0; i < navitems.length; i++) {
        navitems[i].addEventListener('click', function(){
          var hashtag = this.href.split('#')[1],
            status = this.className.split(' ')[1];
          if (status == 'active'){
           $('.background_line').delay(150).queue(function(alt){
             $(this).each(function(){
             $(this).attr('class', $(this).attr('class').split(' normal')[0] +' flicker').delay(300).queue(function(alt){
               $(this).attr('class', $(this).attr('class').split(' flicker')[0] +' '+hashtag );
               alt();
             });
             alt();
             });
           });
              } else if(status == 'inactive') {
                $('.active').addClass('inactive').removeClass('active');
                preptransition(hashtag, 'foreward');
                $(this).addClass('active').removeClass('inactive');
              } else {
                console.log('else');
              }
        }, false);
    
        
        
        
        
        function preptransition(hashtag, direction){
          if(direction == 'skip') {
            $('#'+hashtag).addClass('in').removeClass('out');
            $('.'+hashtag).addClass('in').removeClass('out');
            
          } else if(direction == 'foreward') {
            $('.'+navoptions.current).addClass('out').removeClass('in');
            $('#'+navoptions.current).addClass('out').removeClass('in');
            
            document.getElementById('finalbg').className = hashtag;
            document.getElementsByClassName('logoline').className = hashtag;
            
            ///giving the chosen class to the background to change it///
            if(hashtag == 'normal' || hashtag == 'hidden2' || hashtag == 'design'){
              if (hashtag == 'hidden2') {
                $('.simple').addClass('white').removeClass('greentxt');
                greenbg.attr('style', 'display: none;');
                $('#'+navoptions.current+'Content').addClass('waiting').removeClass('execute');
                $('#'+navoptions.current+'Content .'+navoptions.current+'-san').addClass('waiting').removeClass('execute');
                $('#'+hashtag+'Content .'+hashtag+'-san.'+hidden2content.current).addClass('execute').removeClass('waiting');
                $('path.background_line').each(function(){
                  $(this).attr('class', $(this).attr('class').split(' green')[0]);
                });
                $('#designContent').addClass('out').removeClass('in');
                finalbg.animate({'fill-opacity': 0}, 200);
                $('.changeable').addClass('white');
                $('a').addClass('white');
                
                for(var u = 0; u < whitelines.length; u++) {
                  console.log('wut');
                  if( i == 'items') {

                      } else {
                        whitelines[u].animate({'stroke-opacity': 1}, 200);
                      }
                }
                $('#'+hashtag).addClass('in').removeClass('out');
                $('.'+hashtag).addClass('in').removeClass('out');
              } else if(hashtag == 'design'){
                $('.simple').addClass('white').removeClass('greentxt');
                if(finished =='nope'){
                  greenbg.attr('style', 'display: block;');
                }else {
                
                }
                $('#'+navoptions.current+'Content').addClass('waiting').removeClass('execute');
                $('#'+navoptions.current+'Content .'+navoptions.current+'-san').addClass('waiting').removeClass('execute');
                var current = $('.design.subtext.darker').attr('class').split(' ')[0];
                $('#'+hashtag+'Content .'+hashtag+'-san.darker.'+current).addClass('execute').removeClass('waiting');
                $('path.background_line').each(function(){
                  $(this).attr('class', $(this).attr('class').split(' green')[0]);
                });
                $('#designContent').addClass('in').removeClass('out');
                finalbg.animate({'fill-opacity': 1}, 200);
                $('.changeable').removeClass('white');
                $('a').removeClass('white');
                for(var u = 0; u<whitelines.length; u++) {
                  if( i == 'items') {

                      } else {
                        whitelines[u].animate({'stroke-opacity': 0}, 200);
                      }
                }
                $('#'+hashtag).addClass('in').removeClass('out');
                $('.'+hashtag+'.'+designcontent.current).addClass('in').removeClass('out');
              } else {
                $('.simple').addClass('greentxt').removeClass('white');
                if(finished =='nope'){
                  greenbg.attr('style', 'display: block;');
                }else {
                
                }
                $('#'+navoptions.current+'Content').addClass('waiting').removeClass('execute');
                $('#'+navoptions.current+'Content .'+navoptions.current+'-san').addClass('waiting').removeClass('execute');
                $('#'+hashtag+'Content .'+hashtag+'-san').addClass('execute').removeClass('waiting');
                $('path.background_line').each(function(){
                  $(this).attr('class', $(this).attr('class').split(' green')[0]);
                });
                $('#designContent').addClass('out').removeClass('in');
                finalbg.animate({'fill-opacity': 1}, 200);
                $('.changeable').removeClass('white');
                $('a').removeClass('white');
                for(var u = 0; u<whitelines.length; u++) {
                  if( i == 'items') {

                      } else {
                        whitelines[u].animate({'stroke-opacity': 0}, 200);
                      }
                }
                $('#'+hashtag).addClass('in').removeClass('out');
                $('.'+hashtag).addClass('in').removeClass('out');
              }
            } else if(hashtag == 'green') {
              $('.simple').addClass('greentxt').removeClass('white');
              if(finished =='nope'){
                  greenbg.attr('style', 'display: block;');
                }else {
                
                }
              $('#designContent').addClass('out').removeClass('in');
              $('#'+navoptions.current+'Content').addClass('waiting').removeClass('execute');
              $('#'+hashtag+'Content').addClass('execute').removeClass('waiting');
              $('path.background_line').each(function(index){
                $(this).attr('class', $(this).attr('class')+' green');
              });
              $('#hidden2Content .hidden2-san').addClass('waiting').removeClass('execute');
              $('.changeable').removeClass('white');
              $('a').removeClass('white');
              finalbg.animate({'fill-opacity' : 0}, 200);
                for(var u = 0; u<whitelines.length; u++) {
                  if( i == 'items') {

                      } else {
                        whitelines[u].animate({'stroke-opacity': 0}, 200);
                      }
                }
              $('#'+hashtag).addClass('in').removeClass('out');
              $('.'+hashtag).addClass('in').removeClass('out');
            } else {
              $('#navoptions').addClass('end');
              $('#'+hashtag).addClass('in').removeClass('out');
              $('.'+hashtag).addClass('in').removeClass('out');
              $('#designContent').addClass('out').removeClass('in');
              $('#simpleContent').addClass('in').removeClass('out');
              $('#hidden2Content').addClass('end');
              $('#myname').addClass('end');
            }
            
            
            
            navoptions.current = hashtag;
          }
        }
      }
      var s3= Snap( document.getElementById('fadeinlogo')), 
          s4 = Snap( document.getElementById('logo')),
        whitebg = s4.select('#whitebg'),
        greenbg = s4.select('#greenbg'),
        finalbg = s4.select('#finalbg'),
        outlines = s4.select('#linework'),
        whitelines = s4.selectAll('path.logolinefront');
        console.log(whitelines);
          logopaths = s3.selectAll('path');
          delay = 0;
      function doFadeIn(start, length, delay) {
          var mytime = setTimeout(function() { 
            logopaths[start].attr('style', 'opacity:1;');
           start++;
           if(start == 5) {
             makeLive();
           }
           if (start == 240) {
             outlines.animate({'opacity': 1}, 700);
             finished = 'yup';
             greenbg.animate({'opacity' : 0}, 2000, mina.easeout());
             finalbg.animate({'opacity': 1}, 1200, mina.easein());
           }
           if (start < 250) {
            doFadeIn(start, length, delay);
            }
          
          }, 0);
      }
          doFadeIn(0, logopaths.length, 70 );
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
            
              
            
            function openback() {
                
              var elems_count = 10;
              var duration = 1200;
              var stage = 1;
              var variation = 500;
              var route = 0;
              
              
              switch(route) {
                case 0:
                  
                  for(var k = 0; k < bgpaths.length; k++) {
                    if(k == 34) {
                      route = 1;
                      break;
                    } else {
                    }
                  }
                  
                case 1:
                  for(var j = 0; j < bgpaths.length; j++) {
                    if(j == 35) {
                      route = 2;
                      break;
                    } else {
                      if(bgpathsConfig[j].dir == -1) {
                        var finaltrans = bgpathsConfig[j].trans;
                        var finalspeed = duration + (variation/elems_count)*bgpathsConfig[j].stage;
                      } else if(bgpathsConfig[j].dir == 1) {
                        var finaltrans = 't0 0';
                        var finalspeed = duration + (variation/elems_count) *(elems_count- bgpathsConfig[j].stage);
                      }
                      bgpaths[j].stop().animate({ transform: finaltrans }, finalspeed, easing, foreward(j));
                      function foreward(num) {
                        bgpathsConfig[num].dir = (bgpathsConfig[num].dir == -1 ? 1 : -1);
                      }
                    }
                    
                  }
                  
                case 2:
                  for(var h = 0; h < bgpaths.length; h++) {
                    if(h == '35') {
                      route = 3;
                      break;
                    } else {
                      var strokecolor =(bgpathsConfig[h].dir == 1 ? '#52BC46' : '#ffffff');
                      bgpaths[h].animate({'stroke': strokecolor }, 900);
                      
                    }
                  }
                  
                case 3:
                  break;
              
              }
              
              
              
            

            }
            }
            init();
            
            
            
            


function hidelem() {
  document.body.lastElementChild.setAttribute('style',  'display:none;height:0px;width:0px;');
}
hidelem();


///////////////////////////////////////////
///////////////////////////////////////////

}
