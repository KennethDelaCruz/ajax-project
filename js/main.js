var searchForm = document.querySelector('#search-pokemon')

function getPokeData(name){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function() {
    console.log(xhr.response)
  })
  xhr.send();
}

function submitForm() {
  event.preventDefault();
  var name = searchForm.name.value;
  if(typeof name === 'string') {
    name = name.toLowerCase();
  }
  var pokemon = getPokeData(name);
  console.log(pokemon)
  searchForm.reset();
}

searchForm.addEventListener('submit', submitForm);
