class App {
  static main() {
    let a = 100
    let b = 20.55
    const x = 50
    const aviso = 'La suma es: '
    console.info(aviso + (a * b + x))

    const t = 0
    for (let i = 0; i <= 10; i++) {
      console.info(`${i} * ${t} = (${i} * ${t})`)
    }
  }

  static docWork() {
    //Number
    let numInt = 24
    let numFloat = 24.5
    // --------------------------------------
    //String
    let str = 'Hola profe Cuesta'
    //Es recomendable usar comillas simples
    // --------------------------------------
    //Boolean
    let bool1 = true
    let bool2 = false
    // --------------------------------------
    //Undefined
    let undef
    console.log(undef)
    //Variable declarada pero no inicializada
    // --------------------------------------
    //Null
    let emptyVal = null
    console.log(emptyVal)
    //Variable declarada pero sin valor
    // --------------------------------------
    //Object
    let obj = {
      name: 'Mariana',
      age: 18,
    }
    //No es primitivo pero es un tipo de dato
    // --------------------------------------
    // Symbol
    let sym = Symbol('foo')
    let sym2 = Symbol('unique')
    //---------------------------------------
    //BigInt
    let bigIntNum = BigInt(9007199254740991)
    // --------------------------------------
    // Igualdad débil (==)
    console.log(5 == '5') // true, porque convierte el string '5' a número 5
    console.log(null == undefined) // true, porque se consideran iguales en igualdad débil

    // Igualdad estricta (===)
    console.log(5 === '5') // false, porque no son del mismo tipo
    console.log(null === undefined) // false, porque no son del mismo tipo

    // --------------------------------------
    //Declarar varibales
    // Asignación sin declaración explícita
    // foo = 123;
    // console.log(foo); // 123
    // --------------------------------------
    //var
    var num = 10
    num = 20 // Reasignación permitida
    var num = 30 // Redeclaración permitida
    //--------------------------------------
    // let
    let date = 24
    date = 20 // Reasignación permitida
    // let date = 30; // Redeclaración no permitida en el mismo ámbito
    //--------------------------------------
    // const
    const mari = 'Mariana'
    // mari = 'Ana'; // Reasignación no permitida
    // const mari = 'Mar'; // Redeclaración no permitida en el mismo ámbito

    // --------------------------------------
    //undefined vs null
    //undefined
    let val
    console.log(val) // undefined

    //tambien aplica para objetos
    let objUn = {}
    console.log(objUn.val) // undefined
    //--------------------------------------
    //null
    let someVal = null
    console.log(someVal) // null
  }

  //--------------------------------------
  //Funciones Flecha
  //Funcion Regular
  // const
  regularFunction(a, b) {
    return a + b
  }
  //Funcion Flecha
  //const
  arrowFunction = (a, b) => a + b
}

//--------------------------------------
//Closure
function outerFunction() {
  let outerVariable = 'I am outside!'

  function innerFunction() {
    console.log(outerVariable) // Puede acceder a outerVariable
  }

  return innerFunction
}

const closure = outerFunction()
closure() // 'I am outside!'

//--------------------------------------
//Literales en Plantilla
const name = 'Mari'
const age = 18
const message = `Su nombre es ${name} y tiene ${age} años.`
console.log(message)

//--------------------------------------
//Set y Map
const mySet = new Set()
mySet.add(1)
mySet.add(2)
mySet.add(2) // No se añadirá porque ya existe
console.log(mySet.has(1)) // true
console.log(mySet.size) // 2
mySet.delete(1)
console.log(mySet.has(1)) // false
mySet.clear()
console.log(mySet.size) // 0

const myMap = new Map()
myMap.set('name', 'Mari')
myMap.set('age', 18)
console.log(myMap.get('name')) // Mari
console.log(myMap.has('age')) // true
console.log(myMap.size) // 2
myMap.delete('name')
console.log(myMap.has('name')) // false
myMap.clear()
console.log(myMap.size) // 0

//--------------------------------------
//Propiedad de los objetos
const obj = { name: 'Mari', age: 18 }
//Operador in
console.log('name' in obj)
//hasOwnProperty
console.log(obj.hasOwnProperty('age'))
// undifenied
console.log(obj.gender !== undefined)

