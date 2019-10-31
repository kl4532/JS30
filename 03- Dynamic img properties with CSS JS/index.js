(function(){

    const root = document.documentElement;
    updateProperties();
    root.addEventListener("input", updateProperties);
    
    function updateProperties() {
        root.style.setProperty('--spacing', document.getElementsByName('spacing')[0].value + "px");
        root.style.setProperty('--blur', document.getElementsByName('blur')[0].value + "px");
        root.style.setProperty('--frameColor', document.getElementsByName('color')[0].value);
    }

})()

