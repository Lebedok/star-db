export default class SwapiService {
    _apiBase = 'https://swapi.co/api'; // Приватная часть класса, не следует использовать вне класса
    _imageBase = 'https://starwars-visualguide.com/#/img';

    async getResource(url){
            const res = await fetch(`${this._apiBase}${url}`);
            if ( !res.ok ) {
                throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
            }
            return await res.json();
    }
    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson).slice(0, 5);
    }
    getPerson = async (id) => {
        const person =  this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }
    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet).slice(0, 5);
    }
    getPlanet = async (id) => {
         const planet = await this.getResource(`/planets/${id}/`);
         return this._transformPlanet(planet);
    }
    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship).slice(0, 5);
    }
    getStarship = async (id) => {
        const starship =  this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }
    _extractId(item){
        const idRegExp = / \/([0-9]*)\/$ /;
        return item.url.match(idRegExp)[1];
    }
    _transformPlanet = (planet) =>{
        return {
        id: this._extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
        }
    }
    _transformStarship = (starship) =>{
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passenger: starship.passenger,
            cargoCapacity: starship.cargoCapacity
        }
    }
    _transformPerson = (person) =>{
        return{
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor,
        }
    }
}

/* const swapi = new SwapiService();

swapi.getPerson(3).then((person) => {
    
        console.log(person.name);

}); */



/* const getResource = async  (url) => {
    const res = await fetch(url);
    if (!res.ok){
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`) // Фиксировать ошибку от серверной части
    }
    const body = await res.json();
    return body;
}

getResource('https://swapi.co/api/people/123123/').then((body) => {
    console.log(body);
}).catch((err) => {
    console.error('Could not fetch', err); // Выдает ошибка сети
}); */



/*  fetch('https://swapi.co/api/people/1/').then((res) => {  // Fetch api получает данные из сервера
    return res.json();
}).then((body) =>{
    console.log(body);
}); */