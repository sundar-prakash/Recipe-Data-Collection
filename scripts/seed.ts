import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const filePath = path.resolve(__dirname, '../US_recipes_null.Pdf.json');
    console.log(`Reading file from ${filePath}`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Convert object to array
        const recipes = Object.values(data);

        console.log(`Found ${recipes.length} recipes to process.`);

        const formattedRecipes = recipes.map((recipe: any) => {
            // Helper to handle NaN or invalid numbers
            const parseNumber = (val: any) => {
                if (typeof val === 'number') {
                    return isNaN(val) ? null : val;
                }
                if (typeof val === 'string') {
                    if (val === 'NaN') return null;
                    const parsed = parseFloat(val);
                    return isNaN(parsed) ? null : parsed;
                }
                return null;
            };

            return {
                title: recipe.title,
                cuisine: recipe.cuisine || 'Unknown',
                rating: parseNumber(recipe.rating) || 0,
                prep_time: parseNumber(recipe.prep_time) || 0,
                cook_time: parseNumber(recipe.cook_time) || 0,
                total_time: parseNumber(recipe.total_time) || 0,
                description: recipe.description || '',
                nutrients: recipe.nutrients || {},
                serves: recipe.serves || '',
                url_link: recipe.URL || '', // Correct mapping
                continent: recipe.Contient || 'Unknown', // Typo in JSON
                country_state: recipe.Country_State || 'Unknown',
                ingredients: recipe.ingredients || [],
                instructions: recipe.instructions || []
            };
        }).filter((recipe: any) => recipe.title && recipe.title.trim() !== '');

        console.log(`Filtered down to ${formattedRecipes.length} valid recipes.`);

        console.log('Inserting data into Supabase...');

        // Insert in batches to avoid payload limits
        const batchSize = 100;
        for (let i = 0; i < formattedRecipes.length; i += batchSize) {
            const batch = formattedRecipes.slice(i, i + batchSize);
            const { error } = await supabase.from('recipes').insert(batch);

            if (error) {
                console.error('Error inserting batch:', error);
            } else {
                console.log(`Inserted batch ${i / batchSize + 1}`);
            }
        }

        console.log('Seeding completed.');

    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seed();
