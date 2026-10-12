# Gmail OAuth Setup

This guide connects Gmail to n8n so the workflow can create Gmail drafts. Do not commit Client IDs, Client Secrets, tokens, or credential exports to GitHub.

## Steps

1. Go to the Google Cloud Console.
2. Create a new project or select an existing project.
3. Enable the Gmail API for that project.
4. Configure the OAuth consent screen.
5. Choose `External` for a personal Gmail account. Choose `Internal` only if you are using a Google Workspace organization and the app is only for that organization.
6. If the app is in testing mode, add your Gmail account as a test user.
7. Create an OAuth Client ID.
8. Set Application type to `Web application`.
9. In n8n, open the Gmail credential setup and copy the OAuth redirect URL.
10. Paste that URL into Authorized redirect URIs in Google Cloud Console.
11. Copy the Google Client ID and Client Secret.
12. Paste them into the n8n Gmail credential.
13. Connect your Gmail account through n8n.
14. In the Gmail node, use operation `Draft` / `Create`.

## Common `invalid_grant` error

`invalid_grant` usually means the refresh token expired, access was revoked, the Google password changed, the redirect URI is wrong, or the Client ID/Client Secret do not match the OAuth client.

Fix it by reconnecting the n8n credential, confirming the redirect URI matches exactly, and recreating the OAuth client if needed.

## Safety reminder

Never commit the Client ID, Client Secret, OAuth tokens, exported n8n credentials, or screenshots showing private credential values.
