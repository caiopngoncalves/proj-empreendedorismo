function registerBook() {
    // Getting form values
    const title = document.getElementById("title-form02-e").value;
    const author = document.getElementById("author-form02-e").value;
    const publication_year = document.getElementById("publication_year-form02-e").value;
    const price = document.getElementById("price-form02-e").value;
    const synopsis = document.getElementById("synopsis-form02-e").value;

    // Creating an object with book data
    const book = {
        title: title,
        author: author,
        publication_year: publication_year,
        price: price,
        synopsis: synopsis
    };

    // Sending data to the server using the fetch API
    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
    .then(response => response.json())
    .then(data => {
        // Here you can add additional logic, such as redirecting the user or displaying a success message
        window.alert('Cadastro de livro realizado com sucesso!');
        console.log('Success:', data);
    })
    .catch((error) => {
        // Error handling, such as displaying an error message to the user
        window.alert('Erro ao cadastrar livro. Por favor, tente novamente.');
        console.error('Error:', error);
    });
}
