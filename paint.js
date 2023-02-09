var color = ''
size(3)

function size(btnId){
    console.log('criou o canvas')

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

function paint(remove){

    if (remove == true){

        console.log('Rodou o Paint() no if')

        for(var i = 0; i<pixel.length; i++){
            pixel[i].removeEventListener('click',pixelPaint)
            console.log('Pixel Paint Removido')
        }
    }

    else{

        console.log('Rodou o Paint () no else')

        let pixel = document.querySelectorAll('.pixel-paint')
        let colorPicker = document.querySelectorAll('.color')

        for(var i = 0; i<pixel.length; i++){
            pixel[i].addEventListener('click',pixelPaint)
            console.log('PixelPaint EventListener')
        }

        for(var c = 0; c<colorPicker.length; c++){
            colorPicker[c].addEventListener('click', paintBrush)
            colorPicker[c].addEventListener('input', paintBrush)
        }

        function paintBrush(colorPicked){
            color = colorPicked.target.value
        }

        function pixelPaint(){
            console.log('Pixel Paint Pintou')
            this.style.background = color;
        }
    }
}

function eraser(){
    console.log('borracha')
    color = "#f4f1de"
    paint()
}

function dropper(){
    console.log('Clicou no Dropper')

    remove = true;

    paint(remove)

    for(var i = 0; i<pixel.length; i++){
        pixel[i].addEventListener('click', getColor)
        console.log("Dropper EventListener ")
    }  

    function getColor(){

        console.log('Rodou getColor()')

        for(var i = 0; i<pixel.length; i++){
            pixel[i].removeEventListener('click', getColor)
            console.log("Dropper Remove EventListener")
        } 
        
        color = window.getComputedStyle(this).backgroundColor;
        console.log("Dropper Pegou:  " + color)
    }
        
}