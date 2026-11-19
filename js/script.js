/* ==========================================================
   PORTFÓLIO PROFISSIONAL - RODRIGO WILLIAN

   Arquivo: script.js

   Responsável por:

   ✔ Integração com API REST (JSON Server)
   ✔ Monitoramento da API
   ✔ Carregamento de Competências
   ✔ Carregamento de Formação Acadêmica
   ✔ Carregamento de Experiências Profissionais
   ✔ Carregamento de Atuação Voluntária
   ✔ Carregamento de Projetos
   ✔ Carregamento de Certificações
   ✔ Tratamento de erros
   ✔ Timeout
   ✔ Manipulação dinâmica do DOM
========================================================== */


/* ==========================================================
   CONFIGURAÇÕES DA API
========================================================== */

const API_URL = "http://localhost:3000";


/* ==========================================================
   CONTROLE DE CONCORRÊNCIA
========================================================== */

let carregandoDados = false;


/* ==========================================================
   STATUS DA API
========================================================== */

function atualizarStatusApiOnline() {

    const status =
        document.getElementById("statusApi");

    if (!status) return;

    status.classList.remove("offline");

    status.classList.add("online");

    status.textContent =
        "🟢 API Online";
}

function atualizarStatusApiOffline() {

    const status =
        document.getElementById("statusApi");

    if (!status) return;

    status.classList.remove("online");

    status.classList.add("offline");

    status.textContent =
        "🔴 API Offline";
}


/* ==========================================================
   FUNÇÃO AUXILIAR

   Faz requisições HTTP com timeout.
========================================================== */

async function buscarDados(endpoint) {

    const controller =
        new AbortController();

    const timeout = setTimeout(() => {

        controller.abort();

    }, 7000);

    try {

        const resposta = await fetch(
            `${API_URL}/${endpoint}`,
            {
                signal: controller.signal
            }
        );

        if (!resposta.ok) {

            throw new Error(
                `Erro HTTP ${resposta.status}`
            );
        }

        atualizarStatusApiOnline();

        return await resposta.json();

    } finally {

        clearTimeout(timeout);
    }
}


/* ==========================================================
   COMPETÊNCIAS
========================================================== */

async function carregarCompetencias() {

    const container =
        document.getElementById(
            "listaCompetencias"
        );

    if (!container) return;

    const competencias =
        await buscarDados(
            "competencias"
        );

    container.innerHTML = "";

    competencias.forEach(categoria => {

        const bloco =
            document.createElement("div");

        bloco.innerHTML = `

            <h3
                style="
                    margin:25px 0 15px;
                    color:#1e3a8a;
                "
            >
                ${categoria.categoria}
            </h3>

            <div class="cards">

                ${categoria.itens
                    .map(
                        item => `
                            <div class="card">
                                ${item}
                            </div>
                        `
                    )
                    .join("")
                }

            </div>
        `;

        container.appendChild(bloco);

    });

}


/* ==========================================================
   FORMAÇÃO ACADÊMICA
========================================================== */

async function carregarFormacao() {

    const container =
        document.getElementById(
            "listaFormacao"
        );

    const formacoes =
        await buscarDados(
            "formacao"
        );

    container.innerHTML = "";

    formacoes.forEach(formacao => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${formacao.curso}</h3>

            <p>
                <strong>Instituição:</strong>
                ${formacao.instituicao}
            </p>

            <p>
                <strong>Conclusão:</strong>
                ${formacao.conclusao}
            </p>
        `;

        container.appendChild(card);

    });

}


/* ==========================================================
   EXPERIÊNCIAS PROFISSIONAIS
========================================================== */

async function carregarExperiencias() {

    const container =
        document.getElementById(
            "listaExperiencias"
        );

    const experiencias =
        await buscarDados(
            "experiencias"
        );

    container.innerHTML = "";

    experiencias.forEach(experiencia => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        const periodosHtml =

            experiencia.periodos

                ? `
                    <p>
                        <strong>Períodos:</strong>
                    </p>

                    <ul>
                        ${experiencia.periodos
                            .map(
                                periodo =>
                                    `<li>${periodo}</li>`
                            )
                            .join("")}
                    </ul>
                  `

                : `
                    <p>
                        <strong>Período:</strong>
                        ${experiencia.periodo}
                    </p>
                  `;

        card.innerHTML = `
            <h3>${experiencia.cargo}</h3>

            <p>
                <strong>Empresa:</strong>
                ${experiencia.empresa}
            </p>

            ${periodosHtml}

            <p>
                ${experiencia.descricao}
            </p>
        `;

        container.appendChild(card);

    });

}


/* ==========================================================
   VOLUNTARIADO
========================================================== */

async function carregarVoluntariado() {

    const container =
        document.getElementById(
            "listaVoluntariado"
        );

    const voluntariados =
        await buscarDados(
            "voluntariado"
        );

    container.innerHTML = "";

    voluntariados.forEach(item => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.cargo}</h3>

            <p>
                <strong>Organização:</strong>
                ${item.organizacao}
            </p>

            <p>
                <strong>Período:</strong>
                ${item.periodo}
            </p>

            <p>
                ${item.descricao}
            </p>
        `;

        container.appendChild(card);

    });

}


