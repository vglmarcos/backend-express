const app = require('./app.js');

app.listen(app.get('PORT'), () => {
    require('./database.js');
    console.log('Escuchando en el puerto', app.get('PORT'));
});