# DNE - Carteira Digital de Estudante

Aplicativo web para gerenciamento de carteira digital de estudante do DNE (Documento Nacional do Estudante).

## Funcionalidades

- ✅ Login via CPF
- ✅ Cadastro de estudante com foto
- ✅ Visualização da carteirinha digital (frente e verso)
- ✅ Validação com QR Code
- ✅ Certificado digital
- ✅ Perfil do estudante
- ✅ Integração com Supabase (banco de dados e storage)

## Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Backend/Database**: Supabase
- **Storage**: Supabase Storage

## Pré-requisitos

- Node.js (v18 ou superior)
- Conta no Supabase (gratuita)

## Instalação

1. **Clone o repositório** (ou use o diretório atual)

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Supabase**:
   - Siga o guia completo em [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Resumo rápido:
     1. Crie um projeto no [Supabase](https://supabase.com)
     2. Execute o SQL em `schema.sql` no SQL Editor
     3. Copie suas credenciais (URL e anon key)

4. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` com suas credenciais do Supabase:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
   ```

5. **Execute o app**:
   ```bash
   npm run dev
   ```

6. **Acesse no navegador**:
   ```
   http://localhost:5173
   ```

## Como Usar

1. **Primeiro Acesso**:
   - Digite um CPF no formato 000.000.000-00
   - Se o CPF não existir, você será direcionado para o cadastro
   - Preencha todos os dados e envie uma foto
   - Clique em "Gerar Carteira"

2. **Login**:
   - Digite seu CPF cadastrado
   - O app vai buscar seus dados no banco
   - Você será direcionado para a tela da carteirinha

3. **Navegação**:
   - **Carteira**: visualize sua carteirinha (clique para virar)
   - **Validação**: veja QR Code e código de validação
   - **Perfil**: veja e edite seus dados

## Estrutura do Projeto

```
dne-digital-student-id/
├── src/
│   ├── lib/
│   │   └── supabase.ts          # Configuração do Supabase
│   ├── services/
│   │   └── studentService.ts    # Operações com banco de dados
│   └── components/
│       ├── AuthModal.tsx        # Modal de login
│       ├── RegistrationScreen.tsx # Tela de cadastro
│       ├── CardScreen.tsx       # Carteirinha frente/verso
│       ├── ValidationScreen.tsx # Validação com QR Code
│       ├── CertificateScreen.tsx # Certificado digital
│       └── ProfileScreen.tsx    # Perfil do estudante
├── schema.sql                   # Schema do banco de dados
├── .env.example                 # Exemplo de variáveis de ambiente
└── SUPABASE_SETUP.md           # Guia de configuração do Supabase
```

## Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`.

## Problemas Comuns

- **Erro de variáveis de ambiente**: verifique se o `.env` está configurado corretamente
- **Erro ao fazer upload**: verifique se o bucket `student-photos` existe e é público
- **CPF duplicado**: cada CPF só pode ter um cadastro

Para mais detalhes, veja [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

## Licença

Este projeto é privado e de uso interno.
# Deploy test
