# 🌠 Across the Stars · [Jogue Online 🚀](https://across-the-stars.vercel.app)


![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![tsParticles](https://img.shields.io/badge/tsParticles-EF0179?style=for-the-badge&logo=tsparticles&logoColor=white)
![useSound](https://img.shields.io/badge/useSound-EF0179?style=for-the-badge&logo=usesound&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<p align="center">
  <img src="https://github.com/Ishidawg/across-the-stars/blob/main/src/assets/svg/rocket/spacecat.svg?raw=true" alt="Space Cat" width="300"/>
</p>

**Across the Stars** é um jogo interativo onde o jogador embarca em uma jornada pela galáxia, viajando de mundo em mundo atrás de cartuchos de jogos raros. A aventura combina minigames desafiadores, escolhas estratégicas e uma narrativa envolvente, tudo desenvolvido com Vite + JS + React.

---

## 🎮 Objetivo do Jogo

A missão do jogador é explorar diferentes mundos, completar desafios e coletar cartuchos especiais para montar seu console dos sonhos. Em cada mundo, há uma mecânica diferente para superar:

- Na **Lua**, estabilize o foguete através de um minigame de memória e controle do semáforo.
- No **Mundo Gelo**, mantenha a nave aquecida ativando o soprador da fornalha para sobreviver ao frio extremo.
- Após completar os mundos, visite a loja da Iara para comprar um console especial com os cartuchos coletados.

---

## 🌌 Mundos (e um satélite) e Mecânicas

### 🌙 Lua — Minigame de Memória e Controle da Nave

- O jogador deve apertar os botões na sequência que piscam, testando a memória e reflexos.
- Após acertar a sequência, puxe a alavanca para parar o semáforo no verde e estabilizar o foguete.
- Ao vencer, escolha um dos dois cartuchos de jogo disponíveis para continuar a aventura.

### ❄️ Mundo Gelo — Sobrevivendo ao Frio Extremo

- O ambiente está congelante, e a nave precisa manter a fornalha acesa para não perder calor.
- O jogador ativa o soprador da fornalha apertando um botão repetidamente para manter o calor.
- Ao final, escolha entre dois novos cartuchos diferentes dos da Lua.

### 🚠 Teleférico e Loja da Iara

- Pegue um teleférico que leva até a loja da Iara.
- Na loja, compre um console especial que só é vendido ali, usando os cartuchos coletados.
- Aparecem os dois cartuchos que o jogador escolheu durante a jornada.

---


## 🔧 Tecnologias Usadas

| Tecnologia     | Descrição                                                      |
| -------------- | -------------------------------------------------------------- |
| **Vite**       | Bundler rápido e leve para projetos web                        |
| **React**      | Biblioteca JavaScript para construir UI                        |
| **JavaScript** | Linguagem de programação                                       |
| **React Router** | Biblioteca de roteamento para aplicações React               |
| **tsParticles**| Biblioteca para partículas animadas com suporte a TypeScript   |
| **useSound**   | React Hook para adicionar efeitos sonoros (via `npm`)          |
| **CSS3**       | Linguagem de estilo                                            |


---

## 🧠 Lógica Principal

- O estado do jogo avança conforme o jogador interage corretamente com cada minigame.
- A escolha dos cartuchos influencia a narrativa e o inventário do jogador.
- A progressão acontece cena a cena, com transições suaves usando Framer Motion.
- O layout é responsivo para funcionar bem tanto em desktop quanto em dispositivos móveis.

---

## 🎨 Design e Protótipo

Confira o protótipo visual completo no Figma:

👉 [Across The Stars – Protótipo no Figma](https://www.figma.com/design/NLQvkvYmRuZw3jmuTYmMow/Across-the-Stars?node-id=63-63&t=n8NUqq0Ov1G1wMR8-0)

---

## 🌀 Fluxo do Jogo

1. Jogador começa na Lua, enfrenta o minigame de memória e controla o semáforo.
2. Escolhe um cartucho entre duas opções.
3. Viaja para o Mundo Gelo e mantém a nave aquecida ativando a fornalha.
4. Escolhe outro cartucho, diferente do primeiro.
5. Usa o teleférico para chegar até a loja da Iara.
6. Compra o console especial e visualiza os cartuchos coletados.
7. Finaliza a jornada com uma nave pronta para explorar o universo.

---
## 💬 Diálogos Dinâmicos

Os diálogos são definidos como objetos de texto com id, personagem e texto. Eles são usados para orientar o jogador e dar vida à narrativa. Nesse exemplo, initialDialog é um array de strings que representa as falas sequenciais:

Exemplo:
```ts
<Dialog pages={initialDialog} position="bottom" />

 const initialDialog = [
    "Por conta dos detritos e rochas no espaço, a nave está fora de controle!",
    "Puxe a alavanca no momento em que o semáforo ficar verde.",
    "Assim evitamos colisões e conseguimos velocidade para escapar daqui!",
    "Caso não conseguir... teremos problemas... hehe",
    "Boa sorte!",
  ];
```
Esses diálogos funcionam como um pequeno guia para o jogador.


## 🛠️ Como Rodar Localmente

```bash
git clone https://github.com/Ishidawg/across-the-stars
cd across-the-stars
npm install
npm run dev
```

## 👩‍💻 Autores
-   Cíntia – [[@cintiambr](https://github.com/cintiambr)]
    
-   Maria Eduarda – [[@dudabertuzzi](https://github.com/dudabertuzzi)]
    
-  Willian – [[@Ishidawg](https://github.com/Ishidawg)]
    
-   Yasmim – [[@yasmimlb](https://github.com/yasmimlb)]

## 🌕 Fim da Jornada

A cada passo dado, a nave se aproxima da lua. A missão está nas suas mãos:  *controle, estabilize e voe!*