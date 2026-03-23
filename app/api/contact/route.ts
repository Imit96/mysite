import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";

// Graceful fallback: only initialize if env vars are present
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "1 m"),
      analytics: true,
    })
  : null;

export async function POST(req: Request) {
  try {
    if (ratelimit) {
      // Use IP address for rate limiting
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { 
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            }
          }
        );
      }
    }

    const body = await req.json();
    const { name, email, serviceType, budget, message } = body;

    // Validate request
    if (!name || !email || !serviceType || !budget || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into Supabase Database 
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      
      const { error: dbError } = await supabase.from('contact_messages').insert([{
        name,
        email,
        service_type: serviceType,
        budget,
        message,
        status: 'unread'
      }]);
      
      if (dbError) {
        console.error("Failed to save message to database:", dbError);
      }
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    // If Resend is not configured, we just simulate success for the frontend experience
    if (!RESEND_API_KEY) {
      console.log("-----------------------------------------");
      console.log("Mock Email Sent (RESEND_API_KEY missing):");
      console.log("From:", name, "<" + email + ">");
      console.log("Service:", serviceType, "| Budget:", budget);
      console.log("Message:", message);
      console.log("-----------------------------------------");
      
      // Artificial delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, message: "Email simulated successfully" }, { status: 200 });
    }

    // Call Resend API using standard fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>", // Replace with verified domain when ready
        to: ["hello@ojotimileyin.com"], // Fallback domain or actual email
        subject: `New Inquiry: ${serviceType} from ${name}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <hr />
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br />')}</p>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API Error:", errorData);
      return NextResponse.json({ error: "Failed to send email" }, { status: response.status });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
