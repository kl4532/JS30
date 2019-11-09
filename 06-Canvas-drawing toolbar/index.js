(function(){
    const c = document.getElementById('myCanvas');
    c.width = window.innerWidth*0.5;
    c.height = window.innerHeight*0.9;
    c.style.backgroundColor = "#ffffff";
    const ctx = c.getContext("2d");
    let mouseDown = false;

    const images = [];
    for(let i=0; i<3; i++){
        images.push(`./images/${i}.png`);
    }
    let currentImage = 0;

    let inputSize = document.getElementsByName('size')[0];
    let inputColor = document.getElementsByName('color')[0];
    let inputBlur = document.getElementsByName('blur')[0];

    let size = inputSize.value;
    let color = inputColor.value;
    let blur = inputBlur.value;

    inputSize.addEventListener('input', ()=>{size = inputSize.value; mouseDown=false;});
    inputColor.addEventListener('input', ()=>{color = inputColor.value; mouseDown=false;});
    inputBlur.addEventListener('input', ()=>{blur = inputBlur.value; mouseDown=false;});

    document.getElementById('clear').addEventListener('click', ()=>{
        confirm("Do you want to clear canvas?") ? ctx.clearRect(0,0,c.width, c.height) : 0;
    });

    const root = document.documentElement;
    updateProperties();
    root.addEventListener("input", updateProperties);
    
    function updateProperties() {
        root.style.setProperty('--size', document.getElementsByName('size')[0].value + "px");
        root.style.setProperty('--blur', document.getElementsByName('blur')[0].value + "px");
        root.style.setProperty('--color', document.getElementsByName('color')[0].value);
    }


    c.addEventListener("click", 
        (e)=>{
            mouseDown=true;
            paint(e);
            mouseDown=false;
        }, 
    false);
    c.addEventListener("mousedown", MouseToggle, false);
    c.addEventListener("mousemove", paint, false);
    c.addEventListener("mouseup", MouseToggle, false);
    function MouseToggle(){
        mouseDown = !mouseDown;
    }
    function getPixelColor(x, y) {
        var pxData = ctx.getImageData(x,y,1,1);
        return("rgb("+pxData.data[0]+","+pxData.data[1]+","+pxData.data[2]+")");
    }
    function paint(e){
        var rect = e.target.getBoundingClientRect();
        let mouseX = e.pageX - rect.left - document.documentElement.scrollLeft;
        let mouseY = e.pageY -rect.top - document.documentElement.scrollTop;
        // console.log(`(${mouseX}, ${mouseY})`);
        if(mouseDown){
            
            ctx.beginPath();
            var circle = new Path2D();
            circle.moveTo(mouseX, mouseY);
            circle.arc(mouseX, mouseY, 0.5*size, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.filter = `blur(${blur}px)`;
            ctx.fill(circle);
            ctx.stroke();
        }
    }
    document.getElementsByClassName('addImage')[0].addEventListener('click', addImage);
    function addImage(){
        console.log('test');
        ctx.clearRect(0,0,c.width, c.height);
        ctx.filter = `blur(${0}px)`;
        var image = new Image();    
        image.src = images[currentImage];
        image.onload = function(){
            console.log(ctx.canvas.width/image.width);
            ctx.scale(ctx.canvas.width/image.width, ctx.canvas.height/image.height);
            ctx.drawImage(image,0,0); // Or at whatever offset you like
            ctx.scale(image.width/ctx.canvas.width, image.height/ctx.canvas.height);
        };
        currentImage++;
        currentImage == images.length-1 ? currentImage = 0 : 0;
    }
    window.onload = addImage();
})();


