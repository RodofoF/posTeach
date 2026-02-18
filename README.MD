# POS TEACH
Esse é um projeto do curso de FullStack da turma 6FSDT. 

O **Posteach** é um software inicialmente desenvolvido na plataforma **OutSystems**, que ao longo das fases esta evoluindo para um projeto fullstack nesse momento estamos desenvolvendo a aplicação mobile com react-native.

## Video
Em anexo ao projeto anexei o vídeo do projeto, mas caso haja algum problema abaixo tem um link do video.

```bash
https://lucianospeedcast-my.sharepoint.com/:v:/g/personal/rodolfo_speedcast_com_br/IQCaUBpo4ksZTqcUUDCfc4ccAWXSIXhebosXDb4-FpRBniw?e=TVVikl
```

## Sobre
Voltado para conectar **professores e alunos** em um ambiente digital simples, rápido e visual.  
A idéia do **PosTeach** é uma brincadeira com a palavra **post-it** que sonoramente similar a **Post Teach**, passando a ideia que o professor está entregando um post-it para o aluno de temas importantes.

## Por trás do projeto
Decidi deixar o projeto backend, frontend e mobile no mesmo repositório para facilitar o deploy e avaliação dos professores. Esse README é referente a aplicação mobile sendo ela o tópico da fase atual. Por mais que não seja recomendado as variáveis de ambiente foram deixadas no diretório para facilitar os testes.

###  Frontend e Backend
Não vou me extender nos tópicos anteriores, mas vale mencionar que não houveram alteraçoes da estrutura dos projetos das fases anteriores, por mais que houvessem pendencias referêntes ao backend e recomendações dos professor avaliador da fase anterior. Caso decida consultar os READMEs anteriores se encontram nos diretórios de acordo com cada fase.


## Deploy
Prepare o backend e suba o container no diretório `back` com o comando
```bash
docker compose up --build
```

No diretório `mobile/posTeachApp` altere o ip de acordo com o IP da maquina que esta fazendo teste
```bash
EXPO_PUBLIC_BACKEND_URL=http://<SEU_IP>:3000/api
```

No diretório `mobile/posTeachApp` suba a aplicação com o comando abaixo. Nessa fase de desenvolvimento estamos utilizando o Expo como "emulador" android e ios. É importante que tenha o "Expo Go" instalado em seu dispositivo para que consiga testar a aplicação.
```bash
npx expo start
```

Escaneando o QR Code gerado no terminal, após o escaneamento com seu celular, você terá acesso ao aplicativo **posTeachApp**.

A senha padrão para admin, a consta esta com previlégios de Professor, então é possivel gerenciar o app com ela:
```bash
login: admin@admin.com
senha: admin
```

## Acessos
Documentação do backend com swagger:
```bash
http://localhost:3000/api-docs/
```


## Aprendizados no React-Native
* Maior facilidade para criar um layout, já que hoje em dia utilizamoms mais aplicativos e eles são pensados para ser mais simples;
* Tentei implantar um FlatList com limite de carregamento, mas  o backend não esta preparado para receber requisiçoes com limit, então foi implementado um flatlist simples;
* Como o projeto é pequeno e não é visado para produção ou crescimento, optei por deixar da forma mais simples os arquivos de screen;
* Novamente optei pelo JavaScript, não vi necessida de utilizar o TypeScript, talvez na resolução de erros seria melhor identificado qual seria o erro, mas até o momento não tive essa experiência;
* Utilizei de components para facilitar a criação das páginas, tornando menos verboso o projeto e ajudando na lógica e manutenção;
* Tive muitos erros relacionados a estilização, em geral os erros falavam que as medidas estavam negativas, havia dificuldade em entender onde estava os erros relacionados a estilo, porque eles não era exibidos durante o desenvolvimento, somente quando estava testando o app pelo Expo e as vezes o erro aparecia e as vezes não, o copilot foi essencial para resolver esses erros;
* Como o projeto anterior foi em React, fazer o projeto em React-native foi familiar e os erros que cometi desenvolvendo em React pude corrigir desenvolvendo com React-Native

## Pendências
* Preparar o App para enviar imagens para o backend (Usuário e Post);
* Ajustar pequenas falhas no layout, como teclado do dispositivo cobrindo alguns inputs;
* Melhorar animações;

## Informações do Criador
**Nome**: Rodolfo Ferreira Fernandes
**E-mail**: rdf.8888@gmail.com
**RM** 365194



