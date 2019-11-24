(function(){
    
    const vid = document.getElementById('myVid');
    const time = document.getElementById('time')    
    const startPauseBtn = document.getElementById('btn-play');  

    
    let interval;

    document.getElementById('btn-play').addEventListener('click', ()=>{
        !time.max ? time.max = vid.duration: 0;
        time.value = vid.currentTime;
        vid.paused ? vidPlay() : vidPause();
        console.log(time.max);
    })
    
    time.addEventListener('input', ()=>{
        vidPause();
        vid.currentTime = time.value;
        console.log(vid.currentTime);
    })
    time.addEventListener('mouseup', ()=>{
        !vid.paused ? vidPlay(): vidPause();
        console.log('play');
    })


    function videoTime(){
        let time = vid.currentTime.toFixed(0);
        return time;
    }
    function vidPause(){
        interval ? clearInterval(interval) : console.log('no inte');;
        vid.pause();
        startPauseBtn.innerHTML = `<i class="material-icons">play_circle_outline</i>`
    } 
    function vidPlay(){
        interval = updateVidTime();
        vid.play();
        startPauseBtn.innerHTML = `<i class="material-icons">pause_circle_outline</i>`
    }

    function updateVidTime(){
        return setInterval(()=> {
            time.value = vid.currentTime;
            vid.currentTime === vid.duration ? clearInterval(interval): 0;
            // console.log(vid.duration, time.value);
        }, 10);
    }
    

})()