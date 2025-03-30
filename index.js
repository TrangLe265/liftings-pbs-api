import express from 'express';
import supabase from './supabaseClient.js'; 
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json()); 

//middlware to receive and check jwt 
//user login via app, retrieve the token -> use token to access api
const authenticateUser = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1] //extract the header from the token 
    if (!token) return res.status(401).json({error:"Invalid token, check aiuthorization"}); 

    const {data,error} = await supabase.auth.getUser(token); 
    if(error || !data?.user) return res.status(401).json({error:"Invalid token, check aiuthorization"}); 

    req.user= data.user; 
    next(); 
    //an express.js function
    //moves from middleware to actual route
}

app.get("/", async(req,res) =>{
    res.send("Test")
})

//to get all lift categories
app.get("/categories", async (req, res) => {
    const { data, error } = await supabase
        .from('lift_category')
        .select('*'); 

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get("/lifts", async (req, res) => {
    const { data, error } = await supabase
        .from('lifts')
        .select('*'); 

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

//to get lifts by category
app.get('/lifts/:lift_catgory_id', async(req,res) => {
    const {data,error} = await supabase.from('lifts').select().is('lift_category_id', req.params.lift_catgory_id)
})

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));

