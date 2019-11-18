(function(){
    const vid = document.getElementById('myVid')

    document.getElementById('btn-play').addEventListener('click', ()=>{
        vid.paused ? vid.play() : vid.pause();
    console.log(vid.currentTime);

    })
    console.log(vid.mediaKeys);
})()