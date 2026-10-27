import mongoose from 'mongoose';

let isConected = false;

const conectarDBMongo = async () =>{
    if(isConected){
        console.log('Ya esta conectado a MongoDB'.green);
        return;
    }
    try {
    await mongoose.connect(process.env.MONGO_URI);
    isConected = true;
    console.log('Conectado a MongoDB'.green);
} catch (error) {
    console.log('Error al conectar a MongoDB'+ error.message.red);
}
}
const db = mongoose.connection;
db.on('error',(error)=>{
    isConected= false;
    console.log('Error al conectar a MOngoDB'+ error.message.red)
})
db.once('open',()=>{
    isConected= true;

})
db.once('disconnected',()=>{
    isConected= false;
    console.log('Desconectado de MongoDB'. yelow)
})
process.on('SIGINT', async() => {
    await mongoose.connection.close();
    console.log('MongoDB desconectado'. yelow);
    process.exit(0);
})
export {conectarDBMongo, isConected};




