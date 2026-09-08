## Integrantes

- Gustavo Galvão – RM: 565969
- Lucas Tamura – RM: 563249

## Objetivo da atividade

Nessa fase o objetivo era transformar o protótipo interativo do Flui em um aplicativo funcional de verdade, implementando um mapa interativo com google maps, fichas de ponto com dados simulados e com os filtros de busca funcionando.

## YOUTUBE LINK

https://youtu.be/RM65Ig18ofg

## Ferramentas utilizadas

Visual Studio Code, Node.JS, Android Studio

## INSTRUÇÕES PARA AQUELES QUE QUEREM RODAR O PROJETO PURO

Siga estas instruções simples para configurar o ambiente e testar a plataforma:

1 - Clone o repositório no terminal.

2 - Instale as dependências no terminal do VS Code:

"npm install"

3 - Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione a sua chave de conexão com o google maps da seguinte forma:

GOOGLE_MAPS_API_KEY=sua_chave_aqui

4 - Configurar local.properties:
No terminal usar o comando: sdk.dir=C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
Utilizando o caminho usado em seu computador.

5 - Faça a primeira compilação:
npx expo run:android

6 - Inicie o aplicativo:
Abra o Android Studio, abra a parte de Virtual Device Manager e emule um dispositivo, em seguida, após a compilaçãoser concluída:
Aperte a tecla "A" no teclado para inciar o aplicativo no emulador.

Ou se o terminal foi fechado entre as etapas mas o aplicativo já foi compilado antes use o comando:
npx expo start

E assim que o aplicativo iniciar aperte a tecla "A" no teclado para iniciar o aplicativo no emulador.
