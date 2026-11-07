# ALKHADEMY
a learning site for research inspired by khan academy, made by NVTH
Prompt:Below is a complete, runnable Node.js + TypeScript project for ALKHADEMY, followed by the steps to put it on GitHub. Create each file at the path shown in its heading and paste in the code.
# ALKHADEMY
Free research & STEM learning portal for Batangas Province Science High School.
Created by **Nathan Robles**, dedicated to **Ma'am Alday**.

## Run locally
npm install
npm run dev
# open [localhost](http://localhost:3000)


About the database: the server keeps progress in memory, so it runs right away without PostgreSQL. The Prisma schema is included and ready for when you set up a database.

# ALKHADEMY
Free research & STEM learning portal for Batangas Province Science High School.
Created by **Nathan Robles**, dedicated to **Ma'am Alday**.

## Run locally
npm install
npm run dev
# open [localhost](http://localhost:3000)
6. Running it on your computer
Install Node.js 18 or newer from nodejs.org.
Open a terminal in the alkhademy folder and run npm install.
Run npm run dev.
Open [localhost](http://localhost:3000) in your browser.
7. Putting it on GitHub
You'll need a GitHub account and Git installed (from git-scm.com).

On github.com, click New repository (the + at the top right). Name it alkhademy, leave "Add README" unchecked, and click Create repository.
In your terminal, inside the project folder, run these commands, replacing YOUR-USERNAME with your GitHub username:
bash


git init
git add .
git commit -m "First version of ALKHADEMY"
git branch -M main
git remote add origin [github.com](https://github.com/YOUR-USERNAME/alkhademy.git)
git push -u origin main
When Git asks you to sign in, use your GitHub login. If it asks for a password, you'll need a personal access token instead (Settings → Developer settings → Personal access tokens).

No-terminal option: on your new repository's page, click "uploading an existing file". Then drag in all the files and folders except node_modules.

8. Opening it on GitHub
There are two ways, depending on what you want:

Run the full Node app on GitHub (Codespaces): on your repo page, click the green Code button → Codespaces → Create codespace on main. A VS Code editor opens in your browser. In its terminal, run npm install and then npm run dev. When a popup offers port 3000, click Open in Browser. This runs the real server, including Almigo. GitHub gives personal accounts free monthly Codespaces hours.
Get a public website link (GitHub Pages): go to Settings → Pages, set Source to Deploy from a branch, and pick branch main with folder / (root). Pages can't run Node.js, so first copy public/index.html to the top level of the repo (next to package.json). Your site will then be at [your-username.github.io](https://YOUR-USERNAME.github.io/alkhademy/). On Pages, the frontend uses its built-in course data and simpler offline Almigo replies.
To host the full Node server publicly, use a service like Render or Railway. Connect it to your GitHub repo, set the build command to npm install && npm run build and the start command to npm start.

Adding the database and a smarter Almigo:

Database: put a PostgreSQL connection string in DATABASE_URL in a .env file, then run npm run db:push. Neon and Supabase both have free tiers.
Almigo AI: add an OPENAI_API_KEY to .env to get real AI replies. Without one, Almigo uses its built-in Socratic responses.
