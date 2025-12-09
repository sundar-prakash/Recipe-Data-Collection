-- Create the recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT,
    cuisine TEXT,
    rating FLOAT,
    prep_time INT,
    cook_time INT,
    total_time INT,
    description TEXT,
    nutrients JSONB,
    serves TEXT,
    img_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes USING btree (title);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes USING btree (cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_total_time ON recipes USING btree (total_time);
CREATE INDEX IF NOT EXISTS idx_recipes_rating ON recipes USING btree (rating);
