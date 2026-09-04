import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const contactSchema = z.object({
  username: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-()\s]+$/, "Enter a valid phone number"),
  comments: z.string().trim().max(1000).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactRequest = {
  id: string;
  username: string;
  email: string;
  phone: string;
  comments: string | null;
  created_at: string;
};

export const listContactRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) return { isAdmin: false as const, requests: [] as ContactRequest[] };

    const { data, error } = await supabase
      .from("contact_requests")
      .select("id, username, email, phone, comments, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    return { isAdmin: true as const, requests: (data ?? []) as ContactRequest[] };
  });

export const deleteContactRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("contact_requests").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
