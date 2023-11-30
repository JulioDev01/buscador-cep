const msgErro = document.querySelector('#msgErro');
const cepbusca = document.querySelector('#cep');
const numero = document.querySelector('#numero');
const localidade = document.querySelector('#localidade');
const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const uf = document.querySelector('#uf');
const buscarEndereço = document.querySelector('#buscarEnd');
const limpCampos = document.querySelector('#limparCamp');
const salvarDados = document.querySelector('#salvarDad');
let endereço;


buscarEndereço.addEventListener('click', (e) => {
    e.preventDefault();
    try{
        validaCEP();
    }catch(erro){
       msgErro.innerHTML = erro.message;
    }
})

limpCampos.addEventListener('click', () => {
    limparCampos();
})

salvarDados.addEventListener('click', () => {
    alert("Dados salvos com sucesso!!!");
    limparCampos();
})


function preencheCampos(endereço){
    for(const campo in endereço){
        if (document.querySelector('#' + campo)){
            document.querySelector('#' + campo).value = endereço[campo];
        }

    }
}


function buscaEndereço(){
    fetch(`http://viacep.com.br/ws/${cepbusca.value}/json`)
        .then((resposta)=>{
            return resposta.json();
        }) 
        .then((endereço)=>{
            preencheCampos(endereço);
        })
        .catch((erro)=>{
            console.log(erro)
        })
        
}



function validaCEP(){
    const regex = /^[0-9]{8}$/;
    if (regex.test(cepbusca.value)){
        buscaEndereço();
    } else {
        throw new Error('Cep inválido');
    }
};

function limparCampos(){
    cepbusca.value = '';
    localidade.value = '';
    numero.value = '';
    bairro.value = '';
    uf.value = '';
    logradouro.value = '';
}

