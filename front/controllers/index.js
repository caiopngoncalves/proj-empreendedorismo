document.addEventListener('DOMContentLoaded', function () {
    // Obter o container do DOM
    const container = document.querySelector('#bookContainer');

    // Fazer uma solicitação à API para obter a lista de livros
    fetch('http://localhost:3000/books') // Substitua pela sua URL da API
        .then(response => response.json())
        .then(data => {
            // Iterar sobre a lista de livros e criar os cards
            data.books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                <div class="card-body" style="margin-bottom: 20px; border: 1px solid #9fe870; display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h3 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 color: #320707">$${book.price}</h6>
                        <p class="card-text">Autor: ${book.author}, ${book.publication_year}</p>
                        <p class="card-text">${book.synopsis}</p>
                        <div style="width: 100%; justify-content: flex-end;">
                            <a href="#" class="btn btn-info addToCartBtn" style="width: 200px; align-self: flex-end;">Adicionar no carrinho</a>
                        </div>
                    </div>
                    <img src="${book.photo}" class="card-img-top" alt="Imagem do Livro" style="max-width: 150px; margin-left: 20px;">
                </div>
            `;
            
                // Adicionar margem ao card
                card.style.marginBottom = '20px';

                // Adicionar o card ao container
                container.appendChild(card);
            });

            // Adicionar evento de clique aos botões "Adicionar no carrinho"
            const addToCartButtons = document.querySelectorAll('.addToCartBtn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function () {
                    window.alert(`Livro adicionado ao carrinho!`);
                });
            });
        })
        .catch(error => console.error('Erro ao obter livros:', error));
});

// Estilizar o container
const container = document.querySelector('#bookContainer');
container.style.backgroundColor = '#9fe870';
container.style.padding = '20px';
