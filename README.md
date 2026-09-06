# AstraLab

A GitHub Pages-compatible Science Olympiad Astronomy practice hub. It includes:

- 109 locally bundled DSO images across all 13 draft-rule targets
- a specific-DSO gallery with all 109 supplied views across 13 targets and extra results from NASA's public image library
- image filters by wavelength and challenge level
- MCQ and FRQ galaxy drills with Enter-to-check and Enter-to-continue keyboard control
- a browser-saved frequently-missed DSO identification queue
- article-length pages for every DSO based on all 190 mentor-deck slides, with web verification, slide-discrepancy warnings, key points, likely test connections, and a mini-quiz after every section
- a second mentor-aligned course covering nine galaxy categories: spiral, barred spiral, elliptical, lenticular, irregular/dwarf, interacting, ring, starburst, and active/peculiar
- two no-AI galaxy study paths: curated general-galaxy questions from `Practice Test Questions.docx` and object-specific fact drills from the mentor DSO materials
- randomized calculation practice across seven equation families
- a local PDF/DOCX/TXT style library
- optional fresh AI questions through a private serverless endpoint

## Run locally

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

Upload the contents of this folder to the root of a GitHub repository, push to `main`, and enable **Settings → Pages → GitHub Actions**. The included workflow builds and deploys the site and automatically uses the repository name as its asset prefix.

The site works without AI. DSO recognition, built-in general knowledge, calculations, progress, and local imports remain available.

The bundled practice bank contains only multiple-choice questions whose correct option was explicitly highlighted in the source DOCX. To regenerate it after changing the document, run:

```bash
python scripts/extract-practice-bank.py "/path/to/Practice Test Questions.docx" public/practice-bank.json
```

## Enable fresh AI questions safely

GitHub Pages is public and static, so never place an OpenAI API key in the website or a GitHub Pages environment variable. The browser instead calls a small server-side endpoint.

1. Copy `serverless/wrangler.example.toml` to `serverless/wrangler.toml`.
2. Replace `ALLOWED_ORIGINS` with the exact local and GitHub Pages origins you use.
3. From `serverless/`, run `npx wrangler secret put OPENAI_API_KEY --config wrangler.toml`.
4. Deploy with `npx wrangler deploy --config wrangler.toml`.
5. In AstraLab, open **Import tests**, paste the worker URL, and save it.

Imported source text stays in that browser's local storage. Excerpts are sent to your endpoint only when you click an AI-generation button. Uploaded material is treated as untrusted reference content, never as instructions.

For a public endpoint, also add Cloudflare rate limiting or authentication before sharing it widely.
