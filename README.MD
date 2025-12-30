# POS TEACH
Esse é um projeto do curso de FullStack da turma 6FSDT. 

O **Posteach** é um software inicialmente desenvolvido na plataforma **OutSystems**, que ao longo das fases esta evoluindo para um projeto fullstack totalmente em javascript.

## Sobre
Voltado para conectar **professores e alunos** em um ambiente digital simples, rápido e visual.  
A idéia do **PosTeach** é uma brincadeira com a palavra **post-it** que sonoramente similar a **Post Teach**, passando a ideia que o professor está entregando um post-it para o aluno de temas importantes.

## Por trás do projeto
Decidi deixar o projeto backend e frontend no mesmo repositório para facilitar o deploy e avaliação dos professores. Por mais que não seja recomendado as variáveis de ambiente foram deixadas no diretório para facilitar os testes.

### Backend
Foi desenvolvido em NodeJs, Express e Mysql com Sequelize como ORM. Optei por utilizar essas tecnologias por ter mais familiariedade em projetos de estudos anteriores. O Backend segue uma estrutura MVC, documentação feita com swagger e testes feitos com JEST.
O backend conta com JWT authentication para gerencia dos tokens e bcrypt para criptografia de senhas.

### Frontend
O frontend foi feito em react e como biblioteca auxiliar para componentes e estilização optei por utilizar o "react-bootstrap", ele já entrega componentes responsivos assim podendo focar melhor nas funcionalidades do projeto e integrações.
A definição do tema do projeto foi importante para facilitar a contrução do frontend, facilitando a escolha de cores e imagens para o projeto.
Trabalhei com dois componentes customizados para ajudar na padronização da plataforma, outros componentes podem surgir no futuro, eles estarão descritos na documentação em pendências.
O Formik e Yup são apresentados nas matérias da postech e foram importantes para facilitar os formulários do projeto.

## Teste
Para realizar os teste execute o container do backend no diretório 'back'.
```bash
docker compose up --build
```
Em outro terminal execute o teste no mesmo diretório 'back'.
```bash
npm run test
```
É esperado todos testes sinalizem comom 'passed'.

## Deploy
Suba o container do backend no diretório `back` com o comando
```bash
docker compose up --build
```
Em seguida suba o container do frontend no diretório `front/posteach-front``
```bash
docker compose up --build
```
Acesse a aplicação pelo browser em 
```bash
http://localhost:8081/login
``` 
A senha padrão para usuáiro admin:
```bash
login: admin@admin.com
senha: admin
```
Assim a aplicação esta pronta para ser utilizada.

## Acessos
Documentação com swagger:
```bash
http://localhost:3000/api-docs/
```

GUI Produção, se executar o container em docker com `docker compose up --build`:
```bash
http://localhost:8081/login
```

GUI Teste, caso execute a aplicação em ambiente de desenvolvimento com `npm run dev`:
```bash
http://localhost:5173/login
```



## Pendências
* Ajustar o Back e Front para receber e exibir imagens de post e usuário;
* Ajustar tabela de usuários e em myposts, esta 'qubrando' em telas pequenas;
* Redirecionar endpoints quando não existentes aparecer pagina 404;
* Se o token expirar ser redirecionado para o login;
* Criar componente para filtro;
* Deixar o projeto inteiro em um docker-compose, para facilitar a execução

# Dificuldades e aprendizados
* Tive dificuldades na elaboração dos testes, para mim os testes ainda não estão 100%, precisam ser mais estudados. Para mim ficou redundante fazer os testes, porque quando vou construindo o back end eu vou testando e ajustando, talvez em projetos maiores com mais pessoas contribuindo seria melhor aproveitado os testes;
* Dificuldade de design, não tenho muita experiência com design, deixando assim minha interface com somente um OK, e nada de especial que chame a atenção;
* Typescript, eu realmente gostaria de ter utilizado Typescript no projeto, por ser muito enfatizado sobre como a tipagem é importante, mas isso adicionou complexidade ao projeto e ainda não cheguei em um passo que a tipagem fosse extremamente necessária. O javascript deixa mais simples por isso decidi permanecer nele;
* Para me ajudar e dar mais agilidade utilizei o copilot no vscode, foi extremamente importante a ferramenta para agilizar o processo e aprendizado, tentei travar o máximo possivel o copilot para ele não escrever um código que saia do meu controle e entedimento. Minha sensação com IA é que eu conseguiria fazer o projeto sem a IA, mas não conseguiria fazer no tempo e não entregaria o projeto no ponto que esta agora
