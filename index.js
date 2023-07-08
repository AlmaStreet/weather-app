const fetchAPI = async () => {
    const aqi_status = show_aqi(document.getElementsByName('aqi_toggle'));
    const location = document.querySelector('input').value;
    const url = DEFAULT_URL 
                + KEY_PARAMETER + FREE_API_KEY 
                + LOCATION_PARAMETER + location
                + AQI_PARAMETER + (aqi_status?'yes':'no')

    console.log(`location: ${location}`);
    console.log(`url: ${url}`);
    const response = await fetch(url);
    const payload = await response.json();

    displayContent(payload, aqi_status)    
}

function show_aqi(aqi_buttons) {
    for (const aqi of aqi_buttons)
        if (aqi.checked)
            return aqi.id == 'aqi-yes' ? true : false;
}

function displayContent(payload, aqi_status) {
    const location_list = document.createElement('ul');
    location_list.appendChild(addChild(`name: ${payload.location.name}`));
    location_list.appendChild(addChild(`region: ${payload.location.region}`));
    location_list.appendChild(addChild(`country: ${payload.location.country}`));
    location_list.appendChild(addChild(`localtime: ${payload.location.localtime}`));

    const current_list = document.createElement('ul');
    current_list.appendChild(addChild(`text: ${payload.current.condition.text}`));
    current_list.appendChild(addChild(`temp_c: ${payload.current.temp_c} °C`));
    current_list.appendChild(addChild(`feelslike_c: ${payload.current.feelslike_c} °C`));
    current_list.appendChild(addChild(`temp_f: ${payload.current.temp_f} °F`));
    current_list.appendChild(addChild(`feelslike_f: ${payload.current.feelslike_f} °F`));
    current_list.appendChild(addChild(`uv: ${payload.current.uv}`));
    current_list.appendChild(addChild(`humidity: ${payload.current.humidity}`));
    current_list.appendChild(addChild(`cloud: ${payload.current.cloud}`));
    current_list.appendChild(addChild(`wind_mph: ${payload.current.wind_mph}`));

    const aqi_list = document.createElement('ul');
    if (aqi_status) {
        aqi_list.appendChild(addChild(`co: ${payload.current.air_quality.co}`));
        aqi_list.appendChild(addChild(`no2: ${payload.current.air_quality.no2}`));
        aqi_list.appendChild(addChild(`o3: ${payload.current.air_quality.o3}`));
        aqi_list.appendChild(addChild(`so2: ${payload.current.air_quality.so2}`));
        aqi_list.appendChild(addChild(`pm2_5: ${payload.current.air_quality.pm2_5}`));
        aqi_list.appendChild(addChild(`pm10: ${payload.current.air_quality.pm10}`));
        aqi_list.appendChild(addChild(`gb-defra-index: ${payload.current.air_quality['gb-defra-index']}`));
        aqi_list.appendChild(addChild(`us-epa-index: ${payload.current.air_quality['us-epa-index']}`));
    }

    const div = document.querySelector('.weather-data');
    div.innerHTML = '';

    img.src = payload.current.condition.icon;
    div.appendChild(addTitle('Location'));
    div.appendChild(location_list);
        
    div.appendChild(addTitle('Current'));
    div.appendChild(current_list);
    
    if (aqi_status) {
        div.appendChild(addTitle('Air Quality (AQI)'));
        div.appendChild(aqi_list);
    }
}

function addChild(text) {
    const location_child = document.createElement('li');
    location_child.innerHTML = text;
    return location_child;
}

function addTitle(title) {
    const title_child = document.createElement('p');
    title_child.appendChild(document.createTextNode(title));
    return title_child;
}

const DEFAULT_URL = 'http://api.weatherapi.com/v1/current.json';
const KEY_PARAMETER = '?key=';
const LOCATION_PARAMETER = '&q=';
const AQI_PARAMETER = '&aqi=';
const FREE_API_KEY = '0a8a7602ec2c4d9895a70801230507';

const img = document.querySelector('img');
const btn = document.querySelector('button');
btn.addEventListener('click', fetchAPI);