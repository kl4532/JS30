(function(){
    const c = document.getElementById('myCanvas');
    c.width = window.innerWidth*0.9;
    c.height = window.innerHeight*0.9;
    c.style.backgroundColor = "#ffffff";

    const ctx = c.getContext("2d");

    var mouseClicked = false, mouseReleased = true;
    c.addEventListener("click", onMouseClick, false);
    c.addEventListener("mousemove", onMouseMove, false);
    function onMouseClick(e) {
        mouseClicked = !mouseClicked;
    }
    function onMouseMove(e) {
        if (mouseClicked) {
            let mouseX = e.pageX;
            let mouseY = e.pageY;
            ctx.beginPath();
            var circle = new Path2D();
            circle.moveTo(mouseX-10, mouseY-10);
            circle.arc(mouseX-10, mouseY-10, 50, 0, 2 * Math.PI);
            ctx.fill(circle);
            ctx.stroke();
        }
    }
})();


