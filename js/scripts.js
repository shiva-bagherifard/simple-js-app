// Define an array of Pokémon objects

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

// Iterate over each item in the pokemonList array using forEach()

pokemonList.forEach(function(pokemon) {
    let output = pokemon.name + " (height: " + pokemon.height + ")";
    
    // Check if the height is above a certain value to highlight special Pokémon

    if (pokemon.height > 6) {
        output += " - Wow, that's big!";
    }
    
    // Output the Pokémon information to the DOM
    
    document.write(output + "<br>");
});