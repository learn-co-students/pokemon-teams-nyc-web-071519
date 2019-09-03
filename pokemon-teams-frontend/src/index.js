const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector(".container");

fetch(TRAINERS_URL,)
.then(response => {return response.json()})
.then(data => {
    
    data.forEach( e =>{
        container.insertAdjacentHTML('beforeend', 
            `<div class="card" data-id="${e.id}"><p>${e.name}</p>
                <button class = "add" data-trainer-id="${e.id}">Add Pokemon</button>
                <ul data-trainer-id="${e.id}">
                </ul>
            </div>`
        )
        const current_ul = document.querySelector(`ul[data-trainer-id="${e.id}"]`);
        e.pokemons.forEach( pokemon =>{
            current_ul.insertAdjacentHTML('beforeend',
                `<li data-id = "${pokemon.id}">${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
            )
        })
    })
});

container.addEventListener("click", e =>{
    if (e.target.className === 'add'){
        trainerId = e.target.dataset.trainerId
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "trainer_id": trainerId
            })
        })
        .then (response => {return response.json()})
        .then (data => {
            console.dir(data)
            if (data.error === "Party is Full!"){
                alert("Your Party is Full")
            }else {
                const correctUl =  document.querySelector(`ul[data-trainer-id="${data.trainer_id}"]`)
                correctUl.insertAdjacentHTML('beforeend',
                    `<li  data-id = "${data.id}">${data.nickname} (${data.species}) <button class="release" data-pokemon-id="${data.id}">Release</button>`
                )
            }
        })
    } else if(e.target.className ==='release'){
        const pokemonId = e.target.dataset.pokemonId
        const pokemon = container.querySelector(`li[data-id = "${pokemonId}"]`)
        fetch(`http://localhost:3000/pokemons/${pokemonId}`,{
            method: 'DELETE'
        })
        .then(() => {
            pokemon.remove();
        })
    }
})
