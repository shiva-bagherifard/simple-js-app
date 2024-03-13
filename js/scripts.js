let pokemonRepository = (function() {
    let pokemonList = [];

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    function addListItem(pokemon) {
        let element = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        element.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                data.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    pokemonRepository.add(pokemon);
                });
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                pokemon.imgUrl = details.sprites.front_default;
                pokemon.height = details.height;
                // Add more details as needed
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    return {
        getAll: function() {
            return pokemonList;
        },
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});