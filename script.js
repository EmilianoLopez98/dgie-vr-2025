// Entidades
const personaje = document.querySelector("#personaje");
const robot = document.querySelector("#robot");
// Controladores de experiencia
const strtExp = document.querySelector("#strtExp");
const pauseExp = document.querySelector("#pauseExp");
const continuarExp = document.querySelector("#continuarExp");
const reiniciarExp = document.querySelector("#reiniciarExp");
// Imagenes de acompanhamiento
const imgIdea = document.querySelector("#imgIdea");
const imgEscenario = document.querySelector("#imgEscenario");
const imgInver = document.querySelector("#imgInver");
const imgSpeech = document.querySelector("#imgSpeech");
const imgTrailerPeli = document.querySelector("#imgTrailerPeli");
const imgSElevador = document.querySelector("#imgSElevador");
const imgVenta = document.querySelector("#imgVenta");
const imgDeck = document.querySelector("#imgDeck");
const imgTv = document.querySelector("#imgTv");
const imgHistoria = document.querySelector("#imgHistoria");
const imgLenCorpo = document.querySelector("#imgLenCorpo");
const imgPractica = document.querySelector("#imgPractica");
let imagenes = [
    imgIdea,
    imgEscenario,
    imgInver,
    imgSpeech,
    imgTrailerPeli,
    imgSElevador,
    imgVenta,
    imgDeck,
    imgTv,
    imgHistoria,
    imgLenCorpo,
    imgPractica
]
// Sonido
const audio = document.querySelector("#voz");
const srcSnd = document.querySelector("#srcSnd");    

const timer = 1000;
let sndPause = false;
let tiempoAudio = 0;

//Inicia la experiencia
strtExp.addEventListener('click', () => {
    // Este if es para evitar escuchar eventos cuando no sean visibles, lo mismo para pausa, continuar y reiniciar
    if(strtExp.getAttribute('visible') == true){
        controladorIniciarExp();
    };
});

let loopF = (tPC) => {
    setTimeout(() => {

        pauseExp.addEventListener('click', () => {
            controladorPausa();
        });

        continuarExp.addEventListener('click', () => {
            controladorContinuar();
        });

        reiniciarExp.addEventListener('click', () => {
            controladorReiniciar();
        });

        estadoDeAudio();

        if(sndPause !== true) {
            tPC += 1;
        };
        
        console.log(tPC);

        objetoPorTiempo(tPC);

        if(tPC < 121) {
            loopF(tPC);
        }
        else {
            experienciaFinalizada();
        };
        
    }, 1000);
};

//Funciones
let vrExpOn = (hablar) => {
    psjAnimation(hablar);
};

let psjAnimation = (hablar) => {
    if(hablar == true) {
        personaje.setAttribute('animation-mixer', {
            clip: "*",
            loop: "loop"
        });
        robot.setAttribute('animation-mixer', {
            clip: "*",
            loop: "loop"
        });
    }
    else{
        //Avatar sin hablar
        personaje.setAttribute('animation-mixer', {
            clip: "a*",
            loop: "loop"
        });
    };
};

let cambiarNombreAnima = () => {
    let model3d = personaje.getObject3D('mesh');
    let animaciones = model3d.animations;
    for(let i=0; i<=animaciones.length-1; i++) {
        if(i !== 1) {
            animaciones[i].name = `a${i}`;
        };
    };
};

let estadoDeAudio = () => {
    let whatIs = audio.components.sound.isPlaying;
    if(whatIs == false) {
        vrExpOn(false);
    };
};

let controladorIniciarExp = () => {
    strtExp.setAttribute('visible','false');
    setTimeout(() => {
        personaje.setAttribute('visible', 'true');
        robot.setAttribute('visible', 'true');
        audio.components.sound.playSound();
        pauseExp.setAttribute('visible','true');
    }, timer);
    cambiarNombreAnima();

    vrExpOn(true);

    loopF(tiempoAudio);
};

