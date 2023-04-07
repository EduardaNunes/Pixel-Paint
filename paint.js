// Setando algumas variáveis de uso para diferentes funções

let columnRowNumb = ''
let color = ''
let eraserColor = "#f4f1de"
let erase = false
let draw = true
let bucket = false

// Inicializando o canvas com o tamanho 3x3

size(5)

// Função que cria o canvas de acordo com o tamanho selecionado

function size(btnId){

    let canvas = document.querySelector('.pixel-canvas')

    columnRowNumb = btnId;
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
    pixel = document.querySelectorAll('.pixel-paint')

    paint()
}

// Função responsávei por pintar os pixels de acordo com diferentes fatores / ferramentas

function paint(){
    console.log('função paint')
    console.log('eraser = ' + erase)
    console.log('bucket = ' + bucket)
    console.log('draw = ' + draw)
    console.log('---------------------------------')

    if(bucket === true){
        
        bucket = false
        draw = false
        paintBucket(false);
    }

    let pixel = document.querySelectorAll('.pixel-paint')
    let colorPicker = document.querySelectorAll('.color')

    for(var i = 0; i<pixel.length; i++){
        pixel[i].removeEventListener('click', paintBrush)
        pixel[i].addEventListener('click',pixelPaint)
    }
    
    for(var c = 0; c<colorPicker.length; c++){
        colorPicker[c].removeEventListener('click', paintBrush)
        colorPicker[c].removeEventListener('input', paintBrush)
        colorPicker[c].addEventListener('click', paintBrush)
        colorPicker[c].addEventListener('input', paintBrush)
    }

    function paintBrush(colorPicked){
        color = colorPicked.target.value
        erase = false
        draw = true

        if(bucket === false){
            select('brush')
        }else if(bucket === true){
            select('bucket')
        }    
    }

    function pixelPaint(){

        console.log('função Pixel Paint')
        console.log('eraser = ' + erase)
        console.log('bucket = ' + bucket)
        console.log('draw = ' + draw)
        console.log('---------------------------------')

        if(draw === true && bucket === false && erase === false){
            this.style.background = color;
        }else if(erase === true){
            this.style.background = eraserColor;
        }
    }    
}

// Aqui ativa-se a ferramenta de borracha

function eraser(){
    console.log('função eraser')
    console.log('eraser = ' + erase)
    console.log('bucket = ' + bucket)
    console.log('draw = ' + draw)
    console.log('---------------------------------')

    draw = false
    bucket = false
    erase = true
    paint()
}

// Função para voltar para o pincel depois de selecionar outra ferramenta

function paintBrush(){
    console.log('função PaintBrush')
    console.log('eraser = ' + erase)
    console.log('bucket = ' + bucket)
    console.log('draw = ' + draw)
    console.log('---------------------------------')

    erase = false
    bucket = false
    draw = true
    paintBucket(false);
}

// Aqui ativa-se e usa-se o eyedropper 1 unica vez e depois volta para o pincel

function eyeDropper(){
    console.log('função eyeDropper')
    console.log('eraser = ' + erase)
    console.log('bucket = ' + bucket)
    console.log('draw = ' + draw)
    console.log('---------------------------------')

    erase = false
    draw = false
    bucket = false

    for (let i = 0; i<pixel.length; i++){
        pixel[i].addEventListener('click',getColor, {passive:true, once:true});
    }

    function getColor(){
        color = window.getComputedStyle(this).backgroundColor;
        draw = true;
        paint();
        select('brush')
    }
}

// Aqui ativa-se o PaintBucket

function paintBucket(a){
    console.log('função paintBucket')
    console.log('eraser = ' + erase)
    console.log('bucket = ' + bucket)
    console.log('draw = ' + draw)
    console.log('---------------------------------')

    if(a === true){

        let changeColor = new MutationObserver(changes);
        bucket = true;

            function changes(mutations){
                
                for (let mutation of mutations){

                    let numero = parseInt(columnRowNumb);
                    let mutationTarget = parseInt(mutation.target.id);

                    // Caso já tenha pintado o pixel antes do balde de tinta

                    if (mutation.oldValue !== null){

                        if(mutationTarget <= numero * (numero - 1) - 1 && mutation.oldValue == 'background: ' + window.getComputedStyle(pixel[mutationTarget+numero]).backgroundColor + ';'){
                            pixel[mutationTarget+numero].style.background = color;
                        }
                        
                        if (mutationTarget >= numero && mutation.oldValue == 'background: ' + window.getComputedStyle(pixel[mutationTarget-numero]).backgroundColor + ';'){
                            pixel[mutationTarget-numero].style.background = color;
                        }

                        for (let i = 1; i <= numero; i++){

                            if(mutationTarget <= numero * i - 2 && mutation.oldValue == 'background: ' + window.getComputedStyle(pixel[mutationTarget+1]).backgroundColor + ';'){
                                pixel[mutationTarget+1].style.background = color;
                            }
                            
                            if(mutationTarget >= numero * i - (numero - 1) && mutation.oldValue == 'background: ' + window.getComputedStyle(pixel[mutationTarget-1]).backgroundColor + ';'){
                                pixel[mutationTarget-1].style.background = color;
                            }
                        }

                    // Caso o canvas ainda esteja em branco quando vc utilizar o balde de tinta

                    } else {

                        // Comparando se os pixels acima e abaixo (respectivamente) são da mesma cor que o pixel pintado e limitando para que não tente pintar além das bordas

                        if (mutationTarget <= numero * (numero - 1) - 1 && 'rgb(244, 241, 222)' === window.getComputedStyle(pixel[mutationTarget+numero]).backgroundColor){
                            pixel[mutationTarget+numero].style.background = color;
                        }
                        
                        if (mutationTarget >= numero && 'rgb(244, 241, 222)' === window.getComputedStyle(pixel[mutationTarget-numero]).backgroundColor){
                            pixel[mutationTarget-numero].style.background = color;
                        }

                        // Comparando se os pixels da direita e esquerda (respectivamente) são da mesma cor que o pixel pintado e limitando para que não tente pintar além das bordas

                        for (let i = 1; i <= numero; i++){

                            if(mutationTarget <= numero * i - 2 && 'rgb(244, 241, 222)' === window.getComputedStyle(pixel[mutationTarget+1]).backgroundColor){
                                pixel[mutationTarget+1].style.background = color;
                            }
                            
                            if(mutationTarget >= numero * i - (numero - 1) && 'rgb(244, 241, 222)' === window.getComputedStyle(pixel[mutationTarget-1]).backgroundColor){
                                pixel[mutationTarget-1].style.background = color;
                            }
                        }

                    }
                }
            }
    
        // aqui ativa-se o mutationObserver para os pixels do Canvas

        for (let i = 0; i<pixel.length; i++){
            changeColor.observe(pixel[i], {attributes:true, attributeOldValue:true});
            pixel[i].addEventListener('click',multiplePaint);
        } 

        function multiplePaint(){
            console.log('função MultiplePaint')
            console.log('eraser = ' + erase)
            console.log('bucket = ' + bucket)
            console.log('draw = ' + draw)
            console.log('---------------------------------')

            if (bucket === false){

                for (let i = 0; i<pixel.length; i++){
                    pixel[i].removeEventListener('click',multiplePaint);
                } 
                    changeColor.disconnect()
                    draw = true
                
            } else{
                this.style.background = color;
            }
        }
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