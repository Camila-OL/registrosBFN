//arrastar cartões
const carousel = document.getElementById('carousel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', () => {
    carousel.scrollBy({
        left: -350,
        behavior: 'smooth'
    });
});

nextButton.addEventListener('click', () => {
    carousel.scrollBy({
        left: 350,
        behavior: 'smooth'
    });
});

//requisição api
async function exibir() {
    try {
        const response = await fetch('https://apiregistro.onrender.com')
        if (!response.ok) {
            throw new Error('erro na requisição')
        }
        const data = await response.json();
        console.log('Resposta da API:', data);

        const existingCards = document.querySelectorAll('.card'); // Seleciona os cartões já existentes
        const totalCards = existingCards.length;
        
        // Distribui o conteúdo nos cartões existentes
        for (let i = 0; i < data.length; i++) {
            if (i < totalCards) {
                // Preenche os cartões existentes
                existingCards[i].innerHTML = `<img src="images/Google_Contacts_logo.png"> <strong style="text-align: center;" class="nome">${data[i].nome}</strong> <br> <p class="perfil">${data[i].perfil}</p> <br> <p class="descricao">${data[i].descricao}</p> <br> <p class="punicao">${data[i].punicao}</p>`;
                
            } else {
                // Se não houver cartões suficientes, cria novos
                let newCard = document.createElement('div');
                newCard.classList.add('card');
                newCard.innerHTML = `<img src="images/Google_Contacts_logo.png"> <strong class="nome">${data[i].nome}</strong <br> <p class="perfil">${data[i].perfil}</p> <br> <p class="descricao">${data[i].descricao}</p> <br> <p class="punicao">${data[i].punicao}</p>`;
                carousel.appendChild(newCard);
            }
        }
    } catch(error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    areaAdm();
    exibir();
});

function areaAdm() {
    const modal = document.getElementById('myModal');
    const openModalButton = document.querySelector('.right');
    const submitButton = document.getElementById('submitAnswers');

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex'; // Mostra o modal como flex
    });

    submitButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Fecha o modal
    });
}

function registrar() {
    const senha = prompt('senha:');
    
    if (senha === '160ya23') {
        const modal = document.getElementById('myModal1');
        modal.style.display = 'flex'; // Abre o modal principal

        const closeMainModal = document.getElementById('closeMainModal');
        if (closeMainModal) {
            closeMainModal.addEventListener('click', () => {
                modal.style.display = 'none'; // Fecha o modal principal
            });
        }

        const registrarButton = document.getElementById('registrarButton');
        const modal1 = document.getElementById('myModal1');
        const closeRegisterModal = document.getElementById('closeRegisterModal');

        // Verifique se os botões existem
        if (registrarButton) {
            registrarButton.addEventListener('click', () => {
                modal.style.display = 'none'; // Fecha o modal principal
                modal1.style.display = 'flex'; // Abre o modal de registro
            });
        } else {
            console.error('registrarButton não encontrado');
        }

        if (closeRegisterModal) {
            closeRegisterModal.addEventListener('click', () => {
                modal1.style.display = 'none'; // Fecha o modal de registro
            });
        }

        // Pegue os campos do formulário
        const form = document.getElementById('registroForm');
        const nomeInput = document.getElementById('nome');
        const perfilInput = document.getElementById('perfil');
        const descricaoInput = document.getElementById('descricao');
        const punicaoInput = document.getElementById('punicao');

        // Verifique se o formulário existe
        if (form) {
            form.addEventListener('submit', async function(event) {
                event.preventDefault(); // Evita o comportamento padrão do formulário

                // Pegue os valores dos campos
                const novoObjeto = {
                    nome: nomeInput.value,
                    perfil: perfilInput.value,
                    descricao: descricaoInput.value,
                    punicao: punicaoInput.value
                };

                console.log(novoObjeto);

                // Chame a função de adicionar
                await add(novoObjeto);
            });
        } else {
            console.error('Formulário de registro não encontrado');
        }

        // Função para enviar o objeto para a API
        async function add(novoObjeto) {
            const apiUrl = 'https://apiregistro.onrender.com';

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoObjeto)
                });

                if (!response.ok) {
                    throw new Error(`Erro ao adicionar registro: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Registro adicionado com sucesso!', data);
                alert('Registro adicionado com sucesso!');
            } catch (error) {
                console.error('Erro ao adicionar registro:', error);
                alert('Erro ao adicionar o registro.');
            }
        }
    } else {
        alert('Senha incorreta!');
    }
}



//analisar punição de membro
function painel() {
    const senha = prompt('senha:');

    if (senha === '160ya23') {
        const modal = document.getElementById('myModal2');
        const closeModalButton = document.getElementById('closeModalButton2');

        modal.style.display = 'flex'; // Abre o modal principal

        // Fechar modal
        closeModalButton.addEventListener('click', (event) => {
            event.preventDefault(); // Evita o comportamento padrão
            modal.style.display = 'none'; // Esconde o modal
        });

        // Capturar e processar as opções selecionadas
        document.getElementById('analyzeButton').addEventListener('click', () => {
            const selectedOption = document.querySelector('#analysisForm input[name="opcao"]:checked');

            if (!selectedOption) {
                alert('Nenhuma opção selecionada!'); // Alerta se nenhuma opção foi selecionada
                return;
            }

            switch (selectedOption.value) {
                case 'ofensa':
                    document.querySelector('.pun').innerHTML = 'Recomendação: SUSPENSÃO DE 7 DIAS';
                    break;
                case 'bullying':
                    document.querySelector('.pun').innerHTML = 'Recomendação: SUSPENSÃO DE 1 DIA';
                    break;
                case 'politica':
                    document.querySelector('.pun').innerHTML = 'Recomendação: BANIMENTO';
                    break;
                case 'anuncio':
                    document.querySelector('.pun').innerHTML = 'Recomendação: BANIMENTO';
                    break;
                case 'racismo':
                    document.querySelector('.pun').innerHTML = 'Recomendação: SUSPENSÃO DE 28 DIAS';
                    break;
                case 'comentario':
                    document.querySelector('.pun').innerHTML = 'Recomendação: SUSPENSÃO DE 1 DIA';
                    break;
                case 'revide':
                    document.querySelector('.pun').innerHTML = 'Recomendação: REMOÇÃO DO COMENTÁRIO';
                    break;
                default:
                    alert('Nenhuma punição aplicada.');
            }

            
        });

    } else {
        alert('senha incorreta!');
    }
}
