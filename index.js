import express from 'express';
import supabase from './supabaseClient.js';
import cors from 'cors';

// Using NODEMON for hot reload
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to receive and check JWT
// User login via app, retrieve the token -> use token to access API
const authenticateUser = async (req, res, next) => {
    console.log("siging in... ")
    const token = req.headers.authorization?.split(" ")[1]; // Extract the header from the token
    if (!token) return res.status(401).json({ error: "Invalid token, check authorization" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: "Invalid token, check authorization" });

    req.user = data.user;
    next(); // Moves from middleware to actual route
};

//_________________________________________________
// Test connection
app.get("/", async (req, res) => {
    res.send("Test connection 1 2 3 ... :D --> SUCCESS");
});

//_________________________________________________
// LIFT_CATEGORY ENDPOINTS

// To get all lift categories
app.get("/categories", async (req, res) => {
    const { data, error } = await supabase
        .from('lift_category')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});


// To get lift_category by name
app.get("/categories/:lift_category_name", async (req, res) => {
    const { data, error } = await supabase
        .from('lift_category')
        .select()
        .eq('name', req.params.lift_category_name);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});


//_________________________________________________
// LIFTS ENDPOINTS - USER CAN ONLY SEE THEIR OWN

// To get all lifts by a user
app.get("/lifts", authenticateUser, async (req, res) => {
    const { data, error } = await supabase
        .from('lifts')
        .select('*')
        .eq("user_id", req.user.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// To get all lifts in a category
app.get('/lifts/:lift_category_id', authenticateUser, async (req, res) => {
    const { data, error } = await supabase
        .from('lifts')
        .select()
        .is('lift_category_id', req.params.lift_category_id);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// To add a new lift
app.post('/lifts', authenticateUser, async (req, res) => {
    console.log("checking connection")
    const { lift_category_id, date, weight_lifted } = req.body;
    console.log(req.user)
    // Convert weight_lifted to a proper number if it's a string
    const weightParsed = parseFloat(weight_lifted);

    if (!lift_category_id || !date || isNaN(weightParsed)) {
        return res.status(400).json({ error: "All fields are required and weight_lifted must be a number!" });
    }

    const { data, error } = await supabase
        .from('lifts')
        .insert([
            { user_id: req.user.id, lift_category_id, date, weight_lifted },
        ]); 

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data); // If created successfully, send back the newly created data
});

// To delete a lift record
app.delete('/lifts/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('lifts')
        .delete()
        .eq("id", id)
        .eq("user_id", req.user.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Lift deleted successfully." });
});

// To edit a lift record
app.put('/lifts/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { weight_lifted, date } = req.body;

    const { data, error } = await supabase
        .from('lifts')
        .update({ weight_lifted, date })
        .eq("id", id)
        .eq("user_id", req.user.id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
