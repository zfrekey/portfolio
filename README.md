# Portfolio

Base de portfólio pessoal e miniblog construída com Next.js, TypeScript, Tailwind CSS, Docker e GitHub Actions.

## Desenvolvimento

Requisitos:

- Node.js 22
- npm

Instale as dependências:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Valide localmente:

```bash
npm run lint
npm run build
```

## Docker

Faça o build e rode o container de produção:

```bash
docker compose up --build
```

A aplicação fica disponível em `http://localhost:3000`.

## Nota de Arquitetura

Esta primeira versão é estática e orientada a conteúdo. Não há backend, banco de dados, autenticação, painel admin, newsletter ou área de cursos na v1.

O conteúdo deve ser acessado por pequenas funções por feature, como `getBooks()`, `getBookBySlug(slug)`, `getProjects()`, `getProjectBySlug(slug)`, `getPosts()`, `getPostBySlug(slug)` e `getStackItems()`. Por enquanto, essas funções são estruturas preparadas para conteúdo local do repositório.

No futuro, suporte a Markdown, MDX, banco de dados ou painel admin pode ser adicionado por trás dessas mesmas interfaces, para que páginas e componentes não precisem saber onde o conteúdo está armazenado.

## CI/CD

Este projeto usa GitHub Actions, Docker, GHCR e uma VPS com acesso por SSH.

Fluxo:

1. O `CI` roda em pull requests e em pushes para `main`.
2. O `CD` roda em pushes para `main` e também manualmente por `workflow_dispatch`.
3. O workflow de deploy gera a imagem Docker, publica no `ghcr.io`, conecta na VPS por SSH e atualiza a aplicação com Docker Compose.

### Instalações Necessárias

Na VPS:

- Docker Engine
- Docker Compose via `docker compose`
- Nginx ou outro proxy reverso apontando para `127.0.0.1:3000`
- um usuário de deploy com acesso ao Docker

Exemplo:

```bash
sudo usermod -aG docker deploy
```

### Configuração no GitHub

Secrets do repositório:

```text
HOSTINGER_HOST=your_vps_ip_or_hostname
HOSTINGER_SSH_USER=deploy
HOSTINGER_SSH_KEY=private_ssh_key_for_the_deploy_user
HOSTINGER_SSH_PORT=22
```

Variables do repositório:

```text
DEPLOY_PATH=/home/deploy/portfolio
APP_PORT=3000
HOST_BIND=127.0.0.1
```

### Workflows

- `CI`: [.github/workflows/ci.yml](/home/filype/projects/portfolio/.github/workflows/ci.yml:1)
  Roda `npm ci`, `npm run lint` e `npm run build`.
- `Deploy`: [.github/workflows/deploy.yml](/home/filype/projects/portfolio/.github/workflows/deploy.yml:1)
  Gera e publica a imagem, copia `deploy/docker-compose.prod.yml` para a VPS, escreve o `.env`, baixa a nova imagem e reinicia o container.

### Comandos de Produção

```bash
cd /home/deploy/portfolio
docker compose ps
docker compose logs -f web
curl -I http://127.0.0.1:3000
curl -I https://filypeabreu.tech
```
