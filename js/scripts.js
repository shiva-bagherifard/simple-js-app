let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // Function to add a Pokemon to the repository
  function add(pokemon) {
      if (
          typeof pokemon === 'object' && 'name' in pokemon
      ) {
          pokemonList.push(pokemon);
      } else {
          console.error('pokemon is not correct');
      }
  }
  // Function to get all Pokemon from the repository
  function getAll() {
      return pokemonList;
  }

  // Function to add a list item for a Pokemon

  function addListItem(pokemon){
      let pokemonList = document.querySelector('.pokemon-list');

      let listItem = document.createElement ('li');

      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn-primary', 'btn-block', 'btn-lg', 'mb-3');

      button.setAttribute('data-target', '#exampleModal');
      button.setAttribute('data-toggle', 'modal');

      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      addEventListenertoButton(button, pokemon);
  }


  function addEventListenertoButton(button, pokemon) {
      button.addEventListener('click', function() {
          showDetails(pokemon);
      });
  }






  // Function to load the list of Pokemon from the API
  function loadList () {
      return fetch(apiUrl).then(function (response) {
          return response.json();
      }).then(function (json) {
          json.results.forEach(function (item) {
              let pokemon = {
                  name: item.name,
                  detailsUrl: item.url
              };
              add (pokemon);
              console.log(pokemon);
          });
      })
      .catch(function (e) {
          console.error(e);
      })
  }
  // Function to load details of a specific Pokemon
  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
          return response.json();
      }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          item.weight = details.weight;
          item.abilities = details.abilities;
      })
      .catch(function (e) {
          console.error(e);
      });
  }

  // new modal code

  let modal = document.querySelector('.modal');

  function showDetails(item) {
      pokemonRepo.loadDetails(item).then(function() {
          showModal(item)
      })
  }

  function showModal(pokemon) {
      let modalBody = document.querySelector('.modal-body');
      let modalHeader = document.querySelector('.modal-header');
      modalBody.innerHTML = '';

      let modalTitle = document.querySelector('.modal-title');
      let closeButtonElement = document.querySelector('.close');

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.src = pokemon.imageUrl;
      imageElement.alt = 'image of' + pokemon.name;

      let typesElement = document.createElement('p');
      let types = [pokemon.types[0].type.name];
      for (let i = 1; i < pokemon.types.length; i++) {
          types.push(', ' + pokemon.types[i].type.name);
      }
      typesElement.innerHTML = 'Types:' + types.join('');

      let heightElement = document.createElement('p');
      heightElement.innerHTML = 'Height:' + pokemon.height;

      let weightElement = document.createElement('p');
      weightElement.innerHTML = 'Weight:' + pokemon.weight;

      let abilities = document.createElement('p');
      let abilitiesList = [pokemon.abilities[0].ability.name];
      for (let i = 1; i < pokemon.abilities.length; i++) {
          abilitiesList.push(', ' + pokemon.abilities[i].ability.name);
      }
      abilities.innerHTML = 'Abilities:' + abilitiesList.join('');

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButtonElement);
      modalBody.appendChild(imageElement);
      modalBody.appendChild(typesElement);
      modalBody.appendChild(heightElement);
      modalBody.appendChild(weightElement);
      modalBody.appendChild(abilities);
  }

 
  function hideModal() {
      modal.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
          hideModal();
      }
  });


  modal.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modal) {
          hideModal();
      }

  });

      return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
  };
})();
// Load the list of Pokemon and add list items
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function (pokemon) {
      pokemonRepo.addListItem(pokemon);
  });
});