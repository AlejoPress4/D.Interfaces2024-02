class App{
    static data = new Array()
    static main(){
        App.prueba1('yo')
        console.log(App.prueba5(2))
        console.log(App.prueba5.prototype)
        App.ListarCiudades('Tolima')
    }
    static prueba1(nombre = 'Mari'){
        console.log(`Hola ${nombre}`)
    }
    static prueb2 = (nombre = 'Mariana') => {
        console.log(`Hola ${nombre}`) //las funciones flechas no pueden usar el argumento arguments
    }
    static prueba3 = (x = 0, y = 0) => {
        return x + y
    }

    static prueba4 = x => Math.pow(x, 2)

    static prueba5 = (valor = 1) => [1, 2, 3, 4, 5].filter(item => item % valor === 0)

    static tipoFiltro(item){
        return item % valor === 0
    }
//hay metodos de instancia y metodos de clase
//los metodos de instancia se ejecutan en una instancia de la clase
    static async getColombia(){
        const url = 'https://raw.githubusercontent.com/marcovega/colombia-json/refs/heads/master/colombia.json'
        const response = await fetch(url)
        return response.ok ? await response.json() : []
    }
    
    static ListarCiudades = (departamento) => {const ciudades = App.data.filter(dept => dept.departamento === departamento)
        // return depto ? depto.ciudades : []
    }
    
}
App.main()