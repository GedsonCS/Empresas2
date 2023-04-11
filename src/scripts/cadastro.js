import { getValidar, createUser } from "./requests.js"

function redirecionarlogin(){
    const getButton = document.querySelector('.botao_login')
    getButton.addEventListener('click',() =>{
    window.location.href = "./login.html"
    })
}

function redirecionarHome(){
    const getButton = document.querySelector('.botao_Home')
    
    getButton.addEventListener('click',() =>{
    window.location.href = "../../index.html"
    })
   
}

function redirecionarHome2(){
    const getButton2 = document.querySelector('.Retornar')
    getButton2.addEventListener('click',(event) =>{
        event.preventDefault()
        window.location.href = "../../index.html"
    })
}
redirecionarlogin()
redirecionarHome()
redirecionarHome2()

export async function protecaoAdmin(){
    const valida = getValidar()
     if(!valida.is_admin){
         window.location.replace('./user.html')
         console.log('chegou aqui')
     }
 }
 
 protecaoAdmin()
 export async function protecaouser(){
    const valida = getValidar()
     if(valida.is_admin){
         window.location.replace('./admin.html')
         
     }
 }
 
 protecaouser()

 function createUserForm(){
    const inputs = document.querySelectorAll('.Formulario > input')
    const button = document.querySelector('.Cadastrar')
    
    const newUser = {}

    button.addEventListener('click', async (event) => {
        event.preventDefault()
        
        inputs.forEach(input => {
            newUser[input.name] = input.value
        })

    
       const request = await createUser(newUser)
       localStorage.setItem('@kenzieMarket:cadastro', JSON.stringify(request))
    })
    
    return newUser
 }

 createUserForm()
