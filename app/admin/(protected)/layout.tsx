import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../actions";
import Link from "next/link";
import { Settings, Image as ImageIcon, Briefcase, FileText, LogOut, MessageSquareQuote, Inbox } from "lucide-react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-muted/10">
      <div className="w-64 shrink-0 border-r bg-card relative hidden md:block">
        <aside className="sticky top-20 h-[calc(100vh-80px)] flex flex-col">
          <div className="h-16 flex items-center px-6 border-b font-heading font-bold text-lg tracking-tight">
            OJO ADMIN
          </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
            <Settings className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/inbox" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
            <Inbox className="w-4 h-4" /> Inbox
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
            <Briefcase className="w-4 h-4" /> Projects
          </Link>
          <Link href="/admin/journal" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
            <FileText className="w-4 h-4" /> Journal
          </Link>
          <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
            <ImageIcon className="w-4 h-4" /> Media
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
            <MessageSquareQuote className="w-4 h-4" /> Testimonials
          </Link>
        </nav>
          <div className="p-4 border-t">
            <form action={logout}>
              <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </form>
          </div>
        </aside>
      </div>
      <main className="flex-1 w-full pb-20">
        {children}
      </main>
    </div>
  );
}
