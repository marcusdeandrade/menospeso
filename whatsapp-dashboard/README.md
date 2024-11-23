# WhatsApp Dashboard

Um dashboard para integração com WhatsApp Web, construído com React, TypeScript, e WhatsApp Web.js.

## 🚀 Estrutura do Projeto

```
whatsapp-dashboard/
├── server/                 # Backend Node.js/Express
│   ├── server.ts          # Servidor WebSocket e WhatsApp Web.js
│   └── tsconfig.json      # Configuração TypeScript para o servidor
├── src/
│   ├── components/        # Componentes React
│   │   ├── chat/         # Componentes relacionados ao chat
│   │   ├── layout/       # Componentes de layout
│   │   ├── nav/          # Componentes de navegação
│   │   ├── ui/           # Componentes de UI reutilizáveis
│   │   └── whatsapp/     # Componentes específicos do WhatsApp
│   ├── store/            # Gerenciamento de estado (Zustand)
│   ├── hooks/            # Hooks personalizados
│   └── lib/              # Utilitários e funções auxiliares
└── public/               # Arquivos estáticos

```

## 📦 Dependências Principais

### Frontend
- React 18.2.0
- TypeScript
- Vite (bundler)
- Tailwind CSS (estilização)
- Zustand (gerenciamento de estado)
- Socket.IO Client (comunicação em tempo real)
- Radix UI (componentes primitivos)
- Lucide React (ícones)

### Backend
- Express
- Socket.IO
- WhatsApp Web.js
- TypeScript
- ts-node

## 🛠️ Setup do Projeto

1. **Instalação das Dependências**

```bash
# Instalar dependências do projeto principal
cd whatsapp-dashboard
npm install

# Instalar dependências do servidor
cd server
npm install typescript ts-node @types/express @types/socket.io
```

2. **Configuração do Ambiente**

O projeto requer:
- Node.js (versão recomendada: 16+)
- Google Chrome instalado (necessário para WhatsApp Web.js)

3. **Executando o Projeto**

```bash
# Terminal 1 - Servidor Backend
cd server
npx ts-node server.ts

# Terminal 2 - Frontend
npm run dev
```

## 🔧 Implementação Atual

### Backend (server.ts)
- Servidor Express com Socket.IO para comunicação em tempo real
- Integração com WhatsApp Web.js
- Gerenciamento de eventos do WhatsApp (QR Code, conexão, autenticação)
- Configuração do Puppeteer para ambiente Linux

### Frontend
1. **Componentes Principais**:
   - `WhatsAppConnection`: Gerencia a conexão com WhatsApp
   - `ChatInterface`: Interface principal do chat
   - `AppSidebar`: Barra lateral com navegação

2. **Estado**:
   - Gerenciado com Zustand
   - Estados: connected, disconnected, connecting
   - Armazenamento do QR Code e status da conexão

3. **UI/UX**:
   - Interface moderna com Tailwind CSS
   - Componentes reutilizáveis do Radix UI
   - Design responsivo
   - Feedback visual do status da conexão

## 🚨 Problemas Conhecidos

1. **Conexão WhatsApp**:
   - Erro ao inicializar o cliente WhatsApp Web devido a problemas com o Puppeteer
   - Necessidade de ajustar configurações do Chrome/Puppeteer

2. **Dependências**:
   - Alertas de vulnerabilidade em algumas dependências
   - Necessidade de atualização de pacotes deprecados

## 🔜 Próximos Passos

1. Resolver problemas de inicialização do cliente WhatsApp
2. Implementar sistema de mensagens
3. Adicionar suporte a múltiplas conversas
4. Melhorar tratamento de erros
5. Implementar testes automatizados
6. Adicionar documentação de API

## 📝 Notas de Desenvolvimento

- O frontend roda na porta 5183 por padrão
- O backend utiliza a porta 3000
- Necessário Google Chrome instalado para o WhatsApp Web.js funcionar
- Configurações específicas do Puppeteer podem precisar de ajustes baseados no ambiente

## 🔒 Segurança

- Implementar autenticação de usuários
- Adicionar HTTPS
- Melhorar validação de entrada
- Implementar rate limiting
- Adicionar logging de eventos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
