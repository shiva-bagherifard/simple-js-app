let pokemonRepository = (function() {
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 7,
            types: ['grass', 'poison']
        },
        {
            name: "Charmander",
            height: 6,
            types: ['fire']
        },
        {
            name: "Squirtle",
            height: 5,
            types: ['water']
        }
    ];

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

    return {
        getAll: function() {
            return pokemonList;
        },

        add: function(item) {
            pokemonList.push(item);
        },
        addListItem,
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});