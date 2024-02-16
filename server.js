const express = require('express')
const app = express()
const port = 3000

// this is my middleware to write html....
app.set('view engine', 'ejs')
app.use(express.static('static'))
// this is my middleware to write html....

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/register', (req, res) => {
  res.send('Registreer acount!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log("hello world!");