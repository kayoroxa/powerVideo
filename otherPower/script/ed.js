const _myScript = `
I liked this film
eu gostei desse filme

I'm not convinced at all
não estou nada convencido

Have you finished it?
Você terminou?

We debated the problem
Debatemos o problema

We discussed the problem
Nós discutimos o problema

We discussed what to do
Nós discutimos o que fazer

We appreciate your continued support   
Nós apreciamos o seu suporte contínuo

I'm tired of it
Estou cansado disso

We all have missed you
Todos nós sentimos sua falta

I missed the bus
Perdi o meu ônibus

The pilot described the scene in detail
O piloto descreveu a cena em detalhes

You looked at me
você olhou para mim

I just dropped in
acabei de entrar

It happened just like this
Aconteceu assim

I rejected the offer
Eu rejeitei a oferta

The plan was discussed in detail       
O plano foi discutido em detalhes

What happened here?
O que aconteceu aqui?

This is based on fact
Isso é baseado no fato

It saved me
Isso me salvou

You guessed right
você adivinhou certo

I enjoyed your company
gostei da sua companhia

I guessed right
eu adivinhei certo

We have overlooked this important fact 
Nós negligenciamos este fato importante

We attempted the experiment
Tentamos o experimento

We chartered a bus
Nós fretamos um ônibus

I pawned my camera
Eu penhorei minha câmera

I have just arrived here
acabei de chegar aqui

I reflected on the problem
Eu refleti sobre o problema

I attempted to solve the problem       
tentei resolver o problema

I decided to be a doctor
decidi ser médica

I adhered to my decision
Eu aderi à minha decisão

I turned right
virei à direita

I'm not what I used to be
Eu não sou o que costumava ser

I tried to escape
eu tentei escapar

We all have passed the test
Todos nós passamos no teste

You changed it?
Você mudou isso?

I'm not tired at all
eu não estou nem um pouco cansado

You are not logged in
você não está logado

I'm used to it
estou acostumado com isso

What happened on the bus?
O que aconteceu no ônibus?

I missed you
Senti a sua falta

I'm worried for you
estou preocupada com você

What are you interested in?
Em quê você está interessado?

We live in the United States
Vivemos nos Estados Unidos

You disappointed me
Tu desapontaste-me

You are qualified to be a doctor
Você está qualificado para ser um médico

I used to respect you
eu te respeitava

We rented the apartment
Alugamos o apartamento

The car was destroyed in the accident
O carro ficou destruído no acidente

The service agent helped me solve my problem
O agente de serviço me ajudou a resolver meu problema

The situation resulted in violence
A situação resultou em violência

I'm ashamed of you
tenho vergonha de voce

The president saluted the public
O presidente cumprimentou a população

We have recently discussed this problem
Discutimos recentemente este problema

I'm disappointed in you
Estou decepcionado com você

I betrayed you
eu te traí

It's important that I be informed immediately
É importante que eu seja informado imediatamente

It amazed me
Isso me surpreendeu

What happened to my car?
O que aconteceu com meu carro?

It reminded me of you
Isso me lembrou de você

I finally passed that test
finalmente passei no teste

That's what I expected it to be like
Isso é o que eu esperava que fosse

This is a restricted area
Esta é uma área restrita

I was humiliated in public
Fui humilhado em público

I imagined that
Imaginei que

Have you watched it?
Você assistiu?

We climbed to the top
Subimos ao topo

That's all I wanted to know
isso é tudo que eu queria saber

This is what you're supposed to do
Isso é o que você deveria fazer

What was I supposed to do?
O que eu deveria fazer?

I washed the car
lavei o carro

This happened to me
isso aconteceu comigo

You crossed the line
Voce abusou

This just happened to me
Isto somente aconteceu para mim

Have you tried it?
Tentaste?

I accepted the offer
eu aceitei a oferta

You promised me
Você me prometeu

I'm not interested in your opinion
Eu não estou interessado na sua opinião

What happened to you?
O que aconteceu com você?

I'm delighted to be here
Estou feliz por estar aqui

You deserved it
Você mereceu isso

I deserved it
eu mereci

Have you measured it?
Você mediu?

I was forced to do it
eu fui forçado a fazer isso

You're not supposed to be in here
Você não deveria estar aqui

Are you interested in me?
Está interressada em mim?

I rescued you
eu te salvei

You are entitled to your opinion
Você tem direito a sua opinião

I loved you
eu te amei

What are we supposed to do?
O que devemos fazer?

I believed you
eu acreditei em você

I trusted you
eu confiei em você

What scared you?
O que te assustou?

What happened in here?
O que aconteceu aqui?

I just borrowed it
acabei de pegar emprestado

I just opened it
acabei de abrir

I waited for you
eu esperei por você

You lied to me
Você mentiu para mim

We just moved in
Acabamos de nos mudar

You betrayed me
Você me traiu

I motivated you
eu te motivei

You're not supposed to be here
Você não deveria estar aqui

`

export const myScript = _myScript
  .replace(/\n{2,}/g, '\n\n')
  .split('\n\n')
  .filter(Boolean)
  .map(line => line.split('\n').filter(Boolean))
