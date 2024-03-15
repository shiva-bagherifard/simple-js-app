let pokemonRepository = (function() {
    let pokemonList = [];

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
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

//modal here

(function () {
    let modalContainer = document.querySelector(".modal-container");
  
    function showModal(pokemon) {
      let modal = document.createElement("div");
      modal.classList.add("modal");
  
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);
  
      let titleElement = document.createElement("h1");
      titleElement.innerText = pokemon.name;
  
      let contentElement = document.createElement("p");
      contentElement.innerText = pokemon.height;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add("is-visible");
    }
  
    let dialogPromiseReject;
  
    function hideModal() {
      let modalContainer = document.querySelector(".modal-container");
      modalContainer.classList.remove("is-visible");
  
      if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
      }
    }
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
        hideModal();
      }
    });
  
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  })();