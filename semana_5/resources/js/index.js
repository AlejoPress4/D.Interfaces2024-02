class App {
    static main() {
        let a = 100;
        let b = 20.55;
        const x = 50;
        const aviso = 'La suma es: ';
        console.info(aviso + (a * b + x));

        const t = 0;
        for (let i = 0; i <= 10; i++) {
            console.info(`${i} * ${t} = (${i} * ${t})`);
        }
    }

    static docWork() {
        //Number
        let numInt = 24;
        let numFloat = 24.5;
        // --------------------------------------
        //String
        let str = 'Hola profe Cuesta';
        //Es recomendable usar comillas simples
        // --------------------------------------
        //Boolean 
        let bool1 = true;
        let bool2 = false;
        // --------------------------------------
        //Undefined
        let undef;
        console.log(undef);
        //Variable declarada pero no inicializada
        // --------------------------------------
        //Null 
        let emptyVal = null;
        console.log(emptyVal);
        //Variable declarada pero sin valor
        // --------------------------------------
        //Object
        let obj = {
            name: 'Mariana',
            age: 18
        };
        //No es primitivo pero es un tipo de dato
        // --------------------------------------
        // Symbol
        let sym = Symbol('foo');
        let sym2 = Symbol('unique');
        //---------------------------------------
        //BigInt
        let bigIntNum = BigInt(9007199254740991);
        // --------------------------------------
        // Igualdad débil (==)
        console.log(5 == '5'); // true, porque convierte el string '5' a número 5
        console.log(null == undefined); // true, porque se consideran iguales en igualdad débil

        // Igualdad estricta (===)
        console.log(5 === '5'); // false, porque no son del mismo tipo
        console.log(null === undefined); // false, porque no son del mismo tipo

        // --------------------------------------
        //Declarar varibales
        // Asignación sin declaración explícita
        foo = 123;
        console.log(foo); // 123
        // --------------------------------------
        //var
        var num = 10;
        num = 20; // Reasignación permitida
        var num = 30; // Redeclaración permitida
        //--------------------------------------
        // let
        let date = 24;
        date = 20; // Reasignación permitida
        // let date = 30; // Redeclaración no permitida en el mismo ámbito
        //--------------------------------------
        // const
        const mari = 'Mariana';
        // mari = 'Ana'; // Reasignación no permitida
        // const mari = 'Mar'; // Redeclaración no permitida en el mismo ámbito

        // --------------------------------------
        //undefined vs null
        //undefined 
        let val;
        console.log(val); // undefined

        //tambien aplica para objetos
        let objUn = {};
        console.log(objUn.val); // undefined
        //--------------------------------------
        //null
        let someVal = null;
        console.log(someVal); // null
    }

    //--------------------------------------
    //Funciones Flecha 
    //Funcion Regular
    // const 
    regularFunction(a, b) {
        return a + b;
    }
    //Funcion Flecha
    //const
    arrowFunction = (a, b) => a + b;
}

//--------------------------------------
//Closure
function outerFunction() {
    let outerVariable = 'I am outside!';

    function innerFunction() {
        console.log(outerVariable); // Puede acceder a outerVariable
    }

    return innerFunction;
}

const closure = outerFunction();
closure(); // 'I am outside!'

//--------------------------------------
//Literales en Plantilla
const name = 'Mari';
const age = 18;
const message = `Su nombre es ${name} y tiene ${age} años.`;
console.log(message);

//--------------------------------------
//Set y Map
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(2); // No se añadirá porque ya existe
console.log(mySet.has(1)); // true
console.log(mySet.size); // 2
mySet.delete(1);
console.log(mySet.has(1)); // false
mySet.clear();
console.log(mySet.size); // 0

const myMap = new Map();
myMap.set('name', 'Mari');
myMap.set('age', 18);
console.log(myMap.get('name')); // Mari
console.log(myMap.has('age')); // true
console.log(myMap.size); // 2
myMap.delete('name');
console.log(myMap.has('name')); // false
myMap.clear();
console.log(myMap.size); // 0

//--------------------------------------
//Propiedad de los objetos
const obj = { name: 'Mari', age: 18 };
//Operador in
console.log('name' in obj);
//hasOwnProperty
console.log(obj.hasOwnProperty('age'));
// undifenied
console.log(obj.gender !== undefined);

//--------------------------------------
//Acceder a la propiedad de un objeto
console.log(obj.name); // Mari
console.log(obj['age']); // 18

