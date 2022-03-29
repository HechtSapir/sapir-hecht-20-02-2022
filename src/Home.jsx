import React from "react";
import Favorites from "./Favorites";
import Form from "./Form";

// Default city weather
const CITY = "Tel Aviv";

// Header with navigation icons/links/buttons for main and favorites screen
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      selectedButton: null,
      city: CITY
    }
  }

  selectionOnPress(userType) {
    this.setState({ selectedButton: userType });
  }

  // Weather page
  showHome = (event) => {
    this.setState({ isHome: true });
  }

  // Favorites page
  showFavorits = (event) => {
    this.setState({ isHome: false });
  }

  // Navigate to the main screen with the details of the choosen location from the favorites page 
  goWeatherPage = (favoriteCity) => {
    this.setState({city: favoriteCity});
    this.showHome();
  }

  render() {
    return (
      <div className="Home">
        <div className="Header">
          <p>Herolo Weather Task</p>
          <div className="HeaderButton">
            <button className="HomeBtn"
              onClick={this.showHome}
              style={{
                backgroundColor:
                  this.state.isHome ? "lightskyblue" : "lightgrey"
              }}>
              Home
            </button>
            <button className="FavoritesBtn" 
            onClick={this.showFavorits}
            style={{
              backgroundColor:
                this.state.isHome ? "lightgrey" :"lightskyblue" 
            }}>
              Favorits
              </button>
          </div>
        </div>
        {this.state.isHome ? <Form city={this.state.city}></Form> : <Favorites goWeatherPage = {this.goWeatherPage}/>}
      </div>
    );
  }
}

export default Home;