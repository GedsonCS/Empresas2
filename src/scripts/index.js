import { GetTodasEmpresas, GetTodasEmpresasSetor, getValidar } from "./requests.js"

function redirecionarlogin(){
    const getButton = document.querySelector('.botao_login')
    getButton.addEventListener('click',() =>{
    window.location.href = "./src/pages/login.html"
    })
}

function redirecionarCadastro(){
    const getButton = document.querySelector('.botao_cadastro')
    getButton.addEventListener('click',() =>{
    window.location.href = "./src/pages/cadastro.html"
    })
    }

redirecionarlogin()
redirecionarCadastro()

async function renderCardEmpresas(data){
    var getUL = document.querySelector('.Empresas')

    //let listaEmpresas = await GetTodasEmpresas()
    
    data.forEach(empresa => {
        getUL.insertAdjacentHTML('beforeend', `
        <li class="card_empresa">
                    <h2 class="nome_Empresa">${empresa.name}</h2>
                    <p class="hora_abertura">${empresa.opening_hours}</p>
                   <div>
                    <span class="setor">${empresa.sectors.description}</span>
                   </div>
                </li>
    `)
    });

}

renderCardEmpresas(await GetTodasEmpresas())

function atualizaSelect(){
    let getselect = document.querySelector('.lista_Empresas_Select')
    var getUL = document.querySelector(".Empresas")
    
    var value = ''

    getselect.addEventListener('change', async () =>{
    getUL.innerHTML = ''
    value = getselect.value
    var arrayrender = await GetTodasEmpresasSetor(`${value}`)

    renderCardEmpresas(arrayrender)
    })
    
    
    return value
}

atualizaSelect()

export async function protecaoAdmin(){
    const valida = getValidar()
     if(!valida.is_admin){
         window.location.replace("./src/pages/admin.html")
         
     }
 }
 
 protecaoAdmin()
 export async function protecaouser(){
    const valida = getValidar()
     if(valida.is_admin){
         window.location.replace("./src/pages/admin.html")
         
     }
 }
 
 protecaouser()



