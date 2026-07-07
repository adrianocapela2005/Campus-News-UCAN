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
const botaoEscuro = document.getElementById('botaoEscuro');
if (localStorage.getItem('modoEscuro') === 'ativo') {
    document.body.classList.add('modo-escuro');
    botaoEscuro.innerHTML = '☀️';
}

botaoEscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    const isDark = document.body.classList.contains('modo-escuro');
    localStorage.setItem('modoEscuro', isDark ? 'ativo' : 'inativo');
    botaoEscuro.innerHTML = isDark ? '☀️' : '🌙';
});

//Menu hamburguer
const menuHamburguer = document.getElementById('menuHamburguer');
const menuNav = document.getElementById('menuNav');

if (menuHamburguer && menuNav) {
    menuHamburguer.addEventListener('click', () => {
        menuNav.classList.toggle('aberto');
    });
    
    document.querySelectorAll('.navegacao a').forEach(link => {
        link.addEventListener('click', () => {
            menuNav.classList.remove('aberto');
        });
    });
}

//Botao topo
const botaoTopo = document.getElementById('botaoTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        botaoTopo.style.display = 'flex';
    } else {
        botaoTopo.style.display = 'none';
    }
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//Animacoes scroll
const elementos = document.querySelectorAll('.card-evento, .caixa');
elementos.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementos.forEach(el => observer.observe(el));

//Pesquisa de eventos
const pesquisaInput = document.getElementById('pesquisaEventos');
const eventos = document.querySelectorAll('.card-evento');

if (pesquisaInput) {
    pesquisaInput.addEventListener('input', () => {
        const termo = pesquisaInput.value.toLowerCase();
        
        eventos.forEach(evento => {
            const titulo = evento.querySelector('h3').textContent.toLowerCase();
            const descricao = evento.querySelector('p').textContent.toLowerCase();
            const corresponde = titulo.includes(termo) || descricao.includes(termo);
            evento.style.display = corresponde ? 'block' : 'none';
        });
    });
}

//Filtro por categoria
const categoriaLinks = document.querySelectorAll('.caixa ul li a');

categoriaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover classe ativa de todos
        categoriaLinks.forEach(l => l.classList.remove('categoria-ativa'));
        link.classList.add('categoria-ativa');
        
        const categoria = link.dataset.categoria;
        
        eventos.forEach(evento => {
            const tag = evento.querySelector('.evento-tag').textContent;
            let mostrar = false;
            
            if (categoria === 'todos') {
                mostrar = true;
            } else if (categoria === 'tecnologia' && tag.includes('Tecnologia')) {
                mostrar = true;
            } else if (categoria === 'carreiras' && tag.includes('Carreiras')) {
                mostrar = true;
            } else if (categoria === 'cultura' && tag.includes('Cultura')) {
                mostrar = true;
            } else if (categoria === 'ambiente' && tag.includes('Ambiente')) {
                mostrar = true;
            } else if (categoria === 'academico' && tag.includes('Académico')) {
                mostrar = true;
            } else if (categoria === 'cerimonia' && tag.includes('Cerimónia')) {
                mostrar = true;
            }
            
            evento.style.display = mostrar ? 'block' : 'none';
        });
        
        // Limpar pesquisa quando filtrar por categoria
        if (pesquisaInput) {
            pesquisaInput.value = '';
        }
    });
});

//Newsletter com validacao @gmail.com
function validarEmailGmail(email) {
    return email && email.includes('@gmail.com') && email.length > 10;
}

// Newsletter principal
const btnSubscrever = document.getElementById('botaoSubscrever');
const emailNewsletter = document.getElementById('emailNewsletter');

if (btnSubscrever) {
    btnSubscrever.addEventListener('click', () => {
        const email = emailNewsletter.value.trim();
        if (validarEmailGmail(email)) {
            alert('✅ Obrigado por subscrever! Você receberá nossas novidades no seu email.');
            emailNewsletter.value = '';
            emailNewsletter.style.border = 'none';
        } else {
            alert('📧 Por favor, digite um email válido do Gmail (exemplo: seuemail@gmail.com)!');
            emailNewsletter.style.border = '2px solid red';
            emailNewsletter.focus();
        }
    });
}

emailNewsletter?.addEventListener('input', () => {
    emailNewsletter.style.border = 'none';
});

//Ano actual no rodape
const anoAtual = new Date().getFullYear();
const textoRodape = document.querySelector('.rodape-base p');
if (textoRodape) {
    textoRodape.innerHTML = `&copy; ${anoAtual} Campus News UCAN. Todos os direitos reservados.`;
}

console.log('Página de Eventos carregada com sucesso!');