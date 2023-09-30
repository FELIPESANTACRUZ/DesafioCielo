# Desafio Cielo
Desafio da Cielo organizado pela Ada Tech

<h3><a href= "https://ada.tech/">Ada Tech</a></h3>

# Projeto: Gestão de Clientes Cielo


# Autores

* Felipe Santa Cruz Simão


# Descrição
Este é um projeto de gestão de clientes desenvolvido como parte do Desafio CIELO. O projeto inclui funcionalidades para criar, listar, alterar e excluir clientes, bem como uma fila de atendimento.

## Recursos

- **Criar Cliente:** Adicione novos clientes à base de dados com informações como CNPJ, Razão Social, MCC, CPF do Contato, Nome do Contato e Email do Contato.

- **Listar Cliente:** Visualize a lista de todos os clientes cadastrados.

- **Alterar Cliente:** Atualize as informações de um cliente existente com base no CNPJ.

- **Excluir Cliente:** Remova clientes da base de dados, com uma confirmação para evitar exclusões acidentais.

- **Fila de Atendimento:** Consulte o próximo cliente na fila de atendimento.

## Tecnologias Utilizadas

- Java
- Banco de dados H2
- Sping Boot
- React.js
- React Router para navegação
- Bootstrap 5 para estilos e componentes responsivos
- Axios para comunicação com a API de backend

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- <p>Java sdk 17.9.8 <h3><a href= "https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html">Oracle Java SDK</a></h3></p>

## ferramentas utilizadas
<p>IntelliJ 2023.2.2 <h3><a href= "[https://www.jetbrains.com/pt-br/idea/download/?section=windows]">JetBrains Intellij</a></h3></p>
<p>Visual Studio Code 1.82.2 <h3><a href= "[https://code.visualstudio.com/download]">Visual Studio Code </a></h3></p>

## Instalação e Uso

# BACKEND

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. Navegue até o diretório do projeto:

   ```bash
   cd seu-repositorio
   certifique de estar no diretório raiz 'Desafio1'

3.Utilize uma IDE para compilar o projeto:
 - indico o intelliJ


4.Inicie a aplicação:
- de start

- 5.devera abrir esse endpoint da api documentada com swagger http://localhost:9090/swagger-ui/index.html#

5.utilize o banco de dados H2
 - acesse o endpoint  http://localhost:9090/h2/
 -  configurar da seguinte forma o acesso ao banco
 -  Driver Class : org.h2.Driver
 -  JDBC URL: jdbc:h2:mem:cadastro
 -  User Name: sa
 -  Password : password


   ![Banco Conexao](https://receitasdecodigo.com.br/image/tela-de-login-console-web-h2-2017-08-23-18-32-31.png)




# FRONTEND

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. Navegue até o diretório do projeto:

   ```bash
   cd seu-repositorio
   certifique de estar no diretório raiz 'desafio3'

3.Instale as dependências:

      
        npm install

4.Inicie a aplicação:
    

      npm start

5.Acesse a aplicação em seu navegador: http://localhost:3000






## Licença
Este projeto é licenciado sob a MIT License.


# Releases

1.0



