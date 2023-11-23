const URL_API = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
const linkImagen = 'https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/';
const linkMeta = `https://www.metasrc.com/lol/build/`
const champsDiv = document.querySelector('#champs');
const btnPlus = document.querySelector('#btn-plus');
const formuChamps = document.querySelector('#formu-champs');
const btnClose = document.querySelector('#btn-close');
const btnAgregar = document.querySelector("#btn-agregar")

async function obtenerDatosCampeones(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error al obtener datos de campeones:', error);
        return null;
    }
}

async function agregarChampion() {
    try {
        const champName = document.querySelector('.champ-name-input').value;
        const champData = await obtenerDatosCampeones(URL_API);

        if (champData && champData[champName]) {
            const champInfo = champData[champName];
            
            // Crea una imagen y añádela al div de campeones
            const articleElement = document.createElement(`article`)
            articleElement.classList.add("champion")
            
            const aElement = document.createElement(`a`)
            aElement.target = `_blank`
            aElement.href = `${linkMeta}${champName}`
            aElement.rel = `nofollow`
            
            const champAtributos = document.createElement(`div`)
            champAtributos.classList.add("atributos")
            champAtributos.innerHTML = `<p><img src="./assets/svg/life.svg" class="icon-atributes"></img>: ${champInfo.stats.hp}</p>
            <p><img src="./assets/svg/dmg.svg" class="icon-atributes">: ${champInfo.stats.attackdamage}</p>
            <p><img src="./assets/svg/range.svg" class="icon-atributes"></img>: ${champInfo.stats.attackrange}</p>
            <p><img src="./assets/svg/armor.svg" class="icon-atributes"></img>: ${champInfo.stats.armor}</p>
            <p><img src="./assets/svg/mr.svg" class="icon-atributes"></img>: ${champInfo.stats.spellblock}</p>
            <p><img src="./assets/svg/ms.svg" class="icon-atributes"></img>: ${champInfo.stats.movespeed}</p>`
            
            const figElement = document.createElement(`figure`)
            
            
            const imgElement = document.createElement('img');
            imgElement.classList.add("img-atributes")
            imgElement.src = `${linkImagen}${champName}.png`;
            imgElement.alt = champName; 
            
            
            aElement.appendChild(imgElement)
            articleElement.appendChild(aElement)
            articleElement.appendChild(champAtributos)
            champsDiv.appendChild(articleElement)

            
            

            console.log('Nombre del Campeón:', champInfo.name);
            console.log('Estadísticas básicas:', champInfo.info);
        } else {
            console.error('Campeón no encontrado');
        }
    } catch (error) {
        console.error('Error en la función agregarChampion:', error);
    }
}

function apretarBotonPlus() {
    formuChamps.classList.remove('disabled');
}

btnPlus.addEventListener('click', apretarBotonPlus);

function apretarBotonClose() {
    formuChamps.classList.add('disabled');
}

btnClose.addEventListener('click', apretarBotonClose);

btnAgregar.addEventListener("click", agregarChampion)
