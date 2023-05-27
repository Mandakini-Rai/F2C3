 
 let info = [];
 let abc = document.getElementById('one');
 async function prom(){
try{
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    const data = await response.json();
    return data;
}
catch(error){
   console.log(error);
}}
 const value = prom();
value.then((data)=>{
    info = data;
    console.log(data);
    displaydata(data);
})
function displaydata(data){
   abc.innerHTML = "";
    data.map((item) => {
        let temp = (String)(item.market_cap_change_percentage_24h.toFixed(2));
        
        abc.insertAdjacentHTML("beforeend",`<tr>
        <td><img src="${item.image}"></td>
        <td class="name">${item.name}</td>
        <td>${item.symbol.toUpperCase()}</td>
        <td>$${item.current_price}</td>
        <td>$${item.total_volume}</td>
        <td class=${temp[0]=="-"?"red":"green"}>${temp}%</td>
        <td>$${item.market_cap}</td>

      
       </tr>`) 
    })
      
}
let input = document.querySelector('input');
function search(){
    
    let value = input.value;
    if(value.trim() == "")displaydata(info);
    let sortedData = [...info];
    console.log(value,sortedData);
    sortedData.map((item) => {
        if(value.toLowerCase() == item.name.toLowerCase() || value.toLowerCase() == item.symbol.toLowerCase()){
            console.log(item);
            let temp = (String)(item.market_cap_change_percentage_24h.toFixed(2));
            
            abc.innerHTML = `<tr>
            <td><img src="${item.image}"></td>
            <td class="name">${item.name}</td>
            <td>${item.symbol.toUpperCase()}</td>
            <td>$${item.current_price}</td>
            <td>$${item.total_volume}</td>
            <td class=${temp[0]=="-"?"red":"green"}>${temp}%</td>
            <td>$${item.market_cap}</td>
    
          
           </tr>`
        }
    })
}
function sortByMktCap(){
    let tempData = [...info];
    tempData.sort((a, b) => parseFloat(a.market_cap) - parseFloat(b.market_cap));
    displaydata(tempData);
    console.log(info);
}
function sortByPercent(){
    let tempData = [...info];
    tempData.sort((a, b) => parseFloat(a.market_cap_change_percentage_24h) - parseFloat(b.market_cap_change_percentage_24h));
    displaydata(tempData);
}
//  name,id,image,symbol, current_price,total_volume
