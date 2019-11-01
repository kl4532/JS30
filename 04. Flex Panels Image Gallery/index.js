(function(){
    const items = document.querySelectorAll('.item');
    items.forEach((item)=>{
        item.addEventListener('click', ()=>{
            items.forEach((el)=>{ el!=item ? el.classList.remove('active') : 0});
        item.classList.toggle('active');
        });
    })
})()
