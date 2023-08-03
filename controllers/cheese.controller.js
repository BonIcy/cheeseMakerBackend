let Cheese = require('../models/Cheese.js')

let getCheese = async (req, res) =>{
    let {id} = req.params
    let cheese = await Cheese.findById(id);
    if(!cheese){
        return res.status(404).json({message: 'No se encontro el queso'})
    }
    else if(cheese.status == {status : false}){
        return res.status(404).json({message: 'El queso no esta disponible'})
    }
    return res.status(200).json(cheese);
}

let getCheesees = async (req, res)=>{
    let {hasta, desde} = req.query;
    let query = {status: true}

    let [total, cheese] = await Promise.all([
        Cheese.countDocuments(query),
        Cheese.find(query)
        .skip(Number(desde))
        .limit(Number(hasta))
    ]);
    return res.status(200).json({total, cheese});
}

let postCheese = async (req, res) => {
    let {name, state, price, categoria, descripcion, avalaible} = req.body;

    let data = { name, state, usuario: req.usuario._id, price, categoria, descripcion, avalaible}
    let cheese = new Cheese(data);
    await cheese.save();
    res.json({
        "message":"Agregado correctamente",
        cheese
    })
}

let deleteCheese = async (req, res) => {
    let {id} = req.params;
    let cheese = await Cheese.findByIdAndUpdate(id, {state: false});
    res.json(cheese)
}

let putCheese = async (req, res) => {
    let {id} = req.params;
    let {_id,
         __v, 
         ...resto} = req.body;
    let cheese = await Cheese.findByIdAndUpdate(id, resto,{new:true});
    res.json({
        msg: "Actualizacion completada",
        cheese
    })
};

module.exports = {
    getCheese,
    getCheesees,
    postCheese,
    deleteCheese,
    putCheese}