//--------------------------------------
//Acceder a la propiedad de un objeto
console.log(obj.name) // Mari
console.log(obj['age']) // 18

//--------------------------------------
//Metodos para trabajar con arrays
const arr = [1, 2, 3, 4, 5]
arr.forEach(element => console.log(element)) //forEach
arr.map(element => element * 2) //map
const evens = arr.filter(element => element % 2 === 0) // filter
const found = arr.find(element => element > 2) //find
const suM = arr.reduce((acc, curr) => acc + curr, 0) //reduce

//--------------------------------------
//Formas de crear un objeto
//Promesas
const myPromise = new Promise((resolve, reject) => {
  const success = true // Simula una condición de éxito o fracaso
  if (success) {
    resolve('Operation was successful!')
  } else {
    reject('Operation failed.')
  }
})

myPromise
  .then(result => {
    console.log(result) // 'Operation was successful!'
  })
  .catch(error => {
    console.error(error) // 'Operation failed.'
  })
  .finally(() => {
    console.log('Operation completed.') // Se ejecuta siempre
  })
//Encadenamiento de promesas
const anotherPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000) // Simula una operación asíncrona
})

anotherPromise
  .then(value => {
    console.log(value) // 1
    return value * 2
  })
  .then(newValue => {
    console.log(newValue) // 2
    return newValue * 3
  })
  .then(finalValue => {
    console.log(finalValue) // 6
    return finalValue * 4
  })
  .catch(error => {
    console.error(error) // Maneja cualquier error en la cadena
  })
  .finally(() => {
    console.log('Operation completed.') // Se ejecuta siempre
  })

//--------------------------------------
//Async/Await
async function basicAsyncFunction() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve('Operation was successful!'), 1000) // Simula una operación asíncrona
    })
    console.log(result) // 'Operation was successful!'
  } catch (error) {
    console.error(error) // Maneja cualquier error
  } finally {
    console.log('Operation completed.') // Se ejecuta siempre
  }
}

//--------------------------------------
//Un objeto es un array
const objArr = [1, 'mari', 3, 'interfaces', 5]
console.log(Array.isArray(objArr)) // true

//--------------------------------------
//Operador Propagación
// Copiar Arrays
const arr1 = [1, 2, 3]
const arr2 = [...arr1]
console.log(arr2) // [1, 2, 3]

// Combinar Arrays
const arr3 = [4, 5, 6]
const combinedArr = [...arr1, ...arr3]
console.log(combinedArr) // [1, 2, 3, 4, 5, 6]

// Copiar Objetos
const obj1 = { a: 1, b: 2 }
const obj2 = { ...obj1 }
console.log(obj2) // { a: 1, b: 2 }

// Combinar Objetos
const obj3 = { c: 3, d: 4 }
const combinedObj = { ...obj1, ...obj3 }
console.log(combinedObj) // { a: 1, b: 2, c: 3, d: 4 }

// Pasar Elementos de un Array como Argumentos a una Función
const arr4 = [1, 2, 3]
function sum(a, b, c) {
  return a + b + c
}

//--------------------------------------
const originalObj = { a: 1, b: { c: 2 } }
const deepCopy = JSON.parse(JSON.stringify(originalObj))
deepCopy.b.c = 3
console.log(originalObj.b.c) // 2 (la referencia no se comparte)

//--------------------------------------
// Cambiar contexto de una función
function greet() {
  console.log(`Hello, my name is ${this.name}`)
}

const person = { name: 'Mari' }

// Usando call
greet.call(person) // Hello, my name is Mari

// Usando apply
function greetWithGreeting(greeting) {
  console.log(`${greeting}, my name is ${this.name}`)
}
greetWithGreeting.apply(person, ['Hello']) // Hello, my name is Mari

// Usando bind
const boundGreet = greet.bind(person)
boundGreet() // Hello, my name is Mari

//--------------------------------------
//Operador Ternario
// const age = 18;
const canVote = age >= 18 ? 'Yes' : 'No'
console.log(canVote)

//--------------------------------------
// Desestructuración de Arrays
const arry = [1, 2, 3]
const [one, two, three] = arry
console.log(one)
console.log(two)
console.log(three)