/* ==========================================================
   PROJETOS
========================================================== */

async function carregarProjetos() {

    const container =
        document.getElementById(
            "listaProjetos"
        );

    const projetos =
        await buscarDados(
            "projetos"
        );

    container.innerHTML = "";

    projetos.forEach(projeto => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <h3>${projeto.nome}</h3>

            <p>
                ${projeto.descricao}
            </p>

            ${
                projeto.resultado
                    ? `
                        <p>
                            <strong>Resultado:</strong>
                            ${projeto.resultado}
                        </p>
                      `
                    : ""
            }

            ${
                projeto.link
                    ? `
                        <div class="acoes-projeto">

                            <a
                                href="${projeto.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-projeto"
                            >
                                <img
                                    src="img/ufla.jpg"
                                    alt="GLPI-UFLA"
                                    class="logo-projeto"
                                >

                                ${projeto.tituloLink}
                            </a>

                        </div>
                      `
                    : ""
            }
        `;

        container.appendChild(card);

    });

}


/* ==========================================================
   CERTIFICAÇÕES
========================================================== */

async function carregarCertificacoes() {

    const container =
        document.getElementById(
            "listaCertificacoes"
        );

    const certificacoes =
        await buscarDados(
            "certificacoes"
        );

    container.innerHTML = "";

    certificacoes.forEach(certificacao => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${certificacao.nome}</h3>

            <p>
                ${certificacao.instituicao}
            </p>

            <p>
                <strong>Ano:</strong>
                ${certificacao.ano}
            </p>
        `;

        container.appendChild(card);

    });

}


/* ==========================================================
   EXIBE ERRO PARA O USUÁRIO
========================================================== */

function exibirErro() {

    atualizarStatusApiOffline();

    const secoes = [

        "listaCompetencias",
        "listaFormacao",
        "listaExperiencias",
        "listaVoluntariado",
        "listaProjetos",
        "listaCertificacoes"

    ];

    secoes.forEach(id => {

        const container =
            document.getElementById(id);

        if (!container) return;

        container.innerHTML = `

            <div class="card erro-api">

                <h3>
                    ⚠ Não foi possível
                    carregar os dados
                </h3>

                <p>
                    Verifique se a API
                    está em execução.
                </p>

                <button
                    onclick="inicializarAplicacao()">

                    🔄 Tentar Novamente

                </button>

            </div>

        `;

    });

}


/* ==========================================================
   INICIALIZAÇÃO DA APLICAÇÃO
========================================================== */

async function inicializarAplicacao() {

    if (carregandoDados) {

        return;
    }

    carregandoDados = true;

    try {

        await Promise.all([

            carregarCompetencias(),

            carregarFormacao(),

            carregarExperiencias(),

            carregarVoluntariado(),

            carregarProjetos(),

            carregarCertificacoes()

        ]);

        console.log(
            "Dados carregados com sucesso."
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            erro
        );

        exibirErro();

    } finally {

        carregandoDados = false;
    }

}


/* ==========================================================
   INICIALIZAÇÃO AUTOMÁTICA
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Portfólio inicializado."
        );

        inicializarAplicacao();

    }
);