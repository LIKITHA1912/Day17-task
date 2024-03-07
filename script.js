async function api(){
    try{
        data = fetch('https://restcountries.com/v3.1/all')
        out = await data;
        prom = out.json();
        final = await prom;
        parent  = document.querySelector('.container')
        parent1 = document.querySelector('.row')
        final.forEach(element => {
            parent1.innerHTML+=`
            <div id="cardDetails" class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
          <div class="card h-100">
           <div class="card-header">
           <h5 class="card-title">${element.name.common}</h5>
          </div><br>
          <div class="card-body">  
          <img src="${element.flags.png}" class="card-img-top">
         <div class="card-text">
         <ul class="list-group">
         <li class="list-group-item card-text"><b>Capital:${element.capital}</li>
         <li class="list-group-item card-text"><b>Region:${element.region}</li>
         <li class="list-group-item card-text"><b>Country Code:${element.cca3}</li>
         
       </div>
        

         <button class="btn btn-primary" target="_blank" value="${element.name.common}">Click for Weather</button>

          </div>
        </div>
      
        `
        parent.append(parent1)
        
        let btn = document.querySelectorAll(".btn");
        btn.forEach((ele)=>{
          ele.addEventListener("click",()=>{
            let value = ele.value
            console.log(value)
            async function weather(){ 
              let res = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ele.value}&APPID=9cc0a142806269d7da2eb5c06e4b6f63`)
              let res1 = await res
              let res2 = res1.json()
              let res3 = await res2
  
              console.log(res3)
              ele.innerHTML= `weather: ${res3.weather[0].description}<br>Temp: ${res3.main.temp}<br>Pressure: ${res3.main.pressure}<br>
              lon:${res3.coord.lon}<br>lat${res3.coord.lat}`
             
            }
            weather();
          })
        })
        
       });
      }
       catch(error){
        console.log(error)
       }
      
  }
  api()