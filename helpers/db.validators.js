//6. trasladamos desde usuario.routes la importacion del modelo Role
const Role = require ('../models/Role.js');
// 11. importamos modelo Usuario
const Usuario = require('../models/Usuario.js');
let Categoria = require('../models/Categoria.js');
let Cheese = require('../models/Cheese.js')

// 5. Definicion funcion validador de rol y se exporta
const isValidRole = async(rol= '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

 //7. trasladamos desde usuario.controllers funcion para 
 // Verificar si el correo ya existe (duplicado) y envolvemos en
 // funcion asincrona
 const emailExiste = async( email = '' ) => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        //12.  Gestionamos error.
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
 }

 //14.  Declaramos funcion de validacion de existencia de usuario por el ID findById
 const userExistsById = async( id ) => {

    // Verificar si el id existe
    const userExists = await Usuario.findById(id);
    if ( !userExists ) {
        throw new Error(`El id (usuario) no existe ${ id }`);
    }
}

let categoriaExistsById = async( id ) => {

    // Verificar si el id existe
    let categoriaExists = await Categoria.findById(id);
    if ( !categoriaExists ) {
        throw new Error(`El id(categoria) no existe ${ id }`);
    }
}

let cheeseExistsById  = async(id)=>{
    let cheeseExists = await Cheese.findById(id);
    if (!cheeseExists) {
        throw new Error(`El id (queso) no existe ${ id }`);
    }
}
module.exports = {
    isValidRole,
    // 8. exporto validador perzonalizado emailExiste
    emailExiste,
    //15. exporto validador perzonalizado userExistsById - (findById)
    userExistsById,
    categoriaExistsById
}