// Desestructuración de Objetos
const objt = { name: 'Mari', age: 18 }
const { name: personName, age: personAge } = objt
console.log(personName)
console.log(personAge)

//--------------------------------------
//DOM
// Seleccionar un elemento por su ID
const element = document.getElementById('myElement')

// Cambiar el contenido de texto del elemento
element.textContent = 'Nuevo contenido'

// Cambiar el estilo del elemento
element.style.color = 'red'

// Crear un nuevo elemento
const newElement = document.createElement('div')
newElement.textContent = 'Soy un nuevo elemento'

// Añadir el nuevo elemento al documento
document.body.appendChild(newElement)

//--------------------------------------
//Blucle de eventos
console.log('Inicio')

setTimeout(() => {
  console.log('Temporizador')
}, 0)

console.log('Fin')

//--------------------------------------
//Herencia Protoripica
// Objeto prototipo
const personPrototype = {
  greet() {
    console.log(`Hello, my name is ${this.name}`)
  },
}

// Crear un nuevo objeto que hereda de personPrototype
const person1 = Object.create(personPrototype)
person1.name = 'Mari'
person1.greet() // Hello, my name is Mari

//Operador de encadenamiento opcional
const user = { name: 'Mari', address: { city: 'Manizales' } }
console.log(user.address?.city)
console.log(user.contact?.phone)

//--------------------------------------
// Shadow DOM
class MyElement extends HTMLElement {
  constructor() {
    super()
    // Adjuntar un shadow root al elemento
    const shadow = this.attachShadow({ mode: 'open' })

    // Crear un div dentro del shadow root
    const div = document.createElement('div')
    div.textContent = 'Hola profe Cuesta desde el Shadow DOM'

    // Estilos encapsulados
    const style = document.createElement('style')
    style.textContent = `
            div {
                color: red;
                font-size: 20px;
            }
        `

    // Adjuntar el div y los estilos al shadow root
    shadow.appendChild(style)
    shadow.appendChild(div)
  }
}

// Definir el nuevo elemento
customElements.define('my-element', MyElement)

// Usar el nuevo elemento en el DOM principal
document.body.innerHTML = '<my-element></my-element>'

//--------------------------------------
// Recursión
function factorial(n) {
  // Caso base: si n es 0, el factorial de 0 es 1
  if (n === 0) {
    return 1
  }
  // Caso recursivo: n * factorial(n - 1)
  return n * factorial(n - 1)
}

console.log(factorial(5)) // 120

//--------------------------------------
// Declaración de Función
function sayHello() {
  console.log('Hello from function declaration')
}

// Llamada a la función antes de su definición (gracias al hoisting)
sayHello() // 'Hello from function declaration'

//--------------------------------------
// Expresión de Función
const sayHi = function () {
  console.log('Hello from function expression')
}

// Llamada a la función después de su definición
sayHi() // 'Hello from function expression'

//--------------------------------------
// Función Constructora
function PersoN(name, age) {
  this.name = name
  this.age = age
}

// Añadir un método al prototipo de la función constructora
PersoN.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
}

// Crear una nueva instancia de Person
const pers1 = new PersoN('Mari', 18)
const pers2 = new PersoN('Alejo', 20)

// Llamar al método greet en las instancias creadas
pers1.greet() // Hello, my name is Mari and I am 18 years old.
pers2.greet() // Hello, my name is Alejo and I am 20 years old.

//--------------------------------------
// Obtener lista de claves de un objeto
const dic = { name: 'Mari', age: 18, city: 'Manizales' }
//Obtener una lista de claves
const keys = Object.keys(dic)
console.log(keys)

// Obtener una lista de valores
const values = Object.values(dic)
console.log(values)

//--------------------------------------
// ES11: Nullish Coalescing Operator
const userName = null ?? 'Default Name'
console.log(userName) // 'Default Name'

const userAge = 0 ?? 18
console.log(userAge) // 0 (no es `null` ni `undefined`)

const userCity = undefined ?? 'Unknown City'
console.log(userCity) // 'Unknown City'

