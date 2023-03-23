const pokemonName = document.querySelector('#pokemon-name');
const pokemonId = document.querySelector('#pokemon-id');
const pokemonType = document.querySelector('#pokemon-type');
const pokemonImg = document.querySelector('#image');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnNext = document.querySelector('.next-button');
const btnPrev = document.querySelector('.prev-button');
const card = document.querySelector('.card');
const searchBtn = document.querySelector('#searchBtn');
let currentId = 1;

const colors = {
    fire: '#fa8365',
    grass: '#78df7e',
    electric: '#fdea3b',
    water: '#7ec3e4',
    ground: '#c28a51',
    rock: '#d5d5d4',
    fairy: '#eb86d1',
    poison: '#845899',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#d6d6b7',
    fighting: '#E6E0D4',
    normal: '#d6d6b7'
}

const main_types = Object.keys(colors);


const fetchPokemon = async (pokemon)=>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if(apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }

    
}

const renderPokemon = async (pokemon)=>{
    const data =  await fetchPokemon(pokemon)


    if(data){
        const poke_types = data.types.map(typeInfo => typeInfo.type.name);
        const color = colors[poke_types[0]];
        
        let types = '';
        currentId = data.id;
        for(let i =0; i < poke_types.length; i++){
            types += `<span class ="pokemon_type" style="background-color: ${colors[poke_types[i]]}">${poke_types[i]}</span>`
        }
    
        card.style.backgroundColor = color;
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = '#' + currentId.toString().padStart(3,'0');
        pokemonType.innerHTML = `Type = ${types}`;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
    }

}






form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(input.value);
})


searchBtn.addEventListener('click', ()=>{
    renderPokemon(input.value);
})



btnNext.addEventListener('click', ()=>{
    let number = parseInt(currentId) + 1;
    renderPokemon(`${number}`);
   
})

btnPrev.addEventListener('click', ()=>{
    if(parseInt(currentId) >= 1){
        let number = parseInt(currentId) - 1;
        renderPokemon(`${number}`);
    }
    
})



renderPokemon(`${currentId}`)