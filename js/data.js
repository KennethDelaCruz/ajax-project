/* exported data */
var data = {
  view: 'home-page',
  currentPokemon: null,
  pokesnap: null,
  favorites: [],
}

var previousData = localStorage.getItem('data-model')

if(previousData !==null){
  data = JSON.parse(previousData);
}

function saveLocal(event){
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-model', dataJSON)
}

window.addEventListener('beforeunload',saveLocal)
