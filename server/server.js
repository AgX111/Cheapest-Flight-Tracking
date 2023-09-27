const express = require('express');
const cors = require('cors');
const fsp = require('fs').promises
const port = 3000;
const app = express();
app.use(cors());
// const bodyParser = require('body-parser');
// app.use(bodyParser.json())
// app.use(express.json())

app.post('/cheap',async (req,res)=>{
    const {dep_iata, arr_iata,depart_date} = req.headers;
    let response = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${dep_iata}&destination=${arr_iata}&departure_at=${depart_date}&unique=false&sorting=price&direct=false&currency=INR&limit=30&page=1&one_way=true&token=48b75199baefa09aeede7ed7e3c47a64`)
    
    response = await response.json()
    
    console.log(req.headers['content-type'])
    res.status(200).send(response);
})

app.get('/nonstop',async (req,res)=>{
    const {dep_iata, arr_iata,depart_date} = req.headers;
    let response = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${dep_iata}&destination=${arr_iata}&departure_at=${depart_date}&unique=false&sorting=price&direct=true&currency=INR&limit=30&page=1&one_way=true&token=48b75199baefa09aeede7ed7e3c47a64`,{headers:{
        "Accept-Encoding":"gzip, deflate"
    }})
    response = await response.json()
    
    res.status(200).send(response);
})



app.get('/test',(req,res)=>{
    fsp.readFile('./airports.json','utf-8')
    .then((data)=>JSON.parse(data))
    .then((parsed)=>parsed.map((element)=>{
        return {value:element.code,label:`${element.city+' ('+element.code+')'+', '+element.country}`}
    }))
    .then(async (array)=>res.send(array))

    
})




app.listen(port,()=>console.log('Server Started'))