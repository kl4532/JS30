(function(){
    const c = document.getElementById('myCanvas');
    c.width = window.innerWidth*0.9;
    c.height = window.innerHeight*0.9;
    c.style.backgroundColor = "#ffffff";
    const ctx = c.getContext("2d");
    let mouseDown = false;

    let inputSize = document.getElementsByName('size')[0];
    let inputColor = document.getElementsByName('color')[0];
    let inputBlur = document.getElementsByName('blur')[0];

    let size = inputSize.value;
    let color = inputColor.value;
    let blur = inputBlur.value;

    inputSize.addEventListener('input', ()=>{size = inputSize.value});
    inputColor.addEventListener('input', ()=>{color = inputColor.value});
    inputBlur.addEventListener('input', ()=>{blur = inputBlur.value});

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
    function paint(e){
        console.log(e.pageX);
        if(mouseDown){
            let mouseX = e.pageX;
            let mouseY = e.pageY;
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
})();


