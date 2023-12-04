document.addEventListener('DOMContentLoaded', function () {
  // Obter a tabela do DOM
  const table = document.querySelector('.table tbody');

  // Fazer uma solicitação à API para obter a lista de usuários
  fetch('http://localhost:3000/users') // Substitua pela sua URL da API
    .then(response => response.json())
    .then(data => {
      // Iterar sobre a lista de usuários e criar as linhas da tabela
      data.users.forEach(user => {
        const row = document.createElement('tr');

        // Adicionar atributo data-id com o valor do id do usuário
        row.setAttribute('data-id', user.id);

        // Adicionar colunas com os dados do usuário
        row.innerHTML = `
          <td >${user.name}</td>
          <td>${user.cpf}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>
            <button onclick="editUser(${user.id})">Editar</button>
            <button onclick="deleteUser(${user.id})">Excluir</button>
          </td>
        `;

        // Adicionar a linha à tabela
        table.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao obter usuários:', error));
});

// Função para excluir um usuário
function deleteUser(userId) {
  // Confirmar a exclusão com o usuário
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    // Fazer uma solicitação DELETE à API
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        // Verificar se a exclusão foi bem-sucedida
        if (response.ok) {
          // Remover visualmente a linha da tabela
          const rowToDelete = document.querySelector(`tr[data-id="${userId}"]`);
          if (rowToDelete) {
            rowToDelete.remove();
          } else {
            console.error('Linha não encontrada para exclusão');
          }
        } else {
          console.error('Falha ao excluir usuário');
        }
      })
      .catch(error => console.error('Erro ao excluir usuário:', error));
  }
}