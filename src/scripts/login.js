import { getUser, login, validaToken, getValidar } from "./requests.js"


function redirecionarHome(){
    const getButton = document.querySelector('.botao_Home')
    getButton.addEventListener('click',() =>{
    window.location.href = "../../index.html"
    })
}

function redirecionarCadastrar2(){
    const getButton = document.querySelector('.botao_cadastro')
    
    getButton.addEventListener('click',() =>{
    window.location.href = "./cadastro.html"
    })
   
}

function redirecionarCadastrar(){
    const getButton2 = document.querySelector('.Retornar')
    getButton2.addEventListener('click',(event) =>{
        event.preventDefault()
        window.location.href = "./cadastro.html"
    })
}
redirecionarHome()
redirecionarCadastrar2()
redirecionarCadastrar()

async function validarLogin(){
    const user = getUser()
  
    const validar = await validaToken(`${user.token}`)
    
         

    
    if(validar.is_admin){
        localStorage.setItem('@kenzieMarket:validar', JSON.stringify(validar))
        window.location.replace('./admin.html')
        
        
     }
     else if(!validar.is_admin){
        localStorage.setItem('@kenzieMarket:validar', JSON.stringify(validar))
        window.location.replace('./user.html')
         
     }
     else{
        window.replace()
        
     }
    
}

function loguinForm(){
    const inputs = document.querySelectorAll('.Formulario > input')
    const button = document.querySelector('.Cadastrar')
    const loginUser = {}

    button.addEventListener('click', async (event) =>{
        event.preventDefault()

        inputs.forEach(input => {
            loginUser[input.name] = input.value
        })
        
        const request = await login(loginUser)
        
        localStorage.setItem('@kenzieMarket:user', JSON.stringify(request))
        validarLogin()
    })

}


loguinForm()

export async function protecaoAdmin(){
    const valida = getValidar()
     if(!valida.is_admin){
         window.location.replace('./user.html')
         
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


