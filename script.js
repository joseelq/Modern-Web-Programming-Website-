// OpenWeather API Key
const apiKey = '7f72a65fd3bdd8b862fcf00e6fad0ed5';
// VirtualEarth Time Zone API Key
const time_apiKey = 'Ao6AJMsWlIRgZT3RvNSBkkRITn1b5agPfIoP7zANPk4fMBMPTNfEzRZF4S-U3N14';


const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const timee = document.querySelector('.time')

// Upon loading webpage request user's permission to retreive location data
window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
      // Use user's location to retrieve local weather
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        })
        // Use user's location for local time
        fetch(`https://dev.virtualearth.net/REST/v1/timezone/${lat},${long}?key=Ao6AJMsWlIRgZT3RvNSBkkRITn1b5agPfIoP7zANPk4fMBMPTNfEzRZF4S-U3N14`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.resourceSets[0].resources[0].timeZone.convertedTime.localTime);
            var dateTime = data.resourceSets[0].resources[0].timeZone.convertedTime.localTime;
            var split_dateTime = dateTime.split('T');
            console.log(split_dateTime[1]);
            timee.textContent = split_dateTime[1];

        })

        ;
    });
  }
});


