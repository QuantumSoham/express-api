import express from 'express';

const app = express();
const port = 30069;

app.use(express.json());

let koffeeData = [];
let nextId = 1;

app.post('/koffee', (req, res) => {
    const { name, price } = req.body;
    const newKoffee = { id: nextId++, name, price };
    koffeeData.push(newKoffee);
    res.status(201).send(newKoffee);
});
app.get('/koffee',(req,res)=>{
    res.status(200).send(koffeeData);
})

app.get("/koffee/:id",(req,res)=>{
    const koffee=koffeeData.find(k=>k.id===parseInt(req.params.id))
    if(!koffee)
    {
        return res.status(404).send('Koffee not found');
    }
    res.status(200).send(koffee);
});
app.put('/koffee/:id',(req,res)=>{
    const koffee=koffeeData.find(k=>k.id===parseInt(req.params.id));
    if(!koffee)
        {
            return res.status(404).send('Koffee not found');
        }
    const {name,price}=req.body;
    koffee.name=name;
    koffee.price=price;
    res.send(200).send(koffee);
});
app.delete('/koffee/:id',(req,res)=>{
    const index=koffeeData.findIndex(k=>k.id===parseInt(req.params.id));
    if(index===-1)
        return res.status(404).send('koffee not found');
    koffeeData.splice(index,1);
    return res.status(204).send('deleted');
})
// app.get('/', (req, res) => {
//     res.send("Hello there Ezio here!");
// });

// app.get('/ice-tea', (req, res) => {
//     res.send("Hello there tea here!");
// });

// app.get('/burger', (req, res) => {
//     res.send("Hello there burger here!");
// });

// app.get('/eagle', (req, res) => {
//     res.send("Assassino!!");
// });

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
