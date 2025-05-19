# 🎥 API_streaming_videos (Ícaro Ramos)

Este projeto consiste em uma **API para uma plataforma de streaming de vídeos**, semelhante ao YouTube, desenvolvida com **Node.js**, **Express** e **MongoDB**. O objetivo principal é construir uma **biblioteca de classes para acesso a SGBDs**, com foco em:

- Armazenamento de vídeos
- Busca de vídeos
- Gestão de usuários (canais)
- Criação de playlists personalizadas

---

## 📦 Estrutura das Classes

### 📹 Classe `Video`

Representa um vídeo enviado à plataforma.

#### Atributos:

- `id`: Identificador único do vídeo.
- `usuarioId`: ID do usuário que enviou o vídeo.
- `titulo`: Título do vídeo.
- `descricao`: Descrição do vídeo.
- `url`: URL do vídeo.
- `dataPublicacao`: Data e hora da publicação.
- `duracao`: Duração do vídeo em segundos.
- `visualizacoes`: Contagem de visualizações.
- `likes`: Número de likes.
- `categoria`: Categoria do vídeo (ex: Música, Jogos, etc).

#### Métodos:

- `inserir()`: Adiciona um novo vídeo.
- `buscarPorId(id)`: Retorna um vídeo específico.
- `buscar(filtros)`: Filtra vídeos por título, categoria, etc.
- `atualizar(id, dados)`: Atualiza dados de um vídeo.
- `deletar(id)`: Remove um vídeo.
- `incrementarVisualizacao()`: Aumenta a contagem de visualizações.
- `adicionarLike()`: Incrementa os likes.
- `removerLike()`: Decrementa os likes.

---

### 👤 Classe `Usuario`

Representa um canal ou usuário da plataforma.

#### Atributos:

- `id`: Identificador único.
- `nome`: Nome do usuário.
- `username`: Nome de usuário único.
- `email`: E-mail de login.
- `senha`: Hash da senha.
- `bio`: Biografia do canal (opcional).
- `fotoPerfilUrl`: URL da foto/banner.
- `dataCriacao`: Data de criação da conta.
- `inscritos`: Quantidade de inscritos.
- `assinaturas`: Lista de canais assinados.

#### Métodos:

- `inserir()`: Cria um novo usuário.
- `buscarPorId(id)`: Busca usuário por ID.
- `buscarPorUsername(username)`: Busca pelo nome de usuário.
- `atualizar(id, dados)`: Atualiza perfil.
- `incrementarInscritos()`: Aumenta contagem de inscritos.
- `decrementarInscritos()`: Diminui contagem de inscritos.
- `inscrever(canalId)`: Inscreve-se em outro canal.
- `desinscrever(canalId)`: Cancela inscrição.

---

### 🎞️ Classe `Playlist`

Representa uma playlist de vídeos.

#### Atributos:

- `id`: Identificador único da playlist.
- `usuarioId`: Dono da playlist.
- `titulo`: Nome da playlist.
- `descricao`: Descrição (opcional).
- `dataCriacao`: Data de criação.
- `dataAtualizacao`: Última atualização.
- `privacidade`: Pública, privada ou não listada.
- `videos`: Lista ordenada de vídeos.

#### Métodos:

- `inserir()`: Cria uma nova playlist.
- `buscarPorId(id)`: Retorna uma playlist.
- `buscarPorUsuario(usuarioId)`: Lista playlists de um usuário.
- `buscar(filtros)`: Busca por título, visibilidade, etc.
- `atualizar(id, dados)`: Altera os dados da playlist.
- `adicionarVideo(videoId)`: Adiciona vídeo à lista.
- `removerVideo(videoId)`: Remove vídeo da lista.
- `deletar(id)`: Remove a playlist.

---

## 🧪 Validações e Logs

- Todos os campos obrigatórios possuem validação com Mongoose.
- O sistema possui tratamento centralizado de exceções.
- Erros são registrados automaticamente em `logs/erros.log` usando `fs`.

---

## 📓 Exemplos

### Criar novo video.

**POST** `/videos`

**Request Body:**

```json
{
  "usuarioId": "662ba1895c8b202d5ef7c941",
  "titulo": "Primeiro vídeo",
  "descricao": "Descrição do vídeo",
  "url": "http://meuvideo.com/video1.mp4",
  "duracao": 300,
  "categoria": "Educação"
}
```

---

### Registrar usuário

**POST** `/usuarios`

**Request Body:**

```json
{
  "nome": "João da Silva",
  "username": "joaodasilva",
  "email": "joao@testeemail.com",
  "senha": "minhasenha123",
  "bio": "Canal sobre tecnologia",
  "fotoPerfilUrl": "https://meucanal.com/foto.jpg"
}
```

---

### Criar playlist.

**POST** `/playlists`

**Request Body:**

```json
{
  "usuarioId": "6650ab7ae50fead25a0669f1",
  "titulo": "Meus vídeos favoritos",
  "descricao": "Uma seleção dos melhores vídeos",
  "privacidade": "publica"
}
```

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker e Docker Compose](https://docs.docker.com/compose/)

### 1. Instale as dependências

```bash
npm install
```

### 2. Execute o Docker para iniciar o MongoDB

```bash
docker-compose up -d
```
