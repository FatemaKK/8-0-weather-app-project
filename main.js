document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const location = event.target.location.value;
    fetch(`https://wttr.in/~${location}?format=j1`)
      .then((response) => response.json())
      .then((weather) => {
        console.log(weather);
  
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
    })
});