"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  serviceType: z.string().min(1, { message: "Please select a service type." }),
  budget: z.string().min(1, { message: "Please select a budget range." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

function ContactFormInner() {
  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get("service");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      budget: "",
      message: "",
    },
  });

  useEffect(() => {
    if (serviceQuery) {
      // rough map from service slug to form option value
      const optionsMap: Record<string, string> = {
        "digital-products": "Digital Product (Design + Dev)",
        "brand-identity": "Brand & Identity",
        "visual-content": "Visual Content (Photo/Video)",
        "audio-music": "Audio & Music Production",
        "creative-direction": "Creative Direction (Full Scope)"
      };
      if (optionsMap[serviceQuery]) {
        form.setValue("serviceType", optionsMap[serviceQuery]);
      }
    }
  }, [serviceQuery, form]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Failed to send your message. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Digital Product (Design + Dev)">Digital Product (Design + Dev)</SelectItem>
                  <SelectItem value="Brand & Identity">Brand & Identity</SelectItem>
                  <SelectItem value="Visual Content (Photo/Video)">Visual Content (Photo/Video)</SelectItem>
                  <SelectItem value="Audio & Music Production">Audio & Music Production</SelectItem>
                  <SelectItem value="Creative Direction (Full Scope)">Creative Direction (Full Scope)</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Under ₦500K">Under ₦500K</SelectItem>
                  <SelectItem value="₦500K – ₦2M">₦500K – ₦2M</SelectItem>
                  <SelectItem value="₦2M – ₦5M">₦2M – ₦5M</SelectItem>
                  <SelectItem value="₦5M+">₦5M+</SelectItem>
                  <SelectItem value="Let's discuss">Let&apos;s discuss</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell me about your project, timeline, and goals..." 
                  className="min-h-[150px] resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full md:w-auto h-12 px-8" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}

export function ContactForm() {
  return (
    <div className="w-full bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
      <Suspense fallback={<div className="h-[500px] flex items-center justify-center text-muted-foreground">Loading form...</div>}>
        <ContactFormInner />
      </Suspense>
    </div>
  );
}
