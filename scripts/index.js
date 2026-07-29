console.log('index.js file connected')

const removeActiveClass = ()=>{
    const buttons = document.getElementsByClassName('active');
    for(let button of buttons){
        button.classList.remove('active')
    }
}

const loadCategory =()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(jsonData =>{
        displayCategory(jsonData.data)
       
    })
}

const displayCategory =(categories)=>{
    console.log(categories)

    const categoryContainer = document.getElementById('category-container')
        for(let cat of categories){
            const div = document.createElement('div')
            div.innerHTML =`
                 <button id="btn-${cat.level_no}" onclick="loadWord(${cat.level_no})" class="btn btn-sm border border-purple-300 font-bold text-purple-500 "><i class="fa-solid fa-book-open"></i> lesson-${cat.level_no}</button>
            
            `
            categoryContainer.appendChild(div)
        }
}
loadCategory()
 

const loadWord =(id)=>{
   fetch(` https://openapi.programming-hero.com/api/level/${id}`)
   .then(res => res.json())
   .then(jsonData =>{
    displayWord(jsonData.data)
    removeActiveClass()
    const clickBtn = document.getElementById(`btn-${id}`)
        clickBtn.classList.add('active')
   })
}

const displayWord =(words)=>{
   
   const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML =""
    if(words.length == 0){
        cardContainer.innerHTML =`
        <div class="flex justify-center items-center col-span-full py-10 rounded">
            <div>
               <img class="mx-auto" src="/assets/alert-error.png" alt="">
                <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="font-bold text-2xl text-center">নেক্সট Lesson এ যান</p>
            </div>
        </div>

        `
    }
  
   for(let word of words){
    console.log(word)
    const div =document.createElement('div')
    div.innerHTML =`
    <div class="card shadow-sm rounded-xl p-15 text-center space-y-2 bg-white border border-gray-100">
            <p class="font-bold">${word.word}</p>
            <p class="text-sm">Meaning /pronunciation</p>
            <p class="font-semibold">${word.meaning}/${word.pronunciation}</p>
            <div class="flex justify-between items-center">
                <i onclick="loadDetails('${word.id}')" class="fa-solid fa-circle-info"></i>
                <i class="fa-solid fa-volume-high"></i>
            </div>
        </div>
    
    `
    cardContainer.appendChild(div)
   }
}

const loadDetails =(id)=>{
   my_modal_2.showModal()
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
  .then(res => res.json())
  .then(data =>displayDetails(data.data))
}

const displayDetails =(data)=>{
   const container = document.getElementById('modal-container');
   const div =document.createElement('div')
   div.innerHTML =`
     <h3 class="text-lg font-bold">${data.word}</h3>
    <p class="py-1">${data.meaning}</p>
    <div class="py-2">
        <p class="font-bold">Example</p>
        <p class="text-sm">${data.sentence}</p>
    </div>
    <div>
        <h1 class="font-bold py-1">Synonyms</h1>
       ${data.synonyms.map((word) => `<button class="btn btn-sm mr-2">${word}</button>`).join('')}
    </div>
   `
container.appendChild(div)
}

