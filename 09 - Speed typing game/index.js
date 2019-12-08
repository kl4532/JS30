(function(){
    const exceptions = ['Shift', 'Alt', 'AltGraph', 'Control', 'CapsLock', 'Backspace'];
    const passwords = ['Cheese', 'pasta', 'Tom' ,'Jerry', 'Jamaica',
     'rodeo', 'dog', 'heavyweight', 'Champion', 'blue', 'planet', 
     'pudding', 'book', 'sex', 'my', 'god', '*213', 'tototo', '#4salamaleykum', '1234567', 'nevermind'];

    let currentPassword;
    let currentType = [];
    let score;
    let wordsPerMinute=0;
    let clock;
    let startTime;
    let time = document.getElementById('setTime').value;

    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('setTime').addEventListener('input', ()=>{time=document.getElementById('setTime').value});

    function startGame() {
        score = 0;
        document.getElementById('score').innerHTML = `Score: ${score}`;
        document.getElementById('wordsPerMinute').innerHTML = `0`;
        disableInput(true);
        startTime = new Date().getTime();
        reset()
        clock = setInterval(function(){
            document.getElementById('timer').innerHTML = `${--time}s`
            if(time === 0){
                finishGame();
            }
        }, 1000)
    }
    function finishGame() {
        clearInterval(clock);
        document.getElementById('timer').innerHTML = "0s";
        reset();
        // alert(`Stop! \n Your score is: ${score} with ${wordsPerMinute} words per minute
        // \n Click start to play again!`);
        if (confirm(`Stop! \n Your score is: ${score} with typing speed ${wordsPerMinute} words/minute
        \n Click ok or start to play again!`)) {startGame()}else{reset()};
        disableInput(false);
        time = document.getElementById('setTime').value;
    }
    function reset() {
        let index = Math.floor(Math.random() * (passwords.length));
        currentPassword = passwords[index];
        currentType = [];
        document.getElementById('password').innerHTML = `${passwords[index]}`;     
        document.getElementsByTagName('label')[0].classList.toggle('changeColor');
        wordsPerMinute = Math.round(score/((new Date().getTime()-startTime)/1000)*60);
        wordsPerMinute > 1000 || isNaN(wordsPerMinute) ? 0: document.getElementById('wordsPerMinute').innerHTML = `${wordsPerMinute}`;
    }

    
    function scorePoint() {
        ++score;
        document.getElementById('score').innerHTML = `Score: ${score}`;
        reset();
    }

    function disableInput(mode) {
        if(mode){
            document.getElementById('start').disabled =  true;
            document.getElementById('setTime').disabled = true;
        }else{
            document.getElementById('start').disabled =  false;
            document.getElementById('setTime').disabled = false;
        }


    }
    window.addEventListener('keyup', (e)=>{
        if(exceptions.includes(e.key)){
            return;
        }
        currentType.push(e.key);
        if(currentType.join('').indexOf(currentPassword) >=0){
            scorePoint();
        }
        // console.group();
        // console.log(currentPassword);
        // console.log(currentType.join(''));
        // console.log(currentType.join('').indexOf(currentPassword));
        // console.groupEnd();
    })


})();

