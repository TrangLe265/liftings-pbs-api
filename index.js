import express from 'express';
import supabase from './supabaseClient';

const express = require('express'); 
const app = express();

//to get lifts by category
app.get('/lifts/:lift_catgory_id', async(req,res) => {
    const {data,error} = await supabase.from('lifts').select().is('lift_category_id', req.params.lift_catgory_id)
})

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));