# Portfolio

Personal portfolio and miniblog foundation built with Next.js, TypeScript, Tailwind CSS, Docker, and GitHub Actions.

## Development

Requirements:

- Node.js 22
- npm

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Validate locally:

```bash
npm run lint
npm run build
```

## Docker

Build and run the production container:

```bash
docker compose up --build
```

The app is exposed on `http://localhost:3000`.

## Architecture Note

This first version is static and content-driven. There is no backend, database, authentication, admin panel, newsletter, or course area in v1.

Content should be accessed through small feature-level functions such as `getBooks()`, `getBookBySlug(slug)`, `getProjects()`, `getProjectBySlug(slug)`, `getPosts()`, `getPostBySlug(slug)`, and `getStackItems()`. For now these functions are empty shells prepared for repository-local content.

Future Markdown, MDX, database, or admin support can be added behind the same function interfaces so pages and components do not need to know where the content is stored.

## Structure

```text
src/
  app/                 Next.js App Router entry points
  components/          Shared layout and UI components
  content/             Future repository-local content
  features/            Feature-oriented content access and domain logic
  lib/                 Shared utilities
  types/               Shared TypeScript types
```

## VPS Deployment Direction

The project is prepared for a simple VPS deployment path:

1. Build the app with `npm run build` or with Docker.
2. Run the production container with `docker compose up --build -d`.
3. Put a reverse proxy such as Nginx or Caddy in front of port `3000`.
4. Add HTTPS certificates and environment variables when the deployment target is defined.

## Hostinger VPS CD

The production deployment target is a Hostinger KVM VPS running Docker. Hostinger documents two supported Docker setup paths for Ubuntu VPS servers: installing Docker manually or selecting their Docker VPS template from hPanel. See Hostinger's Docker on Ubuntu guide: <https://www.hostinger.com/tutorials/how-to-install-docker-on-ubuntu>.

Recommended deployment model:

1. GitHub Actions validates the app with `npm ci`, `npm run lint`, and `npm run build`.
2. GitHub Actions builds the Docker image and pushes it to GitHub Container Registry.
3. GitHub Actions connects to the VPS over SSH.
4. The VPS pulls the image and restarts the app with Docker Compose.

This avoids rebuilding the Next.js app on the VPS and keeps the server responsible only for running containers.

### VPS Requirements

On the Hostinger VPS:

- Ubuntu 22.04 LTS or 24.04 LTS.
- Docker Engine installed and running.
- Docker Compose available through `docker compose`.
- An SSH user that can run Docker commands.
- A reverse proxy such as Caddy or Nginx when using a real domain.

If using a non-root deploy user, add it to the Docker group:

```bash
sudo usermod -aG docker deploy
```

Log out and back in after changing group membership.

### GitHub Secrets

Add these repository secrets in GitHub:

```text
HOSTINGER_HOST=your_vps_ip_or_hostname
HOSTINGER_SSH_USER=deploy
HOSTINGER_SSH_KEY=private_ssh_key_for_the_deploy_user
HOSTINGER_SSH_PORT=22
```

`HOSTINGER_SSH_PORT` is optional. If it is empty, the workflow uses port `22`.

Add these repository variables if you want to override the defaults:

```text
DEPLOY_PATH=apps/portfolio
APP_PORT=3000
HOST_BIND=127.0.0.1
```

By default, the app binds to `127.0.0.1:3000` on the VPS. That is intentional for production behind a reverse proxy. If you want to expose the container directly for a temporary test, set `HOST_BIND=0.0.0.0` and open the port in your firewall.

### Deployment Workflow

The CD workflow is defined in `.github/workflows/deploy.yml`.

It runs on:

- pushes to `main`;
- manual runs through GitHub Actions `workflow_dispatch`.

The production Compose file copied to the VPS is `deploy/docker-compose.prod.yml`. It expects `PORTFOLIO_IMAGE` to be set by the deploy workflow and starts the app as `portfolio-web`.

On the VPS, useful commands are:

```bash
cd apps/portfolio
docker compose ps
docker compose logs -f web
docker compose pull
docker compose up -d
```
