// const koloboksArray = document.querySelectorAll('.mt-0')
// const kolobokImagesArray = document.querySelectorAll('.mat-card-image')
const log = console.log

main()

async function main(){
   let KolobokCardArray = document.querySelectorAll('.mt-0')
   let kolobokImageArray = document.querySelectorAll('.mat-card-image')
   let index = 0
   let noImage = 'https://wax.simplemarket.io/assets/images/no-photo.png'

   for(let kolobokCard of KolobokCardArray){      
      if(index < 100){
         addEventListener('scroll',()=>{
            let urlImage = kolobokImageArray[index].src
            if(urlImage !== noImage){
               log(`Here: ${urlImage}`)
               log(index)
               let genome = getGenomeInImage(urlImage)
               let speed = calculateSpeed(genome)
               // let stealth = calculateStealth(genome)
               let tagFont = createTagFont()
               tagFont.innerHTML = `Speed ${speed}`
               addSpeedInKolobokCard(kolobokCard,tagFont)
               index++
            }else{
               log("Url da imagem não encontrada, rode scroll do mouse.")
            }
         })
      }
   }
}

function waitMoveScrollMouse(kolobokImageArray,index){
   return new Promise((resolve,reject)=>{
      addEventListener('scroll',async(event)=>{
         resolve(kolobokImageArray[index].src)
      })
   })
}

function createTagFont(){
   let font = document.createElement('font')
   font.style.fontSize = '1rem'
   font.style.fontWeight = 700
   font.style.color = 'green'
   return font
}

function addSpeedInKolobokCard(kolobokCard,tagFont){
   kolobokCard.appendChild(tagFont)
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