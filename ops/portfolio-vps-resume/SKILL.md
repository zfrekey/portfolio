---
name: portfolio-vps-resume
description: Resume the VPS, Nginx, DNS, SSL, and upcoming Docker/GitHub Actions deployment setup for filypeabreu.tech. Use this when continuing the infrastructure setup for this portfolio project.
---

# Portfolio VPS Resume

Use this skill when resuming deployment setup for this repository on the Hostinger VPS.

## Current target

- Project: Next.js portfolio / landing page with lightweight blog sections
- Domain: `filypeabreu.tech`
- Canonical host: `https://filypeabreu.tech`
- VPS provider: Hostinger
- Reverse proxy: Nginx
- App runtime target: Docker Compose
- App upstream target for Nginx: `127.0.0.1:3000`

## Current confirmed state

- VPS OS was recreated recently, so SSH host key changed and that was expected.
- User `deploy` exists and is accessible by SSH from the local machine.
- Docker was installed and enabled on boot.
- Nginx was installed as root and is running.
- UFW was configured with `OpenSSH` and `Nginx Full`.
- DNS for `filypeabreu.tech` and `www.filypeabreu.tech` points to the VPS IP `72.60.4.150`.
- Certbot was already run and HTTPS is enabled.
- Nginx behavior was validated with `curl`.

## Current Nginx behavior

These responses were confirmed:

- `http://www.filypeabreu.tech` -> `301` to `https://filypeabreu.tech/`
- `http://filypeabreu.tech` -> `301` to `https://filypeabreu.tech/`
- `https://www.filypeabreu.tech` -> `301` to `https://filypeabreu.tech/`
- `https://filypeabreu.tech` -> `502 Bad Gateway`

The `502` is expected because the app is not yet running on `127.0.0.1:3000`.

## Intended final architecture

1. GitHub Actions validates the app.
2. GitHub Actions builds and pushes a Docker image to GHCR.
3. GitHub Actions connects to the VPS over SSH as `deploy`.
4. The VPS pulls the image and runs `docker compose up -d`.
5. Nginx proxies `https://filypeabreu.tech` to `127.0.0.1:3000`.

## Local repository facts

- CI workflow exists at `.github/workflows/ci.yml`
- Deploy workflow exists at `.github/workflows/deploy.yml`
- Production compose template exists at `deploy/docker-compose.prod.yml`
- Dockerfile exists at `Dockerfile`
- README already documents the intended Hostinger + GHCR + SSH deployment model

## Highest-priority next step

Finish the Docker deployment path on the VPS and remove the `502`.

## Resume checklist

Follow this order unless the user asks to change it:

1. Reconfirm current server state:
   - `systemctl status nginx`
   - `docker --version`
   - `docker compose version`
   - `sudo ufw status verbose`
2. Reconfirm DNS and edge behavior:
   - `curl -I http://filypeabreu.tech`
   - `curl -I https://filypeabreu.tech`
3. Inspect the production deployment files in the repo:
   - `deploy/docker-compose.prod.yml`
   - `.github/workflows/deploy.yml`
4. Decide whether to:
   - do a manual first deploy on the VPS for validation, or
   - wire the GitHub Actions secrets first and deploy through Actions immediately
5. Ensure the container binds only locally:
   - `127.0.0.1:3000:3000`
6. Start the app and verify:
   - `curl -I http://127.0.0.1:3000`
   - `curl -I https://filypeabreu.tech`
7. Confirm the public endpoint no longer returns `502`

## Recommended VPS layout

Use a simple layout:

- app directory: `/home/deploy/portfolio` or the path already chosen by the workflow variable `DEPLOY_PATH`
- compose file on server: `docker-compose.yml`
- env file on server: `.env`
- SSH user for deploys: `deploy`
- do not use `root` for GitHub Actions deploys

## GitHub Actions information to verify before deploy

Repository secrets expected by the deploy workflow:

- `HOSTINGER_HOST`
- `HOSTINGER_SSH_USER`
- `HOSTINGER_SSH_KEY`
- `HOSTINGER_SSH_PORT`

Optional repository variables:

- `DEPLOY_PATH`
- `APP_PORT`
- `HOST_BIND`

Reasonable values for this project:

- `HOSTINGER_HOST=72.60.4.150`
- `HOSTINGER_SSH_USER=deploy`
- `HOSTINGER_SSH_PORT=22`
- `DEPLOY_PATH=/home/deploy/portfolio`
- `APP_PORT=3000`
- `HOST_BIND=127.0.0.1`

## Operational constraints

- Keep the setup simple. This is a portfolio project, not a production SaaS.
- Avoid introducing Kubernetes, staging, or extra infra layers.
- Prefer one VPS, Docker Compose, Nginx, HTTPS, and GitHub Actions.
- Do not expose the app directly on public port `3000`.
- Prefer canonical redirects to `https://filypeabreu.tech`.

## First message to send when resuming

When resuming, say something concise like:

"I’m loading the saved VPS setup context and checking the current server/deploy state before we finish the Docker path."
