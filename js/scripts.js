let pokemonRepo = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error('Pokemon object is not correct.');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn-primary', 'btn-block', 'btn-lg', 'mb-3');
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function showDetails(item) {
        loadDetails(item).then(function() {
            showModal(item);
        });
    }

    function showModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = pokemon.name;

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = 'Image of ' + pokemon.name;

        let typesElement = document.createElement('p');
        let types = pokemon.types.map(type => type.type.name).join(', ');
        typesElement.innerHTML = 'Types: ' + types;

        let heightElement = document.createElement('p');
        heightElement.innerHTML = 'Height: ' + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerHTML = 'Weight: ' + pokemon.weight;

        let abilitiesElement = document.createElement('p');
        let abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
        abilitiesElement.innerHTML = 'Abilities: ' + abilities;

        modalBody.appendChild(imageElement);
        modalBody.appendChild(typesElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);
        modalBody.appendChild(abilitiesElement);
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        return fetch(item.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight;
                item.types = details.types;
                item.abilities = details.abilities;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal
    };
})();

pokemonRepo.loadList().then(function() {
    pokemonRepo.getAll().forEach(function (pokemon) {
        pokemonRepo.addListItem(pokemon);
    });
});
