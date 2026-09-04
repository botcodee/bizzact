import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Mail, Phone, ShieldAlert, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { deleteContactRequest, listContactRequests } from "@/lib/contact.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Requests Dashboard — BizzAct Admin" },
      {
        name: "description",
        content: "Admin dashboard listing every demo and contact request submitted on BizzAct.",
      },
      { property: "og:title", content: "Requests Dashboard — BizzAct Admin" },
      {
        property: "og:description",
        content: "Review and manage BizzAct demo and contact requests.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchRequests = useServerFn(listContactRequests);
  const removeRequest = useServerFn(deleteContactRequest);

  const { data, isPending, error } = useQuery({
    queryKey: ["contact-requests"],
    queryFn: () => fetchRequests(),
  });

  const del = useMutation({
    mutationFn: (id: string) => removeRequest({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-requests"] }),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border surface-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-lg font-extrabold tracking-tight">Requests Dashboard</h1>
            <p className="text-xs text-muted-foreground">Demo &amp; contact form submissions</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost-clay !text-xs">
              Website
            </Link>
            <button onClick={signOut} className="btn-clay !text-xs">
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {isPending && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading requests…
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-destructive">
            Could not load requests. Please try again.
          </p>
        )}

        {data && !data.isAdmin && (
          <div className="rounded-2xl border border-border bg-card p-6 clay">
            <ShieldAlert className="size-5" style={{ color: "var(--primary)" }} />
            <h2 className="mt-3 text-base font-bold">Admin access required</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Your account is signed in but does not have the admin role yet, so requests are
              hidden.
            </p>
          </div>
        )}

        {data?.isAdmin && data.requests.length === 0 && (
          <p className="text-sm text-muted-foreground">No requests yet.</p>
        )}

        {data?.isAdmin && data.requests.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.requests.map((r) => (
              <article key={r.id} className="rounded-2xl border border-border bg-card p-5 clay">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold">{r.username}</h3>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => del.mutate(r.id)}
                    aria-label="Delete request"
                    className="grid size-8 shrink-0 place-items-center rounded-lg border border-border transition-colors hover:bg-accent"
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </button>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Mail className="size-3.5" /> {r.email}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="size-3.5" /> {r.phone}
                  </li>
                </ul>
                {r.comments && (
                  <p className="mt-3 rounded-xl bg-secondary p-3 text-xs leading-relaxed">
                    {r.comments}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
