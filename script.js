const log = console.log

main()

async function main(){
   insertValuesInAllKoloboks()
}

async function insertValuesInAllKoloboks(){
   window.addEventListener('load',async(event)=>{
      let KolobokCardArray = document.querySelectorAll('.card-image-wrapper')
      let index = 0
      let urlAtual = window.location.href
      let urlApi = createUrlApi(urlAtual)
      let apiResponse = await apiResponseJson(urlApi)
      let urlArrayImages = getAllUrlImages(apiResponse)
      
      for(let kolobokCard of KolobokCardArray){
         let genome = getGenomeInImage(urlArrayImages[index])
         log(kolobokCard)
         log(genome)
         let speed = calculateSpeed(genome)
         log(speed)
         let stealth = calculateStealth(genome)
         log(stealth)
         let speedLabel = createLabel(`Speed ${speed}`,'green')
         let stealthLabel = createLabel(`Stealth ${stealth}`,'orange')
         let br = createTagBr()
         let div = createDiv('status')
         insertLabelInDiv(div,speedLabel)
         insertLabelInDiv(div,br)
         insertLabelInDiv(div,stealthLabel)
         insertDivInKolobokCard(kolobokCard,div)
         index++
      }
   })
   }


function getAllUrlImages(apiResponseJson){
   let urlImages = apiResponseJson.items.map(value => value.mdata.img)
   log(urlImages)
   return urlImages
}

async function apiResponseJson(urlApi){
   const response = await fetch(urlApi)
   return await response.json()
}

function createUrlApi(url){
   let dinamicValuesArray = url.substring(url.lastIndexOf('?')+1).split('&')
   let skip = dinamicValuesArray.filter(value => value.includes('skip'))
   let limit = dinamicValuesArray.filter(value => value.includes('limit'))
   let categories = dinamicValuesArray.filter(value => value.includes('categories'))
   let asset = dinamicValuesArray.filter(value=> value.includes('asset'))
   let urlApi = `https://wax.simplemarket.io/api/v2/market?${skip}&${limit}&authors=ilovekolobok&&${categories}&${asset}&%20Request%20Method:%20GET`
   log(urlApi)
   return urlApi
}

function createLabel(labelValue,color){
   let label = document.createElement('label')
   label.style.fontSize = '0.9rem'
   label.style.fontWeight = 700
   label.style.color = color
   label.innerHTML = labelValue
   return label
}

function createTagBr(){
   return document.createElement('br')
}

function insertLabelInDiv(div,label){
   div.appendChild(label)
}

function createDiv(id){
   let div = document.createElement('div')
   div.setAttribute('id',id)
   return div
}

function insertDivInKolobokCard(kolobokCard,div){
   div.style.marginTop = '-220px'
   div.style.marginLeft = '-100px'
   kolobokCard.appendChild(div)
}

function getGenomeInImage(urlImage){
   return urlImage.substring(urlImage.lastIndexOf('/') + 1,urlImage.lastIndexOf('.'))
}

function calculateStealth(genome){
   const genomeLength = genome.length
   const genomeHalf = genomeLength / 2
   const r = [genome.slice(genomeHalf - 2, genomeHalf), genome.slice(genomeHalf, genomeHalf + 2)]
   let stealth = ((255 - Math.abs(parseInt(r[0], 16) - parseInt(r[1], 16))) / 255).toFixed(2)
   return stealth
}

function calculateSpeed(genome) {
   const genomeLength = genome.length
   const dnaList = [genome.slice(0, 2), genome.slice(genomeLength - 2, genomeLength)]
   let speed = Math.abs(parseInt(dnaList[0], 16) - parseInt(dnaList[1], 16))
   return speed
}