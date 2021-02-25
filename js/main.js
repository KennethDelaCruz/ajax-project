/* global data */
var searchForm = document.querySelector('#search-pokemon');
var selectedPokmeon = document.querySelector('#selected-pokemon')
var pokeSection = document.querySelector('.pokemon-section');
var randomButton = document.querySelector('#random-button');
var heartButton = document.querySelector('.fa-heart');
var pokeSection = document.querySelector('.pokemon-section');

function capital(word){
  if (typeof word !== 'string'){
    return
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getPokeData(name){
  var xhr = new XMLHttpRequest();
  var xhr2 = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function(){
    data.currentPokemon = xhr.response
    var pokemon = xhr.response;
    data.pokesnap = data.currentPokemon.sprites.other["official-artwork"].front_default;
    var newElement = generatePokemon(data);
    pokeSection.appendChild(newElement);
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
  if (document.querySelector('#selected-pokemon') !== null){
    document.querySelector('#selected-pokemon').remove();
  }

  var mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', ' row');
  mainDiv.setAttribute('id', 'selected-pokemon')

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
  $name.textContent = capital(object.currentPokemon.name);

  var $heart = document.createElement('i')
  if(data.favorites.includes(object.currentPokemon.name )){
    $heart.setAttribute('class', 'fas fa-heart')
  } else {
    $heart.setAttribute('class', 'far fa-heart');
  }
  $heart.setAttribute('id', 'like');

  var $type = document.createElement('h4');
  $type.textContent = 'Type: '+ capital(object.currentPokemon.types[0].type.name);


  var $number = document.createElement('h4');
  $number.textContent = '#' + object.currentPokemon.id;

  var $weight = document.createElement('h4');
  $weight.textContent = 'Weight: ' + Math.floor(object.currentPokemon.weight * .1) + 'kg' ;

  var abilityDiv = document.createElement('div');
  abilityDiv.setAttribute('class', 'pokemon-description')

  var $abilities = document.createElement('p');
  $abilities.textContent = 'Abilities';

  var $list = document.createElement('ul');



  var abilities = object.currentPokemon.abilities;
  for(var i = 0; i < abilities.length; i++){
    var newLi = document.createElement('li');
    newLi.textContent = capital(abilities[i]["ability"].name);
    $list.appendChild(newLi);
  }


  $name.appendChild($heart);
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

return mainDiv
}

function random(event){
  var max = 898;
  var randomInteger = Math.floor(Math.random() * Math.floor(max));
  getPokeData(randomInteger);
}

function likeButton(event){
  var $name = event.target.closest('h3').textContent.toLowerCase();
  if(event.target.id === 'like'){
    if(data.favorites.includes($name)){
      event.target.setAttribute('class', 'far fa-heart')
      var index = data.favorites.indexOf($name)
      data.favorites.splice(index);
      console.log(data.favorites);
    } else {
    event.target.setAttribute('class', 'fas fa-heart')
    data.favorites.push($name);
    console.log(data.favorites);
    }
  }
}

pokeSection.addEventListener('click', likeButton);
randomButton.addEventListener('click', random);
searchForm.addEventListener('submit', submitForm);
