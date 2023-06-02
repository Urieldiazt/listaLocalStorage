//variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//eventsListeners
eventsListeners();
function eventsListeners(){
    formulario.addEventListener('submit', agregartweet);

    document.addEventListener('DOMContentLoaded',()=>{
        //busca los tweet pero si esta en null agrega un arreglo vacio
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        creandoHTMl();
    });

}

//funciones

function agregartweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    //validacion
    if(tweet.trim() === ''){
        alerta('El campo tweet no puede ir vacio');
        return;//evita que se ejecuten mas lineas de codigo 
        //return sivrve si se encuentra en una funccion
    }
    const tweetObject = {
        id : Date.now(),
        //tweet: tweet
        tweet 
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObject];

    formulario.reset();
    console.log(tweets);

    creandoHTMl();
}

function alerta(mensaje){
    //limpiar alerta
    limpiarAlerta();

    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error');

    //Insertando el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(error);

    //ELimina la alerta despues de 3 segundos
    setTimeout(()=>{
        error.remove();
    },3000)
}

function limpiarAlerta(){
    const alerta = document.querySelector('.error');
    if(alerta){
        alerta.remove();
    }
}

function creandoHTMl(){
    //limpiar HTMl
    limpiarHTML();

   if(tweets.length > 0){

        tweets.forEach(tweet =>{
            
            
            //creando el elemento li
            const mensajeTweet = document.createElement('li');
            //colocando tweet en li
            mensajeTweet.textContent = tweet.tweet;
            mensajeTweet.classList.add('tweet-size');
            //mostrando tweet
            listaTweets.appendChild(mensajeTweet);
            
            //creando btnBorrar
            const btnBorrar = document.createElement('a');
            btnBorrar.textContent = 'X';
            btnBorrar.classList.add('borrar-tweet');
            mensajeTweet.appendChild(btnBorrar);

            //borrar tweet
            btnBorrar.onclick = ()=>{
                borrarTweet(tweet.id);
            }

        });
   }

   sincronizandoTweets();
}

//sincronizando tweets

function sincronizandoTweets(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//borrarTweet

function borrarTweet(id){
    const newtweets = tweets.filter(tweet => tweet.id !== id);
    tweets = newtweets;
    creandoHTMl();
}

//limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

