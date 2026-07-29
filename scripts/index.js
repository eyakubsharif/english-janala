console.log('index.js file connected')

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
                 <button onclick="loadWord(${cat.level_no})" class="btn btn-sm border border-purple-300 font-bold text-purple-500 "><i class="fa-solid fa-book-open"></i> lesson-${cat.level_no}</button>
            
            `
            categoryContainer.appendChild(div)
        }
}
loadCategory()

const loadWord =(id)=>{
   fetch(` https://openapi.programming-hero.com/api/level/${id}`)
   .then(res => res.json())
   .then(jsonData =>displayWord(jsonData.data))
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
                <i class="fa-solid fa-circle-info"></i>
                <i class="fa-solid fa-volume-high"></i>
            </div>
        </div>
    
    `
    cardContainer.appendChild(div)
   }
}

