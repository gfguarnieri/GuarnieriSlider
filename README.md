# GuarnieriSlider
Um simples slideshow responsivo desenvolvido em Javascript puro.
Passos para utilizar:
1. Importar guarnieriSlider.js e guarnieriSlider.css
2. Inserir script para aplicar o slide
```javascript
document.addEventListener("DOMContentLoaded", function(){
    GuarnieriSlider({
        autoPlay: false, //Fazer slide ficar avançando automaticamente
        blockButton: true, //Bloquear botões lateriais ao chegar no limite
        interval: 3000, //Intervalo de cada slide
        transition: 1000, //Duração do efeito de transição
        aspect: 0, //Caso queira manter a proporção das imagens no slideshow - objectFit = contain.
        width: "100vw", //Largura do Slideshow
        height: "100vh" //Altura do Slideshow
    });
});
```
Demonstração: https://gfguarnieri.github.io/GuarnieriSlider/
