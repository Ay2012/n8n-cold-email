# Prompt Design

This workflow uses two model calls because research and writing are different jobs.

## Model node 1: company research

The first model studies the available company and contact information. It should identify the strongest honest connection between the company and the candidate context.

It should not write the email. It should not invent company facts, claim the company is hiring, or overstate fit.

## Model node 2: email writer

The second model turns the research into a short outreach draft. It should return valid JSON only:

```json
{
  "subject": "...",
  "email_body": "..."
}
```

JSON makes the output easier to map into later n8n nodes.

## Why the cleanup node exists

- LLMs may wrap JSON in code fences.
- LLMs may output literal `\n`.
- Gmail HTML bodies render better than raw text.
- The code preserves paragraph breaks while removing awkward mid-paragraph line breaks.
- The node emits `subject`, `email_body`, `body`, and `email_body_html` for easier n8n mapping.

## Prompt safety rules

- Use only information you provide.
- Do not invent personalization.
- Do not imply a relationship that does not exist.
- Keep the ask low-pressure.
- Create drafts for review instead of direct sends.
