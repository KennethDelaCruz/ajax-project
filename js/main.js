/* global data */
var searchForm = document.querySelector('#search-pokemon');
var pokeSection = document.querySelector('.pokemon-section');
var randomButton = document.querySelector('#random-button');
var heartButton = document.querySelector('.fa-heart');
var favoriteButton = document.querySelector('#favorite-button');
var favoriteList = document.querySelector('.favorite-list')
var allSections = document.querySelectorAll('section');


window.addEventListener('load',function(){
  if(data.currentPokemon !== null){
    var open = generatePokemon(data.currentPokemon);
    pokeSection.appendChild(open);
  }
  allSections.forEach(hideSection);
})


function capital(word){
  if (typeof word !== 'string'){
    return
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}



function getPokeData(name){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function(){
    data.currentPokemon = xhr.response
    var pokemon = xhr.response;
    data.pokesnap = data.currentPokemon.sprites.other["official-artwork"].front_default;
    var newElement = generatePokemon(pokemon);
    pokeSection.appendChild(newElement);
// THIS NEEDS TO BE UPDATED WITH A MODAL. WHEN THERE IS NO POKEMON THAT EXIST
    if(xhr.response === null){
      console.log('this fired');
    }
  })
  xhr.send();
}

function getFavorites(name){
  var xhr = new XMLHttpRequest();
  console.log(name);
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name)
  xhr.responseType = 'json';
  xhr.addEventListener('load', function(){
    var pokemon = xhr.response;
    var newLi = generateFavorites(pokemon);
    favoriteList.appendChild(newLi);
  })
  xhr.send();
};

function submitForm() {
  event.preventDefault();
  data.view = "selected";
  allSections.forEach(hideSection);
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
  $name.textContent = capital(object.name);

  var $heart = document.createElement('i')
  if(data.favorites.includes(object.name )){
    $heart.setAttribute('class', 'fas fa-heart')
  } else {
    $heart.setAttribute('class', 'far fa-heart');
  }
  $heart.setAttribute('id', 'like');

  var $type = document.createElement('h4');
  $type.textContent = 'Type: '+ capital(object.types[0].type.name);


  var $number = document.createElement('h4');
  $number.textContent = '#' + object.id;

  var $weight = document.createElement('h4');
  $weight.textContent = 'Weight: ' + Math.floor(object.weight * .1) + 'kg' ;

  var abilityDiv = document.createElement('div');
  abilityDiv.setAttribute('class', 'pokemon-description')

  var $abilities = document.createElement('p');
  $abilities.textContent = 'Abilities';

  var $list = document.createElement('ul');



  var abilities = object.abilities;
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

function generateFavorites(object){
  var $li = document.createElement('li');
  $li.setAttribute('class', 'fav-list')

  var $img = document.createElement('img');
  $img.setAttribute('src', object.sprites.front_default)

  var $name = document.createElement('h3');
  $name.textContent = capital(object.name);

  var $number = document.createElement('h3');
  $number.textContent = '#' + object.id;

  var $remove = document.createElement('i');
  $remove.setAttribute('class', 'fas fa-times');

  $li.appendChild($img);
  $li.appendChild($name);
  $li.appendChild($number);
  $li.appendChild($remove);
  return $li
}

//<i class="fas fa-times"></i>


function random(event){
  data.view = "selected";
  allSections.forEach(hideSection);
  var max = 898;
  var randomInteger = Math.floor(Math.random() * Math.floor(max));
  getPokeData(randomInteger);
}

function likeButton(event){

  if(event.target.id === 'like'){
    var $name = event.target.closest('h3').textContent.toLowerCase();
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

function favList(event){
  data.view ='favorites'
  allSections.forEach(hideSection);
  if(data.favorites.length !== 0){
    var allListed = document.querySelectorAll('.fav-list')
    for (var k = 0; k < allListed.length; k++){
      allListed[k].remove();
    }
  }
  for(var i = 0; i < data.favorites.length; i++){
    getFavorites(data.favorites[i]);
  }
}

function hideSection(object){
  var viewType = object.getAttribute('data-view');
  if(viewType !== data.view){
    object.classList.add('hidden');
  } else {
    object.classList.remove('hidden')
  }
}

favoriteButton.addEventListener('click', favList);
pokeSection.addEventListener('click', likeButton);
randomButton.addEventListener('click', random);
searchForm.addEventListener('submit', submitForm);
