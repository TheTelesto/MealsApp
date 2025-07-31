# 🚀 GitHub Pages Deployment Guide

Follow these steps to deploy your Weekly Dinner Planner to GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `MealsApp` or `dinner-planner`)
5. Make sure it's set to **Public**
6. Check "Add a README file"
7. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using GitHub Web Interface (Easiest)
1. In your new repository, click "uploading an existing file"
2. Drag and drop these files from your MealsApp folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Write a commit message like "Initial commit - Meal Planner App"
4. Click "Commit changes"

### Option B: Using Git Commands (If you have Git installed)
```bash
# Navigate to your MealsApp folder
cd "c:\Users\tihowell\MealsApp"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Meal Planner App"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/YOURUSERNAME/YOURREPONAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 4: Access Your Live Site

1. After a few minutes, your site will be available at:
   `https://YOURUSERNAME.github.io/YOURREPONAME/`

2. GitHub will show you the exact URL in the Pages settings

## Step 5: Update the Links (Optional)

1. Edit your `README.md` file on GitHub
2. Replace `[Your GitHub Pages URL will go here]` with your actual URL
3. Replace the footer link in `index.html` if desired

## 🎉 You're Done!

Your meal planner is now live and accessible to you and your partner from anywhere!

## 📱 Sharing with Your Partner

Simply share the GitHub Pages URL with your partner. They can:
- Bookmark it on their phone/computer
- Add it to their home screen (PWA-like experience)
- Use it from any device with a web browser

## 🔄 Making Updates

To update your app in the future:
1. Make changes to your local files
2. Upload the changed files to GitHub (or use git commands)
3. GitHub Pages will automatically update your live site

## 💡 Pro Tips

- **Bookmark the live URL** for quick access
- **Add to home screen** on mobile devices for app-like experience
- **Share the GitHub repository** if your partner wants to suggest new meals
- **The app works offline** once loaded (thanks to local storage)

---

Enjoy your meal planning! 🍽️
