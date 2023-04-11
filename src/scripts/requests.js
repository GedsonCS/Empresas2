import { toast } from "./toast.js"


export async function GetTodasEmpresas (){
 let response
    try {
        const empresas = await fetch(`http://localhost:6278/companies`)
        response = await empresas.json()
        
    } catch (error) {
        console.log(error)
    }
      return response
}

export async function GetTodasEmpresasSetor (Setor){
    let response
       try {
           const empresas = await fetch(`http://localhost:6278/companies/${Setor}`)
           response = await empresas.json()
           
       } catch (error) {
           console.log(error)
       }
         return response
}

export function getUser(){
    const user = JSON.parse(localStorage.getItem('@kenzieMarket:user'))

    return user
}

export function getValidar(){
    const user = JSON.parse(localStorage.getItem('@kenzieMarket:validar'))

    return user
}

export async function login(data){
    const loginData = await fetch(`http://localhost:6278/auth/login`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao realizar login`)
        localStorage.clear()
        window.location.replace("./login.html")
        
    }
    else{
        alert(`Login realizado com sucesso`)
        
    }
    return loginDataJson
}

export async function validaToken(Token){
    let response
 

    try {
        const getToken = await fetch(`http://localhost:6278/auth/validate_user`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}

export async function createUser(data){
    const loginData = await fetch(`http://localhost:6278/auth/register`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao realizar cadastro`)
        window.location.replace("./cadastro.html")
        
    }
    else{
        alert(`Cadastro realizado com sucesso`)
        window.location.replace("./login.html")
    }
    return loginDataJson
}

export async function informacaoUserLogado(Token){
    let response
 

    try {
        const getToken = await fetch(`http://localhost:6278/users/profile`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}

export async function UpdateUser(data, token){
    const loginData = await fetch(`http://localhost:6278/users`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao Atualizar cadastro`)
        
    }
    else{
        alert(`Cadastro atualizado com sucesso`)
        window.location.replace('http://127.0.0.1:5500/src/pages/user.html')
    }
    return loginDataJson
}

export async function TodosDepartamentos(Token){
    let response
 
    try {
        const getToken = await fetch(`http://localhost:6278/departments`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}

export async function EmpresaSelecionada(data, token){

    let response
       try {
        const departamentosEmpresa = await fetch(`http://localhost:6278/departments/${data}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            //body: JSON.stringify(data)
        })
        
        response = departamentosEmpresa.json()

       } catch (error) {
           console.log(error)
       }
    
       return response

}

export async function createDepartament(data, token){
    const loginData = await fetch(`http://localhost:6278/departments`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao realizar cadastro`)
        
        
    }
    else{
        alert(`Departamento Cadastrado com sucesso`)
        
    }
    return loginDataJson
}

export async function TodosFuncionarios(Token){
    let response
 
    try {
        const getToken = await fetch(`http://localhost:6278/users`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}

export async function updateDepartament(data, rota, token){
    const loginData = await fetch(`http://localhost:6278/departments/${rota}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao Atualizar departamento`)
        
        
    }
    else{
        alert(`Departamento Atualizado com sucesso`)
        
    }
    return loginDataJson
}

export async function DeleteDepartament(rota, token){
    const loginData = await fetch(`http://localhost:6278/departments/${rota}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        
    })

   

    if(!loginData.ok){
        alert(`Erro ao Deletar departamento`)
        
        
    }
    else{
        alert(`Departamento Deletado com sucesso`)
        
    }
    return 
}

export async function updateUser(data, rota, token){
    const loginData = await fetch(`http://localhost:6278/admin/update_user/${rota}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao Atualizar Usuário`)
        
        
    }
    else{
        alert(`Usuário Atualizado com sucesso`)
        
    }
    return loginDataJson
}

export async function DeleteUser(rota, token){
    const loginData = await fetch(`http://localhost:6278/admin/delete_user/${rota}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        
    })

   

    if(!loginData.ok){
        alert(`Erro ao Deletar Usuário`)
        
        
    }
    else{
        alert(`Usuário Deletado com sucesso`)
        
    }
    return 
}

export async function TodosFuncionariosSemDepartamento(Token){
    let response
 
    try {
        const getToken = await fetch(`http://localhost:6278/admin/out_of_work`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}

export async function contratarFuncionario(data, token){
    const loginData = await fetch(`http://localhost:6278/departments/hire/`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        alert(`Erro ao Contratar`)
        
        
    }
    else{
        alert(`Funcionário contratado com sucesso`)
        
    }
    return loginDataJson
}

export async function DemiteUser(rota, token){
    const loginData = await fetch(`http://localhost:6278/departments/dismiss/${rota}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        
    })

   

    if(!loginData.ok){
        alert(`Erro ao Demitir funcionário`)
        
        
    }
    else{
        toast("Funcionário Demitido com Sucesso", '#4BA036')
        
    }
    return 
}

export async function informacaoDepartamentoUserLogado(Token){
    let response
 

    try {
        const getToken = await fetch(`http://localhost:6278/users/departments`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}

export async function colegasTrabalho(Token){
    let response
 

    try {
        const getToken = await fetch(`http://localhost:6278/users/departments/coworkers`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Token}`,
                'Content-Type' : 'application/json'
            }
        } )
        response = await getToken.json()
    } catch (error) {
        console.log(error)
    }

    return response
}