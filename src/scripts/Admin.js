import { DemiteUser, contratarFuncionario, TodosFuncionariosSemDepartamento, validaToken, getValidar, getUser, TodosDepartamentos, GetTodasEmpresas, EmpresaSelecionada, createDepartament, TodosFuncionarios, updateDepartament, DeleteDepartament, updateUser, DeleteUser} from "./requests.js"


function criarDepartamento(){
    const getCriar = document.querySelector('.criar')
    const getModal2 = document.querySelector('.Modal_Criar_DP')
    const fechaModal2 = document.querySelector('.Fecha_Modal_criar')

    getCriar.addEventListener('click', async () => {
        getModal2.showModal()
        renderselectEmpresasModal(await GetTodasEmpresas())
    })

    fechaModal2.addEventListener('click',() =>{
        getModal2.close()
    })

}


function logout(){
    const getButtonLogout = document.querySelector('.botao_login')

    getButtonLogout.addEventListener('click', () => {
        localStorage.clear()
        window.location.replace("../../index.html")
    })
}

criarDepartamento()


logout()

export async function protecaoAdmin(){
    const valida = getValidar()
    if(!valida){
        window.location.replace('../../index.html')
     } 
    else if(!valida.is_admin){
         window.location.replace('./user.html')
         
     }
   
 }
 
protecaoAdmin()

function abrirModalSalvarAlteracoes(){
    const getCriar = document.querySelectorAll('.lapis')
    
    const getModal3 = document.querySelector('.Modal_Editar_DP')
    const fechaModal3 = document.querySelector('.fecha_Editar_DP')
    
    
    let uuid = ''
    let newUser = {}
    
    getCriar.forEach(button => {
    button.addEventListener('click', () => {
       uuid = ''
        getModal3.showModal()
        let getinput = document.querySelector('.Descricao_Modal_Editar_DP')
        var Id = button.getAttribute("id");

        getinput.value = Id
        
        const getsubmit = document.querySelector('.Salvar_Alteracoes')
        getsubmit.addEventListener('click', async () =>{
            
            var dataId = button.getAttribute("data-id");
            
            uuid = dataId
            
            const inputs = document.querySelectorAll('.Descricao_Modal_Editar_DP')
            
            inputs.forEach(input => {
                newUser[input.name] = input.value
            })
            

            await updateDepartament (newUser, uuid, getUser().token)

            window.location.replace('./admin.html')
            
        })
       
    })
   
    })

    fechaModal3.addEventListener('click',() =>{
        getModal3.close()
    })
    
}

function ModalExcluirDP(){
    const getCriar = document.querySelectorAll('.lixeira')
    
    const getModal3 = document.querySelector('.Excluir_DP')
    const fechaModal3 = document.querySelector('.fecha_modal_Excluir')
    
    let uuid = ''
    
    getCriar.forEach(button => {
    button.addEventListener('click', () => {
       uuid = ''
        getModal3.showModal()
        const getsubmit = document.querySelector('.Confirmar')
        getsubmit.addEventListener('click', async () =>{
            
            var dataId = button.getAttribute("data-id");
            uuid = dataId
            
            
            await DeleteDepartament(uuid, getUser().token)
            window.location.replace('./admin.html')
            
        })
       
    })
   
    })

    fechaModal3.addEventListener('click',() =>{
        getModal3.close()
    })
}

function abrirModalVerDepartamento(){
    
    const getOlho = document.querySelectorAll('.olho')
    const getModal1 = document.querySelector('.Modal')
    const getp = document.querySelector('.fecha_modal_olho')

    const getContratar = document.querySelector('.Botao_contratar')

        
    getOlho.forEach(button => {
        button.addEventListener('click',async (e) =>{
        
            let uuidDepartament = button.getAttribute("data-id");
            getp.setAttribute('id',`${uuidDepartament}`)
            
            let nomeEmpresa = button.getAttribute("id");
            let descripitionDepartament = button.getAttribute("name");
            let nameDepartament = button.getAttribute("title");

            renderDialogDepartament(nameDepartament, descripitionDepartament, nomeEmpresa)
            
            renderselectFuncionariosSemDP(await TodosFuncionariosSemDepartamento(getUser().token))
            
            const getselect = document.querySelector('.Select_modal')
            let value = ''
            getModal1.showModal()
            renderizaFuncionariosmesmoDP()
            
            getselect.addEventListener('change', async () =>{
                
                value = getselect.value
                
                
                    getContratar.addEventListener('click',async () => {
                        let uuidDepartament = button.getAttribute("data-id");
                        let body = {user_uuid: '', department_uuid: ''}
                        
                        body.user_uuid = value
                        body.department_uuid = uuidDepartament
                        
                            await contratarFuncionario(body, getUser().token)

                            window.location.replace('./admin.html')
                    })

                })
              

        } )
    })

    getp.addEventListener('click',() =>{
        getModal1.close()
        window.location.replace('./admin.html')
    })

}

