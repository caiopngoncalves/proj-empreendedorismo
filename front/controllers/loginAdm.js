document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const emailInput = document.getElementById('email-form02-j');
      const cpfInput = document.getElementById('cpf-form02-j');
  
      const formData = {
        email: emailInput.value,
        cpf: cpfInput.value
      };
  
      // Fazer a requisição POST para a rota de login
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Login bem-sucedido, redirecionar para user.html
          window.location.href = 'user.html';
        } else {
          // Exibir mensagem de erro
          errorMessage.textContent = 'Credenciais inválidas. Tente novamente.';
        }
      })
      .catch(error => {
        console.error('Erro durante o login:', error);
        errorMessage.textContent = 'Erro durante o login. Tente novamente.';
      });
    });
  });