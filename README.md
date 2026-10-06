# AI Wedding

A responsive static wedding website featuring Haldi, cocktail, mehendi, and wedding reception. Built with HTML, CSS, and JavaScript; no Node, package installation, database, or build step required.

The local checkout includes `manage.sh`, which uses the official GitHub CLI installed in this task's `work/` directory and the bundled Git executable. Once authentication is complete, run `sh manage.sh publish "Update wedding details"` to commit and push updates, or `sh manage.sh status` to inspect recent deployments. Its workspace paths are for this Mac; other machines can use the standard Git instructions below.

## Preview

Open `index.html` directly in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Customize

Edit `content.js` for names, wedding date text, location, story, travel information, contact details, and each event's date, time, venue, and attire. Empty fields retain the clear placeholder copy. No dates or venues have been invented.

Place photos and MP4 films under `assets/`, then add relative paths to `memories` in `content.js`. Examples are included there. Photos open in an accessible native dialog, and videos have playback controls. Filter memories by celebration. Add an `image` and `imageAlt` to each event to replace its illustrated placeholder. Set `heroImage` to replace the original SVG illustration. Google Fonts are optional; local serif and sans-serif fallbacks work without them.

## GitHub Pages deployment

1. Create a public repository named `ai-wedding` in `ishadesigns`.
2. Push this folder's contents to its `main` branch, including `.github/workflows/pages.yml`.
3. In repository **Settings → Pages**, choose **GitHub Actions** as the source.
4. The included workflow publishes the website on every push to `main`. The expected URL is `https://ishadesigns.github.io/ai-wedding/`; it is not live until deployment succeeds.

## Terminal setup and ongoing updates

Install Git (macOS Command Line Tools) and the official GitHub CLI if absent. Authenticate with `gh auth login --hostname github.com --git-protocol https --web`, using the `ishadesigns` account, then verify with `gh api user --jq .login`.

For the initial deployment, from this folder:

```sh
git init -b main
git add .
git commit -m "Create AI Wedding static website"
gh repo create ishadesigns/ai-wedding --public --source=. --remote=origin --push
gh api --method POST repos/ishadesigns/ai-wedding/pages -f build_type=workflow
gh workflow run pages.yml
gh run list --workflow pages.yml
```

If the repository was already created in Safari, use `git remote add origin https://github.com/ishadesigns/ai-wedding.git` and `git push -u origin main` instead of `gh repo create`.

For later updates:

```sh
git add .
git commit -m "Update wedding details and memories"
git push
```

Wait for the Pages workflow to succeed before checking the public URL. Do not put credentials in website files. Longer films should use external hosting rather than large files in Git.