//--------------------------------------    
//Metodos para trabajar con arrays
const arr = [1, 2, 3, 4, 5];
arr.forEach(element => console.log(element)); //forEach
arr.map(element => element * 2); //map
const evens = arr.filter(element => element % 2 === 0);// filter
const found = arr.find(element => element > 2);//find
const sum = arr.reduce((acc, curr) => acc + curr, 0);//reduce

//--------------------------------------
//Formas de crear un objeto
//Promesas
const myPromise = new Promise((resolve, reject) => {
    const success = true; // Simula una condición de éxito o fracaso
    if (success) {
        resolve('Operation was successful!');
    } else {
        reject('Operation failed.');
    }
});

myPromise
    .then(result => {
        console.log(result); // 'Operation was successful!'
    })
    .catch(error => {
        console.error(error); // 'Operation failed.'
    })
    .finally(() => {
        console.log('Operation completed.'); // Se ejecuta siempre
    });
//Encadenamiento de promesas
const anotherPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000); // Simula una operación asíncrona
});

anotherPromise
    .then(value => {
        console.log(value); // 1
        return value * 2;
    })
    .then(newValue => {
        console.log(newValue); // 2
        return newValue * 3;
    })
    .then(finalValue => {
        console.log(finalValue); // 6
        return finalValue * 4;
    })
    .catch(error => {
        console.error(error); // Maneja cualquier error en la cadena
    })
    .finally(() => {
        console.log('Operation completed.'); // Se ejecuta siempre
    });

//--------------------------------------
//Async/Await
async function basicAsyncFunction() {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => resolve('Operation was successful!'), 1000); // Simula una operación asíncrona
        });
        console.log(result); // 'Operation was successful!'
    } catch (error) {
        console.error(error); // Maneja cualquier error
    } finally {
        console.log('Operation completed.'); // Se ejecuta siempre
    }
}

//--------------------------------------
//Un objeto es un array
const objArr = [1, 'mari', 3, 'interfaces', 5];
console.log(Array.isArray(objArr)); // true

//--------------------------------------
//Operador Propagación
// Copiar Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2); // [1, 2, 3]

// Combinar Arrays
const arr3 = [4, 5, 6];
const combinedArr = [...arr1, ...arr3];
console.log(combinedArr); // [1, 2, 3, 4, 5, 6]

// Copiar Objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };
console.log(obj2); // { a: 1, b: 2 }

// Combinar Objetos
const obj3 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj3 };
console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }

// Pasar Elementos de un Array como Argumentos a una Función
const arr4 = [1, 2, 3];
function sum(a, b, c) {
    return a + b + c;
}

//--------------------------------------
const originalObj = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(originalObj));
deepCopy.b.c = 3;
console.log(originalObj.b.c); // 2 (la referencia no se comparte)

//--------------------------------------
// Cambiar contexto de una función
function greet() {
    console.log(`Hello, my name is ${this.name}`);
}

const person = { name: 'Mari' };

// Usando call
greet.call(person); // Hello, my name is Mari

// Usando apply
function greetWithGreeting(greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
}
greetWithGreeting.apply(person, ['Hello']); // Hello, my name is Mari

// Usando bind
const boundGreet = greet.bind(person);
boundGreet(); // Hello, my name is Mari

//--------------------------------------
//Operador Ternario
// const age = 18;
const canVote = age >= 18 ? 'Yes' : 'No';
console.log(canVote);

//--------------------------------------
// Desestructuración de Arrays
const arry = [1, 2, 3];
const [one, two, three] = arry;
console.log(one); 
console.log(two); 
console.log(three); 

// Desestructuración de Objetos
const objt= { name: 'Mari', age: 18 };
const { name: personName, age: personAge } = objt;
console.log(personName); 
console.log(personAge); 

//--------------------------------------
//DOM
// Seleccionar un elemento por su ID
const element = document.getElementById('myElement');

// Cambiar el contenido de texto del elemento
element.textContent = 'Nuevo contenido';

// Cambiar el estilo del elemento
element.style.color = 'red';

// Crear un nuevo elemento
const newElement = document.createElement('div');
newElement.textContent = 'Soy un nuevo elemento';

// Añadir el nuevo elemento al documento
document.body.appendChild(newElement);

//--------------------------------------
//Blucle de eventos
console.log('Inicio');

setTimeout(() => {
    console.log('Temporizador');
}, 0);

console.log('Fin');

//--------------------------------------
//Herencia Protoripica
// Objeto prototipo
const personPrototype = {
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

// Crear un nuevo objeto que hereda de personPrototype
const person1 = Object.create(personPrototype);
person.name = 'Mari';
person.greet(); // Hello, my name is Mari

App.docWork();