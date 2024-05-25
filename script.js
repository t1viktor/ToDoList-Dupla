document.addEventListener("DOMContentLoaded", function () {
    const digitar = document.querySelector('.digitar');
    const botao = document.querySelector('.botao');
    const lista1 = document.querySelector('.box1 .lista');

    const adicionarTarefa = () => {
        const valorDigitado = digitar.value;
        if (valorDigitado !== "") {
            const li = criarItem(valorDigitado);
            lista1.appendChild(li);
            digitar.value = '';
        }
    };

    botao.addEventListener("click", adicionarTarefa);

    digitar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            adicionarTarefa();
        }
    });

    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        box.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/html');
            const dropTarget = event.target.closest('.box').querySelector('.lista');
            dropTarget.innerHTML += data;
            atualizarItens(dropTarget);
        });
    });
});

function criarItem(valor) {
    const li = document.createElement('li');
    li.textContent = valor;
    li.setAttribute('draggable', true);
    li.innerHTML += ' <button class="delete-btn">Delete</button>';
    configurarItem(li);
    return li;
}

function configurarItem(li) {
    li.querySelector('.delete-btn').addEventListener("click", () => {
        li.remove();
    });

    li.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/html', li.outerHTML);
        setTimeout(() => {
            li.remove();
        }, 0);
    });
}

function atualizarItens(lista) {
    lista.querySelectorAll('li').forEach(li => {
        configurarItem(li);
    });
}