const userIsActive = false ?? true
console.log(userIsActive) // false (no es `null` ni `undefined`)

//--------------------------------------
// Herencia de Clases en ES6

// Clase Padre (Superclase)
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

// Clase Hija (Subclase)
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age) // Llama al constructor de la clase padre
    this.grade = grade
  }

  study() {
    console.log(`${this.name} is studying in grade ${this.grade}.`)
  }
}

// Uso de las Clases
const student1 = new Student('Mari', 18, '12th')
student1.greet() // Hello, my name is Mari and I am 18 years old.
student1.study() // Mari is studying in grade 12th.

//--------------------------------------
// Ejemplo de Microtareas y Macrotareas en JavaScript

console.log('Inicio')

// Macrotarea: se ejecuta después de todas las microtareas y el código sincrónico
setTimeout(() => {
  console.log('Macrotarea: setTimeout')
}, 0)

// Microtarea: se ejecuta después del código sincrónico actual
Promise.resolve().then(() => {
  console.log('Microtarea: Promise')
})

console.log('Fin')

//--------------------------------------
// Ejemplo de Generadores en JavaScript
function* simpleGenerator() {
  console.log('Inicio del generador')
  yield 1
  yield 2
  yield 3
  console.log('Fin del generador')
}

const generator = simpleGenerator()

console.log(generator.next().value) // Inicio del generador, 1
console.log(generator.next().value) // 2
console.log(generator.next().value) // 3
console.log(generator.next().done) // Fin del generador, true

//--------------------------------------
// Métodos para almacenar datos en un navegador

// Cookies
document.cookie = 'username=Mari; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/'
console.log(document.cookie)
document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

// Local Storage
localStorage.setItem('username', 'Mari')
console.log(localStorage.getItem('username')) // 'Mari'
localStorage.removeItem('username')
localStorage.clear()

// Session Storage
sessionStorage.setItem('username', 'Mari')
console.log(sessionStorage.getItem('username')) // 'Mari'
sessionStorage.removeItem('username')
sessionStorage.clear()

// IndexedDB
const request = indexedDB.open('myDatabase', 1)
request.onupgradeneeded = event => {
  const db = event.target.result
  db.createObjectStore('users', { keyPath: 'id' })
}
request.onsuccess = event => {
  const db = event.target.result
  const transaction = db.transaction(['users'], 'readwrite')
  const store = transaction.objectStore('users')
  store.add({ id: 1, name: 'Mari' })
  const getRequest = store.get(1)
  getRequest.onsuccess = event => {
    console.log(event.target.result) // { id: 1, name: 'Mari' }
  }
}

//--------------------------------------
//Expresiones Regulares

// Coincidencia Simple
const regex = /hello/
const str = 'hello world'
console.log(regex.test(str)) // true

// Validación de Correo Electrónico
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const email = 'example@example.com'
console.log(emailRegex.test(email)) // true

// Búsqueda y Reemplazo
const sentence = 'The quick brown fox jumps over the lazy dog.'
const newSentence = sentence.replace(/fox/, 'cat')
console.log(newSentence) // "The quick brown cat jumps over the lazy dog."

//--------------------------------------
// WeakSet y WeakMap
// WeakSet
const weakSet = new WeakSet()
let user1 = { name: 'Mari' }
let user2 = { name: 'Alejo' }
weakSet.add(user1)
weakSet.add(user2)
console.log(weakSet.has(user1)) // true
user1 = null // El objeto puede ser recolectado por el recolector de basura
console.log(weakSet.has(user1)) // false

// WeakMap
const weakMap = new WeakMap()
let keyObj1 = { id: 1 }
let keyObj2 = { id: 2 }
weakMap.set(keyObj1, 'value1')
weakMap.set(keyObj2, 'value2')
console.log(weakMap.get(keyObj1)) // 'value1'
keyObj1 = null // El objeto puede ser recolectado por el recolector de basura
console.log(weakMap.get(keyObj1)) // undefined

//--------------------------------------
// Comprobación de la Clase de un Objeto
class Animal {
  constructor(name) {
    this.name = name
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name)
    this.breed = breed
  }
}

const myDog = new Dog('Rex', 'German Shepherd')

