# Recipe Delivery App 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16-blue)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-black)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)](https://vercel.com/)

## Screenshots

![Recipe Delivery App](/recipe-app/screenshots/1.jpeg)
![2](/recipe-app/screenshots/2.jpeg)
![3](/recipe-app/screenshots/3.jpeg)
![4](/recipe-app/screenshots/4.jpeg)


**Secure, scalable recipe management platform** parsing JSON datasets into a production-ready API with pagination, sorting, full-text search, and responsive dashboard. Developed for **S.A. Engineering College Seurin Placement** showcasing **Security Analyst** competencies: Row Level Security (RLS), JWT auth, SQL injection prevention, and audit logging.

## ✨ Features
- **Data Pipeline**: JSON parsing → NaN handling → Supabase PostgreSQL ingestion
- **RESTful APIs**: `/api/recipes` (paginated/sorted), `/api/recipes/search` (multi-filter: rating<=4.5, title~="pie", serves="4")
- **Frontend**: Tailwind table with star ratings, detailed recipe view (ingredients, instructions), cell-level filtering, 10-50 pagination
- **Security**: Supabase RLS policies, CORS, rate limiting, secure env vars
- **Fallback UI**: "No recipes found" screens
- **Advanced Filters**: 
    - **Cuisine**: Case-insensitive search
    - **Serves**: Filter by serving size
    - **Time**: Filter by max prep time

**Student**: Sundar Prakash P | **CSSB Dept** | **Reg: 111922CW01043**

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Supabase (PostgreSQL), Next.js API Routes
- **Deployment**: Vercel (auto-deploys from GitHub)
- **Security**: RLS, input sanitization

## 📱 Live Demo
[Deployed App](https://recipe-data-collection-rose.vercel.app/)

**API Docs**: `/api/recipes?page=1&limit=20`

## 🏗️ Database Schema
```sql
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
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- [Supabase Account](https://supabase.com)
- GitHub account

### 1. Clone & Install
```bash
git clone https://github.com/sundar-prakash/Recipe-Data-Collection
cd Recipe-Data-Collection
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Seed Database
```bash
npm run seed  # Parses recipes JSON, handles NaN→NULL
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel
1. Push to GitHub
2. Connect repo at [vercel.com](https://vercel.com)
3. Add env vars in Vercel dashboard
4. Deploy! ✅



## 📊 API Endpoints

```http
GET /api/recipes?page=1&limit=20
GET /api/recipes/search?title=pie&rating=<=4.5&serves=4&total_time=<=30
GET /api/recipes/[id]
```

## 📄 License
MIT © Sundar Prakash P

**Looking for Security Analyst roles** – Contact: [Email](mailto:sundarprakash603@gmail.com) | [LinkedIn](https://linkedin.com/in/sundar-prakash)
