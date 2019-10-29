document.addEventListener("keydown", play);
document.querySelectorAll('.keys').forEach(key => {
    key.addEventListener('click', play);
});

function play(e){
    let audio, box;
    e.target.id
    if(e.target.id){
        box = document.getElementById(e.target.id);
        audio = document.querySelector(`audio[data-key='${e.target.id}']`);
    }else{
        box = document.getElementById(e.keyCode);
        audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    }
    if(audio){
        audio.play();
        box.classList.toggle('active');
        setTimeout(()=>{box.classList.toggle('active')}, 300);
    }
}
