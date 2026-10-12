# Local AI Outreach Pipeline with n8n, Docker, OpenAI, and Gmail

A local, controlled workflow for preparing personalized outreach drafts from CSV contact batches. It uses n8n for workflow automation, Docker for local deployment, OpenAI or another LLM provider for research and email generation, JavaScript for output cleanup, and Gmail OAuth for draft creation.

This repository is documentation-first. It gives you the structure, prompts, setup notes, sample data, and helper scripts needed to recreate the workflow safely with your own private files.

## Who this is for

- Job seekers preparing thoughtful outreach
- Founders doing careful customer or partner conversations
- Recruiters drafting reviewed candidate outreach
- Students learning automation
- Builders learning n8n, Docker, OAuth, and LLM workflows
- Non-technical users who want a controlled draft-first process

## What this is not

- Not a spam tool
- Not a bulk blasting system
- Not a tool for scraping people's data
- Not a replacement for human review
- Not legal, compliance, or deliverability advice

## Simple architecture

CSV batch -> n8n workflow -> Model node 1 company research -> Model node 2 email generation -> JavaScript cleanup node -> Gmail draft creation -> status tracking

The workflow is designed to create drafts, not send messages automatically. Review every draft before sending.

## Plain-English concepts

### What is n8n?

n8n is a workflow automation tool. You connect nodes together so data can move from one step to the next, such as reading a CSV row, calling an LLM, cleaning the output, and creating a Gmail draft.

### What is Docker?

Docker runs software in a container. For this project, Docker lets you run n8n locally without manually installing every part of n8n on your machine.

### Why run n8n locally?

Running n8n locally can avoid n8n Cloud costs for local or self-hosted use. You are still responsible for following n8n's current license, pricing, and terms.

### What is an LLM node?

An LLM node is a workflow step that sends text to a language model and receives generated text back. In this workflow, one model node analyzes the company and another writes the draft email.

### What is a system prompt?

A system prompt tells the model how to behave. It sets the role, boundaries, tone, and rules.

### What is a user prompt?

A user prompt contains the task data for one run, such as the company name, contact title, company description, and candidate context.

### Why two model nodes?

The first model node focuses only on research and narrative fit. The second model node uses that analysis to write a concise draft. Splitting the work makes the output easier to inspect and reduces the chance that the model invents details.

### What is OAuth?

OAuth is a secure sign-in flow. Instead of pasting your Gmail password into n8n, you grant n8n permission to create drafts in your Gmail account.

### Why does Gmail OAuth need a Client ID and Client Secret?

Google uses the Client ID and Client Secret to identify the app requesting access. n8n uses them when connecting your Gmail account through Google's OAuth flow.

### Why draft-first is safer

Draft-first workflows give you a human checkpoint. You can verify the contact, subject, body, tone, personalization, and attachment before anything is sent.

## Features

- Local n8n setup
- Docker Compose setup
- Local file mounting
- CSV-based input
- Batch processing
- Company research prompt
- Email generation prompt
- JSON-only LLM output
- JavaScript cleanup
- HTML email body formatting
- Gmail draft creation
- Resume attachment support placeholder
- Outbound status tracking placeholder
- Responsible-use guardrails

## Repository layout

```text
.
├── docker-compose.yml
├── .env.example
├── .gitignore
├── prompts/
├── scripts/
├── n8n/
├── nodes/
├── docs/
└── sample_data/
```

Private working files, real CSVs, resumes, credentials, tokens, and n8n runtime data should stay out of GitHub.

## Setup overview

1. Install Docker Desktop.
2. Clone this repository.
3. Copy `.env.example` to `.env`.
4. Add your OpenAI API key or configure another LLM provider in n8n.
5. Run `docker compose up -d`.
6. Open n8n at `http://localhost:5678`.
7. Create a new n8n workflow.
8. Configure your OpenAI or LLM credentials in n8n.
9. Configure Gmail OAuth credentials in n8n.
10. Import or recreate the workflow from the notes in `n8n/workflow_notes.md`.
11. Put private local input files in `files/`, which is ignored by Git.
12. Add a CSV batch.
13. Test with one row only.

## Docker quick start

```bash
cp .env.example .env
docker compose up -d
```

Open `http://localhost:5678`, sign in with the basic auth values from `.env`, and build the workflow.

Stop n8n:

```bash
docker compose down
```

## CSV batching

Use the helper script to split a private CSV into smaller batches:

```bash
python scripts/split_csv_batches.py --input files/employers.csv --output files/batches --batch-size 50
```

The `files/` directory is ignored so real contact data does not get committed.

## Prompts

The prompt templates live in `prompts/`. Replace placeholders such as `{{CANDIDATE_NAME}}`, `{{CANDIDATE_RESUME_CONTEXT}}`, and `{{COMPANY_NAME}}` inside n8n using fields from your CSV or private notes.

Do not paste private resume content, real prospect lists, credentials, OAuth secrets, or tokens into committed files.

## n8n workflow notes

See `n8n/workflow_notes.md` for the recommended node order and testing process.

`n8n/workflow_sanitized_placeholder.json` is only a placeholder. Export your own workflow from n8n after removing credentials and private data.

## Gmail OAuth

See `docs/gmail_oauth_setup.md` for a beginner-friendly setup guide.

Use the Gmail node operation for draft creation. Do not start with automatic sending.

## Responsible use

Use verified contacts only, write honestly, respect unsubscribe or no-contact requests, and review every draft before sending. See `docs/responsible_use.md`.

## Privacy checklist before publishing

- `.env` is not committed.
- `files/` is not committed.
- `n8n_data/` is not committed.
- No real emails or prospect data are committed.
- No resume, portfolio, LinkedIn, GitHub, phone, address, employer history, or project details are committed.
- No Google Client Secret, OAuth token, OpenAI API key, or n8n credential is committed.
- Workflow exports are sanitized before committing.

