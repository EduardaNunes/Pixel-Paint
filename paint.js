size(3)

function size(btnId){

    let canvas = document.querySelector('.pixel-canvas')

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

    let pixel = document.querySelectorAll('.pixel-paint')
    let colorPicker = document.querySelectorAll('.color')
    let color = ''

    for(var i = 0; i<pixel.length; i++){
        pixel[i].addEventListener('click', pixelPaint)
    }

    for(var c = 0; c<colorPicker.length; c++){
        colorPicker[c].addEventListener('click', paintBrush)
        colorPicker[c].addEventListener('input', paintBrush)
    }

    function paintBrush(colorPicked){
        color = colorPicked.target.value
    }

    function pixelPaint(){
        this.style.background = color;
    }
}