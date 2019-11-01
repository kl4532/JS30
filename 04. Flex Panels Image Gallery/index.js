(function(){
    const items = document.querySelectorAll('.item');
    items.forEach((item)=>{
        item.addEventListener('click', ()=>{
            items.forEach((el)=>{ 
                if(el != item){
                    el.classList.remove('active');
                    el.childNodes[3].innerText = "Click me!";
                }
            })
            let child = item.childNodes[3];
            if(child.innerText == "Click me!"){
                child.innerHTML = "&#9786;";
            }else child.innerText = "Click me!";
            item.classList.toggle('active');
        });
    })
})()
