#!/bin/bash

# 🛠️ Step 1: Create Vite React project
echo "📦 Creating Vite React project..."
npx create-vite@latest ecommerce-platform --template react

# Navigate to project directory
cd ecommerce-platform || exit

# 🛠️ Step 2: Install dependencies
echo "📥 Installing dependencies..."
npm install redux react-redux axios framer-motion sass react-router-dom tailwindcss postcss autoprefixer

# 🛠️ Step 3: Configure TailwindCSS
echo "🎨 Setting up TailwindCSS..."
npx tailwindcss init -p

# 🛠️ Step 4: Install Supabase separately (to avoid errors)
echo "🛡️ Installing Supabase..."
npm install supabase-js@2

# 🛠️ Step 5: Create necessary folders
echo "📂 Creating project folders..."
mkdir -p src/{assets,components,pages,context,hooks,services,styles,utils}

# 🛠️ Step 6: Create global styles
echo "🎨 Adding TailwindCSS global styles..."
echo "@tailwind base;\n@tailwind components;\n@tailwind utilities;" > src/styles/global.css

# 🛠️ Step 7: Open in VS Code
echo "🚀 Opening project in VS Code..."
code .

echo "✅ Setup complete! Run 'cd ecommerce-platform && npm run dev' to start the server."
