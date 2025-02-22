document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let location = event.target.location.value;
    fetch(`https://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((weather) => {
        if(location.length === 0){
            throw new Error
        }
        //display area (grey box) populates depending on the text input
        let displayArea = document.querySelector(".print");
        let area = weather.nearest_area[0].areaName[0].value;
        let region = weather.nearest_area[0].region[0].value;
        let country = weather.nearest_area[0].country[0].value;
        let currentTemp = weather.current_condition[0].FeelsLikeF;
        
        //worked with Bill to capitalize the First Letter
        function capitalizeFirstLetter(words) {
            const wordsArray = words.split(" ")
            const newWords = []
            for (let word of wordsArray) {
                const newWord = word[0].toUpperCase() + word.slice(1).toLowerCase()
                newWords.push(newWord)
            }
            return newWords.join(" ")
        } 
        let upperLocation = capitalizeFirstLetter(location)

        displayArea.innerHTML = 
        `<h2>${upperLocation}</h2>
        <p class="center"><strong>Area:</strong> ${area}</p>
        <p class="center"><strong>Region:</strong> ${region}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Currently:</strong> Feels Like ${currentTemp}°F</p>`;
                
        //displays three day weather forecast
        let today = document.querySelector(".today");
        let averageTemp1 = weather.weather[0].avgtempF;
        let minTemp1 = weather.weather[0].mintempF;
        let maxTemp1 = weather.weather[0].maxtempF;
            
        today.innerHTML = 
        `<h3>Today</h3>
        <p><strong>Average Temp:</strong> ${averageTemp1}°F</p>
        <p><strong>Min Temp:</strong> ${minTemp1}°F</p>
        <p><strong>Max Temp:</strong> ${maxTemp1}°F</p>`;    

        let tomorrow = document.querySelector(".tomorrow");
        let averageTemp2 = weather.weather[1].avgtempF;
        let minTemp2 = weather.weather[1].mintempF;
        let maxTemp2 = weather.weather[1].maxtempF;
        
        tomorrow.innerHTML = 
        `<h3>Tomorrow</h3>
        <p><strong>Average Temp:</strong> ${averageTemp2}°F</p>
        <p><strong>Min Temp:</strong> ${minTemp2}°F</p>
        <p><strong>Max Temp:</strong> ${maxTemp2}°F</p>`; 

        let after = document.querySelector(".after");
        let averageTemp3 = weather.weather[2].avgtempF;
        let minTemp3 = weather.weather[2].mintempF;
        let maxTemp3 = weather.weather[2].maxtempF;
    
        after.innerHTML = 
        `<h3>Day After Tomorrow</h3>
        <p><strong>Average Temp:</strong> ${averageTemp3}°F</p>
        <p><strong>Min Temp:</strong> ${minTemp3}°F</p>
        <p><strong>Max Temp:</strong> ${maxTemp3}°F</p>`; 
        
        //worked with Bill & Isidro for previous search entry list and the edge case for duplicate (list) entries
        //creates a list depending on the text input
        let printHistory = document.querySelector("ul");
        let historyList = document.querySelector("li");    
        if (historyList.textContent === "No previous searches"){
            printHistory.innerHTML = `<li><a href="#" value="${location}" name="test">${location}</a> - ${currentTemp}°F</li>`;
        } else {
            let array = [];
            let historyItems = document.querySelectorAll("a")
            historyItems.forEach((historyItem) => { 
                if (historyItem.textContent === location)
                array.push(historyItem.textContent)})
                if (array.includes(location)){
                    } else {
                    printHistory.innerHTML += `<li><a href=#" value="${location}" name="test">${location}</a> - ${currentTemp}°F</li>`;
                }
        }    
            //removes duplicate list entry
            let items = document.querySelectorAll("a")
            items.forEach((item) => {
            item.addEventListener("click", (event) => {
            event.preventDefault();
            let prevLocation = event.target.textContent;
            fetch(`https://wttr.in/${prevLocation}?format=j1`)
            .then((response) => response.json())
            .then((weather) => { 
                let displayArea = document.querySelector(".print");
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
                <p><strong>Average Temp:</strong> ${averageTemp1}°F</p>
                <p><strong>Min Temp:</strong> ${minTemp1}°F</p>
                <p><strong>Max Temp:</strong> ${maxTemp1}°F</p>`;    
        
                let tomorrow = document.querySelector(".tomorrow");
                let averageTemp2 = weather.weather[1].avgtempF;
                let minTemp2 = weather.weather[1].mintempF;
                let maxTemp2 = weather.weather[1].maxtempF;
                
                tomorrow.innerHTML = 
                `<h3>Tomorrow</h3>
                <p><strong>Average Temp:</strong> ${averageTemp2}°F</p>
                <p><strong>Min Temp:</strong> ${minTemp2}°F</p>
                <p><strong>Max Temp:</strong> ${maxTemp2}°F</p>`; 
        
                let after = document.querySelector(".after");
                let averageTemp3 = weather.weather[2].avgtempF;
                let minTemp3 = weather.weather[2].mintempF;
                let maxTemp3 = weather.weather[2].maxtempF;
            
                after.innerHTML = 
                `<h3>Day After Tomorrow</h3>
                <p><strong>Average Temp:</strong> ${averageTemp3}°F</p>
                <p><strong>Min Temp:</strong> ${minTemp3}°F</p>
                <p><strong>Max Temp:</strong> ${maxTemp3}°F</p>`; 
                });
            });
        });
    })
    //alerts user ... input field cannot be empty
        .catch((error) => {
        alert("Invalid Entry, Input cannot be Empty") 
    });  
    event.target.reset(); 
});

        



