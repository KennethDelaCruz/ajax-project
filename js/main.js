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
    data.pokesnap = data.currentPokemon.sprites.other["official-artwork"].front_default;
    generatePokemon(data);
// THIS NEEDS TO BE UPDATED WITH A MODAL. WHEN THERE IS NO POKEMON THAT EXIST
    if(xhr.response === null){
      console.log('this fired');
    }

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

function generatePokemon(object){
  var mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', 'selected-pokemon row');

  var div1 = document.createElement('div');
  div1.setAttribute('class', 'column-half poke-picture');

  var pokeImg = document.createElement('img');
  pokeImg.setAttribute('class', 'poke-img');
  pokeImg.setAttribute('src', data.pokesnap);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'column-half poke-text');

  var subDiv = document.createElement('div');
  subDiv.setAttribute('class', 'pokemon-details')

  var $name = document.createElement('h3');
  $name.setAttribute('class', 'pokemon-name');
  $name.textContent = object.currentPokemon.name;

  var $type = document.createElement('h4');
  $type.textContent = 'Type: '+object.currentPokemon.types[0].type.name[0];

  var $number = document.createElement('h4');
  $number.textContent = '#' + object.currentPokemon.id;

  var $weight = document.createElement('h4');
  $weight.textContent = 'Weight: ' + object.currentPokemon.weight;

  var abilityDiv = document.createElement('div');
  abilityDiv.setAttribute('class', 'pokemon-description')

  var $abilities = document.createElement('p');
  $abilities.textContent = 'Abilities';

  var $list = document.createElement('ul');



  var abilities = object.currentPokemon.abilities;
  for(var i = 0; i < abilities.length; i++){
    var newLi = document.createElement('li');
    newLi.textContent = abilities[i]["ability"].name;
    $list.appendChild(newLi);
  }


  subDiv.appendChild($name);
  subDiv.appendChild($type);
  subDiv.appendChild($number);
  subDiv.appendChild($weight);
  abilityDiv.appendChild($abilities);
  abilityDiv.appendChild($list);
  div2.appendChild(subDiv);
  div2.appendChild(abilityDiv);
  div1.appendChild(pokeImg);
  mainDiv.appendChild(div1);
  mainDiv.appendChild(div2);

  var test1  = document.querySelector('.pokemon-section')
  test1.appendChild(mainDiv);
}

// <div class="selected-pokemon">
//  <div class="column-half poke-picture">
//    <img class="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png">
//  </div>
//  <div class="column-half poke-text">
//    <div class="pokemon-details">
//      <h3 class="pokemon-name">Sandshrew</h3>
//      <h4>Type: Ground</h4>
//      <h4>#027</h4>
//      <h4>Weight: 12.kg</h4>
//      </div>
//      <p class="pokemon-description">Burrows deep underground in arid locations far from water. It only emerges to hunt for food.</p>
//    </div>
// </div>
//

searchForm.addEventListener('submit', submitForm);

function test1(object){
  var abilities = object.currentPokemon.abilities;
  console.log(abilities)
  for (var i = 0; i < abilities.length; i++) {
    console.log(abilities[i]["ability"].name)
  }

}
