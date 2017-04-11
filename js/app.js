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
  gender.innerHTML = data.gender;
  element.appendChild(name);
  element.appendChild(gender);
  dataReq(data.species[0], element, null, getSpecies);
};

const getSpecies = (source, data, element, option) => {
  const species = document.createElement(`p`);
  species.innerHTML = data.name;
  element.appendChild(species);
};

const getPlanet = (data, element) => {

};

const getShip = (data, element) => {

};


document.querySelector(`#requestResourceButton`).onclick = () => {
  const option = document.querySelector(`#resourceType`).value;
  const num = document.querySelector(`#resourceId`).value;
  const contain = document.querySelector(`#contentContainer`);
  reset();
  dataReq(`http://swapi.co/api/${option}/${num}/`, contain, option, showInfo);
};