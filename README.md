# X bank

Aplicação web front-end que simula um app bancário simples, com login mockado, sessão persistida, dashboard com saldo e transações, e fluxo de transferência com validação, cálculo de taxa e atualização do saldo em tela.

O projeto foi desenvolvido como MVP de demonstração. Não há backend real, dados reais, autenticação real ou integração com instituições financeiras.

## Aplicação publicada

Ainda não há link público de deploy configurado para este projeto.

## Tecnologias utilizadas

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

## Como rodar localmente

Pré-requisitos:

- Node.js instalado
- npm instalado

Instale as dependências:

```bash
npm install
```

Rode o ambiente de desenvolvimento:

```bash
npm run dev
```

Gere o build de produção:

```bash
npm run build
```

Execute os testes:

```bash
npm run test:run
```

## Scripts disponíveis

- `npm run dev`: inicia o Vite em modo desenvolvimento.
- `npm run build`: executa o typecheck com TypeScript e gera o build de produção.
- `npm run preview`: serve localmente o build gerado.
- `npm run test`: inicia o Vitest em modo interativo.
- `npm run test:run`: executa a suíte de testes uma vez.
- `npm run lint`: executa o ESLint no projeto.

## Arquitetura de pastas

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
    lib/
    types/
    utils/
  tests/
    utils/
```

A organização segue uma divisão por features para manter autenticação, dashboard e transferência isolados por responsabilidade. Componentes e utilitários reutilizáveis ficam em `shared`.

## Decisões técnicas

- **React Router** gerencia rotas públicas e privadas, com `ProtectedRoute` para bloquear telas autenticadas.
- **Zustand** guarda a sessão mockada e o estado runtime da conta, como saldo e transações.
- **React Query** simula operações assíncronas de leitura e mutation, separando server state simulado de estado local.
- **React Hook Form + Zod** centralizam validação de login e transferência.
- **Services mockados** simulam chamadas externas sem criar backend real.
- **Tailwind + CVA** sustentam um design system simples, com componentes reutilizáveis e variantes controladas.
- **Axios** está configurado como camada HTTP centralizada para demonstrar como o projeto evoluiria para uma API real.

## Fluxo da aplicação

1. Usuário acessa `/login`.
2. Usuário informa e-mail e senha válidos.
3. A sessão mockada é salva no `localStorage` via Zustand persist.
4. Usuário autenticado é redirecionado para `/dashboard`.
5. O dashboard carrega dados mockados de conta e transações com React Query.
6. O usuário clica em `Transferir` e navega para `/transfer`.
7. O formulário valida destinatário, país, valor e moedas.
8. A aplicação calcula taxa fixa de `R$ 12,90`, câmbio `BRL -> USD` com taxa `0.19042`, valor recebido e total debitado.
9. Ao confirmar uma transferência válida, uma mutation mockada é executada.
10. O saldo é atualizado no Zustand e uma nova transação é adicionada no topo da lista.
11. O usuário recebe feedback de sucesso e volta para `/dashboard`.

## Estratégia de testes

A suíte usa Vitest e Testing Library, priorizando comportamento visível ao usuário.

Coberturas atuais:

- renderização básica com providers;
- validação do schema de login;
- estado vazio da lista de transações;
- cálculo e validação do formulário de transferência;
- fluxo principal autenticado: login, dashboard, navegação para transferência, confirmação, saldo atualizado e nova transação visível.

Os testes evitam depender de detalhes internos de implementação e validam interações por labels, botões, headings e textos renderizados.

## Segurança

Este MVP não implementa segurança real. Ele usa dados mockados, login simulado e sessão persistida no `localStorage` apenas para fins de demonstração do fluxo front-end.

Em uma aplicação bancária real, a proteção não poderia depender do front-end. O cliente web é sempre inspecionável, modificável e sujeito a engenharia reversa.

### Engenharia reversa

Uma aplicação real deveria assumir que todo código JavaScript enviado ao navegador pode ser lido, copiado, analisado e alterado. Minificação, code splitting e ofuscação podem dificultar análise casual, mas não protegem regras de negócio sensíveis.

Medidas adequadas para um produto real:

- manter regras críticas, permissões, validações financeiras e cálculo final no backend;
- nunca embutir segredos, chaves privadas, tokens administrativos ou credenciais no bundle front-end;
- validar todas as operações no servidor, mesmo que o front-end já tenha validado;
- usar autenticação forte, autorização por escopo e checagens server-side por usuário, conta e operação;
- registrar auditoria de ações sensíveis;
- aplicar rate limiting, detecção de abuso e monitoramento de comportamento suspeito;
- usar headers de segurança, como CSP, para reduzir riscos de injeção e execução indevida de scripts.

### Vazamento de dados

Uma aplicação real também deveria tratar dados bancários e pessoais como informações sensíveis desde a origem. Neste MVP, os dados são fictícios e permanecem no navegador.

Medidas adequadas para reduzir vazamento de dados em produção:

- trafegar dados apenas via HTTPS;
- armazenar dados sensíveis no servidor com criptografia em repouso quando aplicável;
- usar cookies `HttpOnly`, `Secure` e `SameSite` para tokens de sessão quando a arquitetura permitir;
- evitar guardar tokens sensíveis, documentos, saldos reais ou dados pessoais em `localStorage`;
- aplicar controle de acesso no backend em todas as rotas e consultas;
- limitar dados retornados pela API ao mínimo necessário para a tela;
- mascarar ou omitir dados sensíveis em logs, analytics e ferramentas de observabilidade;
- proteger variáveis de ambiente e segredos em cofres apropriados;
- definir políticas de retenção, auditoria e revogação de acesso.

## Melhorias futuras

- Integrar backend real com autenticação segura.
- Trocar mocks por endpoints versionados.
- Implementar refresh de sessão e expiração controlada.
- Adicionar testes end-to-end com Playwright.
- Criar tratamento global de erros e notificações.
- Adicionar acessibilidade mais completa para navegação por teclado.
- Publicar o projeto em uma plataforma como Vercel ou Netlify.
