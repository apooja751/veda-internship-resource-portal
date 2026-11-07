# Veda Technology Internship Resource Portal

A web-based internship resource portal designed to organize internship information in one place. It provides interns with access to technical domains, project details, learning resources, internship guidelines, and frequently asked questions.

## Features

- **Internship Domains:** Explore different technical domains.
- **Projects:** View practical project information.
- **Learning Resources:** Access organized learning materials.
- **Internship Guidelines:** Review general internship guidance.
- **FAQs:** Find answers to common questions.
- **Search and Filtering:** Search portal content and filter by category.
- **Responsive Design:** Access the portal on desktop and mobile devices.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- Git and GitHub
- Cloudflare Pages
- Cloudflare Pages Functions

## Cloud Deployment

The website is hosted using Cloudflare Pages.

- Hosting platform: Cloudflare Pages
- Source repository: GitHub
- Deployment branch: main
- Website URL: https://veda-internship-resource-portal.pages.dev/
- HTTPS: Enabled through the Cloudflare Pages domain

GitHub integration enables automatic deployment when changes are pushed to the main branch.

## API Endpoint

The project includes a Cloudflare Pages Function API.

API URL:

https://veda-internship-resource-portal.pages.dev/api/resources

The API returns five sample learning resources in JSON format.

Example response:

```json
{
  "success": true,
  "total": 5,
  "resources": []
}
```

## Project Architecture

The architecture diagram is available in [ARCHITECTURE.md](ARCHITECTURE.md).

Main workflow:

1. Users access the website through Cloudflare Pages.
2. The frontend is built using HTML, CSS and JavaScript.
3. JavaScript requests resource information from the Pages Function API.
4. The API returns resource data in JSON format.
5. Existing local JSON data acts as a fallback if the API is unavailable.


## Project Structure

```text
veda-internship-resource-portal/
├── assets/
├── data/
│   └── resources.json
├── functions/
│   └── api/
│       └── resources.js
├── ARCHITECTURE.md
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Run:

```bash
python -m http.server 5500
```

5. Open this address in your browser:

```text
http://localhost:5500/
```

## Storage and DNS Notes

- Project screenshots and static resources are maintained in the GitHub repository.
- Cloudflare R2 has not been configured because account activation requested payment details.
- The project uses the free Cloudflare Pages domain.
- No custom domain has been purchased or configured.

## Rollback and Deployment Evidence

Cloudflare Pages deployment history provides access to previous deployments. Screenshots of deployment history and API testing are maintained as project evidence.

## Project Purpose

The purpose of this project is to demonstrate a cloud-hosted internship resource portal using frontend technologies, GitHub version control, Cloudflare Pages hosting, and serverless API functionality.

## Disclaimer

This is a student-developed demonstration project. Internship guidelines and resource information are sample content and should not be treated as official Veda Technology policies.


