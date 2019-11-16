(function(){
    const inputs = document.getElementsByClassName('box')[0].querySelectorAll('input');
    let selected = [];
    let isPressed = false;
    // console.log(inputs);

    inputs.forEach((input, i)=>{
        input.addEventListener('change', (e)=>{
            if(e.target.checked){
                selected.push(i);
                selected.length > 2 ? selected.shift() : 0;  

                if(isPressed && selected.length > 1){
                    selected.sort();
                    for(let i = selected[0]+1; i<selected[1]; i++){
                        inputs[i].checked = true;
                    }   
                }
            }
        })
    })
    
    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 16) {
            isPressed = true            
        }
    });
    document.addEventListener("keyup", event => {
        if (event.isComposing || event.keyCode === 16) {
            isPressed = false;
            selected = [];
        }
    });
    document.getElementById('selAll').addEventListener('click', ()=>{ inputs.forEach( i => i.checked = true) });
    document.getElementById('clearAll').addEventListener('click', ()=>{ inputs.forEach( i => i.checked = false) });

    
    


})()