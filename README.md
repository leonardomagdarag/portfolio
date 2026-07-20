<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d07b26b5-03ac-4563-92a7-ca8a9244bb3a

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open the repository settings and enable GitHub Pages with the "GitHub Actions" source.
3. The included workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will build and publish the site whenever you push to the `main` branch.
4. After the workflow finishes, your site will be available at:
   `https://<your-username>.github.io/Portfolio-better/`

If you want to deploy manually from your machine, run:
`npm run build`
