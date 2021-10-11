document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const location = event.target.location.value;
    fetch(`https://wttr.in/~${location}?format=j1`)
    .then((response) => response.json())
    .then((weather) => {
        // console.log(weather);
  
        let displayArea = document.querySelector(".display");
        let area = weather.nearest_area[0].areaName[0].value;
        let region = weather.nearest_area[0].region[0].value;
        let country = weather.nearest_area[0].country[0].value;
        let currentTemp = weather.current_condition[0].FeelsLikeF;
        
        displayArea.innerHTML = 
        `<h2>${area}</h2>
            <p class="center"><strong>Area:</strong> ${area}</p>
            <p class="center"><strong>Region:</strong> ${region}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Currently:</strong> Feels Like ${currentTemp}°F</p>`;


        let today = document.querySelector(".today");
        let averageTemp1 = weather.weather[0].avgtempF;
        let minTemp1 = weather.weather[0].mintempF;
        let maxTemp1 = weather.weather[0].maxtempF;
            
        today.innerHTML = 
        `<h3>Today</h3>
        <p><strong>Average Temp:</strong> ${averageTemp1}</p>
        <p><strong>Min Temp:</strong> ${minTemp1}</p>
        <p><strong>Max Temp:</strong> ${maxTemp1}</p>`;    

        let tomorrow = document.querySelector(".tomorrow");
        let averageTemp2 = weather.weather[1].avgtempF;
        let minTemp2 = weather.weather[1].mintempF;
        let maxTemp2 = weather.weather[1].maxtempF;
        
        tomorrow.innerHTML = 
        `<h3>Tomorrow</h3>
        <p><strong>Average Temp:</strong> ${averageTemp2}</p>
        <p><strong>Min Temp:</strong> ${minTemp2}</p>
        <p><strong>Max Temp:</strong> ${maxTemp2}</p>`; 

        let after = document.querySelector(".after");
        let averageTemp3 = weather.weather[2].avgtempF;
        let minTemp3 = weather.weather[2].mintempF;
        let maxTemp3 = weather.weather[2].maxtempF;
    
        after.innerHTML = 
        `<h3>Day After Tomorrow</h3>
        <p><strong>Average Temp:</strong> ${averageTemp3}</p>
        <p><strong>Min Temp:</strong> ${minTemp3}</p>
        <p><strong>Max Temp:</strong> ${maxTemp3}</p>`; 
    })
    .catch(console.log);  
    event.target.reset(); 
});