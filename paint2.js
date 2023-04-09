let color = '';
const eraserColor = '#f4f1de';

colorInputs()

// Adicionando um EventListener para os 4 inputs de cor

function colorInputs() {
    let colorPicker = document.querySelectorAll('.color')

    for(var c = 0; c<colorPicker.length; c++){
        colorPicker[c].addEventListener('click', paintBrush)
        colorPicker[c].addEventListener('input', paintBrush)
    }

    function paintBrush(colorPicked){
        color = colorPicked.target.value
    }
}

size(5)

// Função que cria o canvas de acordo com o tamanho selecionado

function size(btnId){

    console.log('Size')
    console.log('--------------------------------------')

    let canvas = document.querySelector('.pixel-canvas')

    let columnRowNumb = btnId;
    let canvasSize = 11 * btnId -1;
    let totalPixels = btnId * btnId;

     canvas.innerHTML=''

    for (var i=0; i<totalPixels; i++){
        let pixelDiv = document.createElement('div');
        pixelDiv.classList.add('pixel-paint');
        pixelDiv.id = i;
        canvas.appendChild(pixelDiv);
    }

    canvas.style.cssText+='width:'+canvasSize+'vh; height:'+canvasSize+'vh; grid-template-columns:repeat('+columnRowNumb+',1fr);grid-template-rows:repeat('+columnRowNumb+',1fr);'

    paint(true,false,false,false)
}

function paint(draw, erase, eyeDrop, bucket){

    console.log('Paint')
    console.log('Draw = ' + draw)
    console.log('Erase = ' + erase)
    console.log('EyeDrop = ' + eyeDrop)
    console.log('Bucket = ' + bucket)
    console.log('--------------------------------------')

    let pixel = document.querySelectorAll('.pixel-paint')

    for(var i = 0; i<pixel.length; i++){
        pixel[i].removeEventListener('click',pixelPaint)
        pixel[i].addEventListener('click',pixelPaint)
    }

    function pixelPaint(){

        console.log('Draw = ' + draw)
        console.log('Erase = ' + erase)
        console.log('EyeDrop = ' + eyeDrop)
        console.log('Bucket = ' + bucket)
        console.log('--------------------------------------')

        /*if(draw === true){
            console.log('Draw')
            console.log('---------------')

            this.style.background = color;
        }else if(erase === true){
            console.log('Erase')
            console.log('---------------')

            this.style.background = eraserColor;
        }else if(eyeDrop === true){
            console.log('EyeDrop')
            console.log('---------------')

            color = window.getComputedStyle(this).backgroundColor;
            select('brush');
            paint(true,false,false,false);
        }*/
    }
}

// Função para um retorno visual (por meio de uma classe do css) de qual ferramenta está selecionada no momento

function select(toolsId){
    let tools = document.querySelectorAll('.tools');

    for (let i = 0; i < tools.length; i++){
        isSelected = tools[i].classList.contains('selected') 

        if (isSelected == true){
            tools[i].classList.remove('selected')
        }
    }

    document.getElementById(toolsId).classList.add('selected')

// Aqui compara-se qual das ferramentas está selecionda para setar a imagem customizada do cursor 

    if (toolsId == 'brush'){
        document.querySelector(':root').style.setProperty('--custom-cursor', 'url(Imgs/Mouse-Pixel-Paint-Brush.png),auto');
    }else if (toolsId == 'eyeDropper'){
        document.querySelector(':root').style.setProperty('--custom-cursor', 'url(Imgs/Mouse-Pixel-Dropper.png),auto');
    }else if (toolsId == 'bucket'){
        document.querySelector(':root').style.setProperty('--custom-cursor', 'url(Imgs/Mouse-Pixel-Paint-Bucket.png),auto');
    }else if(toolsId == 'eraser'){
        document.querySelector(':root').style.setProperty('--custom-cursor', 'url(Imgs/Mouse-Pixel-Eraser.png),auto');
    }
}