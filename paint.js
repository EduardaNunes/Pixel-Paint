document.body.onload = size(3);

let color = ''
let eraserColor = "#f4f1de"
let erase = false
let draw = true

/* const config = {attributes: true};
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'attributes') {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};
const observer = new MutationObserver(callback); */

function size(btnId){

    let canvas = document.querySelector('.pixel-canvas')

    let columnRowNumb = btnId;
    let canvasSize = 11 * btnId -1;
    let totalPixels = btnId * btnId;

     canvas.innerHTML=''
    for (var i=0; i<totalPixels; i++){
        canvas.innerHTML+='<div id="'+i+'"class="pixel-paint"></div>'
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
    
    const changeColor = new MutationObserver(changes);

    function changes(mutations){
        for (let mutation of mutations){
            if(mutation.type === 'attributes'){
                console.log(mutation.target.id);
                console.log(mutation.oldValue)
            }
        }
    }

    for (let i = 0; i<pixel.length; i++){
        changeColor.observe(pixel[i], {attributes:true, attributeOldValue:true});
        pixel[i].addEventListener('click',multiplePaint);
    }

    function multiplePaint(){
        this.style.background = color;
        
        let teste = Array.from(pixel).indexOf(this);
        console.log(teste)
    }
    
}