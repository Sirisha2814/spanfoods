const path = require('path')
const express = require('express')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require('cors');
// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.use('/api/foods',require('./routes/foodRoute'))
app.use('/api/locations',require('./routes/locationRoute'))
app.use('/api/mealtype',require('./routes/MealRoute'))
app.use('/api/fooditems',require('./routes/fooditemsRoute'))
app.use('/api/meals',require('./routes/selectmealRoute'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
