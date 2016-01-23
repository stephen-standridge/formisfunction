export default function getXY(evt, target) {
    var element = target || evt.currentTarget;  //replace elementId with your element's Id.
    var rect = element.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop?
                    document.documentElement.scrollTop:document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft?                   
                    document.documentElement.scrollLeft:document.body.scrollLeft;
    var elementLeft = rect.left+scrollLeft;  
    var elementTop = rect.top+scrollTop, x, y;

    if (document.all){ //detects using IE   
        x = event.clientX+scrollLeft-elementLeft; //event not evt because of IE
        y = event.clientY+scrollTop-elementTop;
    }
    else{
        x = evt.pageX-elementLeft;
        y = evt.pageY-elementTop;
    }

    return {x, y}
}

