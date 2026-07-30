console.log('login.js connect')

document.getElementById('login').addEventListener('click',function(e){
    e.preventDefault()
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value 
    if(password == 123){
       window.location.href ="index.html"
    }else{
        alert('Please enter valid pin')
    }


    
})