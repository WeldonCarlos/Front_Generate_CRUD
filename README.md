# Front Generate CRUD

Interface React e TypeScript que conduz o usuário por etapas para gerar e baixar uma API CRUD a partir de uma tabela MySQL.

## O que o projeto apresenta

- Formulário de conexão com host, porta, banco, usuário e senha.
- Etapa de seleção do nome da tabela.
- Validação dos campos obrigatórios, estado de carregamento e mensagens de erro.
- Solicitação de geração e download do ZIP retornado pelo serviço Flask.

## Tecnologias

React · TypeScript · Vite · Material UI · Axios

## Executar localmente

```bash
git clone https://github.com/WeldonCarlos/Front_Generate_CRUD.git
cd Front_Generate_CRUD
npm install
npm run dev
```

Abra o endereço informado no terminal.

## Configuração e integração

O backend complementar é [API Generate](https://github.com/WeldonCarlos/API_Generate). Informe somente credenciais de um banco de teste autorizado; elas são enviadas ao serviço de geração e incluídas no pacote retornado.

## Comandos disponíveis

| Comando | Uso |
| --- | --- |
| `npm run dev` | `vite` |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | `eslint .` |
| `npm run preview` | `vite preview` |

Os scripts são os definidos em `package.json`; sua presença não indica que foram executados nesta revisão de documentação.

## Estrutura

- `README.md`
- `eslint.config.js`
- `index.html`
- `package.json`
- `public/`
- `src/`
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`

## Estado atual

A tela utiliza um endpoint do Render definido diretamente em `src/App.tsx`. O arquivo `src/services/configAxios.ts` aponta para localhost, mas não controla as chamadas feitas nessa tela. Para execução local integrada, ajuste as URLs de `App.tsx` para o serviço que você estiver executando.

## Autoria

[Weldon Carlos](https://github.com/WeldonCarlos) · [LinkedIn](https://www.linkedin.com/in/weldon-carlos-41b488231/)
