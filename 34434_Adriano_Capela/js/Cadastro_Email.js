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
const elementos = document.querySelectorAll('.formulario-card, .beneficio, .comunidade-conteudo');
elementos.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementos.forEach(el => observer.observe(el));

//Formulario de cadastro
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nomeCadastro').value.trim();
        const email = document.getElementById('emailCadastro').value.trim();
        const aceito = document.getElementById('aceitoTermos').checked;
        
        // Validacao do nome
        if (!nome || nome.length < 3) {
            alert('📝 Por favor, preencha o seu nome completo!');
            document.getElementById('nomeCadastro').style.border = '2px solid red';
            document.getElementById('nomeCadastro').focus();
            return;
        }
        
        // Validacao do email (@gmail.com)
        if (!email || !email.includes('@gmail.com') || email.length < 10) {
            alert('📧 Por favor, digite um email válido do Gmail (exemplo: seuemail@gmail.com)!');
            document.getElementById('emailCadastro').style.border = '2px solid red';
            document.getElementById('emailCadastro').focus();
            return;
        }
        
        // Validacao dos termos
        if (!aceito) {
            alert('📋 Por favor, aceite os termos e a política de privacidade para continuar!');
            document.getElementById('aceitoTermos').focus();
            return;
        }
        
        // Sucesso
        alert('✅ Cadastro realizado com sucesso! Você receberá nossas novidades no email ' + email);
        
        // Limpar formulario
        document.getElementById('nomeCadastro').value = '';
        document.getElementById('emailCadastro').value = '';
        document.getElementById('aceitoTermos').checked = false;
        
        // Remover bordas vermelhas
        document.querySelectorAll('.formulario-card input').forEach(el => {
            el.style.border = '1px solid var(--borda)';
        });
    });
}

// Remover bordas vermelhas ao digitar
document.querySelectorAll('.formulario-card input').forEach(el => {
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

console.log('Página Cadastro de Email carregada com sucesso!');