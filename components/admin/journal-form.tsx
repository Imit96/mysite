"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { MediaPickerModal } from "./media-picker-modal";
import { Loader2 } from "lucide-react";
import { revalidateContent } from "@/app/actions/revalidate";
import { MdxPreview } from "./mdx-preview";

const journalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  category: z.string().optional(),
  cover_image: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published"]),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  og_image: z.string().optional(),
});

type JournalFormValues = z.infer<typeof journalSchema>;

export function JournalForm({ initialData }: { initialData: any | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      cover_image: initialData?.cover_image || "",
      content: initialData?.content || "",
      status: initialData?.status || "published",
      meta_title: initialData?.meta_title || "",
      meta_description: initialData?.meta_description || "",
      og_image: initialData?.og_image || "",
    },
  });

  async function onSubmit(data: JournalFormValues) {
    setLoading(true);

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      category: data.category,
      cover_image: data.cover_image,
      content: data.content,
      status: data.status,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      og_image: data.og_image,
    };

    if (initialData?.id) {
      await supabase.from("journal").update(payload).eq("id", initialData.id);
    } else {
      await supabase.from("journal").insert([payload]);
    }
    
    await revalidateContent("/");
    await revalidateContent("/journal");
    await revalidateContent(`/journal/${data.slug}`);
    
    setLoading(false);
    router.push("/admin/journal");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., The Evolution of Digital Interfaces" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., evolution-digital-interfaces" {...field} />
                </FormControl>
                <FormDescription>Must be unique, lowercase, dashed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Design, Engineering, Thoughts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cover_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input placeholder="https://..." {...field} />
                    <MediaPickerModal onSelect={(url) => field.onChange(url)} />
                  </div>
                </FormControl>
                <FormDescription>Host on Supabase media bucket, or external URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A short summary of the post..." {...field} className="h-24" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft (Hidden)</SelectItem>
                  <SelectItem value="published">Published (Live)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-1 mt-8 mb-4">
          <h3 className="text-lg font-heading font-semibold pb-2 border-b">SEO & Social Sharing</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-6">Customize how this post appears on Google, Twitter, and LinkedIn.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="meta_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title (Optional Override)</FormLabel>
                  <FormControl>
                    <Input placeholder="Custom Title | Ojo Oluwatimileyin" {...field} />
                  </FormControl>
                  <FormDescription>Leave blank to use the default title format.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="og_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Image URL (Optional Override)</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input placeholder="https://..." {...field} />
                      <MediaPickerModal onSelect={(url) => field.onChange(url)} />
                    </div>
                  </FormControl>
                  <FormDescription>The image shown when the link is shared.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Meta Description (Optional Override)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Custom short description for search engines..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MDX Content Body</FormLabel>
              <details className="cursor-pointer text-sm text-muted-foreground border border-border/50 rounded-lg p-3 my-2 bg-muted/20">
                <summary className="font-medium select-none text-foreground hover:text-primary transition-colors">MDX Formatting Cheatsheet</summary>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs cursor-text pb-2">
                  <div>
                    <strong className="block text-foreground mb-2 text-sm">Standard Markdown</strong>
                    <ul className="space-y-2">
                      <li><code>## Heading 2</code> — Main Section</li>
                      <li><code>### Heading 3</code> — Sub Section</li>
                      <li><code>**Bold**</code> and <code>*Italic*</code></li>
                      <li><code>&gt; Text</code> — Blockquote definition</li>
                      <li><code>- Item</code> — Bulleted list</li>
                      <li><code>[Link](https://...)</code> — External link</li>
                      <li><code>![Alt Text](https://...)</code> — Image embed</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="block text-foreground mb-2 text-sm">Custom Components</strong>
                    <ul className="space-y-3">
                      <li>
                        <code className="block mb-1 text-primary/80">&lt;ImageGrid columns=&#123;2&#125;&gt; ... &lt;/ImageGrid&gt;</code>
                        Renders child images in a CSS grid.
                      </li>
                      <li>
                        <code className="block mb-1 text-primary/80">&lt;FullWidthImage src="/img.jpg" alt="alt" /&gt;</code>
                        Edge-to-edge cinematic image display.
                      </li>
                      <li>
                        <code className="block mb-1 text-primary/80">&lt;ImageGallery images=&#123;["url1", "url2"]&#125; /&gt;</code>
                        Inline swipable masonry gallery constraint.
                      </li>
                      <li>
                        <code className="block mb-1 text-primary/80">&lt;AudioTrackPlayer src="/track.mp3" title="Song" /&gt;</code>
                        Playable audio block injection.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-3 border-t border-border/50 mt-2 text-xs text-foreground/70 italic">
                  Tip: Leave a blank line between standard Markdown text and HTML/React tags for safest formatting.
                </div>
              </details>
              <FormControl>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Textarea 
                    placeholder="Write your journal content here in Markdown/MDX format..." 
                    {...field} 
                    className="min-h-[600px] font-mono whitespace-pre-wrap leading-relaxed text-sm" 
                  />
                  <MdxPreview content={field.value || ""} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FIXED FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 z-50 flex items-center justify-end md:pl-64">
          <div className="w-full max-w-4xl mx-auto flex items-center justify-end gap-4 px-8">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?.id ? "Save Post" : "Create Post"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
