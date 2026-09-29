# 💳 Challenge Serasa Expirian

Aplicação que implementa um fluxo de pagamento com listagem de ofertas, seleção de método de pagamento e revisão antes da confirmação, seguindo um design de referência como guia visual.

## ✨ Funcionalidades

- **Listagem de ofertas** — exibição das ofertas disponíveis para o usuário escolher
- **Seleção de método de pagamento** — escolha entre os métodos disponíveis
- **Revisão e confirmação** — tela que reúne a oferta e o método selecionados antes da conclusão
- **Tratamento de erro no checkout** — feedback claro em caso de falha na API (ex.: erro 500)
- **Responsividade completa** — experiência adaptada para mobile e desktop, sem quebras de layout
- **Acessibilidade** — navegação por teclado, labels adequados e feedback para leitores de tela

## 🚀 Tecnologias

- **Next.js** + **React** + **TypeScript**
- **React Query** — gerenciamento de dados da API (ofertas, métodos de pagamento, checkout)
- **Zustand** — estado global do fluxo (oferta e método selecionados)
- **MSW (Mock Service Worker)** — simulação da API em desenvolvimento e testes
- **Testing Library** — testes de comportamento
- Design system baseado em **Atomic Design**

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── atoms/          # Botões, inputs, textos, spinners
│   ├── molecules/       # OfferCard, PaymentMethodItem, PriceSummaryRow
│   ├── organisms/       # OfferList, PaymentMethodList, CheckoutSummary
│   └── templates/       # Layouts das páginas
├── pages/               # Rotas do fluxo (ofertas, pagamento, revisão)
├── hooks/               # Hooks de React Query (useOffers, usePaymentMethods, useCheckout)
├── store/               # Store Zustand (seleção de oferta e pagamento)
├── mocks/               # Handlers e configuração do MSW
└── tests/               # Testes de comportamento
```

## 🧩 Arquitetura de estado

- **React Query** cuida do estado de servidor: busca de ofertas, métodos de pagamento e envio do checkout (cache, loading, erro e retry).
- **Zustand** cuida do estado de UI compartilhado entre as etapas do fluxo: oferta selecionada, método de pagamento selecionado e etapa atual.

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar em desenvolvimento (com MSW simulando a API)
npm run dev

# rodar os testes
npm run test
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 🧪 Testes

O projeto conta com testes de comportamento usando **Testing Library** + **MSW**, cobrindo cenários como:

- Seleção de oferta e método de pagamento, avançando até a revisão
- Exibição de erro quando o checkout retorna falha (ex.: 500)
- Estado do botão de confirmação conforme as seleções feitas

## 📱 Responsividade

O layout foi construído para funcionar de forma confortável tanto em telas mobile quanto desktop, com distribuição proporcional do conteúdo e sem elementos espremidos ou quebrados em nenhuma largura.

## ♿ Acessibilidade

- Elementos interativos navegáveis via teclado
- Labels associados a inputs (rádio/checkbox)
- Feedback de erro acessível (`aria-live`)
- Foco visível em elementos focáveis

## Video de como funciona

<video src="https://github.com/user-attachments/assets/abd13e43-5a8f-418c-8c85-215dc9a5411f" controls width="600"></video>

## 👤 Autor

**Iury Lemos**
Desenvolvedor Full Stack
[LinkedIn](https://www.linkedin.com/in/iurylemos/)
