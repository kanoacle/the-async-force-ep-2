/*jshint esversion: 6*/

const dataReq = (source, element, option, func) => {
  const dReq = new XMLHttpRequest();

  dReq.addEventListener(`load`, function () {
    const data = JSON.parse(this.responseText);
    func(source, data, element, option);
  });
  dReq.open(`GET`, source);
  dReq.send();
};

const showInfo = (source, data, element, option) => {
  switch (option) {
    case `people` :
    getPerson(data, element);
    break;
    case `planets` :
    getPlanet(data, element);
    break;
    case `starships` :
    getShip(data, element);
    break;
  }
};

const reset = () => {
  const contain = document.querySelector(`#contentContainer`);
  while (contain.firstChild) {
    contain.removeChild(contain.firstChild);
  }
};

const getPerson = (data, element) => {
  const name = document.createElement(`h3`);
  const gender = document.createElement(`p`);
  name.innerHTML = data.name;
  gender.innerHTML = `Sex: ${data.gender}`;
  element.appendChild(name);
  element.appendChild(gender);
  dataReq(data.species[0], element, null, getSpecies);
};

const getSpecies = (source, data, element, option) => {
  const species = document.createElement(`p`);
  species.innerHTML = `Species: ${data.name}`;
  element.appendChild(species);
};

const getPlanet = (data, element) => {
  const name = document.createElement(`h3`);
  const description = document.createElement(`p`);
  const pop = document.createElement(`p`);
  const movies = document.createElement(`ul`);
  movies.id = `movies`;
  name.innerHTML = data.name;
  description.innerHTML = `Expectable terrain: ${data.terrain}`;
  pop.innerHTML = `Approximate population: ${data.population}`;
  movies.innerHTML = `Movies that ${data.name} appears in...`;
  element.appendChild(name);
  element.appendChild(description);
  element.appendChild(pop);
  element.appendChild(movies);
  for (var i = 0; i < data.films.length; i++) {
    dataReq(data.films[i], element, data.films, getMovies);
  }
};

const getShip = (data, element) => {
  const name = document.createElement(`h3`);
  const maker = document.createElement(`p`);
  const type = document.createElement(`p`);
  const movies = document.createElement(`ul`);
  movies.id = `movies`;
  name.innerHTML = data.name;
  maker.innerHTML = `Maker: ${data.manufacturer}`;
  type.innerHTML = `Type: ${data.starship_class}`;
  movies.innerHTML = `Movies that the ${data.name} appears in...`;
  element.appendChild(name);
  element.appendChild(maker);
  element.appendChild(type);
  element.appendChild(movies);
  for (var i = 0; i < data.films.length; i++) {
    dataReq(data.films[i], element, data.films, getMovies);
  }
};

const getMovies = (source, data, element, option) => {
  const movie = document.createElement(`li`);
  const movies = document.querySelector(`#movies`);
  movies.style.marginLeft = `-40px`;
  movie.style.marginLeft = `25px`;
  movie.style.listStyleType = `hebrew`;
  movie.style.fontSize = `14px`;
  movie.innerHTML = data.title;
  movies.appendChild(movie);
};

document.querySelector(`#requestResourceButton`).onclick = () => {
  const option = document.querySelector(`#resourceType`).value;
  const num = document.querySelector(`#resourceId`).value;
  const contain = document.querySelector(`#contentContainer`);
  reset();
  dataReq(`http://swapi.co/api/${option}/${num}/`, contain, option, showInfo);
};