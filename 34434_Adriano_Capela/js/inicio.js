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

menuHamburguer?.addEventListener('click', () => {
    menuNav.classList.toggle('aberto');
});

document.querySelectorAll('.navegacao a').forEach(link => {
    link.addEventListener('click', () => {
        menuNav.classList.remove('aberto');
    });
});

//Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const alvo = document.querySelector(href);
            if (alvo) {
                e.preventDefault();
                const offset = 70;
                const posicaoAlvo = alvo.offsetTop - offset;
                window.scrollTo({ top: posicaoAlvo, behavior: 'smooth' });
            }
        }
    });
});

//Efeito de digitação
const frases = [
    "Bem-vindo ao Campus News UCAN",
    "Inovação e Excelência Académica",
    "O futuro começa aqui "
];
let indiceFrase = 0, indiceChar = 0;
const elementoH1 = document.querySelector('.texto-digitando');

function digitar() {
    if (indiceFrase < frases.length) {
        if (indiceChar < frases[indiceFrase].length) {
            elementoH1.innerHTML += frases[indiceFrase].charAt(indiceChar);
            indiceChar++;
            setTimeout(digitar, 100);
        } else {
            setTimeout(apagar, 2000);
        }
    }
}

function apagar() {
    if (indiceChar > 0) {
        elementoH1.innerHTML = frases[indiceFrase].substring(0, indiceChar - 1);
        indiceChar--;
        setTimeout(apagar, 50);
    } else {
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(digitar, 500);
    }
}

if (elementoH1) {
    elementoH1.innerHTML = '';
    digitar();
}

//Banner com imagens automaticas 
// "../img/imagem1.jpg",
// "../img/imagem2.jpg",
// "../img/imagem3.jpg"

const imagensBanner = [
    "../img/Universidade.jpg",
    "../img/Universidade0.jpg",
    "../img/Universidade1.jpg",
    "../img/Universidade2.jpg"
];

let indiceImagem = 0;
const bannerPrincipal = document.getElementById('bannerPrincipal');

function mudarImagemBanner() {
    if (bannerPrincipal && imagensBanner.length > 0) {
        indiceImagem = (indiceImagem + 1) % imagensBanner.length;
        bannerPrincipal.style.backgroundImage = `
            linear-gradient(135deg, rgba(30, 144, 255, 0.75), rgba(10, 61, 107, 0.85)),
            url('${imagensBanner[indiceImagem]}')
        `;
        bannerPrincipal.style.backgroundSize = 'cover';
        bannerPrincipal.style.backgroundPosition = 'center';
    }
}

// Iniciar com a primeira imagem
if (bannerPrincipal && imagensBanner.length > 0) {
    bannerPrincipal.style.backgroundImage = `
        linear-gradient(135deg, rgba(30, 144, 255, 0.75), rgba(10, 61, 107, 0.85)),
        url('${imagensBanner[0]}')
    `;
    bannerPrincipal.style.backgroundSize = 'cover';
    bannerPrincipal.style.backgroundPosition = 'center';
}

// Mudar imagem automaticamente a cada 5 segundos
setInterval(mudarImagemBanner, 5000);

//Animacao dos numeros
const observadorNumeros = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            const numeros = entrada.target.querySelectorAll('.numero-valor');
            numeros.forEach(numero => {
                const alvo = parseInt(numero.dataset.alvo);
                let atual = 0;
                const incremento = alvo / 50;
                const contador = setInterval(() => {
                    atual += incremento;
                    if (atual >= alvo) {
                        numero.textContent = alvo.toLocaleString();
                        clearInterval(contador);
                    } else {
                        numero.textContent = Math.floor(atual).toLocaleString();
                    }
                }, 25);
            });
            observadorNumeros.unobserve(entrada.target);
        }
    });
}, { threshold: 0.5 });

const secaoNumeros = document.querySelector('.numeros-ucan');
if (secaoNumeros) observadorNumeros.observe(secaoNumeros);

//Slider de noticias em destaque
const slides = [
    {
        img: "../img/Encerramento do Ano Académico.jpeg",
        tag: "🎓 NOTÍCIA EM DESTAQUE",
        titulo: "UCAN | ENCERRAMENTO DO ANO ACADÉMICO 2025-2026",
        texto: "A Universidade Católica de Angola (UCAN) realizou, neste sábado, 27 de Junho de 2026, pelas 9h00, a cerimónia de Encerramento do Ano Académico 2025/2026. Um momento de profunda comunhão, gratidão e reconhecimento da excelência académica, científica, desportiva e humana da comunidade universitária.",
        link: "noticia14.html"
    },
    {
        img: "../img/Desfile Académico.jpeg",
        tag: "🎓 EVENTO",
        titulo: "UNIVERSIDADE CATÓLICA DE ANGOLA REALIZA COM SUCESSO A 23.ª EDIÇÃO DO DESFILE ACADÉMICO",
        texto: "A Universidade Católica de Angola (UCAN) realizou, no passado dia 20 de Junho, sábado, no Largo da Mutamba, a 23.ª Edição do Desfile Académico, um dos mais importantes eventos da vida estudantil.",
        link: "noticia13.html"
    },
    {
        img: "../img/Intercâmbio Universitario.jpeg",
        tag: "🌍 INTERNACIONAL",
        titulo: "UCAN PARTICIPA NO 1º FÓRUM DE REITORES BRASIL-ÁFRICA",
        texto: "A Universidade Católica de Angola participa, de 25 a 27 de Maio de 2026, do 1.º Fórum de Reitores Brasil-África, que decorre no Centro Internacional de Conferências em Luanda.",
        link: "noticia10.html"
    }
];

