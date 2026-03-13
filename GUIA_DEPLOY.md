# 🚀 GUIA DE DEPLOY - TRAVEL MARAJÓ

## ⚡ MÉTODO RÁPIDO (15 minutos)

### ETAPA 1: Criar Contas (5 min)

#### 1.1 GitHub (gratuito)
1. Acesse: **github.com**
2. Clique em **"Sign up"**
3. Preencha email, senha e nome de usuário
4. Confirme seu email

#### 1.2 Railway (gratuito - Banco de Dados)
1. Acesse: **railway.app**
2. Clique em **"Login"** → **"Continue with GitHub"**
3. Autorize o acesso

#### 1.3 Vercel (gratuito - Hospedagem)
1. Acesse: **vercel.com**
2. Clique em **"Sign Up"** → **"Continue with GitHub"**
3. Autorize o acesso

---

### ETAPA 2: Criar Banco de Dados (5 min)

1. Acesse: **railway.app/dashboard**
2. Clique em **"New Project"**
3. Clique em **"Provision PostgreSQL"**
4. Clique no banco criado (ex: "Postgres")
5. Clique na aba **"Connect"**
6. Copie a URL que começa com `postgresql://`
7. **Guarde essa URL!**

---

### ETAPA 3: Publicar na Vercel (5 min)

1. Acesse: **vercel.com/dashboard**
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Import Git Repository"**
4. Escolha **"Upload"** e selecione esta pasta
5. Configure:
   - **Project Name**: `travel-marajo`
   - **Framework Preset**: Next.js
6. Clique em **"Environment Variables"**
7. Adicione estas variáveis:

```
DATABASE_URL=postgresql://... (cole do Railway)
NEXTAUTH_SECRET=qualquer-texto-secreto-longo-aqui
NEXTAUTH_URL=https://travel-marajo.vercel.app
```

8. Clique em **"Deploy"**

**Pronto! Aguarde 2-3 minutos e seu site estará online!** 🎉

---

## 🔧 CONFIGURAÇÕES OPCIONAIS

### Login com Google

1. Acesse: **console.cloud.google.com**
2. Crie um projeto
3. Vá em **"APIs & Services"** → **"Credentials"**
4. Clique **"Create Credentials"** → **"OAuth client ID"**
5. Configure a tela de consentimento
6. Adicione URI: `https://seu-site.vercel.app/api/auth/callback/google`
7. Copie **Client ID** e **Client Secret**
8. Na Vercel, adicione:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

### Pagamentos (Stripe)

1. Acesse: **dashboard.stripe.com**
2. Crie conta
3. Vá em **"Developers"** → **"API Keys"**
4. Copie as chaves
5. Na Vercel, adicione:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## ❓ PROBLEMAS COMUNS

### Erro: "DATABASE_URL is required"
- Verifique se copiou a URL completa do Railway
- Certifique-se de que não há espaços no início ou fim

### Erro: "Build failed"
- Verifique se todas as dependências estão instaladas
- Tente rodar `npm install` localmente antes de fazer o deploy

### Site não carrega
- Verifique se as variáveis de ambiente estão configuradas
- Veja os logs na Vercel (tab "Deployments" → "View Logs")

---

## 📞 SUPORTE

Se precisar de ajuda:
1. Documentação Next.js: **nextjs.org/docs**
2. Documentação Prisma: **prisma.io/docs**
3. Documentação Vercel: **vercel.com/docs**

---

**Boa sorte com seu projeto! 🌴✈️**
## Variaveis obrigatorias recomendadas

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SITE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

- A aplicacao publica deve responder com rotas canonicas localizadas em `/pt`, `/en`, `/es` e `/fr`.
- `NEXT_PUBLIC_SITE_URL` precisa apontar para o dominio final para que canonical, hreflang, sitemap e robots gerem URLs corretas.
- Rotas antigas sem locale devem ser tratadas como compatibilidade e redirecionadas.
