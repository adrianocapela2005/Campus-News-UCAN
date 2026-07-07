//Tela de carregamento
window.addEventListener('load', () => {
    const telaCarregamento = document.getElementById('telaCarregamento');
    const conteudoSite = document.getElementById('conteudoSite');
    
    setTimeout(() => {
        telaCarregamento.classList.add('ocultar');
        setTimeout(() => {
            telaCarregamento.style.display = 'none';
            conteudoSite.style.display = 'block';
            conteudoSite.style.opacity = '0';
            setTimeout(() => {
                conteudoSite.style.transition = 'opacity 0.5s';
                conteudoSite.style.opacity = '1';
            }, 50);
        }, 500);
    }, 800);
});

//Modo escuro 
// Criar botao de modo escuro especifico para a pagina 404
const botaoEscuro = document.createElement('button');
botaoEscuro.innerHTML = '🌙';
botaoEscuro.className = 'botao-modo-escuro';
botaoEscuro.setAttribute('aria-label', 'Modo escuro');
document.body.appendChild(botaoEscuro);

// Verificar preferencia salva
if (localStorage.getItem('modoEscuro') === 'ativo') {
    document.body.classList.add('modo-escuro');
    botaoEscuro.innerHTML = '☀️';
}

// Evento do botao
botaoEscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    const isDark = document.body.classList.contains('modo-escuro');
    localStorage.setItem('modoEscuro', isDark ? 'ativo' : 'inativo');
    botaoEscuro.innerHTML = isDark ? '☀️' : '🌙';
});

//Animacao de entrada dos elementos
const elementos = document.querySelectorAll('.erro-conteudo');
elementos.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

// Animacao apos o carregamento
setTimeout(() => {
    elementos.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}, 300);

//Efeito de particulas/estrelas no fundo
// Pequeno efeito decorativo no fundo da pagina
const container = document.querySelector('.erro-container');
if (container) {
    // Adicionar um gradiente suave ao fundo
    container.style.background = 'var(--fundo-primario)';
    container.style.transition = 'background 0.5s ease';
}

console.log('Página 404 carregada com sucesso!');