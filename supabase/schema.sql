-- Drop existing table
DROP TABLE IF EXISTS recipes;

-- Create the recipes table
CREATE TABLE recipes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    cuisine TEXT,
    rating FLOAT,
    prep_time INT,
    cook_time INT,
    total_time INT,
    description TEXT,
    nutrients JSONB,
    serves TEXT,
    url_link TEXT,
    continent TEXT,
    country_state TEXT,
    ingredients TEXT[],
    instructions TEXT[]
);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public recipes read" ON recipes
    FOR SELECT
    USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes USING btree (title);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes USING btree (cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_total_time ON recipes USING btree (total_time);
CREATE INDEX IF NOT EXISTS idx_recipes_rating ON recipes USING btree (rating);
