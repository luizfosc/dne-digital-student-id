# Configuração do Supabase - DNE Digital Student ID

Este guia mostra como configurar o Supabase para o app de Carteira Digital de Estudante.

## 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha os dados:
   - **Name**: DNE Student ID (ou outro nome de sua preferência)
   - **Database Password**: crie uma senha forte e guarde-a
   - **Region**: escolha a região mais próxima (ex: South America - São Paulo)
5. Clique em **"Create new project"**
6. Aguarde alguns minutos enquanto o projeto é criado

## 2. Criar a Estrutura do Banco de Dados

1. No painel do Supabase, vá em **"SQL Editor"** (menu lateral)
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `schema.sql` deste projeto
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione Ctrl/Cmd + Enter)
6. Verifique se apareceu "Success. No rows returned" - isso significa que funcionou!

## 3. Configurar Storage para Fotos

O schema já cria o bucket automaticamente, mas você pode verificar:

1. No painel do Supabase, vá em **"Storage"** (menu lateral)
2. Você deve ver um bucket chamado **"student-photos"**
3. Se não existir, crie manualmente:
   - Clique em **"New bucket"**
   - Nome: `student-photos`
   - Marque **"Public bucket"**
   - Clique em **"Create bucket"**

## 4. Obter as Credenciais

1. No painel do Supabase, vá em **"Settings"** (menu lateral)
2. Clique em **"API"**
3. Copie os seguintes valores:
   - **Project URL**: é o `VITE_SUPABASE_URL`
   - **anon/public key**: é o `VITE_SUPABASE_ANON_KEY`

## 5. Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo chamado `.env`:
   ```bash
   cp .env.example .env
   ```

2. Abra o arquivo `.env` e preencha com suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
   ```

3. **IMPORTANTE**: O arquivo `.env` já está no `.gitignore` para não ser commitado

## 6. Testar a Conexão

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Abra o app no navegador

3. Tente fazer login com um CPF qualquer (ex: 123.456.789-00)

4. Como não existe no banco, você será direcionado para o cadastro

5. Preencha os dados e envie a foto

6. Verifique no Supabase:
   - Em **"Table Editor"** → **"students"**: deve aparecer o registro
   - Em **"Storage"** → **"student-photos"**: deve aparecer a foto

## 7. Verificar Políticas de Segurança (RLS)

O schema já cria as políticas, mas você pode verificar:

1. Vá em **"Authentication"** → **"Policies"**
2. Selecione a tabela **"students"**
3. Deve haver 3 políticas:
   - `Allow public read access`: permite qualquer um ler dados
   - `Allow public insert`: permite criar novos registros
   - `Allow update own data`: permite atualizar dados

## Estrutura da Tabela `students`

| Campo       | Tipo        | Descrição                          |
|-------------|-------------|------------------------------------|
| id          | UUID        | ID único (gerado automaticamente)  |
| cpf         | VARCHAR(14) | CPF formatado (único)              |
| name        | VARCHAR     | Nome completo                      |
| rg          | VARCHAR(20) | RG                                 |
| birth_date  | DATE        | Data de nascimento                 |
| course      | VARCHAR     | Curso                              |
| photo_url   | TEXT        | URL da foto no Storage             |
| institution | VARCHAR     | Instituição de ensino              |
| level       | VARCHAR     | Nível de ensino                    |
| matricula   | VARCHAR(20) | Número de matrícula (único)        |
| usage_code  | VARCHAR(20) | Código de uso (único)              |
| validity    | VARCHAR(20) | Data de validade                   |
| created_at  | TIMESTAMP   | Data de criação                    |
| updated_at  | TIMESTAMP   | Data de atualização                |

## Fluxo de Autenticação

1. **Login com CPF**:
   - Usuário digita CPF
   - App busca no banco (`findStudentByCpf`)
   - Se encontrar: faz login
   - Se não encontrar: vai para cadastro

2. **Cadastro**:
   - Usuário preenche dados
   - App faz upload da foto para Storage
   - App gera matrícula e código de uso únicos
   - App cria registro no banco (`createStudent`)
   - Usuário é logado automaticamente

3. **Atualização de Dados**:
   - Na tela de Perfil, usuário clica em "Editar"
   - Modifica dados
   - App atualiza registro no banco (`updateStudent`)

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe
- Verifique se as variáveis estão preenchidas corretamente
- Reinicie o servidor de desenvolvimento

### Erro ao criar registro
- Verifique se o schema foi executado corretamente
- Verifique as políticas RLS na tabela
- Verifique o console do navegador para mais detalhes

### Erro ao fazer upload de foto
- Verifique se o bucket `student-photos` existe
- Verifique se o bucket está configurado como público
- Verifique as políticas de Storage

### CPF duplicado
- Cada CPF só pode ter um registro
- Se tentar cadastrar CPF existente, dará erro
- Use a funcionalidade de login ao invés de cadastro

## Recursos Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
