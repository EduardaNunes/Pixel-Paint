document.body.onload = size(3);

let color = ''
let eraserColor = "#f4f1de"
let erase = false
let draw = true

function size(btnId){

    let canvas = document.querySelector('.pixel-canvas')

    let columnRowNumb = btnId;
    let canvasSize = 11 * btnId -1;
    let totalPixels = btnId * btnId;

     canvas.innerHTML=''
    for (var i=0; i<totalPixels; i++){
        canvas.innerHTML+='<div class="pixel-paint"></div>'
    }
    canvas.style.cssText+='width:'+canvasSize+'vh; height:'+canvasSize+'vh; grid-template-columns:repeat('+columnRowNumb+',1fr);grid-template-rows:repeat('+columnRowNumb+',1fr);'
    pixel = document.querySelectorAll('.pixel-paint')

    paint()
}

function paint(){

    let pixel = document.querySelectorAll('.pixel-paint')
    let colorPicker = document.querySelectorAll('.color')

    for(var i = 0; i<pixel.length; i++){
        pixel[i].addEventListener('click',pixelPaint)
    }

    for(var c = 0; c<colorPicker.length; c++){
        colorPicker[c].addEventListener('click', paintBrush)
        colorPicker[c].addEventListener('input', paintBrush)
    }

    function paintBrush(colorPicked){
        color = colorPicked.target.value
        erase = false
        draw = true
    }

    function pixelPaint(){

        if(draw === true){
            this.style.background = color;
        }else if(erase === true){
            this.style.background = eraserColor;
        }
    }    
}

function eraser(){
    draw = false
    erase = true
    paint()
}

function paintBrush(){
    erase = false
    draw = true
    paint()
}

function eyeDropper(){
    erase = false
    draw = false

    for (let i = 0; i<pixel.length; i++){
        pixel[i].addEventListener('click',getColor, {passive:true, once:true});
    }

    function getColor(){
        color = window.getComputedStyle(this).backgroundColor;
        draw = true;
        paint();
    }
}

function paintBucket(){
    
}