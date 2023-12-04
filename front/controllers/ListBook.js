document.addEventListener('DOMContentLoaded', function () {
    // Obter a tabela do DOM
    const table = document.querySelector('.table tbody');
  
    // Fazer uma solicitação à API para obter a lista de livros
    fetch('http://localhost:3000/books') // Substitua pela sua URL da API
      .then(response => response.json())
      .then(data => {
        // Iterar sobre a lista de livros e criar as linhas da tabela
        data.books.forEach(book => {
          const row = document.createElement('tr');
  
          // Adicionar atributo data-id com o valor do id do livro
          row.setAttribute('data-id', book.id);
  
          // Adicionar colunas com os dados do livro
          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publication_year}</td>
            <td>${book.price}</td>
            <td>${book.synopsis}</td>
            <td>
              <button onclick="editBook(${book.id})">Editar</button>
              <button onclick="deleteBook(${book.id})">Excluir</button>
            </td>
          `;
  
          // Adicionar a linha à tabela
          table.appendChild(row);
        });
      })
      .catch(error => console.error('Erro ao obter livros:', error));
  });
  
  // Função para excluir um livro
  function deleteBook(bookId) {
    // Confirmar a exclusão com o usuário
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      // Fazer uma solicitação DELETE à API
      fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE',
      })
        .then(response => {
          // Verificar se a exclusão foi bem-sucedida
          if (response.ok) {
            // Remover visualmente a linha da tabela
            const rowToDelete = document.querySelector(`tr[data-id="${bookId}"]`);
            if (rowToDelete) {
              rowToDelete.remove();
            } else {
              console.error('Linha não encontrada para exclusão');
            }
          } else {
            console.error('Falha ao excluir livro');
          }
        })
        .catch(error => console.error('Erro ao excluir livro:', error));
    }
  }
  