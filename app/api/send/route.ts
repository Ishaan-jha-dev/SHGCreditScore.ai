import { Resend } from 'resend';

// We recommend using environment variables instead of hardcoding the key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ishaanjha.in@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
