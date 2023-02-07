var canvas = document.querySelector('.pixel-canvas')

var pixel = document.querySelectorAll('.pixel-paint')
var colors = document.querySelectorAll('.color')
var color = ''

paint();
size(3);

function size(btnId){
    let x = btnId;
    let w = 11 * btnId -1;
    let totalPixels = btnId * btnId;

     canvas.innerHTML=''
    for (var i=0; i<totalPixels; i++){
        canvas.innerHTML+='<div class="pixel-paint"></div>'
    }
    canvas.style.cssText+='width:'+w+'vh; height:'+w+'vh; grid-template-columns:repeat('+x+',1fr);grid-template-rows:repeat('+x+',1fr);'
    pixel = document.querySelectorAll('.pixel-paint')
    paint() 
}

function paint(){

    for(var i = 0; i<pixel.length; i++){
        pixel[i].addEventListener('click', pixelPaint)
    }

    for(var c = 0; c<colors.length; c++){
        colors[c].addEventListener('click', paintBrush)
    }

    function paintBrush(){
        color = window.getComputedStyle(this).backgroundColor;
    }

    function pixelPaint(){
        this.style.background = color;
    }
}