const app = require('./app.js');
require('./database.js');

app.listen(app.get('PORT'), () => {
    console.log('Escuchando en el puerto', app.get('PORT'));
});