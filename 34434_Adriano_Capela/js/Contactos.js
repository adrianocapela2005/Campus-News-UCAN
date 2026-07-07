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
const elementos = document.querySelectorAll('.formulario, .info');
elementos.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementos.forEach(el => observer.observe(el));

//Formulario de contacto
const btnEnviar = document.getElementById('btnEnviar');

if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validacao basica
        if (!nome) {
            alert('📝 Por favor, preencha o campo Nome!');
            document.getElementById('nome').style.border = '2px solid red';
            document.getElementById('nome').focus();
            return;
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            alert('📧 Por favor, digite um email válido!');
            document.getElementById('email').style.border = '2px solid red';
            document.getElementById('email').focus();
            return;
        }
        
        if (!assunto) {
            alert('📋 Por favor, preencha o campo Assunto!');
            document.getElementById('assunto').style.border = '2px solid red';
            document.getElementById('assunto').focus();
            return;
        }
        
        if (!mensagem || mensagem.length < 10) {
            alert('📝 Por favor, escreva uma mensagem com pelo menos 10 caracteres!');
            document.getElementById('mensagem').style.border = '2px solid red';
            document.getElementById('mensagem').focus();
            return;
        }
        
        // Mensagem de sucesso
        alert('✅ Mensagem enviada com sucesso! Entraremos em contacto consigo em breve.');
        
        // Limpar formulario
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('assunto').value = '';
        document.getElementById('mensagem').value = '';
        
        // Remover bordas vermelhas
        document.querySelectorAll('.formulario input, .formulario textarea').forEach(el => {
            el.style.border = '1px solid var(--borda)';
        });
    });
}

// Remover bordas vermelhas ao digitar
document.querySelectorAll('.formulario input, .formulario textarea').forEach(el => {
    el.addEventListener('input', () => {
        el.style.border = '1px solid var(--borda)';
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

console.log('Página Contactos carregada com sucesso!');