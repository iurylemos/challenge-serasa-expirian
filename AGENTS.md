<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

...

<!-- END:nextjs-agent-rules -->

# Sobre este projeto

Fluxo de pagamento: listagem de ofertas → seleção de método de pagamento → revisão antes de confirmar.

## Arquitetura de estado

- **React Query** é a única fonte de estado de servidor (ofertas, métodos de pagamento, checkout). Não duplicar esses dados em outro store.
- **Zustand** guarda apenas estado de UI compartilhado entre as etapas do fluxo: oferta selecionada, método de pagamento selecionado, etapa atual.
- Nunca colocar resposta de API diretamente no Zustand — sempre passar pelos hooks de React Query.

## Design System — Atomic Design

- `components/atoms` — elementos sem lógica de negócio (Button, Radio, Spinner)
- `components/molecules` — combinações pequenas (OfferCard, PaymentMethodItem)
- `components/organisms` — blocos completos de tela (OfferList, CheckoutSummary)
- Não criar um "atom" ou "molecule" só para um componente usado uma única vez — nesse caso, manter como subcomponente local da tela.

## Convenções de código

- TypeScript estrito, sem `any`
- Nomes de hooks de dados: `use<Recurso>` (ex: `useOffers`, `useCheckout`)
- Testes ficam ao lado do componente/hook: `Componente.test.tsx`

## Como rodar

\`\`\`bash
npm install
npm run dev # roda com MSW simulando a API
npm run test # Testing Library + MSW
\`\`\`

## MSW

Handlers ficam em `src/mocks/handlers.ts`. Sempre que adicionar um novo endpoint, criar o handler correspondente (incluindo o caso de erro, ex: 500) antes de consumir na tela.

## Acessibilidade

- Todo input de seleção (rádio/checkbox) precisa de `label` associado
- Erros de checkout devem usar `aria-live="assertive"`
- Nenhum elemento interativo sem foco visível ao navegar por teclado
