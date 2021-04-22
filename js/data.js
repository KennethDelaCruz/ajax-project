/* exported data */
var data = {
  view: 'home-page',
  currentPokemon: null,
  pokesnap: null,
  favorites: []
};

function getLocal(event) {
  var previousData = localStorage.getItem('data-model');
  data = JSON.parse(previousData);
}

function saveLocal(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-model', dataJSON);
}

window.addEventListener('DOMContentLoaded', getLocal);
window.addEventListener('beforeunload', saveLocal);
