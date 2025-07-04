# Configuração do Sistema de Email

## 🚀 Resend (Recomendado)

### 1. Criar conta no Resend
- Acesse: https://resend.com
- Crie uma conta gratuita
- Verifique seu domínio ou use domínio do Resend

### 2. Obter API Key
- No dashboard do Resend, vá em "API Keys"
- Clique em "Create API Key"
- Copie a chave gerada

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Firebase Configuration (já existente)
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 4. Configurar Domínio (Opcional)
Para usar seu próprio domínio:
- No Resend, vá em "Domains"
- Adicione seu domínio (ex: portaldasaguas.com)
- Configure os registros DNS conforme instruções

### 5. Limites Gratuitos
- **3.000 emails/mês** (muito mais que Formspree)
- **Entrega excelente** para Gmail
- **Dashboard** para monitorar envios
- **Templates** personalizados

## 📧 Alternativas Gratuitas

### EmailJS (Cliente-side)
```bash
npm install @emailjs/browser
```
- **200 emails/mês** gratuitos
- Não precisa de backend
- Configuração simples

### SendGrid
```bash
npm install @sendgrid/mail
```
- **100 emails/dia** gratuitos
- Muito confiável
- API robusta

## 🔧 Como Funciona

1. **Cliente preenche formulário** → `/components/contact-section.tsx`
2. **Dados enviados** → `/app/api/contact/route.ts`
3. **API processa** → Valida dados e formata email
4. **Resend envia** → Email para contato@portaldasaguas.com
5. **Resposta** → Cliente recebe confirmação

## 📱 Template do Email

O email inclui:
- ✅ Informações do cliente (nome, email, telefone)
- ✅ Detalhes do evento (tipo, data, convidados)
- ✅ Descrição completa do evento
- ✅ Design responsivo e profissional
- ✅ Reply-to configurado para responder ao cliente

## 🎯 Vantagens do Resend

- ✅ **3.000 emails/mês** (vs 50 do Formspree)
- ✅ **Entrega 99%+** para Gmail
- ✅ **Templates HTML** personalizados
- ✅ **Dashboard** para monitorar
- ✅ **API simples** e confiável
- ✅ **Suporte** em português 