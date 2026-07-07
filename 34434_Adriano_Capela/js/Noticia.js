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
const elementos = document.querySelectorAll('.cartao-noticia, .categorias, .populares, .newsletter-sidebar');
elementos.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementos.forEach(el => observer.observe(el));

//Ordenar noticias por data (mais recente para mais antiga)
const noticias = Array.from(document.querySelectorAll('.cartao-noticia'));

// Ordenar por data (mais recente primeiro)
noticias.sort((a, b) => {
    const dataA = a.dataset.data;
    const dataB = b.dataset.data;
    return dataB.localeCompare(dataA);
});

// Reorganizar no DOM
const grade = document.getElementById('noticiasGrade');
noticias.forEach(noticia => {
    grade.appendChild(noticia);
});

// Paginacao - 9 noticias por pagina
const itensPorPagina = 9;
let paginaAtual = 1;
let noticiasFiltradas = [...noticias];

function criarBotoesPaginacao(totalPaginas) {
    const container = document.getElementById('paginacaoContainer');
    container.innerHTML = '';
    
    // Botao anterior
    const btnAnterior = document.createElement('button');
    btnAnterior.className = 'pag-btn';
    btnAnterior.innerHTML = '←';
    btnAnterior.addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            mostrarPagina(paginaAtual);
        }
    });
    container.appendChild(btnAnterior);
    
    // Botoes numericos
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.className = 'pag-btn';
        btn.textContent = i;
        btn.dataset.pagina = i;
        btn.addEventListener('click', () => {
            paginaAtual = i;
            mostrarPagina(i);
        });
        container.appendChild(btn);
    }
    
    // Botao proximo
    const btnProximo = document.createElement('button');
    btnProximo.className = 'pag-btn';
    btnProximo.innerHTML = '→';
    btnProximo.addEventListener('click', () => {
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            mostrarPagina(paginaAtual);
        }
    });
    container.appendChild(btnProximo);
}

function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    
    // Esconder todas
    noticias.forEach(noticia => {
        noticia.style.display = 'none';
    });
    
    // Mostrar apenas as da pagina atual
    noticiasFiltradas.forEach((noticia, index) => {
        if (index >= inicio && index < fim) {
            noticia.style.display = 'block';
        }
    });
    
    // Actualizar botoes
    const botoes = document.querySelectorAll('.pag-btn');
    botoes.forEach(btn => {
        if (btn.textContent == pagina) {
            btn.classList.add('ativo');
        } else {
            btn.classList.remove('ativo');
        }
    });
    
    // Actualizar botoes anterior/proximo
    const totalPaginas = Math.ceil(noticiasFiltradas.length / itensPorPagina);
    const btnAnt = botoes[0];
    const btnProx = botoes[botoes.length - 1];
    
    if (btnAnt) btnAnt.style.opacity = pagina <= 1 ? '0.5' : '1';
    if (btnProx) btnProx.style.opacity = pagina >= totalPaginas ? '0.5' : '1';
}

//Filtrar por categoria
const categoriaBtns = document.querySelectorAll('.categoria-btn');

categoriaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoriaBtns.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        
        const categoria = btn.dataset.categoria;
        
        if (categoria === 'todos') {
            noticiasFiltradas = [...noticias];
        } else {
            noticiasFiltradas = noticias.filter(noticia => {
                const tag = noticia.querySelector('.cartao-tag').textContent;
                return tag.includes(categoria) || 
                       (categoria === 'cerimonia' && tag.includes('Cerimónia')) ||
                       (categoria === 'academia' && (tag.includes('Academia') || tag.includes('Visita') || tag.includes('Biblioteca'))) ||
                       (categoria === 'eventos' && tag.includes('Evento')) ||
                       (categoria === 'internacional' && tag.includes('Internacional')) ||
                       (categoria === 'carreiras' && tag.includes('Carreiras'));
            });
        }
        
        // Reorganizar na grade
        noticias.forEach(n => n.style.display = 'none');
        noticiasFiltradas.forEach(noticia => {
            grade.appendChild(noticia);
        });
        
        // Resetar pagina e atualizar
        paginaAtual = 1;
        const totalPaginas = Math.ceil(noticiasFiltradas.length / itensPorPagina);
        criarBotoesPaginacao(totalPaginas);
        mostrarPagina(1);
    });
});

//Filtrar por pesquisa
const pesquisaInput = document.getElementById('pesquisaNoticias');

pesquisaInput.addEventListener('input', () => {
    const termo = pesquisaInput.value.toLowerCase();
    
    if (termo.length < 2) {
        noticiasFiltradas = [...noticias];
    } else {
        noticiasFiltradas = noticias.filter(noticia => {
            const titulo = noticia.querySelector('h3').textContent.toLowerCase();
            const texto = noticia.querySelector('p').textContent.toLowerCase();
            return titulo.includes(termo) || texto.includes(termo);
        });
    }
    
    // Reorganizar na grade
    noticias.forEach(n => n.style.display = 'none');
    noticiasFiltradas.forEach(noticia => {
        grade.appendChild(noticia);
    });
    
    // Resetar pagina e atualizar
    paginaAtual = 1;
    const totalPaginas = Math.ceil(noticiasFiltradas.length / itensPorPagina);
    criarBotoesPaginacao(totalPaginas);
    mostrarPagina(1);
});

//Filtrar por data
const filtroData = document.getElementById('filtroData');

filtroData.addEventListener('change', () => {
    const ordenacao = filtroData.value;
    
    if (ordenacao === 'recentes') {
        noticiasFiltradas.sort((a, b) => {
            return b.dataset.data.localeCompare(a.dataset.data);
        });
    } else {
        noticiasFiltradas.sort((a, b) => {
            return a.dataset.data.localeCompare(b.dataset.data);
        });
    }
    
    // Reorganizar na grade
    noticias.forEach(n => n.style.display = 'none');
    noticiasFiltradas.forEach(noticia => {
        grade.appendChild(noticia);
    });
    
    // Resetar pagina e atualizar
    paginaAtual = 1;
    const totalPaginas = Math.ceil(noticiasFiltradas.length / itensPorPagina);
    criarBotoesPaginacao(totalPaginas);
    mostrarPagina(1);
});

//Inicializar paginacao
const totalPaginasInicial = Math.ceil(noticias.length / itensPorPagina);
criarBotoesPaginacao(totalPaginasInicial);
mostrarPagina(1);

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


//Visualizacoes dinamicas
document.querySelectorAll('.cartao-noticia').forEach(card => {
    const visualizacoes = Math.floor(Math.random() * 500) + 100;
    const dataSpan = card.querySelector('.cartao-data');
    if (dataSpan && !card.querySelector('.visualizacoes')) {
        const visualSpan = document.createElement('span');
        visualSpan.className = 'visualizacoes';
        visualSpan.style.display = 'block';
        visualSpan.style.fontSize = '11px';
        visualSpan.style.color = 'var(--texto-claro)';
        visualSpan.style.marginTop = '5px';
        visualSpan.innerHTML = `👁️ ${visualizacoes} visualizações`;
        dataSpan.insertAdjacentElement('afterend', visualSpan);
    }
});

//Ano actual no rodape
const anoAtual = new Date().getFullYear();
const textoRodape = document.querySelector('.rodape-base p');
if (textoRodape) {
    textoRodape.innerHTML = `&copy; ${anoAtual} Campus News UCAN. Todos os direitos reservados.`;
}

console.log('Página de Notícias carregada com sucesso!');