let slideAtual = 0;

function atualizarSlider() {
    const slide = slides[slideAtual];
    
    const imagem = document.getElementById('slideImagem');
    const etiqueta = document.getElementById('slideEtiqueta');
    const titulo = document.getElementById('slideTitulo');
    const texto = document.getElementById('slideTexto');
    const botao = document.getElementById('slideBotao');
    
    if (imagem) imagem.src = slide.img;
    if (etiqueta) etiqueta.textContent = slide.tag;
    if (titulo) titulo.textContent = slide.titulo;
    if (texto) texto.textContent = slide.texto;
    if (botao) botao.href = slide.link;
    
    document.querySelectorAll('.ponto').forEach((ponto, index) => {
        ponto.classList.toggle('ativo', index === slideAtual);
    });
}

document.querySelectorAll('.ponto').forEach((ponto, index) => {
    ponto.addEventListener('click', () => {
        slideAtual = index;
        atualizarSlider();
        resetarTimer();
    });
});

let intervaloSilder = setInterval(() => {
    slideAtual = (slideAtual + 1) % slides.length;
    atualizarSlider();
}, 5000);

function resetarTimer() {
    clearInterval(intervaloSilder);
    intervaloSilder = setInterval(() => {
        slideAtual = (slideAtual + 1) % slides.length;
        atualizarSlider();
    }, 5000);
}

const secaoSlider = document.querySelector('.banner-destaque');
if (secaoSlider) {
    secaoSlider.addEventListener('mouseenter', () => clearInterval(intervaloSilder));
    secaoSlider.addEventListener('mouseleave', resetarTimer);
}

//Botao topo
const botaoTopo = document.createElement('button');
botaoTopo.innerHTML = '↑';
botaoTopo.className = 'botao-topo';
document.body.appendChild(botaoTopo);

window.addEventListener('scroll', () => {
    botaoTopo.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//Animacoes scroll
const elementos = document.querySelectorAll('.cartao, .evento, .depoimento, .cabecalho-secao');
elementos.forEach(el => el.classList.add('fade-in-up'));

const observadorScroll = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) entrada.target.classList.add('visivel');
    });
}, { threshold: 0.1 });

elementos.forEach(el => observadorScroll.observe(el));

//Newsletter com validacao de email @gmail.com
document.getElementById('botaoSubscrever')?.addEventListener('click', () => {
    const email = document.getElementById('emailNewsletter').value.trim();
    const emailInput = document.getElementById('emailNewsletter');
    
    // Verificar se o email é válido (deve conter @gmail.com)
    if (!email) {
        alert('📧 Por favor, digite o seu email!');
        emailInput.style.border = '2px solid red';
        emailInput.focus();
        return;
    }
    
    if (!email.includes('@gmail.com')) {
        alert('📧 Por favor, digite um email válido do Gmail (exemplo: seuemail@gmail.com)!');
        emailInput.style.border = '2px solid red';
        emailInput.focus();
        return;
    }
    
    // Email válido
    alert('✅ Obrigado por subscrever! Você receberá nossas novidades no seu email.');
    emailInput.value = '';
    emailInput.style.border = 'none';
});

document.getElementById('emailNewsletter')?.addEventListener('input', function() {
    this.style.border = 'none';
});

//Visualizacoes dinamicas
document.querySelectorAll('.cartao').forEach(cartao => {
    const visualizacoes = Math.floor(Math.random() * 500) + 50;
    const paragrafo = cartao.querySelector('p');
    if (paragrafo) {
        const pequeno = document.createElement('small');
        pequeno.style.display = 'block';
        pequeno.style.marginTop = '10px';
        pequeno.style.color = 'var(--texto-claro)';
        pequeno.innerHTML = `👁️ ${visualizacoes} visualizações`;
        paragrafo.insertAdjacentElement('afterend', pequeno);
    }
});

//Barra de progresso
const barraProgresso = document.createElement('div');
barraProgresso.className = 'barra-progresso';
document.body.appendChild(barraProgresso);

window.addEventListener('scroll', () => {
    const altura = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const porcentagem = (scrollTop / altura) * 100;
    barraProgresso.style.width = porcentagem + '%';
});

//Ano actual no rodape
const anoAtual = new Date().getFullYear();
const textoRodape = document.querySelector('.rodape-base p');
if (textoRodape) {
    textoRodape.innerHTML = `&copy; ${anoAtual} Campus News UCAN. Todos os direitos reservados.`;
}

console.log('Campus News UCAN - Site carregado com sucesso!');