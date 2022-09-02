const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/demo')
    .then(() => console.log('Conectado....'))
    .catch((err) => console.log('No se pudo conectar...', err))

const cursoSchema = new mongoose.Schema({
    nombre: String,
    autor :String,
    etiquetas: [String],
    fecha : {type: Date, default: Date.now},
    publicado: Boolean,
});

const Curso = mongoose.model('Curso', cursoSchema);

async function crearCurso() {
        const curso = new Curso({
            nombre: 'Node desde CEro',
            autor: 'Hookey',
            etiquetas: ['java', 'Msql'],
            publicado: true,
        });
        
        const resultado = await curso.save();
        console.log(resultado);
}

// crearCurso();


async function listarCursos() {
    // const cursos = await Curso.find();
    // const cursos = await Curso.find({ autor: 'Hookey' });
    // const cursos = await Curso.find({ publicado: false });
    // -------------- Limitar y ordenamiento ----------------
    // const cursos = await Curso.find().limit(2).sort({ autor: -1 })
    // -------------- Para traer campos especificos --------
    const cursos = await Curso.find().select({ nombre: 1, etiquetas: 1 })

    console.log(cursos)
}

async function listarCursosOperaciones() {
    /* 
        eq (equal, igual)
        ne (not equal, no igual)
        gt (greater than, mayor que)
        gte (greater than or equal to, mayor o igual que)
        lt (less than, menor que)
        lte (less than or equal to, menor o igual que)
        in
        nin (not in)
    */

    const cursos = await Curso
        // .find({ precio: {$gte: 10, $lte:30}})
        .find({ precio: { $in: [10, 15, 25] } })
    console.log(cursos)

}

async function listaCursosOperacionesLogico() {
    // or
    // and
    const cursos = await Curso
    // .find()
    // .or([ {autor:'kike'}, {publicado: true}])
    // .and([ {autor:'kike'}, {publicado: true}])
    // Empieze con la palabra Gro
    // .find({ autor: /^Gro/ })
    // Cuando termina en una palabra o expresion
    // .find({ autor: /ver$/ })
    // Cuando un campo tiene un contenido especifico
.find({ autor: /.*ro.* /})
    .limit(10)
    .sort({ autor: -1 })
    .select({ nombre:1, etiquetas: 1 });
    

    console.log(cursos)

}

async function listarCursosPaginacion() {
    const numPage = 2;
    const sizePage = 10;
    // api/cursos?numPage=4&sizePage=10
    const cursos = await Curso
        .find()
        .skip((numPage - 1) * sizePage)
        .limit(sizePage)
        .select({ nombre: 1, etiquetas: 1 });

    console.log(cursos)
}

async function actualizarCurso(id) {
    const curso = await Curso.findById(id);

    if (!curso) {
        console.log('No existe el curso');
        return;
    }

    curso.publicado = false;
    curso.autor = 'Demo actualizado';

    // Otra forma de hacerlo

    /**
     * 
     * curso.set({
     *  publicado: false,
     *  autor: 'Demo actualizado';
     * })
     */

    const result = await curso.save();
    console.log(result);
}

async function actualizarCursoOtroMetodo(id) {
    const res = await Curso.update({ _id: id }, {
        $set: {
            autor: 'Alicia',
            publicado: true,
        }
    });

    console.log(res);
}

async function actualizarCursoFindById(id) {
    const res = await Curso.findByIdAndUpdate(id, {
        $set: {
            autor: 'Alicia demo dos',
            publicado: false
        }
    }, { new: true });
    console.log(res);
}

async function eliminarDocumento(id) {
    // const res = await Curso.deleteOne({ _id: id });
    const result = await Curso.findByIdAndDelete(id);
    console.log(result);
}

// listarCursos();
// listaCursosOperacionesLogico();

// listarCursosPaginacion();

// actualizarCurso('630eb298b9714d23583e073d');

// actualizarCursoOtroMetodo('630eb298b9714d23583e073d');
// actualizarCursoFindById('630eb298b9714d23583e073d')



// {
//     "_id": {
//         "$oid": "630eb298b9714d23583e073d"
//     },
//     "nombre": "Node desde CEro",
//         "autor": "Hookey",
//             "etiquetas": [
//                 "java",
//                 "Msql"
//             ],
//                 "publicado": true,
//                     "fecha": {
//         "$date": {
//             "$numberLong": "1661907608869"
//         }
//     },
//     "__v": 0
// }
