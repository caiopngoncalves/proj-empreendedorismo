document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const userData = {};

      formData.forEach((value, key) => {
          userData[key] = value;
      });

      // Chame a sua API aqui usando fetch
      fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Sucesso:', data);

          // Exibir mensagem de sucesso usando confirm nativo
          const userConfirmed = window.confirm('Cadastro realizado com sucesso! Clique em OK para continuar.');

          if (userConfirmed) {
              // Aqui você pode adicionar lógica adicional, como redirecionar para outra página
              // ou exibir uma mensagem de sucesso adicional.
          }
      })
      .catch(error => {
          console.error('Erro:', error);

          // Exibir mensagem de erro usando confirm nativo
          const userConfirmed = window.confirm('Erro ao cadastrar usuário. Tente novamente. Clique em OK para continuar.');

          if (userConfirmed) {
              // Aqui você pode adicionar lógica adicional, como tentar o cadastro novamente.
          }
      });
  });
});