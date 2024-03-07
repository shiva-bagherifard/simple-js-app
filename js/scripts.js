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

// Iterate over each item in the pokemonList array

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    let output = pokemon.name + " (height: " + pokemon.height + ")";
    
    // Output the Pokémon information to the DOM
    document.write(output + "<br>");
}