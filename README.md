
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" width="50" margin="10" />        

# Microservice Authenticator

<img align="right" alt="Felipe-pic" height="150" style="border-radius:50px;" src="https://cdn.discordapp.com/attachments/982734709995995189/982738445736755270/image.png?width=676&height=676">          

Você dev. já trabalhou com vários projetos diferentes e teve que fazer autenticação em todos eles? então porquê não subir um microserviço de autenticação que vai se conectar a todos os seus projetos e ao invés de ter que implementar uma autenticação em cada novo sistema, apenas precisa subir esse projeto uma vez, integrar com ele e usá-lo, não precisa implementar toda a parte de autenticação e uma melhoria nesse serviço representa uma melhoria de autenticação em todos os seus projetos. Esse projeto ta tem toda a parte de criação de atenticação, sessões, relatórios e recuração de senha, esse projeto é um microserviço então ele é pequeno e bem focado no que se propõe, "autenticação", o que facilita a manutenção.

```Esse projeto é OpenSouce então sinta-se a vontade pra melhorá-lo.```

## Este projeto usa Nest com Typescript e TypeORM e é dividido nos seguintes módulos:


    .
    ├── src
    ├──── app
    ├────── analytics (Responsável pelos relatórios)
    ├────── auth (Responsável por criar/autenticar usuários)
    ├────── recover-password (Responsável por criar e enviar tokens/validar se o tokens/atualizar senha do usuário pelo token de recuperacao)
    ├────── session (Responsável por armazenar sessões dos usuários logados, sessões essas que podem ser consultadas pra validar se um usuário está conectado)
    ├────── mail (Módulo chamado quando há eventos de criaçao de usuário/auth ou envio de token de recuperação de senha, a chamada deverá chamar outro microserviço pois não é a função desse microserviço)
    └── README.md
    
```
Implementações futuras:
- Colocar no .env se o usuário pode ter apenas uma sessão ativa e quando loga, desloga as outra sessões
- Authenticação por QRCode
```

## Requests

<p>Na pasta requests há exemplos de requisições, que podem ser disparadas pelo próprio VisualCode, para usá-los basta instalar a extenção "REST Client"</p>
<p>Link para a extenção https://marketplace.visualstudio.com/items?itemName=humao.rest-client</p>


    .
    ├── requests
    ├──── analytics.http
    ├──── analytics.http
    ├──── auth.http
    └──── recover-password.http


### Lista de funcionalidades

```
Parâmetro "application" será utilizado pra validar qual a aplicação a pessoa esta se referindo
ex: application: "gmail"|application: "easychannel"|application: "rede_social"
```

## Auth

- Create Login
- Login

## Session

- Valida um token de sessão e pra qual usuário ele é
- Lista todos os tokens ativos do usuário
- Desloga da sessão atual
- Desloga de todas as sessões do usuário

## Recover Password

- Cria e envia o token de recuperação de senha para o e-mail
- Valida se o token de recuperação de senha é válido
- Atualiza a senha do auth/usuário baseado no token de recuperação válido

## Analytics

- Relatório no momento
- Lista relatórios diários

```
Um registro na tabela analytics é gerado todos os dias a 1 da manhã, assim é possível ter um histórico de novos usuários,
sessões ativas, sessões por usuário e muito mais
```

## Como vincular um login à um usuário no meu sistema

Geralmente quando se cria um sistema o usuário tem os dados de autenticação como senha por exemplo, ao invés desses dados ficarem na tabela de usuários, apenas terá um auth_id vinculado ao microsservice-auth que deverá ser criado quando o usuário se cadastrar e ao realizar o login no microsservice-auth, retornará um auth_id que estará vinculado a um usuário

![alt text](http://url/to/img.png)

