const item = $input.first();
const json = item.json;

function stripCodeFence(value) {
  return String(value || "")
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function cleanParagraphs(value) {
  return String(value || "")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Support the common response shapes returned by n8n model nodes and API calls.
let raw =
  json.output?.[0]?.content?.[0]?.text ||
  json.content?.[0]?.text ||
  json.text ||
  json.output_text ||
  json.response ||
  "";

raw = stripCodeFence(raw);

let parsed = {};

try {
  // If the model adds extra text, keep only the JSON object.
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    raw = raw.slice(firstBrace, lastBrace + 1);
  }

  parsed = JSON.parse(raw);
} catch (error) {
  parsed = {
    subject: "",
    email_body: raw,
    personalization_reason: "",
    confidence: 0,
    risk_flags: ["invalid_json"],
  };
}

const subject = String(parsed.subject || "").trim();
const emailBody = cleanParagraphs(parsed.email_body || parsed.body || "");

// Gmail drafts render more predictably with a simple HTML body.
const emailBodyHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
  ${emailBody
    .split("\n\n")
    .map((paragraph) => {
      const safe = escapeHtml(paragraph).replace(
        /Best,\s*([A-Za-z .'-]+)$/i,
        "Best,<br>$1",
      );
      return `<p>${safe}</p>`;
    })
    .join("")}
</div>
`.trim();

return [
  {
    json: {
      ...json,
      subject,
      email_body: emailBody,
      body: emailBody,
      email_body_html: emailBodyHtml,
      personalization_reason: parsed.personalization_reason || "",
      confidence: parsed.confidence || 0,
      risk_flags: parsed.risk_flags || [],
    },
  },
];
