
# Veda Internship Resource Portal – Architecture

```mermaid
flowchart TD
    A[User] --> B[Cloudflare Pages]
    B --> C[Website]
    C --> D[HTML, CSS and JavaScript]
    D --> E[Pages Function API]
    E --> F[Resource Data - 5 Resources]
    D --> G[Static JSON Fallback]
    H[GitHub Repository] --> I[Automatic Deployment]
    I --> B
```

## Architecture Explanation

1. **GitHub:** Stores the website source code and project files.
2. **Cloudflare Pages:** Hosts the website and automatically deploys updates from GitHub.
3. **Frontend:** HTML, CSS and JavaScript provide the user interface.
4. **Pages Function API:** Provides resource information through an API endpoint.
5. **Resource Data:** The API currently returns five sample learning resources.
6. **JSON Fallback:** The website can use its existing JSON resource data if the API is unavailable.
