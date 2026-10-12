# n8n Workflow Notes

Build this workflow inside your local n8n instance. Keep credentials inside n8n, not in this repository.

## Node order

1. Read CSV batch
   - Read one ignored batch file from `/files`.
   - Map columns such as contact name, company name, title, website, industry, technologies, and status.

2. Limit node for safe testing
   - Start with one row.
   - Increase only after the full draft flow works.

3. Loop Over Items
   - Process each contact one at a time so errors are easier to inspect.

4. Model node 1: company research
   - Use `prompts/01_company_research_system.md`.
   - Use `prompts/01_company_research_user_template.md`.
   - This node should analyze the company/contact context and return concise research notes.

5. Model node 2: email writer
   - Use `prompts/02_email_writer_system.md`.
   - Use `prompts/02_email_writer_user_template.md`.
   - This node should return JSON only with `subject` and `email_body`.

6. JavaScript cleanup node
   - Paste `nodes/clean_email_output.js` into an n8n Code node.
   - Map `subject`, `email_body`, and `email_body_html` into the Gmail node.

7. Read binary resume file placeholder
   - If you attach a resume, keep it in `/files`.
   - Do not commit resumes to GitHub.
   - Use a placeholder path while documenting the workflow.

8. Gmail create draft
   - Use the Gmail node.
   - Operation: Draft/Create.
   - Map the cleaned subject and HTML body.
   - Create drafts first. Do not auto-send.

9. Status update placeholder
   - Add a placeholder step to update status in your private CSV, sheet, or tracker.
   - Useful statuses: `draft_created`, `needs_review`, `skipped`, `error`.

## Recommended testing approach

- Test one row first.
- Verify the subject and body.
- Verify the Gmail draft.
- Verify the attachment, if used.
- Then increase batch size gradually.
- Do not run the full list on the first test.

## Exporting a workflow safely

Before committing any exported workflow JSON, remove credentials, private file paths, real contact data, real resume details, tokens, and account-specific IDs.
