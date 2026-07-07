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
const elementos = document.querySelectorAll('.item-faq, .caixa');
elementos.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementos.forEach(el => observer.observe(el));

//Pesquisa de FAQ
const pesquisaInput = document.getElementById('pesquisaFaq');
const faqItems = document.querySelectorAll('.item-faq');

if (pesquisaInput) {
    pesquisaInput.addEventListener('input', () => {
        const termo = pesquisaInput.value.toLowerCase();
        
        faqItems.forEach(item => {
            const pergunta = item.querySelector('summary').textContent.toLowerCase();
            const resposta = item.querySelector('p').textContent.toLowerCase();
            const corresponde = pergunta.includes(termo) || resposta.includes(termo);
            item.style.display = corresponde ? 'block' : 'none';
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
        
        faqItems.forEach(item => {
            const pergunta = item.querySelector('summary').textContent;
            let mostrar = false;
            
            if (categoria === 'todos') {
                mostrar = true;
            } else if (categoria === 'publicacao' && pergunta.includes('publicar')) {
                mostrar = true;
            } else if (categoria === 'eventos' && pergunta.includes('participar')) {
                mostrar = true;
            } else if (categoria === 'contacto' && pergunta.includes('contactar')) {
                mostrar = true;
            } else if (categoria === 'prazos' && pergunta.includes('prazos')) {
                mostrar = true;
            } else if (categoria === 'privacidade' && pergunta.includes('privacidade')) {
                mostrar = true;
            }
            
            item.style.display = mostrar ? 'block' : 'none';
        });
        
        // Limpar pesquisa quando filtrar
        if (pesquisaInput) {
            pesquisaInput.value = '';
        }
    });
});

//Newsletter com validacao @gmail.com
function validarEmailGmail(email) {
    return email && email.includes('@gmail.com') && email.length > 10;
}

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

console.log('Página FAQ carregada com sucesso!');