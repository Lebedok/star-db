import React from 'react';
import ItemDetails, {Record} from '../item-details';
import SwapiService from '../../services/swapi-service.js';
const swapiService = new SwapiService();
const {getPerson, getPlanet,
        getStarship, getPersonImage,
      getPlanetImage, getStarshipImage} = swapiService;

const PersonDetails = () => {};
const PlanetDetails = () => {};
const StarshipDetails = () => {};

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}