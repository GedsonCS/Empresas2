import { colegasTrabalho, informacaoDepartamentoUserLogado, getUser, validaToken, getValidar, informacaoUserLogado, UpdateUser } from "./requests.js"


function clickuser(){
    const getModal = document.querySelector(".Modal")
    const getlapis = document.querySelector(".lapis")
    const getspan = document.querySelector(".fecha_Modal")

getlapis.addEventListener('click',()=>{
    getModal.showModal()
})

getspan.addEventListener('click', ()=>{
    getModal.close()
})
}



function logout(){
    const getButtonLogout = document.querySelector('.botao_login')

    getButtonLogout.addEventListener('click', () => {
        localStorage.clear()
        window.location.replace("../../index.html")
    })
}
logout()

export async function protecaouser(){
   const valida = getValidar()
   if(!valida){
    window.location.replace('../../index.html')
 } 
   else if(valida.is_admin){
        window.location.replace('./admin.html')
    }
    
}

protecaouser()

function renderCardUser(data){
    var getDialog = document.querySelector('.Informacoes')
    
    

    if(!data.kind_of_work || !data.professional_level){
        getDialog.insertAdjacentHTML('beforeend', `
        <h2 class="Username">${data.username}</h2>
        <span class="Email">Email: ${data.email}</span>
        <span class="Nivel_Profissional">${data.professional_level}</span>

        <img class="lapis" src="../assets/lapis.svg" alt="">
    `)
    
    }else{
        getDialog.insertAdjacentHTML('beforeend', `
        <h2 class="Username">${data.username}</h2>
        <span class="Email">Email: ${data.email}</span>
        <span class="Nivel_Profissional">${data.professional_level}</span>
        <span class="kind_of_work">${data.kind_of_work}</span>
        <img class="lapis" src="../assets/lapis.svg" alt="">
    `
    )
    
}
    
    
      
    clickuser()
}
renderCardUser(await informacaoUserLogado(getUser().token))

function UpdateUserForm(){
    const inputs = document.querySelectorAll('.Modal > input')
    const button = document.querySelector('.Editar')
    
    const newUser = {}
    const user = getUser()

    button.addEventListener('click', async (event) => {
        event.preventDefault()
        
        inputs.forEach(input => {
            newUser[input.name] = input.value
        })
       const request = await UpdateUser(newUser, user.token)
       
       localStorage.setItem('@kenzieMarket:cadastro', JSON.stringify(request))
    })
    
    return newUser
 }

 UpdateUserForm()

async function renderInforColegasTrabalho(){
    let database = await informacaoDepartamentoUserLogado(getUser().token)


    if(database.error){
        document.querySelector('.sem_trabalho').classList.remove('esconde')
        
    }
    else if(!database.error){
        document.querySelector('.sem_trabalho').classList.add('esconde')
        

        let informacao = await colegasTrabalho(getUser().token)
        let listaColegas = informacao[0].users
    
        const getComtrabalho = document.querySelector('.com_trabalho')
        const getUl = document.querySelector('.Lista_cards')
    
        getComtrabalho.insertAdjacentHTML('afterbegin', `
        <button>${database.name} - ${database.departments[0].name}</button>
        `)
        
        listaColegas.forEach(card => {
    
            getUl.insertAdjacentHTML('afterbegin', `
            <li class="card">
                <p class="Título_card">${card.username}</p>
                <span class="Nivel_Profissional">${card.professional_level}</span>
            </li>
        `)
    
        })
        getComtrabalho.classList.remove('esconde')
    }


}

renderInforColegasTrabalho()
