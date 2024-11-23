# Guia de Desenvolvimento - WhatsApp Dashboard

Este guia fornece instruções detalhadas para configurar e desenvolver o WhatsApp Dashboard.

## 🔧 Configuração do Ambiente de Desenvolvimento

### Requisitos do Sistema

1. **Node.js**
   - Versão recomendada: 16.x ou superior
   - Verificar instalação: `node --version`

2. **Google Chrome**
   - Necessário para WhatsApp Web.js
   - Caminho padrão no Linux: `/usr/bin/google-chrome-stable`

3. **Dependências do Sistema (Linux)**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install -y \
       gconf-service \
       libasound2 \
       libatk1.0-0 \
       libc6 \
       libcairo2 \
       libcups2 \
       libdbus-1-3 \
       libexpat1 \
       libfontconfig1 \
       libgcc1 \
       libgconf-2-4 \
       libgdk-pixbuf2.0-0 \
       libglib2.0-0 \
       libgtk-3-0 \
       libnspr4 \
       libpango-1.0-0 \
       libpangocairo-1.0-0 \
       libstdc++6 \
       libx11-6 \
       libx11-xcb1 \
       libxcb1 \
       libxcomposite1 \
       libxcursor1 \
       libxdamage1 \
   ```

### Setup do Projeto

1. **Clonando e Instalando Dependências**
   ```bash
   # Clone o repositório
   git clone <repository-url>
   cd whatsapp-dashboard

   # Instale as dependências do frontend
   npm install

   # Configure o servidor
   cd server
   npm install typescript ts-node @types/express @types/socket.io
   ```

2. **Configuração do TypeScript**
   - Frontend usa `tsconfig.json` na raiz
   - Backend usa configuração específica em `server/tsconfig.json`

3. **Variáveis de Ambiente**
   ```bash
   # Crie um arquivo .env na raiz do projeto
   touch .env

   # Adicione as variáveis necessárias
   VITE_BACKEND_URL=http://localhost:3000
   ```

## 💻 Desenvolvimento

### Estrutura de Arquivos Detalhada

```
src/
├── components/
│   ├── chat/
│   │   └── ChatInterface.tsx    # Interface principal do chat
│   ├── layout/
│   │   ├── app-sidebar.tsx      # Barra lateral do app
│   │   └── Sidebar.tsx          # Componente base da sidebar
│   ├── whatsapp/
│   │   └── WhatsAppConnection.tsx # Gestão de conexão WhatsApp
│   └── ui/                      # Componentes UI reutilizáveis
├── store/
│   └── whatsappStore.ts         # Estado global do WhatsApp
└── lib/
    └── utils.ts                 # Funções utilitárias
```

### Comandos de Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento frontend
npm run dev

# Iniciar servidor backend
cd server && npx ts-node server.ts

# Lint
npm run lint

# Build
npm run build
```

### Fluxo de Trabalho

1. **Conexão WhatsApp**
   - O servidor inicia o cliente WhatsApp Web.js
   - Gera QR Code para autenticação
   - Frontend exibe QR Code via componente WhatsAppConnection
   - Usuário escaneia com WhatsApp móvel

2. **Comunicação em Tempo Real**
   - Socket.IO gerencia eventos entre frontend e backend
   - Eventos principais:
     - `status`: Estado da conexão
     - `qr`: QR Code para autenticação
     - `message`: Mensagens recebidas/enviadas

3. **Estado da Aplicação**
   ```typescript
   interface WhatsAppState {
     status: 'connected' | 'disconnected' | 'connecting';
     qrCode: string | null;
     connect: () => void;
     disconnect: () => void;
   }
   ```

## 🐛 Debug

### Frontend

1. **Chrome DevTools**
   - Console para logs
   - Network para requisições Socket.IO
   - React DevTools para componentes

2. **Logs Úteis**
   ```typescript
   // Adicione em src/store/whatsappStore.ts
   connect: () => {
     console.log('Iniciando conexão...');
     set({ status: 'connecting' });
     // ...
   }
   ```

### Backend

1. **Logs do Servidor**
   ```typescript
   // Em server/server.ts
   client.on('qr', (qr) => {
     console.log('Novo QR Code gerado');
     io.emit('qr', qr);
   });
   ```

2. **Depuração do WhatsApp Web.js**
   ```typescript
   const client = new Client({
     puppeteer: {
       headless: false, // Útil para debug
       args: [
         '--no-sandbox',
         '--disable-setuid-sandbox',
         '--disable-dev-shm-usage',
         '--disable-accelerated-2d-canvas',
       ]
     }
   });
   ```

## 🔍 Testes

### Testes Manuais

1. **Conexão WhatsApp**
   - Verificar geração do QR Code
   - Confirmar autenticação bem-sucedida
   - Testar reconexão após desconexão

2. **Interface do Usuário**
   - Validar estados visuais (conectado/desconectado)
   - Verificar responsividade
   - Testar interações do usuário

### Testes Automatizados (TODO)

- Implementar testes unitários com Jest
- Adicionar testes E2E com Cypress
- Configurar CI/CD

## 📝 Convenções de Código

1. **TypeScript**
   - Usar tipos explícitos
   - Evitar `any`
   - Documentar interfaces complexas

2. **Componentes React**
   - Um componente por arquivo
   - Usar função arrow para componentes
   - Props tipadas com interface

3. **Estilização**
   - Usar classes Tailwind
   - Componentes UI base em `/ui`
