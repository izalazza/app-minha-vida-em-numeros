# 🎶 Diário Musical

Este é um projeto de aplicativo mobile desenvolvido como parte da disciplina de **Programação Mobile**, do curso técnico em **Desenvolvimento de Sistemas**, lecionada pelo **Professor Artur Scolari**.
O objetivo é criar um diário pessoal para registrar e acompanhar hábitos musicais diários, com dados salvos de forma persistente no dispositivo.


## 🎧 Sobre o Projeto

O **Diário Musical** é um aplicativo que permite ao usuário registrar informações sobre sua rotina de escuta de música.
É possível anotar **quantas músicas foram ouvidas no dia**, **quantas horas foram dedicadas à música** e **quantas novas músicas ou artistas foram descobertos**.
O app também oferece funcionalidades de **ordenar os registros**, **editar ou excluir** informações e **visualizar os dados em um gráfico**, permitindo acompanhar sua evolução musical ao longo do tempo.


## 🚀 Tecnologias Utilizadas

* **React Native:** Framework para o desenvolvimento de aplicativos mobile.
* **Expo:** Plataforma e conjunto de ferramentas que facilitam o uso do React Native.
* **JavaScript:** Linguagem principal usada no projeto.
* **AsyncStorage (via serviço local personalizado):** Responsável pela persistência dos dados no dispositivo.
* **React Native Chart Kit:** Utilizado para gerar o gráfico com a evolução das métricas musicais.
* **Expo File System e Expo Sharing:** Para exportar os dados em arquivo `.json`.


## ✨ Funcionalidades Principais

* [x] Criação, edição e exclusão de registros diários (CRUD completo).
* [x] Armazenamento local e persistente dos dados.
* [x] Validação para evitar inserção de valores inválidos (negativos ou horas acima de 24).
* [x] Ordenação dos registros por **recentes**, **mais/menos músicas** e **mais/menos horas**.
* [x] Visualização gráfica da evolução diária dos registros.
* [x] Exportação dos dados para um arquivo JSON.


## 📱 Como Executar

O aplicativo foi desenvolvido e testado no ambiente **Expo Snack**.
Para executá-lo:

1. Acesse o link do projeto no **[expo.dev/snack](https://snack.expo.dev/)**.
2. Clique em **“Run”** ou leia o QR Code com o aplicativo **Expo Go** no seu celular.
3. Também é possível gerar um arquivo `.apk` e instalar o app diretamente em dispositivos Android, disponível na seção **Releases** deste repositório.



Quer que eu monte a versão **formatada em Markdown pronta para colar no README.md** do seu projeto (com emojis e espaçamento bonitinho)?
