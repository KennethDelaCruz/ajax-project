/* global data */
var searchForm = document.querySelector('#search-pokemon')


function getPokeData(name){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function(){
    data.currentPokemon = xhr.response
    var pokemon = xhr.response;
    console.log(xhr.response)
    if(xhr.response === null){
      console.log('this fired');
    }
    console.log(pokemon.name)

  })
  xhr.send();
}

function submitForm() {
  event.preventDefault();
  var name = searchForm.name.value;
  if(typeof name === 'string') {
    name = name.toLowerCase();
  }
  getPokeData(name);
  searchForm.reset();
}

searchForm.addEventListener('submit', submitForm);
