const $btnInicio = document.getElementById('btn-inicio')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const naranja = document.getElementById('naranja')
const azul = document.getElementById('azul')
const ULTIMO_NIVEL = 10

class Juego {
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)  //siempre con el setTimeout JS delega las funciones y se la pasa a window y por eso el this cambia
    }
    
    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        // $btnInicio.classList.add('hide')
        this.toggleBtnEmpezar()
        // guardo los niveles y los colores
        this.nivel = 1
        this.colores = {
            rojo,
            amarillo,  //lo aspero de javascript es que cuando quiero hacer un atributo con un valor con el mismo nombre, el solito lo hace
            naranja,
            azul
        }
        console.log(this)
    }

    toggleBtnEmpezar(){
        if ($btnInicio.classList.contains('hide')){
            $btnInicio.classList.remove('hide')
        }else{
            $btnInicio.classList.add('hide')
        }
    }

    
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random()*4))

    }
    
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){  //con var se repiten ya que en cada ciclo for se sobre escribe la variable i=n y quedan todos del mismo valor que el ultimo
            const color = this.pasarNumeroAColor(this.secuencia[i])
            setTimeout(()=> this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarIluminacion(color), 350)
    }

    apagarIluminacion(color){
        this.colores[color].classList.remove('light')
    }
    
    agregarEventosClick(){
        this.colores.rojo.addEventListener('click', this.elegirColor)
        this.colores.amarillo.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.azul.addEventListener('click', this.elegirColor)
        
    }

    eliminarEventosClick(){
        this.colores.rojo.removeEventListener('click', this.elegirColor)
        this.colores.amarillo.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.azul.removeEventListener('click', this.elegirColor)

    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.pasarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]){ //si el numero es igual al numero del color de la secuencia(array) en el subnivel, haga
            this.subnivel++
            if (this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)){  //J.S alcanza a llegar al nivel 11 pero es ahi cuando le decimos que ganó
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1000 ); 
                }
            } 
        }else{
            this.perdioElJuego()
        }
    }
    
    
    ganoElJuego(){
        swal('Simón dice:', '¡Ganaste!', 'success') //este devuelve una promesa
        .then(this.inicializar) //como solo pasamos una funcion basta con ponerlo asi

    }

    perdioElJuego(){
        swal('Simón dice:', 'Perdiste! :(', 'error')
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()           //en cambio aca si es importante ponerlos () porque hay mas de una funcion para llamar
        })
    }


    pasarNumeroAColor(numero){
        switch (numero){
            case 0:
                return 'rojo'
            case 1:
                return 'amarillo'
            case 2:
                return 'naranja'
            case 3:
                return 'azul'
        }
    }

    pasarColorANumero(color){
        switch (color){
            case 'rojo':
                return 0
            case 'amarillo':
                return 1
            case 'naranja':
                return 2
            case 'azul':
                return 3
        }
    }


} 


function iniciarJuego(){
    window.juego = new Juego()   //poner la variable dentro de window. para poder ver que sucede en la consola
}

// alert('vamos a jugar')
// var juego = new Juego()



