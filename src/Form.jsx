import React from "react";
import { Search, Heart } from 'react-bootstrap-icons';
import { update5Days, updateCity } from './logic'

/* 
The main screen (weather details) is composed of a search field to search a
location’s weather by city name. And below it, the current weather and a 5-day forecast of
the searched location. A location have an indication if it’s already saved in
favorites, and a button to add/remove from favorites
*/
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.city,
            cityName: "",
            fiveDaysData: [],
            weatherCondition: "",
            temperature: "",
            showCards: true,
            isFavorite: false,
            errorMessag: false,
            addRemoveButtonText: "Add To"
        }
    }

    handleChange = (event) => {
        this.setState({ city: event.target.value });
    }

    updateData() {
        updateCity(this.state.city)
            .then(data => {
                this.setState({ errorMessag: false });
                this.setState({ showCard: true });
                this.setState({ cityName: data.cityDetails.LocalizedName });
                this.setState({ weatherCondition: data.weather.WeatherText });
                this.setState({ temperature: data.weather.Temperature.Metric.Value });
                this.setState({ isFavorite: data.cityDetails.LocalizedName !== "" && localStorage.getItem(data.cityDetails.LocalizedName) != null })
                this.setState({ addRemoveButtonText: data.cityDetails.LocalizedName !== "" && localStorage.getItem(data.cityDetails.LocalizedName) != null ? "Remove from" : "Add to"})
            })
            .catch(err => {
                this.setState({ showCard: false });
                this.setState({ isFavorite: false });
                this.setState({ errorMessag: true });
            })

        update5Days(this.state.city)
            .then(data => {
                this.setState({ showCards: true });
                this.setState({ fiveDaysData: data.fiveDays.DailyForecasts });
            })
            .catch(err => {
                this.setState({ showCards: false });
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateData();
    }

    componentDidMount() {
        this.updateData();
    }

    handleClick = (event) => {
        this.setState({ isFavorite: !this.state.isFavorite }, this.handleFavoriteChange);
    };

    handleFavoriteChange = () => {
        const { isFavorite, cityName, temperature, weatherCondition } = this.state;
        if (isFavorite) {
            localStorage.setItem(cityName, JSON.stringify({
                cityName: cityName,
                temperature: temperature,
                weatherCondition: weatherCondition
            }));
            this.setState({ addRemoveButtonText: "Remove from"});
        }
        else {
            localStorage.removeItem(cityName);
            this.setState({ addRemoveButtonText: "Add to"});
        }
    }

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} ></input>
                    <button type="submit"><Search /></button>
                </form>
                {this.state.errorMessag ? <p>City was not found</p> : ""}
                {this.state.showCards ?
                    <div className="Cards">
                        {this.state.cityName !== "" ?
                            <div className="TodayCard">
                                <div className="CurrentCard">
                                    <div className="weatherIcon">
                                        <img alt="icon" src="https://via.placeholder.com/50X50"></img>
                                    </div>
                                    <div className="CurrentCityAndTemperature">
                                        <h5>{this.state.cityName}</h5>
                                        <span>{this.state.temperature}</span>
                                        <span>&deg;C</span>
                                    </div>
                                </div>
                                <div className="CurrentWeatherCondition">
                                    <h1><p>{this.state.weatherCondition}</p></h1>
                                </div>
                                <div>
                                    {this.state.isFavorite ? <Heart /> : null}
                                    <button onClick={this.handleClick}>{this.state.addRemoveButtonText} Favorits</button>
                                </div>
                            </div>
                            : null
                        }
                        <ForecastCards
                            fiveDaysData={this.state.fiveDaysData}>
                        </ForecastCards>
                    </div>
                    : <div></div>}
            </div>
        );
    }
}

//  The 5-day forecast of the searched location
class ForecastCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: ""
        }
    }

    fahrenheitToCelsius = (fahrenheit) => {
        return (fahrenheit - 32) * 5 / 9;
    }

    render() {
        return (
            <div className="ForecastCards">
                {this.props.fiveDaysData.length > 0 ?
                    this.props.fiveDaysData.map((dayData) =>
                        <div className="Day" key={new Date(dayData.Date).toLocaleDateString('en-US', {
                            weekday: 'short',
                        })}>
                            <h5>{new Date(dayData.Date).toLocaleDateString('en-US', {
                                weekday: 'short',
                            })}</h5>
                            <span>{Math.floor(this.fahrenheitToCelsius(dayData.Temperature.Minimum.Value))}&deg;C-{Math.ceil(this.fahrenheitToCelsius(dayData.Temperature.Maximum.Value))}&deg;C</span>
                        </div>)
                    : []}
            </div>
        );
    }
}

export default Form;  