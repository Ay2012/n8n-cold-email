# Docker n8n Setup

This project runs n8n locally with Docker Compose.

## 1. Install Docker Desktop

Install Docker Desktop for your operating system and start it before running commands.

## 2. Create your private environment file

```bash
cp .env.example .env
```

Edit `.env` and replace placeholder values. Keep `.env` private.

## 3. Start n8n

```bash
docker compose up -d
```

Open `http://localhost:5678`.

## 4. Local files

The compose file mounts `./files` into the n8n container at `/files`.

Use that folder for private CSVs, batches, resumes, and local test files. The folder is ignored by Git so real data does not get committed.

## 5. Stop n8n

```bash
docker compose down
```

Your n8n data is stored in the Docker volume named `n8n_data`.

## 6. Before publishing

Confirm these are not committed:

- `.env`
- `files/`
- `n8n_data/`
- credentials
- tokens
- real workflow exports with private data
