$(document).ready(() => {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    loadAllBooks()
    $('#searchBookButton').click(() => loadBook($('#searchBookInput').val()))
    $('#addBookButton').click(() => insertBook($('#bookName').val(), $('#author').val(), $('#type').val()))
})

const insertBook = (nomeLivro, nomeAutor, categoria) => {
    if (!nomeLivro || !nomeLivro || !categoria) {
        return false;
    }

    $.ajax({
        url: './ajax/inserir-livro.php',
        dataType: 'json',
        data: {
            nomeLivro,
            nomeAutor,
            categoria
        },
        success: result => {
            switch (result.status) {
                case 0:
                    loadAllBooks()
                    break;
                case 2:
                    alert("deu errado pra caralho")
                    break;
            }
        }
    })
}

const deleteBook = livro_id => {
    if (!livro_id) {
        return false;
    }

    $.ajax({
        url: './ajax/deletar-livro.php',
        dataType: 'json',
        data: {
            livro_id
        },
        success: result => {
            switch (result.status) {
                case 0:
                    loadAllBooks()
                    break;
                case 2:
                    alert("deu errado pra caralho")
                    break;
            }
        }
    })
}

const updateBook = idLivro => {
    if (!idLivro) {
        return false;
    }

    $.ajax({
        url: './ajax/editar-livro.php',
        dataType: 'json',
        data: {
            idLivro,
            nomeLivro: $('#bookName').val(),
            nomeAutor: $('#author').val(),
            categoria: $('#type').val()
        },
        success: result => {
            switch (result.status) {
                case 0:
                   
                    break;
                case 2:
                    break;
            }
        }
    })
}

const loadBook = livro_id => {
    $.ajax({
        url: './ajax/carregar-livro.php',
        dataType: 'json',
        data: {
            livro_id
        },
        success: result => {
            switch (result.status) {
                case 0:
                    $('#bookName').val(`${result.data.nome}`)
                    $('#author').val(`${result.data.autor}`)
                    $('#type').val(`${result.data.categoria}`)
                    break;
                case 2:
                    break;
            }
        }
    })
}

const loadAllBooks = () => {
    $.ajax({
        url: './ajax/carregar-todos-livros.php',
        dataType: 'json',
        success: result => {
            $('#tableBooks tbody').html('')
            switch (result.status) {
                case 0:
                    for (const livro of result.data) {
                        const tds = [
                            `<td>${livro.nome}</td>`,
                            `<td>${livro.autor}</td>`,
                            `<td>${livro.categoria}</td>`,
                            `<td><button class="btn btn-success" id="edit" onclick="loadBook(${livro.livro_id})">Editar</button></td>`,
                            `<td><button class="btn btn-danger" id="edit" onclick="deleteBook(${livro.livro_id})">Deletar</button></td>`
                        ].join('')
                        $('#tableBooks tbody').append(`<tr>${tds}</tr>`)
                    }
                    break;
                case 2:
                    alert("deu errado pra caralho")
                    break;
            }
        }
    })
}


// typrwiter text
let TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`

    let that = this;
    let delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};