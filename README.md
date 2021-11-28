# Mergex API

## To-do

- [x] Criação de usuário usando o codígo de autenticação do github e dados extras
  - [x] Email, Name, Username, Bio, Password
  - [x] Pegar dados do github do usuário e salvar
  - [x] Gerar token de autenticação
  - [x] O usuário não pode criar outro usuário com o mesmo email ou github_id
  - [x] O usuário não pode ser criado com um username que já existe
- [x] Login de usuário usando o github_id e senha
- [x] Login de usuário usando o email e senha
- [x] Criação de profile do usuário
  - [x] O usuário pode usar o mesmo avatar que está no github ou pode escolher um avatar diferente
  - [x] O usuário pode escolher um banner para o profile
  - [x] O usário pode definir sua localização
  - [x] O usuário pode definir sua data de nascimento
  - [x] O usuário pode definir um link para o seu website
- [x] Busca de usuários
  - [ ] Buscar por nome
  - [ ] Buscar por username
  - [ ] Buscar por localização
  - [ ] Buscar por data de nascimento
- [x] Criação de posts
  - [x] Apenas usuários autenticados podem criar posts
  - [x] Lista de posts deve ser ordenada por data de criação
  - [x] Fazer cache dos posts
  - [ ] O usuário pode deletar seu post
