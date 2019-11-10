(function(){
    const c = document.getElementById('myCanvas');
    c.width = window.innerWidth*0.7;
    c.height = window.innerHeight*0.9;
    c.style.backgroundColor = "#ffffff";
    const ctx = c.getContext("2d");
    const root = document.documentElement;

    const inputSize = document.getElementsByName('size')[0];
    const inputColor = document.getElementsByName('color')[0];
    const inputFilter = document.getElementsByName('filter')[0];

    const images = [];
    for(let i=0; i<5; i++){
        images.push(`./images/${i}.png`);
    }
    let currentImage = 0;
    let mouseDown = false;

    //Init and start

    updateProperties();
    window.onload = addImage();

    //Event Listeners

    document.getElementById('clear').addEventListener('click', ()=>{
        confirm("Do you want to clear canvas?") ? ctx.clearRect(0,0,c.width, c.height) : 0;
    });
    root.addEventListener("input", updateProperties);
    c.addEventListener("click", 
        (e)=>{
            mouseDown=true;
            paint(e);
            mouseDown=false;
        }, false);
    c.addEventListener("mousedown", MouseToggle, false);
    c.addEventListener("mousemove", paint, false);
    c.addEventListener("mouseup", MouseToggle, false);
    document.getElementsByClassName('addImage')[0].addEventListener('click', addImage);


    // Functions

    function updateProperties() {
        root.style.setProperty('--size', inputSize.value + "px");
        root.style.setProperty('--filter', inputFilter.value + "px");
        root.style.setProperty('--color', inputColor.value);

        size = inputSize.value; 
        color = inputColor.value;
        filter = inputFilter.value; 
        mouseDown = false;
    }

    function MouseToggle(){
        mouseDown = !mouseDown;
    }
    function paint(e){
        var rect = e.target.getBoundingClientRect();
        let mouseX = e.pageX - rect.left - document.documentElement.scrollLeft;
        let mouseY = e.pageY -rect.top - document.documentElement.scrollTop;
        if(mouseDown){
            
            ctx.beginPath();
            var circle = new Path2D();
            circle.moveTo(mouseX, mouseY);
            circle.arc(mouseX, mouseY, 0.5*size, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.filter = `blur(${filter}px)`;
            ctx.fill(circle);
            ctx.stroke();
        }
    }
    function addImage(){
        ctx.clearRect(0,0,c.width, c.height);
        ctx.filter = `blur(${0}px)`;
        var image = new Image();    
        image.src = images[currentImage];
        image.onload = function(){
            // console.log(ctx.canvas.width/image.width);
            ctx.scale(ctx.canvas.width/image.width, ctx.canvas.height/image.height);
            ctx.drawImage(image,0,0);
            ctx.scale(image.width/ctx.canvas.width, image.height/ctx.canvas.height);
        };
        currentImage++;
        currentImage == images.length ? currentImage = 0 : 0;
    }
    function getPixelColor(x, y) {
        var pxData = ctx.getImageData(x,y,1,1);
        return("rgb("+pxData.data[0]+","+pxData.data[1]+","+pxData.data[2]+")");
    }
})();