async function renderizaFuncionariosmesmoDP(){
    const getUl = document.querySelector('.Lista_Contratados')
    const getmodal = document.querySelector('.fecha_modal_olho')
    getUl.innerHTML = ''
    let dataBase = await TodosFuncionarios(getUser().token)
    let uuidModal = getmodal.getAttribute('id')

    
    dataBase.forEach(funcionario => {
       if(funcionario.department_uuid == uuidModal){
        getUl.insertAdjacentHTML('beforeend', `
        <li id="${funcionario.uuid}" class="contratados">
            <h4>${funcionario.username}</h4>
            <p>${funcionario.professional_level}</p>
            <p>${funcionario.kind_of_work}</p>
            <button name="${funcionario.uuid}">Desligar</button>
        </li>
    `)

       }
    
    });
    
    DemitirFuncionarioDepartamento()
}

function DemitirFuncionarioDepartamento(){
    const getButton = document.querySelectorAll('.contratados > button')
    
    
    getButton.forEach(button => {
        button.addEventListener('click',async () => {
            let rota = button.getAttribute('name')
            await DemiteUser(rota, getUser().token)

            window.location.replace('./admin.html')
        })
    })
    
}

function   renderDialogDepartament(nomeDepartamento, descricaoDepartamento, nomeEmpresa){
    const getTituloModal = document.querySelector('.rendertitulo')
    const getDescricaoDepartamento = document.querySelector('.Descricao_Departamento')

    getTituloModal.innerHTML = ''
    getDescricaoDepartamento.innerHTML = ''

    
    getTituloModal.insertAdjacentHTML('beforeend', `
    <h2 class="Titulo_modal_olho">${nomeDepartamento}</h2>
    `)
    getDescricaoDepartamento.insertAdjacentHTML('beforeend', `
    <h4 class="Descricao">${descricaoDepartamento}</h4>
    <p class="Empresa_Pertencente">${nomeEmpresa}</p>
    `)

}

async function renderselectFuncionariosSemDP(funcionarios){
    var getUL = document.querySelector('.Select_modal')
   // getUL.innerHTML = ''

    funcionarios.forEach(funcionario => {
        getUL.insertAdjacentHTML('beforeend', `
        <option name="${funcionario.username}" class="geral" value="${funcionario.uuid}">${funcionario.username}</option>

    `)

    
    });


}

function renderTodosDepartamentos(Departamentos){
    var getUL = document.querySelector('.cards_departamentos')

    Departamentos.forEach(Departamento => {
        
        getUL.insertAdjacentHTML('beforeend', `
        <li class="card">
                <h3 class="Empresa">${Departamento.name}</h3>
                <p class="Empresa">${Departamento.description}</p>
                <p class="Empresa">${Departamento.companies.name}</p>
                <div class="Icones">
                    <img data-id="${Departamento.uuid}" name="${Departamento.description}"id="${Departamento.companies.name}"title="${Departamento.name}" class="olho" src="../assets/olho.svg" alt="">
                    <img data-id="${Departamento.uuid}" id="${Departamento.description}" class="lapis" src="../assets/lapis preto.svg" alt="">
                    <img data-id="${Departamento.uuid}" class="lixeira" src="../assets/lixeira.svg" alt="">
                </div>
        </li>
    `)
    
    });

   
    abrirModalSalvarAlteracoes()
    ModalExcluirDP()
    abrirModalVerDepartamento()  
    
      
}
renderTodosDepartamentos(await TodosDepartamentos(getUser().token))


async function renderselectEmpresas(data){
    var getUL = document.querySelector('.Escolher_empresa')
    

    data.forEach(empresa => {
        getUL.insertAdjacentHTML('beforeend', `
        <option name="${empresa.name}" class="geral" value="${empresa.uuid}">${empresa.name}</option>

    `)

    
    });


}

renderselectEmpresas(await GetTodasEmpresas())

