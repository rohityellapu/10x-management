const app = require('express')();
const PORT = 8080;
const mongoose = require('mongoose');
const classStudentRoutes = require('./routes/classStudent');

mongoose.connect('mongodb://localhost/10xmanagement', () => console.log('Database is connected'))

app.use('/v1/myClass', classStudentRoutes)



app.listen(PORT, () => console.log('Server is on PORT', PORT));