console.log(myDog instanceof Dog) // true
console.log(myDog instanceof Animal) // true
console.log(myDog instanceof Object) // true
console.log(myDog instanceof Array) // false

//--------------------------------------
// Registro del tiempo en el sitio
let timeSpent = 0

// Recuperar el tiempo almacenado en localStorage si existe
if (localStorage.getItem('timeSpent')) {
  timeSpent = parseInt(localStorage.getItem('timeSpent'), 10)
}

// Incrementar el contador cada 10 segundos
setInterval(() => {
  timeSpent += 10
  localStorage.setItem('timeSpent', timeSpent)
  console.log(`Tiempo pasado en el sitio: ${timeSpent} segundos`)
}, 10000)

//--------------------------------------
// Ejemplo de Función Pura e Impura

// Función Pura
function multiply(a, b) {
  return a * b
}

console.log(multiply(2, 3)) // 6
console.log(multiply(2, 3)) // 6 (siempre devuelve el mismo resultado para los mismos argumentos)

// Función Impura
let counter = 0

function increment() {
  counter += 1
  return counter
}

console.log(increment()) // 1
console.log(increment()) // 2 (el resultado depende del estado externo)

//--------------------------------------
// Ejemplo de Funciones de Orden Superior

// Función que toma otra función como argumento
function applyOperation(a, b, operation) {
  return operation(a, b)
}

function add(x, y) {
  return x + y
}

function multiplo(x, y) {
  return x * y
}

console.log(applyOperation(2, 3, add)) // 5
console.log(applyOperation(2, 3, multiplo)) // 6

// Función que devuelve otra función
function createMultiplier(multiplier) {
  return function (x) {
    return x * multiplier
  }
}

const doubleMultiplier = createMultiplier(2)
const triple = createMultiplier(3)

console.log(doubleMultiplier(5)) // 10
console.log(triple(5)) // 15

//--------------------------------------
// Implementación del método bind
function myBind(fn, thisArg, ...args) {
  return function (...newArgs) {
    return fn.apply(thisArg, [...args, ...newArgs])
  }
}

// Ejemplo
const mari = {
  name: 'Mari',
  greet: function (greeting) {
    console.log(`${greeting}, my name is ${this.name}`)
  },
}

const greetMari = myBind(mari.greet, mari)
greetMari('Hello') // "Hello, my name is Mari"

function multiBind(a, b) {
  return a * b
}

const double = myBind(multiBind, null, 2)
console.log(double(5)) // 10

//--------------------------------------
// Implementación de la Calculadora Encadenada

class Calculator {
  constructor() {
    this.value = 0
  }

  add(number) {
    this.value += number
    return this
  }

  subtract(number) {
    this.value -= number
    return this
  }

  multiply(number) {
    this.value *= number
    return this
  }

  divide(number) {
    if (number !== 0) {
      this.value /= number
    } else {
      console.error('Error: División por cero')
    }
    return this
  }

  getResult() {
    return this.value
  }
}

// Ejemplo
const calc = new Calculator()
const result = calc.add(10).subtract(2).multiply(3).divide(2).getResult()
console.log(result) // 12

//--------------------------------------
// Implementación de la función ordenAleatorio

function ordenAleatorio(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // Intercambiar elementos
  }
  return array
}

// Ejemplo
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const numerosAleatorios = ordenAleatorio(numeros)
console.log(numerosAleatorios)

//--------------------------------------
// Función eliminarMayorValor

function eliminarMayorValor(arrayBidimensional) {
  return arrayBidimensional.map(subArray => {
    const maxVal = Math.max(...subArray)
    return subArray.filter(num => num !== maxVal)
  })
}

// Ejemplo
const arrayBidimensional = [
  [1, 2, 3, 4, 5],
  [10, 20, 30, 40, 50],
  [5, 15, 25, 35, 45],
]

const resultado = eliminarMayorValor(arrayBidimensional)
console.log(resultado) // [[1, 2, 3, 4], [10, 20, 30, 40], [5, 15, 25, 35]]

