import { createClient } from "@/lib/supabase/server";

export default async function InboxPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">Inbox</h1>
        <p className="text-muted-foreground mt-2">Manage your contact inquiries and leads.</p>
      </div>
      
      <div className="bg-card border rounded-2xl overflow-hidden">
        {messages && messages.length > 0 ? (
          <div className="divide-y relative">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-muted/30 transition-colors flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{msg.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary">{msg.email}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                    <span className="bg-muted px-2 py-1 rounded-md border text-xs font-mono uppercase tracking-wider">Service: {msg.service_type}</span>
                    <span className="bg-muted px-2 py-1 rounded-md border text-xs font-mono uppercase tracking-wider">Budget: {msg.budget}</span>
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm leading-relaxed border border-border/50">
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                     <a href={`mailto:${msg.email}?subject=Re: Your Inquiry - ${msg.service_type}`} className="text-sm font-medium text-primary hover:underline underline-offset-4">
                        Reply via Email &rarr;
                     </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
             <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-muted-foreground opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
             </div>
             <p className="text-lg font-medium">Your inbox is empty</p>
             <p className="text-sm">When someone contacts you, their message will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
