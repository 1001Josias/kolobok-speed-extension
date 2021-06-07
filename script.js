// const koloboksArray = document.querySelectorAll('.mt-0')
// const kolobokImagesArray = document.querySelectorAll('.mat-card-image')
const log = console.log

main()

async function main(){
   let KolobokCardArray = document.querySelectorAll('.card-image-wrapper')
   let kolobokImageArray = document.querySelectorAll('.mat-card-image')
   let index = 0
   let noImage = 'https://wax.simplemarket.io/assets/images/no-photo.png'

   for(let kolobokCard of KolobokCardArray){
      let urlImage = (kolobokImageArray[index].src == noImage)? await waitMoveScrollMouse(kolobokImageArray,index): kolobokImageArray[index].src
   
      log(`Here: ${urlImage}`)
      let genome = getGenomeInImage(urlImage)
      let speed = calculateSpeed(genome)
      // let stealth = calculateStealth(genome)
      let speedLabel = createLabel(`Speed ${speed}`)
      // let stealthLabel = createTagFont(`Stealth ${stealth}`)
      let div = createDiv('status')
      insertLabelInDiv(div,speedLabel)
      insertDivInKolobokCard(kolobokCard,div)
      index++
   }
}

function waitMoveScrollMouse(kolobokImageArray,index){
   return new Promise((resolve,reject)=>{
      addEventListener('scroll',async(event)=>{
         resolve(kolobokImageArray[index].src)
      })
   })
}

function createLabel(labelValue){
   let label = document.createElement('label')
   label.style.fontSize = '0.9rem'
   label.style.fontWeight = 700
   label.style.color = 'green'
   label.innerHTML = labelValue
   return label
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