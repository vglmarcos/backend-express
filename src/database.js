const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Se ha conectado a la base de datos.');
})
.catch((err) => {
    console.log(err);
});