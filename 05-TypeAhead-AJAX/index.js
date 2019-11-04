(function(){
    const input = document.getElementsByTagName('input')[0];
    const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    let allData;
    fetchData();
    
    input.addEventListener('input', () => {
        document.querySelector('.results').innerHTML = "";
        filterData(input.value).forEach(el => {
            let child = document.createElement('li');
            child.innerHTML = `${el.city}, ${el.state} ${insertCommas(el.pop)}`;
            document.querySelector('.results').appendChild(child)
        })
    })

    function fetchData(usrInput){
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            let arr = [];
            data.forEach(el => {
                arr.push({city: el.city, state: el.state, pop: el.population});
            })
            allData = arr;
        })
    }
    function filterData(input){
        let filtered = [];
        allData.forEach(el => {
            const regex = new RegExp('(' + input + ')', 'gi');
            if(el.city.match(regex) || el.state.match(regex)){
                filtered.push(el);
            }
        })
        return filtered;
    }
    function insertCommas(testNum){
        let splitted =  testNum.split("");
        let result = [];
        let count = 0;
        for(let i = testNum.length-1; i>=0; i--){
            count++;
            result.unshift(splitted[i]);
            if(count===3 && i>0){
                result.unshift(',')
                count = 0;
            }
        }
        return result.join("");
    }
})();


