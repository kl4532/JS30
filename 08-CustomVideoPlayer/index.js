(function(){
    const vid = document.getElementById('myVid');
    const time = document.getElementById('time')

    time.max = vid.duration;
    
    let interval;

    document.getElementById('btn-play').addEventListener('click', ()=>{
        time.value = vid.currentTime;
        vid.paused ? vidPlay() : vidPause();
    })
    
    time.addEventListener('input', ()=>{
        vidPause();
        vid.currentTime = time.value;
        console.log(vid.currentTime);
    })
    time.addEventListener('mouseup', ()=>{
        vidPlay();
    })


    function videoTime(){
        let time = vid.currentTime.toFixed(0);
        return time;
    }
    function vidPause(){
        interval ? clearInterval(interval) : 0;
        vid.pause();
        // time.value = vid.currentTime;

    } 
    function vidPlay(){
        vid.play();
        interval = updateVidTime();
    }

    function updateVidTime(){
        return setInterval(()=> {
            time.value = vid.currentTime;
            console.log(time.value);
            console.log(vid.paused);
        }, 1000);
    }
    

})()