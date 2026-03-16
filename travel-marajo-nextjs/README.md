# 🌴 Travel Marajó

Plataforma de Turismo Internacional para o Arquipélago do Marajó

![Travel Marajó](https://img.shields.io/badge/Travel-Marajó-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)

## 📋 Sobre o Projeto

O Travel Marajó é uma plataforma de turismo online desenvolvida com Next.js 14, TypeScript e Tailwind CSS, projetada para promover o arquipélago do Marajó como um destino turístico internacional.

### 🎯 Funcionalidades

- ✅ **Busca Multimodal**: Voos, Hotéis, Pacotes
- ✅ **Internacionalização**: PT, EN, FR, ES
- ✅ **Multimoeda**: AOA, BRL, EUR, USD, GBP
- ✅ **Autenticação**: Login/Cadastro via Google
- ✅ **Pagamentos**: Integração com Stripe
- ✅ **Design Responsivo**: Desktop, tablet e mobile

---

## 🚀 DEPLOY RÁPIDO (3 PASSOS)

### Passo 1: Criar Contas (5 minutos)

1. **GitHub**: https://github.com/signup
2. **Vercel**: https://vercel.com/signup (use "Continue with GitHub")
3. **Railway**: https://railway.app (use "Login with GitHub")

### Passo 2: Configurar Banco de Dados (5 minutos)

1. Acesse: https://railway.app/dashboard
2. Clique em **"New Project"**
3. Clique em **"Provision PostgreSQL"**
4. Clique no banco criado → Aba **"Connect"**
5. Copie a **DATABASE_URL** (começa com `postgresql://`)

### Passo 3: Deploy na Vercel (5 minutos)

1. Acesse: https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Importe este repositório
4. Configure as variáveis de ambiente:

```
DATABASE_URL="postgresql://..." (cole do Railway)
NEXTAUTH_SECRET="digite-qualquer-texto-longo-aqui"
NEXTAUTH_URL="https://seu-site.vercel.app"
```

5. Clique em **"Deploy"**

**Pronto! Seu site estará online em 2-3 minutos!** 🎉

---

## 🛠️ Instalação Local (Desenvolvimento)

### Pré-requisitos

- Node.js 18+ (https://nodejs.org)
- Git (https://git-scm.com)

### Comandos

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/travel-marajo.git
cd travel-marajo

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves

# 4. Configurar banco de dados
npx prisma generate
npx prisma db push

# 5. Rodar o servidor de desenvolvimento
npm run dev

# 6. Acesse: http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
travel-marajo/
├── prisma/
│   └── schema.prisma          # Modelos do banco de dados
├── public/
│   └── images/                # Imagens estáticas
├── src/
│   ├── app/                   # Rotas do Next.js
│   │   ├── api/               # API Routes
│   │   ├── flights/           # Página de voos
│   │   ├── hotels/            # Página de hotéis
│   │   ├── packages/          # Página de pacotes
│   │   ├── profile/           # Perfil do usuário
│   │   ├── login/             # Login
│   │   ├── register/          # Cadastro
│   │   ├── page.tsx           # Página inicial
│   │   ├── layout.tsx         # Layout principal
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── SearchForm.tsx
│   │   ├── FlightCard.tsx
│   │   ├── PackageCard.tsx
│   │   └── DestinationCard.tsx
│   ├── lib/                   # Bibliotecas/utilitários
│   │   ├── auth.ts            # Configuração NextAuth
│   │   ├── prisma.ts          # Cliente Prisma
│   │   ├── stripe.ts          # Configuração Stripe
│   │   └── utils.ts           # Funções utilitárias
│   └── types/                 # Tipos TypeScript
│       └── index.d.ts
├── .env.example               # Exemplo de variáveis
├── next.config.js             # Configuração Next.js
├── tailwind.config.ts         # Configuração Tailwind
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

---

## 🔧 Configurações Avançadas

### Google OAuth (Login com Google)

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Crie um projeto
3. Vá em **"Credentials"** → **"Create Credentials"** → **"OAuth client ID"**
4. Configure a tela de consentimento
5. Adicione o URI de redirecionamento: `https://seu-site.vercel.app/api/auth/callback/google`
6. Copie **Client ID** e **Client Secret**
7. Adicione na Vercel:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

### Stripe (Pagamentos)

1. Acesse: https://dashboard.stripe.com/apikeys
2. Copie as chaves de teste
3. Adicione na Vercel:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Amadeus API (Voos)

1. Acesse: https://developers.amadeus.com/
2. Crie uma conta e obtenha as chaves
3. Adicione na Vercel:
   - `AMADEUS_API_KEY`
   - `AMADEUS_API_SECRET`

---

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa linter |
| `npx prisma generate` | Gera cliente Prisma |
| `npx prisma db push` | Sincroniza schema com banco |
| `npx prisma studio` | Abre interface do Prisma |

---

## 🌐 Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Autenticação**: [NextAuth.js](https://next-auth.js.org/)
- **Pagamentos**: [Stripe](https://stripe.com/)
- **Ícones**: [Heroicons](https://heroicons.com/)

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 💬 Suporte

Em caso de dúvidas ou problemas:

1. Verifique a documentação oficial do Next.js: https://nextjs.org/docs
2. Consulte a documentação do Prisma: https://www.prisma.io/docs
3. Abra uma issue no repositório

---

**Feito com ❤️ para promover o turismo no Marajó!**
