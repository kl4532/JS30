(function(){
    
    const vid = document.getElementById('myVid');
    const time = document.getElementById('time')    
    const volume = document.getElementById('volume');
    const frame = document.querySelector('.frame');
    const startPauseBtn = document.getElementById('btn-play');  
    
    let interval;

    // load vid duration after content loaded fully (DOMContentLoaded was to fast for video)
    setTimeout(() => {document.getElementById('vidTime').innerHTML = videoTime();},500);

    document.getElementById('btn-play').addEventListener('click', togglePlay);

    //full screen
    document.getElementById('fScr').addEventListener('click', ()=>{vid.requestFullscreen()});

    vid.addEventListener('click', togglePlay);

    frame.addEventListener('mouseover', ()=>{
        document.querySelector('.controls-group').style.opacity = '1';
    })
    frame.addEventListener('mouseout', ()=>{
        document.querySelector('.controls-group').style.opacity = '0';
    })

    time.addEventListener('input', ()=>{
        vidPause();
        vid.currentTime = time.value;
        document.getElementById('vidTime').innerHTML = videoTime();
    })
    time.addEventListener('mouseup', ()=>{
        !vid.paused ? vidPlay(): vidPause();
        console.log('play');
    })
    volume.addEventListener('input', ()=>{
        vid.volume = volume.value; 
        console.log(vid.volume); 
    })

    function togglePlay() {
        !time.max ? time.max = vid.duration: 0;
        time.value = vid.currentTime;
        vid.paused ? vidPlay() : vidPause();
    }
    function videoTime(){
        function display(seconds){
            const format = val => `0${Math.floor(val)}`.slice(-2)
            const hours = seconds / 3600
            const minutes = (seconds % 3600) / 60
            return hours >= 1 ? [hours, minutes, seconds % 60].map(format).join(':') : [minutes, seconds % 60].map(format).join(':');
        }
        return display(vid.currentTime) + ' / ' + display(vid.duration);     
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
            document.getElementById('vidTime').innerHTML = videoTime();

            // when vid finished stop interval
            vid.currentTime === vid.duration ? clearInterval(interval): 0;
        }, 10);
    }
    

})()