navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

function onGeoSuccess(position){
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const weatherContainer = document.querySelector('#weather-container');
            weatherContainer.innerText = `
                이 곳 ${data.name}의 날씨는 ${data.weather[0].main}이고,
                온도는 ${data.main.temp}도 입니다.
            `;
        });
}

function onGeoError(){
    alert('날씨 정보를 가져올 수 없습니다.');
}