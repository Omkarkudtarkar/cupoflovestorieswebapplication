# Cup Of Love Stories — React + Vite

## 📁 Folder Structure

```
cupoflovestories/
├── public/
│   ├── backgrounds/
│   │   ├── vintage.jpg       ← tiled bg on home pages
│   │   └── texture.jpg       ← bg on inquire/collection pages
│   └── images/
│       ├── india/
│       │   ├── cover.jpg     ← hero image
│       │   ├── cover2.jpg    ← second feature image
│       │   ├── behind.jpg    ← behind the lens portrait
│       │   ├── behind2.jpg   ← full-width behind image
│       │   ├── olive.jpg     ← hero bg texture
│       │   └── photo1-15.jpg ← fallback gallery (if no Supabase)
│       └── europe/
│           ├── cover.jpg
│           ├── cover2.jpg
│           ├── behind.jpg
│           ├── behind2.jpg
│           └── photo1-6.jpg
├── src/
│   ├── lib/supabase.js       ← 🔧 ADD YOUR SUPABASE KEYS HERE
│   ├── context/RegionContext.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ScrollReveal.jsx
│   └── pages/
│       ├── India/            ← All India pages
│       ├── Europe/           ← All Europe pages
│       ├── Admin/AdminPage.jsx
│       └── ThankYou.jsx
```

## 🚀 Step-by-Step Setup

### Step 1 — Install Node.js
Download from https://nodejs.org (LTS version)

### Step 2 — Install dependencies
```bash
cd cupoflovestories
npm install
```

### Step 3 — Set up Supabase
1. Go to https://supabase.com → Create a free account
2. Click "New Project" → give it a name → set a DB password
3. Once created, go to **Settings → API**
4. Copy your **Project URL** and **anon public key**
5. Open `src/lib/supabase.js` and replace:
   ```js
   const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'
   const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY'
   ```

### Step 4 — Create Storage Buckets in Supabase
1. In Supabase dashboard → **Storage** → **New bucket**
2. Create bucket named: `india-photos` → check **Public bucket** → Save
3. Create bucket named: `europe-photos` → check **Public bucket** → Save

### Step 5 — Set Storage Policy (allow public read + admin upload)
For each bucket, go to **Storage → Policies → New Policy**:
- **SELECT (read):** Allow for everyone (anon role)
- **INSERT (upload):** Allow for authenticated OR set to anon if you prefer
  - Easiest: In bucket settings, enable "Allow public access"

### Step 6 — Add your background images
Place these files in the `public/` folder:
```
public/backgrounds/vintage.jpg   ← home page tiled background
public/backgrounds/texture.jpg   ← inquire/collection background
```

### Step 7 — Add your local photos (optional fallback)
If Supabase isn't set up yet, the site uses local files:
```
public/images/india/cover.jpg, cover2.jpg, photo1.jpg ... photo15.jpg
public/images/europe/cover.jpg, cover2.jpg, photo1.jpg ... photo6.jpg
```

### Step 8 — Change admin password
Open `src/pages/Admin/AdminPage.jsx` line 4:
```js
const ADMIN_PASSWORD = 'cupoflovestories2026'  // ← change this
```

### Step 9 — Run the site
```bash
npm run dev
```
Open http://localhost:5173

### Step 10 — Build for production
```bash
npm run build
```
Upload the `dist/` folder to any host (Netlify, Vercel, etc.)

---

## 🔐 Admin Access

**To open admin:** Click the logo in the navbar **5 times quickly**
Or go directly to: `yoursite.com/admin`

**Features:**
- Password protected (session only)
- Upload multiple photos to India or Europe collection
- Delete photos
- Photos appear instantly on the live site

---

## 🔄 Region Toggle

The toggle in the navbar switches between India and Europe.
It saves to localStorage so the user's preference is remembered.

---

## 📧 Form Submissions

Forms use FormSubmit.co — no backend needed.
Emails go to: `cupoflovestories06@gmail.com`
Change this in `src/pages/India/Inquire.jsx` and `src/pages/Europe/Inquire.jsx`

