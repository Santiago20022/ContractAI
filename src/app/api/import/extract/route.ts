export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const name = file.name.toLowerCase();
    let text = "";

    if (name.endsWith(".pdf")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
      const result = await pdfParse(buffer);
      text = result.text;
    } else if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      text = buffer.toString("utf-8");
    }

    // Normalize whitespace only — no structural changes
    text = text
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+$/gm, "")   // trim trailing spaces per line
      .replace(/\n{3,}/g, "\n\n") // max 1 blank line between paragraphs
      .trim();

    return Response.json({ text, fileName: file.name });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Failed to extract text: ${msg}` }, { status: 500 });
  }
}
