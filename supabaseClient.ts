import dotenv from "dotenv"; 
import {createClient, SupabaseClient} from '@supabase/supabase-js'; 

dotenv.config(); 

const supabaseUrl: string = process.env.SUPABASE_URL!; 
const supabaseKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY!; 

if (!supabaseUrl || !supabaseKey){
    throw new Error("Miissing Supabase environments variables!")
}

const supabase: SupabaseClient = createClient(supabaseUrl,supabaseKey); 

export default supabase; 