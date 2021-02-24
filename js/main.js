/* global data */
var searchForm = document.querySelector('#search-pokemon')


function getPokeData(name){
  var xhr = new XMLHttpRequest();
  var xhr2 = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function(){
    data.currentPokemon = xhr.response
    var pokemon = xhr.response;
    console.log(xhr.response);
    console.log('this is for pokemon', pokemon);
    console.log('pokemon name:', pokemon.name);
// THIS NEEDS TO BE UPDATED WITH A MODAL. WHEN THERE IS NO POKEMON THAT EXIST
    if(xhr.response === null){
      console.log('this fired');
    }

  })
  xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/'+name);
  xhr2.responseType = 'json';
  xhr.addEventListener('load', function(){
    var flavortext = xhr2.response;
    data.flavorText = flavortext;
    console.log(data.flavorText);
  });
  xhr.send();
  xhr2.send();
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

function generatePokemon(object){
  var mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', 'selected-pokemon');

  var div1 = document.createElement('div');
  div1.setAttribute('class', 'column-half poke-picture');

  var pokeImg = document.createElement('img');
  pokeImg.setAttribute('class', 'poke-img');
  pokeImg.setAttribute('src', object);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'column-half poke-text');

  var subDiv = document.createElement('div');
  subDiv.setAttribute('class', 'pokemon-details')

  var $name = document.createElement('h3');
  $name.setAttribute('class', 'pokemon-name');
  $name.textContent = object.name

  var $type = document.createElement('h4');
  $type.textContent = 'Type: '+object.types[0].type.name;

  var $number = document.createElement('h4');
  $number.textContent = '#' + object.id;

  var $description = document.createElement('p');
  $description.setAttribute('class', 'pokemon-description')


}

// <div class="selected-pokemon">
  // <div class="column-half poke-picture">
  //  <img class="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png">
  //        </div>
  //  <div class="column-half poke-text">
  //    <div class="pokemon-details">
  //      <h3 class="pokemon-name">Sandshrew</h3>
  //      <h4>Type: Ground</h4>
  //      <h4>#027</h4>
  //      <h4>Weight: 12.kg</h4>
  //    </div>
  //    <p class="pokemon-description">Burrows deep underground in arid locations far from water. It only emerges to hunt for food.</p>
  //  </div>
// </div>
//

searchForm.addEventListener('submit', submitForm);
