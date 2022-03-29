
const key = process.env.REACT_APP_WEATHER_API_KEY;

const getWeather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    try {
        const response = await fetch(base + query);
        const data = await response.json();
        return data[0];
    }
    catch (e) {
        throw e;
    }
}

const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
    const query = `?apikey=${key}&q=${city}`;
    try {
        const response = await fetch(base + query);
        const data = await response.json();
        return data[0];
    }
    catch (e) {
        throw e;
    }
}

const get5days = async (id) => {
    const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const query = `${id}?apikey=${key}&details=true`;
    try {
        const response = await fetch(base + query);
        const data = await response.json();
        return data;
    }
    catch (e) {
        throw e;
    }
}

export const update5Days = async (city) => {
    let cityDetails = null;
    let fiveDays = null;
    try {
        cityDetails = await getCity(city);
        try {
            fiveDays = await get5days(cityDetails.Key);
        }
        catch (e) {
            console.log(e);
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        return {
            cityDetails: cityDetails,
            fiveDays: fiveDays
        }
    }
}

export const updateCity = async (city) => {
    let cityDetails = null;
    let weather = null;
    try {
        cityDetails = await getCity(city);
        try {
            weather = await getWeather(cityDetails.Key);
        }
        catch (e) {
            console.log(e);
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        return {
            cityDetails: cityDetails,
            weather: weather
        }
    }
}

