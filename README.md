# 🌠 Across the Starts
<p align="center">
  <img src="https://github.com/Ishidawg/across-the-starts/blob/main/public/svg/asteroid-milkshake.svg" alt="Asteroid Milkshake" width="300"/>
</p>

Across the Starts é um jogo interativo onde o jogador ajuda uma menina a estabilizar uma nave para alcançar a lua. O projeto foi desenvolvido com Next.js e Framer Motion, utilizando lógica de estados, shaders e animações suaves.

---

## 🎮 Objetivo do Jogo

A missão é simples, mas desafiadora: *estabilizar a nave* por meio da alavanca e semáforo para que a menina consiga alcançar a lua.

---

## 👩‍🚀 Como Funciona


O jogo é dividido em *cenas interativas*, onde o jogador:
- Interage com a alavanca (Lever.tsx)
- Ativa luzes de controle (TrafficLights.tsx)
- Usa painéis com botões (ButtonsPanel.tsx)
- Acompanha os diálogos e transições entre os eventos (dialog/index.tsx, TransitionLayout.tsx)

🔒 A *alavanca de decolagem* só pode ser ativada quando todos os 6 botões do painel estiverem ligados, sinalizados pelo semáforo verde.

📶 O *semáforo* serve como um indicador visual de segurança para a decolagem.

📱 O layout é responsivo e se adapta ao tamanho da tela para manter a experiência fluida no celular e no desktop.


---

## 🔧 Tecnologias Usadas

- *Next.js* – Framework React para aplicações web
- *TypeScript* – Tipagem forte para maior segurança
- *Framer Motion* – Animações fluidas e naturais
- *GLSL Shaders* – Para efeitos de estrelas em movimento (Stars.tsx e StarsSpeeding.tsx)

---

## 🔍 Funcionalidades

-   ✅ Interface responsiva com layout fluido
    
-   🎮 Interações com painéis, luzes e alavancas
    
-   💬 Sistema de diálogo dinâmico por cena
    
-   🚦 Validação de estado antes da decolagem
    
-   🌌 Animações de estrelas com shaders GLSL
    
-   🔄 Transições suaves entre cenas com Framer Motion
---

## 🧠 Lógica Principal

- O estado da nave é controlado por interações do jogador
- Cada interação modifica a cena ou altera elementos visuais
- A estabilização depende de ativar corretamente cada componente da cabine
- O botão de avanço (SceneButton.tsx) só aparece quando todos os elementos da cena foram ativados com sucesso

---

## 🧩 Estrutura do Projeto

- /src
  - app
    - components
      - animations → Animações e efeitos visuais
      - controls → Botões, alavancas e painéis
      - dialog → Balões de diálogo e textos
      - shaders → Efeitos com shaders (como estrelas)
      - spaceship
        - page.tsx → Página da nave (cena específica)
    - favicon.ico → Ícone do site
    - globals.css → Estilização global
    - layout.tsx → Layout raiz do App Router
    - page.tsx → Página inicial
- /public
  - png → Imagens PNG
  - svg → Imagens SVG

## 🌀 Fluxo do Jogo

1.  O jogador começa na *Cena 1* e interage com o painel.
    
2.  Os elementos ativados corretamente liberam o botão de troca de cena.
    
3.  A troca é feita com useRouter e animação com Framer Motion.
    
4.  Diálogos orientam o jogador e são carregados dinamicamente de data.ts.
    
5.  A missão é concluída com a decolagem da nave.

## 💬 Diálogos Dinâmicos

Os diálogos são definidos como objetos de texto com id, personagem e texto. Eles são usados para orientar o jogador e dar vida à narrativa. Onde o initialDialog é um array de string:

Exemplo:
ts
<Dialog pages={initialDialog} position="bottom" />

 const initialDialog = [
    "Por conta dos detritos e rochas no espaço, a nave está fora de controle!",
    "Puxe a alavanca no momento em que o semáforo ficar verde.",
    "Assim evitamos colisões e conseguimos velocidade para escapar daqui!",
    "Caso não conseguir... teremos problemas... hehe",
    "Boa sorte!",
  ];

Esses diálogos funcionam como um pequeno guia para o jogador.

## 📦 Exemplo com Framer Motion

O projeto usa transições animadas como esta:

tsx
<motion.div initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
> <CenaAtual />
</motion.div>


## 🛠️ Como Rodar Localmente

1.  Clone o repositório:
    bash
     git clone https://github.com/Ishidawg/across-the-starts
    
2. Acesse a pasta do projeto:
    bash
   cd across-the-starts
    
3.  Instale as dependências:
    bash
    npm install
    
4. Rode o projeto:
    bash
    npm run dev
    
## 👩‍💻 Autores
-   Cíntia – [[cintiambr](https://github.com/cintiambr)]
    
-   Maria Eduarda – [[dudabertuzzi](https://github.com/dudabertuzzi)]
    
-  Willian – [[Ishidawg](https://github.com/Ishidawg)]
    
-   Yasmim – [[@yasmimlb](https://github.com/yasmimlb)]


## 🌕 Fim da Jornada

A cada passo dado, a nave se aproxima da lua. A missão está nas suas mãos:  
*controle, estabilize e voe!*
