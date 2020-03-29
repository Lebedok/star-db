import React, {Component} from 'react';
import './app.css';
import Header from '../app-header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service.js';
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    LoginPage,
    SecretPage
} from '../pages';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StarshipDetails from '../sw-components/starship-details';
import { SwapiServiceProvider } from '../swapi-service-context';


export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn,
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    onServiceChange = () => {
        this.setState(({swapiService}) =>{
            const Service = swapiService instanceof SwapiService ?
                                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            };
        });
    };

    
    render() {

        const { isLoggedIn } = this.state;
    
        return (
          <ErrorBoundry>
            <SwapiServiceProvider value={this.state.swapiService} >
              <Router>
                <div className="stardb-app">
                  <Header onServiceChange={this.onServiceChange} />
                  <RandomPlanet />
    
                  <Switch>
                    <Route path="/"
                           render={() => <h2>Welcome to StarDB</h2>}
                           exact />
                    <Route path="/people/:id?" component={PeoplePage} />
                    <Route path="/planets" component={PlanetsPage} />
                    <Route path="/starships" exact component={StarshipsPage} />
                    <Route path="/starships/:id"
                           render={({ match }) => {
                             const { id } = match.params;
                             return <StarshipDetails itemId={id} />
                           }}/>
    
                    <Route
                      path="/login"
                      render={() => (
                        <LoginPage
                          isLoggedIn={isLoggedIn}
                          onLogin={this.onLogin}/>
                      )}/>
    
                    <Route
                      path="/secret"
                      render={() => (
                        <SecretPage isLoggedIn={isLoggedIn} />
                      )}/>
    
                    <Route render={() => <h2>Page not found</h2>} />
                  </Switch>
    
                </div>
              </Router>
            </SwapiServiceProvider>
          </ErrorBoundry>
        );
      }
};

/*
const Record = ({item, field, label}) => {
    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
}
export {
    Record
};

toggleRandomPlanet = () => {
    this.setState((state) =>{
        return {
            showRandomPlanet: !state.showRandomPlanet
        }
    });
};

<RandomPlanet /> :
        null;

        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage } = this.swapiService;
        }
        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}>
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="EyeColor"/>
            </ItemDetails>
        );
        const starshipDetails = (
            <ItemDetails
            itemID={5}
            getData={getStarship}
            getImageUrl={getStarshipImage}>
                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        )
*/