let controladorPausa = () => {
    if(pauseExp.getAttribute('visible') == true) {
        pauseExp.setAttribute('visible','false');
        continuarExp.setAttribute('visible','true');
        audio.components.sound.pauseSound();

        sndPause = true;

        vrExpOn(false);
    };
};

let controladorContinuar = () => {
    if(continuarExp.getAttribute('visible') == true) {
        continuarExp.setAttribute('visible','false');
        pauseExp.setAttribute('visible','true');
        audio.components.sound.playSound();

        sndPause = false;

        vrExpOn(true);
    };
};

let controladorReiniciar = () => {
    if(reiniciarExp.getAttribute('visible') == true) {
        reiniciarExp.setAttribute('visible','false');
        pauseExp.setAttribute('visible','true');
        audio.components.sound.playSound();
        cambiarNombreAnima();

        vrExpOn(true);

        sndPause = false;

        tiempoAudio = 0;

        loopF(tiempoAudio);
    };
};

let experienciaFinalizada = () => {
    vrExpOn(false);
    audio.components.sound.stopSound();
    pauseExp.setAttribute('visible','false');
    continuarExp.setAttribute('visible','false');
    reiniciarExp.setAttribute('visible','true');
};

let objetoPorTiempo = (tiempo) => {
    let obj = null;
    let anim = null;

    if(tiempo == 3) {
        obj = imgIdea;
    }
    else if(tiempo == 9) {
        obj = imgEscenario;
    }
    else if(tiempo == 12) {
        obj = imgInver;
    }
    else if(tiempo == 18) {
        obj = imgSpeech;
    }
    else if(tiempo == 29) {
        obj = imgTrailerPeli;
    }
    else if(tiempo == 35) {
        obj = imgSElevador;
    }
    else if(tiempo == 45) {
        obj = imgVenta;
    }
    else if(tiempo == 58) {
        obj = imgDeck;
    }
    else if(tiempo == 66) {
        obj = imgTv;
    }
    else if(tiempo == 70) {
        obj = imgHistoria;
    }
    else if(tiempo == 80) {
        obj = imgLenCorpo;
    }
    else if(tiempo == 101) {
        obj = imgPractica;
    };

    if(obj !== null) {
        if(obj.getAttribute('animation', 'enabled: false')) {
            obj.setAttribute('animation', 'enabled: true');
        };
        obj.setAttribute("visible", 'true');
        // Animacion inicial
        anim = "property: position; to: 0 1.16 -4.35; loop: false; dur: 1000; easing: easeOutElastic";
        obj.setAttribute("animation", anim);
        // Animacion final
        setTimeout(() => {
            anim = "property: position; to: 0 1.1 -4.35; loop: false; dur: 1000; easing: easeInOutElastic";
            obj.setAttribute("animation", anim);
        }, 1000);
        ocultarObjeto(tiempo);
    };
};

let ocultarObjeto = (tiempo) => {
    let obj = null;
    if(tiempo == 9){
        obj = imagenes[0];
    }
    else if(tiempo == 12){
        obj = imagenes[1];
    }
    else if(tiempo == 18){
        obj = imagenes[2];
    }
    else if(tiempo == 29){
        obj = imagenes[3];
    }
    else if(tiempo == 35){
        obj = imagenes[4];
    }
    else if(tiempo == 45){
        obj = imagenes[5];
    }
    else if(tiempo == 58){
        obj = imagenes[6];
    }
    else if(tiempo == 66){
        obj = imagenes[7];
    }
    else if(tiempo == 70){
        obj = imagenes[8];
    }
    else if(tiempo == 80){
        obj = imagenes[9];
    }
    else if(tiempo == 101){
        obj = imagenes[10];
    }
    else if(tiempo == 120){
        obj = imagenes[11];
    };
    
    if(obj !== null) {
        obj.setAttribute('visible', 'false');
        obj.setAttribute('animation', 'enabled: false');
    };
};
