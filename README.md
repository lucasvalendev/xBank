# X bank

Aplicação web front-end que simula uma experiência bancária simples, com foco em organização, UX, validação de formulários, estado global e estrutura de código escalável.

O projeto foi desenvolvido como parte de um desafio técnico para uma aplicação bancária/fintech. A ideia não foi criar um banco completo, mas construir um MVP bem estruturado, visualmente consistente e fácil de evoluir.

**Deploy:** https://x-bank.vercel.app/

---

## Visão geral

O X bank é um app bancário fictício com três fluxos principais:

- autenticação mockada com persistência de sessão;
- dashboard com saldo, ações rápidas e transações recentes;
- transferência com validação, cálculo de taxa, atualização de saldo e inclusão da nova transação no histórico.

A interface segue uma direção visual mais minimalista e dark, com inspiração em produtos digitais premium: menos ruído visual, mais foco nos dados financeiros e uma navegação simples.

---

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- CVA
- shadcn/ui
- Radix UI
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Axios
- Vitest
- Testing Library
- Lucide React

---

## Funcionalidades

### Autenticação

- Login mockado.
- Validação de e-mail e senha.
- Persistência de sessão no `localStorage` com Zustand.
- Redirecionamento automático conforme estado de autenticação.
- Rotas privadas protegidas.
- Logout com limpeza da sessão.

### Dashboard

- Exibição do saldo total.
- Lista de transações recentes.
- Ações rápidas, incluindo navegação para transferência.
- Cards contextuais relacionados a pagamentos globais e cripto/fiat.
- Estado global de conta e transações com Zustand.
- Carregamento dos dados via React Query e service mockado.

### Transferência

- Formulário validado com React Hook Form e Zod.
- Selects baseados em Radix/shadcn.
- Cálculo de taxa fixa e valor estimado recebido.
- Validação de saldo insuficiente.
- Mutation mockada com React Query.
- Atualização do saldo após confirmação.
- Inclusão da nova transação no topo da lista.
- Feedback visual com Toast.

---

## Como rodar localmente

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

### Testes

```bash
npm run test:run
```

### Lint

```bash
npm run lint
```

---

## Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o projeto em modo desenvolvimento |
| `npm run build` | Executa o typecheck e gera o build de produção |
| `npm run preview` | Serve localmente o build gerado |
| `npm run test` | Inicia o Vitest em modo interativo |
| `npm run test:run` | Executa a suíte de testes uma vez |
| `npm run lint` | Executa o ESLint no projeto |

---

## Estrutura do projeto

```txt
src/
  app/
    providers.tsx
    router.tsx

  features/
    auth/
      components/
      pages/
      schemas/
      services/
      store/
      types/

    dashboard/
      components/
      hooks/
      pages/
      services/
      store/

    transfer/
      components/
      hooks/
      pages/
      schemas/
      services/
      types/

  shared/
    components/
      layout/
      ui/
    constants/
    hooks/
    lib/
    types/
    utils/

  tests/
    utils/
```

A aplicação foi organizada por domínio de funcionalidade. Autenticação, dashboard e transferência ficam separados em `features`, enquanto componentes reutilizáveis, utilitários, tipos e configurações compartilhadas ficam em `shared`.

Essa estrutura mantém as responsabilidades mais claras e evita concentrar regra de negócio diretamente nas páginas.

---

## Decisões técnicas

### Separação por features

A estrutura foi pensada para manter cada fluxo principal isolado. Isso facilita manutenção, leitura e evolução do projeto sem transformar a pasta `components` em um lugar genérico demais.

### Zustand para estado global

Zustand foi usado para guardar a sessão mockada e o estado da conta em runtime, como saldo e transações. Também foi utilizado para manter a persistência da autenticação no `localStorage`.

### React Query para operações assíncronas

React Query foi usado para organizar buscas e mutations mesmo com dados mockados. A ideia é manter o projeto próximo de uma estrutura real, onde os dados viriam de uma API.

### Axios como camada HTTP

O projeto possui uma instância centralizada de Axios e services que passam por essa camada. Mesmo sem backend real, essa decisão deixa a aplicação preparada para trocar os mocks por endpoints reais com menos impacto na estrutura.

### React Hook Form + Zod

Os formulários de login e transferência usam React Hook Form com Zod para validação. Isso deixa as regras mais explícitas, melhora a experiência de preenchimento e reduz lógica manual nos componentes.

### Radix UI e shadcn/ui

