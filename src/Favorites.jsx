import React from "react";

// Favorites screen is composed of a list of favorite locations
class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStorage: []
        }
    }

    componentDidMount() {
        const allStorage = [];
        const keys = Object.keys(localStorage);
        const length = keys.length;

        for (let i = 0; i < length; i++) {
            allStorage.push(JSON.parse(localStorage.getItem(keys[i])));
        }

        this.setState({ allStorage });
    }

    render() {
        return (
            <div className="FavoritesCards">
                {this.state.allStorage.length > 0 ?
                    this.state.allStorage.map((city) =>
                        <Card key={city.cityName}
                            cityName={city.cityName}
                            weatherCondition={city.weatherCondition}
                            temperature={city.temperature}
                            goWeatherPage={this.props.goWeatherPage}>
                        </Card>
                    )
                    : ""}
            </div>
        );
    }
}

/*
A favorite location card have an ID, name and current weather. 
Clicking on it will navigate to the main screen showing the details of that location
*/
class Card extends React.Component {
    render() {
        return (
            <div className="FavoriteCard">
                <div onClick={() => this.props.goWeatherPage(this.props.cityName)}>
                    <h5>{this.props.cityName}</h5>
                    <p>{this.props.weatherCondition}</p>
                    <div>
                        <span>{this.props.temperature}</span>
                        <span>&deg;C</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Favorites;  