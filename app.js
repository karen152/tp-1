const express=require('express');
const app=express();
app.use(express.json());

const {infoCursos}=require('./cursos.js');


//1/console.log(infoCursos);
//ROUTERS/
//creamos una variable con nmbre especifico asociado 
const routerprogramacion=express.Router();
//permite procesar el cuerpo de solicitud en formato JSON y trabajarlo//
//routerprogramacion.use(express.JSON())
//metodo use ,le dice a express que use un camino y lo asocie a un router especifico
app.use('/api/cursos/programacion',routerprogramacion);//asociamos el camino con el router


app.get('/',(req, res)=>{
res.send('mi primer servidor');
});
//busqueda de cursos
app.get('/api/cursos', (req,res)=>{
    res.send(JSON.stringify(infoCursos)
);
})

getprogramacion();
getmatematicas();
///////////////////////////////////////programacion//////////////////////////////
function getprogramacion(req,res){
//busqueda por cursos programacion
routerprogramacion.get('/',(req,res)=>{ //el camino-ruta esta en el router y podemos seguir espandiendo
    res.send(JSON.stringify(infoCursos.programacion));
})
//busqueda de lenguaje de prog
routerprogramacion.get("/:tema",(req,res)=>{
    const lenguaje=req.params.lenguaje;
    const resultado=infoCursos.programacion.filter(curso=>curso.tema===lenguaje);
 if(resultado===0){
    return res.status(404).send('no se encontro el lenguaje '+lenguaje);

 }else{
    res.send(JSON.stringify(resultado));
 }
});
//con nivel
app.get("/api/cursos/programacion/:tema/:nivel",(req,res)=>{
    const lenguaje=req.params.lenguaje;
    const nivel=req.params.nivel;
    const resultado=infoCursos.programacion.filter(curso=> curso.tema===lenguaje && curso.nivel===nivel);

    if(resultado.length===0 ){
        return res.status(404).send('no se pudo encontrar el curso de '+lenguaje+' con el nivel '+nivel+ ' en esta categoria');
    }else {
        res.send(JSON.stringify(resultado));
    }
})
}
///////////////////////////POST PROGRAM/ AGREGAR///////////////////////////////////////////////////////////////////////////////////////
/*routerprogramacion.post('/',(req,res)=>{
    routerprogramacion.use(express.json());
    let cursoNuevo=req.body;
     // Llamada a la función programacion
      programacion();
      getprogramacion.push(cursoNuevo);
      res.send(JSON.stringify(getprogramacion));
     
})*/
app.post('/api/cursos/programacion', (req, res) => {
    
    const nuevoCurso = req.body;
    //console.log('el nuevo curso es '+nuevoCurso);
    infoCursos.programacion.push(nuevoCurso);
    //console.log('cursos: '+infoCursos.programacion);
    res.send(JSON.stringify(infoCursos.programacion));
});
////////////////////////////////////////////PUT PROGRAM/ ACTUALIZAR////////////////////////////////////////////////////////////////////
  routerprogramacion.put('/:id', (req,res)=>{
    const cursoactualizado=req.body;
    const id=req.params.id;

    const indice=infoCursos.programacion.findIndex(curso=> curso.id==id); 
    if(indice>=0){
       infoCursos.programacion[indice]=cursoactualizado;
       res.send(JSON.stringify( infoCursos.programacion)) ;
    }
    else{
        res.status(404).send('no se pudo actualizar..id no encontrado');
    }
  })

//////////////////////////////////////////////DELETE PROGRAM ELIMINAR///////////////////////////////////////////////////////////////////
routerprogramacion.delete("/:id",(req,res)=>{
    const id=req.params.id;
     const indice=infoCursos.programacion.findIndex(curso=> curso.id==id);

     if(id>=0){
        ///metodo de delete y corta una la parte del codigo indicada, osea elimina
        infoCursos.programacion.splice(indice,1);
        res.send(JSON.stringify(infoCursos));
     }else{
        ren.status(404).send('este id no existe'); 
     }

})

/////////////////////////////MATEMATICAS/////////////////   
function getmatematicas(req,res){
const routermatematica=express.Router();
//metodo use ,le dice a express que use un camino y lo asocie a un router especifico
app.use('/api/cursos/matematicas',routermatematica);//asociamos el camino con el router

//curso matematica
app.get('/api/cursos/matematicas', (req,res)=>{
    res.send(JSON.stringify(infoCursos.matemticas))
})
//CON TEMA
app.get("/api/cursos/matematicas/:tema",(req,res)=>{
    const tema=req.params.tema;
    const resultado=infoCursos.matemticas.filter(curso=>curso.tema===tema);

    if(resultado.length===0){
        return res.status(404).send('no se pudo encontrar el curso de '+tema+' en esta categoria');
    }else{
        res.send(JSON.stringify(resultado));
    }
})
//CON NIVEL
app.get("/api/cursos/matematicas/:tema/:nivel",(req,res)=>{
    const tema=req.params.tema;
    const nivel=req.params.nivel;
    const resultado=infoCursos.matemticas.filter(curso=> curso.tema===tema && curso.nivel===nivel);

    if(resultado.length===0 ){
        return res.status(404).send('no se pudo encontrar el curso de '+tema+' con el nivel '+nivel+ 'en esta categoria');
    }else {
        res.send(JSON.stringify(resultado));
    }
})
}
////////////////////////////////////////POST AGREGAR//////////////////////////////////////////////////////////
app.post("/api/cursos/matematicas",(req,res)=>{
    const nuevoCurso=req.body;
    infoCursos.matemticas.push(nuevoCurso);
    res.send(infoCursos.matemticas);
    
})

/////////////////////////////////////////PUT ACTUALIZAR///////////////////////////////
app.put('/api/cursos/matematicas/:id', (req,res)=>{
    const cursoactualizado=req.body;
    const id=req.params.id;

    const indice=infoCursos.matemticas.findIndex(curso=> curso.id==id); 

    if(indice>=0){
        infoCursos.matemticas[indice]=cursoactualizado;
       res.send(JSON.stringify( infoCursos.matemticas)) ;
    }
    else{
        res.status(404).send('no se pudo actualizar..id no encontrado');
    }
  })

  //////////////////////////////////////////////DELETE MATEMATICAS ELIMINAR///////////////////////////////////////////////////////////////////
app.delete("/api/cursos/matematicas/:id",(req,res)=>{
    const id=req.params.id;
     const indice=infoCursos.matemticas.findIndex(curso=> curso.id==id);

     if(id>=0){
        ///metodo de delete y corta una la parte del codigo indicada, osea elimina
        infoCursos.matemticas.splice(indice,1)
       // infoCursos.matematicas.splice(indice,1);
        res.send(JSON.stringify(infoCursos));
   }
})

 


//consegui el valor del puerto en el entorno q se ejecuta sino sera el 3000
const PUERTO= process.env.PORT || 3000;
app.listen(PUERTO, ()=>{
    console.log('el servidor esta funcionando en el puerto ' + PUERTO)
});