Radix e shadcn/ui foram usados como base para componentes acessíveis e reutilizáveis, como select, button, card, input, skeleton e toast.

### Tailwind CSS + CVA

Tailwind foi usado para estilização e CVA para organizar variantes de componentes, principalmente em elementos reutilizáveis como botões e cards.

---

## Fluxo da aplicação

```txt
Usuário acessa o app
        ↓
Se não houver sessão, vai para /login
        ↓
Login mockado com e-mail e senha válidos
        ↓
Sessão persistida localmente
        ↓
Dashboard com saldo e transações
        ↓
Usuário acessa a tela de transferência
        ↓
Formulário valida os dados preenchidos
        ↓
Aplicação calcula taxa, câmbio e total debitado
        ↓
Transferência é confirmada
        ↓
Saldo é atualizado
        ↓
Nova transação aparece no dashboard
```

---

## Dados e limitações do MVP

Este projeto não possui backend real. Todos os dados são fictícios e usados apenas para demonstrar o comportamento do front-end.

Alguns pontos foram mantidos intencionalmente simples:

- o login é mockado;
- a sessão é persistida localmente;
- as transações são mockadas;
- a transferência simula uma mutation;
- o cálculo de taxa e câmbio é local;
- não há integração com instituições financeiras.

Essa escolha mantém o projeto dentro do escopo do desafio, sem adicionar complexidade que não seria necessária para avaliar a estrutura front-end.

---

## Testes

A suíte de testes usa Vitest e Testing Library, priorizando comportamento visível ao usuário.

Coberturas principais:

- renderização inicial da aplicação com providers;
- validação do schema de login;
- estado vazio da lista de transações;
- validação e cálculo do formulário de transferência;
- fluxo principal autenticado: login, dashboard, navegação para transferência, confirmação, saldo atualizado e nova transação visível.

Os testes evitam depender de detalhes internos de implementação e focam em interações reais: labels, botões, headings e textos renderizados.

---

## Segurança

Este é um MVP front-end com dados mockados. Ele não implementa segurança bancária real, autenticação real ou qualquer integração com sistemas financeiros.

Mesmo assim, o projeto foi pensado considerando como a aplicação deveria evoluir em um cenário real.

### Engenharia reversa

Em uma aplicação real, qualquer código JavaScript enviado ao navegador pode ser inspecionado. Por isso, regras sensíveis não devem depender do front-end.

Medidas importantes em produção:

- manter regras críticas e validações financeiras no backend;
- nunca expor segredos, chaves privadas ou credenciais no bundle;
- validar permissões, limites e operações no servidor;
- usar autenticação e autorização por escopo;
- registrar auditoria de ações sensíveis;
- aplicar rate limiting e monitoramento de comportamento suspeito;
- usar headers de segurança, como CSP, para reduzir riscos de execução indevida de scripts.

Minificação e ofuscação podem dificultar análise casual, mas não substituem segurança real no servidor.

### Vazamento de dados

Em produção, dados financeiros e pessoais deveriam ser tratados como informações sensíveis desde a origem.

Medidas importantes:

- trafegar dados apenas via HTTPS;
- evitar armazenar dados sensíveis em `localStorage`;
- usar cookies `HttpOnly`, `Secure` e `SameSite` quando adequado;
- limitar os dados retornados pela API ao mínimo necessário;
- aplicar controle de acesso no backend em todas as consultas;
- mascarar dados sensíveis em logs e ferramentas de observabilidade;
- proteger variáveis de ambiente e segredos em cofres apropriados;
- definir políticas de retenção, auditoria e revogação de acesso.

No X bank, a persistência local existe apenas para simular a experiência de sessão em um desafio front-end.

---

## Melhorias futuras

- Integração com backend real.
- Autenticação com tokens e expiração de sessão.
- Endpoints versionados para conta, transações e transferências.
- Página de detalhes da transação.
- Geração de comprovante após transferência.
- Histórico completo com busca e filtros.
- Suporte real a múltiplas moedas.
- Tratamento global de erros.
- Testes end-to-end com Playwright.
- Melhorias de acessibilidade e navegação por teclado.
- Responsividade mobile mais completa.

---

## Sobre o projeto

O X bank foi construído com foco em clareza, consistência e organização. A proposta foi entregar um projeto simples, mas com estrutura suficiente para demonstrar decisões reais de front-end: separação por domínio, validação bem definida, estado previsível, testes e uma UI alinhada ao contexto financeiro.

