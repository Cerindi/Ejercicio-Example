import React, {useState, useEffect} from 'react';
import './style.css';
//Nuevo
import View from './View'
import Text from './Text'
//Importar Api
import Api from './Api'

const imgSource=
'https://www.tonica.la/__export/1611872816699/sites/debate/img/2021/01/28/the-flash-la-pelicula-comenzaria-filmaciones-abril_crop1611872792628.jpg_1902800913.jpg'
function sumar (a,b){
  return a+b;
}


function Example() {
  
  const[valores, setValores] = useState({
    A:null,
    B:null,
  });

  //Arreglo personajes
  const[personajes, setPersonajes]=useState([]);

  const[valorB, setValorB] = useState(null);

  //Creacion de componentes 

  const capturarCambios = (event,propiedad) => {
    setValores({
      ...valores,
      [propiedad]: +event.target.value,
    });
  };

  const imprimirValores = () => {
   const resultado = sumar (valores.A, valores.B)
   alert(resultado);
   console.log(valores)
  };

  const final= () =>{
    console.log('Final del componnent');
  };
  const cargarPersonajes = ()=>{
    Api.getCharacters().then((data) =>{
      const recortados = data.splice(3, 3)
      setPersonajes(recortados);
    });    
  };

  const inicio =() => {
    console.log ('Inicio el componnent');
    cargarPersonajes();
    //Final del componente ->Component will Unmount
    return final;
  };

//Inicio del Componente ->Componente Did Mount
  useEffect(inicio,[]);

  return (
    <>
    <View>
      <input 
        value={valores.A} 
        onChange={(event) => capturarCambios (event,'A')}
        type="number" 
        placeholder="Escribe a" 
      />
       <input 
        value={valores.B} 
        onChange={(event) => capturarCambios (event,'B')}
        type="number" 
        placeholder="Escribe a" 
      />
      <button onClick={imprimirValores} type="button">
        Aplicar</button>
    </View>
   
    <img className="image" src={imgSource}/>
    <View>
      {personajes.map((personaje)=>(
        <>
        <Text key ={personaje.char_id}>{personaje.name}</Text>
        <img className="image" src={personaje.img}/>
        </>
      ))}
    </View>
    <Text>Hello Example3</Text>
    </>
  );
}

export default Example;