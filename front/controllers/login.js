document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorContainer = document.getElementById('error-message');

    if (loginForm && errorContainer) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Obter valores dos campos de entrada
            const email = document.getElementById('email-form02-j').value;
            const cpf = document.getElementById('cpf-form02-j').value;

            // Fazer uma solicitação POST à rota de login
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, cpf }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirecionar para index.html em caso de sucesso
                    window.location.href = 'index.html';
                } else {
                    // Exibir mensagem de erro em caso de falha
                    errorContainer.textContent = data.message;
                }
            })
            .catch(error => console.error('Erro ao fazer login:', error));
        });
    } else {
        console.error('Elementos não encontrados.');
    }
});