function atualizaSelect(){
    let getselect = document.querySelector('.Escolher_empresa')
    var getUL = document.querySelector(".cards_departamentos")
    const token = getUser().token
    var value = ''

    getselect.addEventListener('change', async () =>{
    getUL.innerHTML = ''
    value = getselect.value
    var arrayrender = await EmpresaSelecionada(value, token)
    
    renderTodosDepartamentos(arrayrender)
    })
    
    
    return value
}

atualizaSelect()

function createDepartamentForm(){
    const inputs = document.querySelectorAll('.Modal_Criar_DP > div > input')
    const button = document.querySelector('.Botao_Submeter')
    const getselect = document.querySelector('.Modal_Criar_DP > div > select')
    
    let value = ''
    const newUser = {name: '', description: '', company_uuid: `${value}`}

    getselect.addEventListener('change', async () =>{

        value = getselect.options[getselect.selectedIndex].value;
        
        
        newUser.company_uuid = value
        
    })

    button.addEventListener('click', async (event) => {
        
        inputs.forEach(input => {
            newUser[input.name] = input.value
             getselect.addEventListener('change', async () =>{
        
        })
        })

        const request = await createDepartament(newUser, getUser().token)
        window.location.replace('./admin.html')
            
    })

    return newUser
 }

createDepartamentForm()

 async function renderselectEmpresasModal(data){
    
    var getSelectModal = document.querySelector('.Modal_Criar_DP > div > select')

    data.forEach(empresa => {
        getSelectModal.insertAdjacentHTML('beforeend', `
        <option name="${empresa.name}" class="geral" value="${empresa.uuid}">${empresa.name}</option>

    `)

    });

}

async function renderFuncionarios(data){
    var getUL = document.querySelector('.Lista_Usuarios')
    

    data.forEach(funcionario => {
       if(!funcionario.is_admin){
        getUL.insertAdjacentHTML('beforeend', `
        <li class="Card_usuarios">
        <h4>${funcionario.username}</h4>
        <p>${funcionario.professional_level}</p>
        <p></p>
        <div>
            <img data-id="${funcionario.uuid}" class="Lapis_Roxo" src="../assets/lapis.svg" alt="">
            <img data-id="${funcionario.uuid}" class="Lixeira2" src="../assets/lixeira.svg" alt="">
        </div>
    </li>

    `)
       }

    
    });
    
    ModalRemoverUsuario()
    abrirModalAlteracoesUsuario()
}

renderFuncionarios(await TodosFuncionarios(getUser().token))
await TodosFuncionarios(getUser().token)


function abrirModalAlteracoesUsuario(){
    const getCriar = document.querySelectorAll('.Lapis_Roxo')
    
    const getModal3 = document.querySelector('.Modal_Editar_Usuario')
    const fechaModal3 = document.querySelector('.Fecha_modal_Editar_usuário')
    
    
    let uuid = ''
    let newUser = {}
    
    getCriar.forEach(button => {
    button.addEventListener('click', () => {
       uuid = ''
        getModal3.showModal()
        
        const getsubmit = document.querySelector('.Editar_Usuario')
        getsubmit.addEventListener('click', async () =>{
            
            var dataId = button.getAttribute("data-id");
            
            uuid = dataId
            
            const inputs = document.querySelectorAll('.Modal_Editar_Usuario > div > input')
            inputs.forEach(input => {
                newUser[input.name] = input.value
            })
            
            await updateUser (newUser, uuid, getUser().token)

            window.location.replace('./admin.html')
            
        })
       
    })
   
    })

    fechaModal3.addEventListener('click',() =>{
        getModal3.close()
    })
    
}
function ModalRemoverUsuario(){
    const getCriar = document.querySelectorAll('.Lixeira2')
    
    const getModal3 = document.querySelector('.modal_Remover_Usuario')
    const fechaModal3 = document.querySelector('.Fechar_Modal_Remover_Usuario')
    
    let uuid = ''
    
    getCriar.forEach(button => {
    button.addEventListener('click', () => {
       uuid = ''
        getModal3.showModal()
        const getsubmit = document.querySelector('.Deletar_usuario')
        getsubmit.addEventListener('click', async () =>{
            
            var dataId = button.getAttribute("data-id");
            uuid = dataId
            
            
            await DeleteUser(uuid, getUser().token)
            window.location.replace('./admin.html')
            
        })
       
    })
   
    })

    fechaModal3.addEventListener('click',() =>{
        getModal3.close()
    })
}