//--------------------------------------
// Función ordenarGente
function ordenarGente(nombres, estaturas) {
  // Combinar nombres y estaturas en un solo array de objetos
  const gente = nombres.map((nombre, i) => ({ nombre, estatura: estaturas[i] }))

  // Ordenar el array combinado en función de las estaturas
  gente.sort((a, b) => b.estatura - a.estatura)

  // Extraer el array de nombres ordenado
  return gente.map(persona => persona.nombre)
}

// Ejemplo de uso
const nombres = ['Mari', 'Juan', 'Ana', 'Luis']
const estaturas = [160, 175, 150, 180]

const nombresOrdenados = ordenarGente(nombres, estaturas)
console.log(nombresOrdenados) // ['Luis', 'Juan', 'Mari', 'Ana']

//--------------------------------------
// Función subconjuntos
function obtenerSubconjuntos(arrayNumeros) {
  const resultados = []

  function backtrack(inicio, camino) {
    resultados.push([...camino])
    for (let j = inicio; j < arrayNumeros.length; j++) {
      camino.push(arrayNumeros[j])
      backtrack(j + 1, camino)
      camino.pop()
    }
  }

  backtrack(0, [])
  return resultados
}

// Ejemplo de uso
const numerosEjemplo = [1, 2, 3]
const todosLosSubconjuntos = obtenerSubconjuntos(numerosEjemplo)
console.log(todosLosSubconjuntos) // [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]

//--------------------------------------
// Invertir Lista Enlazada
//Primero toca crear la lista enlazada
class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  append(value) {
    const newNode = new ListNode(value)
    if (!this.head) {
      this.head = newNode
      return
    }
    let current = this.head
    while (current.next) {
      current = current.next
    }
    current.next = newNode
  }

  print() {
    let current = this.head
    const values = []
    while (current) {
      values.push(current.value)
      current = current.next
    }
    console.log(values.join(' -> '))
  }
}

//Ahora si la función para invertir la lista enlazada

function invertirListaEnlazada(lista) {
  let prev = null
  let current = lista.head
  let next = null

  while (current) {
    next = current.next // Guardar el siguiente nodo
    current.next = prev // Invertir el puntero del nodo actual
    prev = current // Mover prev y current un paso adelante
    current = next
  }

  lista.head = prev // Actualizar la cabeza de la lista
}

// Ejemplo de uso
const lista = new LinkedList()
lista.append(1)
lista.append(2)
lista.append(3)
lista.append(4)

console.log('Lista original:')
lista.print() // 1 -> 2 -> 3 -> 4

invertirListaEnlazada(lista)

console.log('Lista invertida:')
lista.print() // 4 -> 3 -> 2 -> 1

//--------------------------------------
//Ordenar lista enlazada
//Hay diversos metodos, en este caso se usara merge sort
function ordenarListaEnlazada(lista) {
  if (!lista.head || !lista.head.next) {
    return lista
  }

  // Función para dividir la lista en dos mitades
  function dividirLista(head) {
    let slow = head
    let fast = head
    let prev = null

    while (fast && fast.next) {
      prev = slow
      slow = slow.next
      fast = fast.next.next
    }

    prev.next = null // Romper la lista en dos mitades
    return slow
  }

  // Función para fusionar dos listas ordenadas
  function fusionarListas(l1, l2) {
    const dummy = new ListNode(0)
    let current = dummy

    while (l1 && l2) {
      if (l1.value < l2.value) {
        current.next = l1
        l1 = l1.next
      } else {
        current.next = l2
        l2 = l2.next
      }
      current = current.next
    }

    current.next = l1 || l2
    return dummy.next
  }

  // Función recursiva para ordenar la lista
  function mergeSort(head) {
    if (!head || !head.next) {
      return head
    }

    const mid = dividirLista(head)
    const left = mergeSort(head)
    const right = mergeSort(mid)

    return fusionarListas(left, right)
  }

  lista.head = mergeSort(lista.head)
  return lista
}

// Ejemplo de uso
const list = new LinkedList()
list.append(4)
list.append(2)
list.append(1)
list.append(3)

console.log('Lista original:')
list.print() // 4 -> 2 -> 1 -> 3

ordenarListaEnlazada(list)

console.log('Lista ordenada:')
list.print() // 1 -> 2 -> 3 -> 4

App.docWork()
