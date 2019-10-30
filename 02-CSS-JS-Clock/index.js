(function(){

    let sec = -90 + getCurrentTime().sec * 6;
    let min = -90 + getCurrentTime().min * 6;
    let hou = -90 + getCurrentTime().hou * 30;
    
    initClock();

    function getCurrentTime(){
        let date = new Date();
        return {
            sec: date.getSeconds(),
            min: date.getMinutes(),
            hou: date.getHours(),
        }
    }
    
    function initClock(){
        document.querySelector('.sec').style.transform = `rotate(${sec}deg)`;
        document.querySelector('.min').style.transform = `rotate(${min}deg)`;
        document.querySelector('.hou').style.transform = `rotate(${hou}deg)`;
        setInterval(move, 1000);
    };
    
    function move(){
        sec = sec + 6;
        console.clear();
        console.log(`${getCurrentTime().hou} : ${getCurrentTime().min} : ${getCurrentTime().sec}`);
        document.querySelector('.sec').style.transform = `rotate(${sec}deg)`;
        if(getCurrentTime().sec===1){
            min = min + 6;
            document.querySelector('.min').style.transform = `rotate(${min}deg)`;
        }
        if(getCurrentTime().min===0 && getCurrentTime().sec===1){
            hou = hou + 30;
            document.querySelector('.hou').style.transform = `rotate(${hou}deg)`;
        }
    }

})();
