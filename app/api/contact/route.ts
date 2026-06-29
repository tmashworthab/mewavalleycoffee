import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_ADDRESS = "info@mewavalley.com";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { name, business, email, message } = body as Record<string, string>;

  if (!name || !business || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Mewa Valley Coffee <onboarding@resend.dev>",
    to: TO_ADDRESS,
    replyTo: email,
    subject: `New enquiry from ${name} (${business})`,
    text: [
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      "",
      "Message:",
      message || "(no message provided)",
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message", debug: error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
