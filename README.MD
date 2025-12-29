# POS TEACH
Esse é um projeto do curso de FullStack da turma 6FSDT. 

O **Posteach** é um software inicialmente desenvolvido na plataforma **OutSystems**, que ao longo das fases esta evoluindo para um projeto fullstack totalmente em javascript.

## Sobre
Voltado para conectar **professores e alunos** em um ambiente digital simples, rápido e visual.  
A idéia do **PosTeach** é uma brincadeira com a palavra **post-it** que sonoramente similar a **Post Teach**, passando a ideia que o professor está entregando um post-it para o aluno de temas importantes.

## Por trás do projeto
Decidi deixar o projeto backend e frontend no mesmo repositório para facilitar o deploy e avaliação dos professores. Existe um script para facilitar a execução do projeto, abaixo mais informações.

### Backend
Foi desenvolvido em NodeJs, Express e Mysql com Sequelize como ORM. Optei por utilizar essas tecnologias por ter mais familiariedade em projetos de estudos anteriores. O Backend segue uma estrutura MVC, documentação feita com swagger e testes feitos com JEST.
O backend conta com JWT authentication para gerencia dos tokens e bcrypt para criptografia de senhas.

### Frontend
O frontend foi feito em react e como biblioteca auxiliar para componentes e estilização optei por utilizar o "react-bootstrap", ele já entrega componentes responsivos assim podendo focar melhor nas funcionalidades do projeto e integrações.
A definição do tema do projeto foi importante para facilitar a contrução do frontend, facilitando a escolha de cores e imagens para o projeto.
Trabalhei com dois componentes customizados para ajudar na padronização da plataforma, outros componentes podem surgir no futuro, eles estarão descritos na documentação em pendências.
O Formik e Yup são apresentados nas matérias da postech e foram importantes para facilitar os formulários do projeto.

## Acessos
Documentação
```bash
http://localhost:3000/api-docs/
```

GUI Teste:
```bash
http://localhost:5173/login
```

GUI Produção:
```bash
http://localhost:/login
```

## Pendendias
* Ajustar o Back e Front para receber e exibir imagens de post e usuário;
* Ajustar tabela de usuários e em myposts, esta qubreando em telas pequenas;
* Redirecionar endpoints quando não existentes aparecer pagina 404;
* Se o token expirar ser redirecionado para o login;
* Criar componente para filtro;


## Destaque
Aproveitamento de componentes customizados, para padronização da plataforma. Adicionando condições aos commponentes para reutilizalos
