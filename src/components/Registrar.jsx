import React, { useState, useEffect } from 'react'

export const Registrar = () => {

  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registroslogin");
    if(datos){
      return JSON.parse(datos);
    }else{
      return [];
    }
  }
  const [registroslogin, setRegistrosLogin] = useState(obtenerRegistros());
  const [titulo, setTitulo] = useState("");
  const [producto, setProducto] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [precio, setPrecio] = useState("");

  const botonGuardar = (e) => {
    e.preventDefault();
    var miObjeto = {titulo, producto, proveedor, precio}
    setRegistrosLogin([...registroslogin, miObjeto]);
    limpiarFormulario();
  }

  useEffect(() => {
    localStorage.setItem("registroslogin", JSON.stringify(registroslogin))
  }, [registroslogin]);

  const limpiarFormulario = () => {
    setTitulo("");
    setProducto("");
    setProveedor("");
    setPrecio("");
    document.getElementById("miFormulario").reset();
  }

  return (
    <div className="bg-light" style={{marginTop:20, padding:20}}>

    <div className="h3">
      Registro de Productos
      <br/>
      <form id="miFormulario" onSubmit={botonGuardar} >
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Digite El Producto" onChange={(e) => setTitulo(e.target.value)} required  />
          </div>

          <div className="col-6">
            <select className="form-select form-select-lg text-center" onChange={(e) => setProducto(e.target.value)} required  >
              <option value="">Indique Tipo de producto</option>
              <option value="Porducto de consumo básico">Producto de consumo básico</option>
              <option value="Productos de impulso">Productos de impulso</option>
              <option value="Productos de Urgencia">Productos de Urgencia</option>
            </select>
          </div>
        </div>
        
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
            <select className="form-select form-select-lg text-center" onChange={(e) => setProveedor(e.target.value)} required  >
              <option value="">Indique Proveedor</option>
              <option value="Tienda D1">Tienda D1</option>
              <option value="Jumbo">Jumbo</option>
              <option value="Olimpica">Olimpica</option>
              <option value="Exito">Exito</option>
              <option value="Campanario">Campanario</option>
              <option value="Terraplaza">Terraplaza</option>
              <option value="La Montaña">La Montaña</option>
            </select>
          </div>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="number" min="1" max="100000000" placeholder="Digite El Precio" onChange={(e) => setPrecio(e.target.value)} required  />
          </div>
        </div>

        <div className="row" style={{marginTop:20}}>
          <div className="col">
            <button className="btn btn-primary btn-lg">Guardar Datos</button>
          </div>
        </div>
      </form>
    </div>
            
  </div>
  )
}
