import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CheckCircle2,
  CreditCard,
  FileText,
  Facebook,
  Gauge,
  Heart,
  LayoutGrid,
  Linkedin,
  Mail,
  MapPin,
  MousePointerClick,
  Phone,
  PlayCircle,
  Receipt,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Youtube,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";
import { contactSchema } from "@/lib/contact.functions";
import logoAsset from "@/assets/bizzactlogo.jpeg.asset.json";
import dashboardShot from "@/assets/Screenshot_2026-08-29_060330.png.asset.json";
import salesShot from "@/assets/Screenshot_2026-08-29_060400.png.asset.json";
import invoiceShot from "@/assets/Screenshot_2026-08-29_060423.png.asset.json";
import catalogShot from "@/assets/Screenshot_2026-08-29_060443.png.asset.json";
import expenseShot from "@/assets/Screenshot_2026-08-29_060456.png.asset.json";
import profileShot from "@/assets/Screenshot_2026-08-29_060517.png.asset.json";
import backupShot from "@/assets/Screenshot_2026-08-29_060537.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BizzAct — Run Your Business Smarter" },
      {
        name: "description",
        content:
          "BizzAct is all-in-one business management software for sales, billing, inventory, procurement, finance and GST — built for growing Indian businesses.",
      },
      { property: "og:title", content: "BizzAct — Run Your Business Smarter" },
      {
        property: "og:description",
        content:
          "GST-ready billing, inventory, procurement and finance in one powerful, easy-to-use platform.",
      },
    ],
  }),
  component: Landing,
});

const navLinks = [
  "Home",
  "Features",
  "Product Demo",
  "Why BizzAct",
  "Pricing",
  "About Us",
  "Contact Us",
];

const heroChips = ["Sales & Billing", "Inventory", "Procurement", "Finance", "GST", "Reports"];

const trustStrip = [
  { icon: BadgeCheck, label: "GST Compliant" },
  { icon: Gauge, label: "Real-time Dashboard" },
  { icon: ShieldCheck, label: "Secure & Reliable" },
  { icon: CheckCircle2, label: "Easy to Use" },
];

const modules = [
  {
    icon: LayoutGrid,
    title: "Dashboard",
    copy: "Real-time overview of your business performance.",
    tint: "var(--brand-green)",
  },
  {
    icon: FileText,
    title: "Sales & Billing",
    copy: "Manage customers, sales, invoices & payment terms.",
    tint: "var(--primary)",
  },
  {
    icon: ShoppingCart,
    title: "Procurement",
    copy: "Manage purchases, inventory & vendors efficiently.",
    tint: "var(--brand-blue)",
  },
  {
    icon: Wallet,
    title: "Finance",
    copy: "Track expenses, summaries & GST in one place.",
    tint: "var(--brand-violet)",
  },
  {
    icon: Settings,
    title: "Settings",
    copy: "Configure your business the way you need.",
    tint: "var(--primary)",
  },
];

const tabs = [
  {
    id: "dashboard",
    icon: LayoutGrid,
    label: "Dashboard",
    eyebrow: "Dashboard",
    title: "Your Business.",
    titleAccent: "At A Glance.",
    copy: "Monitor your business performance in real-time with powerful insights and key metrics.",
    bullets: [
      "Sales, Purchase & Expense Overview",
      "Profit & Loss at a Glance",
      "GST Liability Summary",
      "Receivables & Stock Alerts",
      "Expense Distribution Breakdown",
    ],
    cta: "Explore Dashboard",
    image: dashboardShot.url,
    alt: "BizzAct executive financial dashboard with revenue, GST and expense breakdown",
  },
  {
    id: "sales",
    icon: TrendingUp,
    label: "Sales & Billing",
    eyebrow: "Sales & Billing",
    title: "Sell. Invoice.",
    titleAccent: "Collect.",
    copy: "Record every sale with automatic CGST/SGST or IGST tax split and settle faster.",
    bullets: [
      "Sales Register with tax auto-split",
      "Customer Directory",
      "GST Tax Invoices & Printing",
      "Payment Terms & Aging",
      "Export Sales & Invoices",
    ],
    cta: "Explore Sales",
    image: salesShot.url,
    alt: "BizzAct sales register with automatic GST tax split",
  },
  {
    id: "procurement",
    icon: Boxes,
    label: "Procurement",
    eyebrow: "Procurement",
    title: "Purchase Smarter.",
    titleAccent: "Track Better.",
    copy: "Control inventory, manage vendors and streamline every purchase in one catalog.",
    bullets: [
      "Product & Service Catalog",
      "Unit Rates & GST Classification",
      "Stock Levels & Reorder Limits",
      "Vendor Directory",
      "Catalog Export",
    ],
    cta: "Explore Procurement",
    image: catalogShot.url,
    alt: "BizzAct product and service catalog with stock levels and reorder limits",
  },
  {
    id: "finance",
    icon: BarChart3,
    label: "Finance",
    eyebrow: "Finance",
    title: "Know Your Numbers.",
    titleAccent: "Grow Your Business.",
    copy: "Log overheads, claim Input Tax Credit and stay GST compliant every month.",
    bullets: [
      "Expenses Ledger",
      "Monthly Summary",
      "Input Tax Credit (ITC) Capture",
      "GST Return Position",
      "Expense Export",
    ],
    cta: "Explore Finance",
    image: expenseShot.url,
    alt: "BizzAct expenses ledger with input tax credit breakdown",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    eyebrow: "Settings",
    title: "Configure Once.",
    titleAccent: "Work Forever.",
    copy: "Set up business identity, tax slabs, custom fields and safe database backups.",
    bullets: [
      "Business Profile & Defaults",
      "GST Configuration",
      "Custom Fields Config",
      "Expense Categories",
      "Data Backup & Restore",
    ],
    cta: "Explore Settings",
    image: backupShot.url,
    alt: "BizzAct settings screen with backup, restore and license management",
  },
];

const flow = [
  { icon: Users, title: "Customers", copy: "Manage contacts & outstanding" },
  { icon: MousePointerClick, title: "Sales", copy: "Record & track every sale" },
  { icon: Receipt, title: "Invoices", copy: "Create GST invoices instantly" },
  { icon: CreditCard, title: "Payments", copy: "Track payments & due dates" },
  { icon: FileText, title: "Reports", copy: "Get insights & grow your business" },
];

const showcase = [
  {
    tag: "Sales & Billing",
    title: "Sell. Invoice. Collect.",
    copy: "Manage your entire sales cycle from customers to payment.",
    bullets: ["Customer Directory", "Sales Register", "Invoice Register", "Payment Terms & Aging"],
    cta: "View Sales Features",
    image: invoiceShot.url,
    alt: "BizzAct invoices and billing register",
    tint: "var(--primary)",
  },
  {
    tag: "Procurement",
    title: "Purchase Smarter. Track Better.",
    copy: "Control inventory, manage vendors and streamline purchases.",
    bullets: ["Purchase Management", "Inventory Tracking", "Vendor Directory", "Stock Level Alerts"],
    cta: "View Procurement Features",
    image: catalogShot.url,
    alt: "BizzAct procurement catalog",
    tint: "var(--brand-blue)",
  },
  {
    tag: "Finance",
    title: "Know Your Numbers. Grow Your Business.",
    copy: "Track expenses, view summaries and stay GST compliant.",
    bullets: ["Expenses Ledger", "Monthly Summary", "GST Summary", "GST Return Position"],
    cta: "View Finance Features",
    image: expenseShot.url,
    alt: "BizzAct expenses ledger",
    tint: "var(--brand-green)",
  },
];

const footerCols = [
  {
    heading: "Product",
    links: [
      "Dashboard",
      "Sales & Billing",
      "Procurement",
      "Finance",
      "Settings",
      "GST Features",
    ],
  },
  {
    heading: "Company",
    links: [
      "About Us",
      "Pricing",
      "Contact Us",
      "Partner With Us",
      "Privacy Policy",
      "Terms of Service",
    ],
  },
  {
    heading: "Support",
    links: ["Help Center", "User Guide", "FAQ", "Request Demo", "Report an Issue"],
  },
];

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center overflow-hidden rounded-xl border border-border bg-card clay">
        <img src={logoAsset.url} alt="BizzAct logo" className="size-full object-cover" />
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        <span style={{ color: "var(--brand-green)" }}>Bizz</span>
        <span style={{ color: "var(--primary)" }}>Act</span>
      </span>
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ username: "", email: "", phone: "", comments: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setStatus("saving");
    const { error: dbError } = await supabase.from("contact_requests").insert({
      username: parsed.data.username,
      email: parsed.data.email,
      phone: parsed.data.phone,
      comments: parsed.data.comments || null,
    });
    if (dbError) {
      setStatus("idle");
      setError("Could not send your request. Please try again.");
      return;
    }
    setStatus("done");
    setForm({ username: "", email: "", phone: "", comments: "" });
  }

  const field =
    "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 clay clay-lg">
      <h3 className="text-base font-extrabold">Request a Demo</h3>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Share your details and our team will reach out shortly.
      </p>
      <div className="mt-5 space-y-3">
        <input
          className={field}
          placeholder="Your name"
          value={form.username}
          onChange={set("username")}
          maxLength={100}
        />
        <input
          className={field}
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={set("email")}
          maxLength={255}
        />
        <input
          className={field}
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={set("phone")}
          maxLength={20}
        />
        <textarea
          className={`${field} min-h-24 resize-y`}
          placeholder="Comments (optional)"
          value={form.comments}
          onChange={set("comments")}
          maxLength={1000}
        />
        {error && <p className="text-xs font-medium text-destructive">{error}</p>}
        {status === "done" && (
          <p className="text-xs font-medium" style={{ color: "var(--brand-green)" }}>
            Thanks! We&apos;ve received your request.
          </p>
        )}
        <button type="submit" disabled={status === "saving"} className="btn-clay w-full disabled:opacity-60">
          {status === "saving" ? "Sending…" : "Submit Request"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}


function ShotFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-2 clay-lg">
      <div className="overflow-hidden rounded-xl border border-border">
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
      </div>
    </div>
  );
}

function Landing() {
  const [active, setActive] = useState(0);
  const tab = tabs[active]!;

  const step = (dir: number) => setActive((i) => (i + dir + tabs.length) % tabs.length);

  return (
    <div id="home" className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l, i) => (
              <li key={l}>
                <a
                  href="#home"
                  className={
                    i === 0
                      ? "relative text-sm font-semibold text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary after:content-['']"
                      : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="btn-ghost-clay !text-xs">
              Admin
            </Link>
            <a href="#demo" className="btn-clay">
              Request Demo
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="surface-cream border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              Run Your Business.
              <br />
              <span className="text-primary">Smarter.</span>
              <br />
              With BizzAct.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              All-in-one business management software for Sales, Billing, Inventory, Procurement,
              Finance &amp; GST — designed for growing businesses.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {heroChips.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-xs font-medium">
                  <CheckCircle2 className="size-3.5" style={{ color: "var(--primary)" }} />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#demo" className="btn-clay">
                Explore BizzAct <ArrowRight className="size-4" />
              </a>
              <a href="#works" className="btn-ghost-clay">
                <PlayCircle className="size-4" /> Watch Product Demo
              </a>
            </div>
            <p className="mt-7 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="size-4" /> Trusted by businesses across India
            </p>
          </div>

          <div className="rounded-[26px] border border-border bg-card p-2.5 clay-lg">
            <div className="overflow-hidden rounded-[18px] border border-border">
              <img
                src={dashboardShot.url}
                alt="BizzAct executive financial dashboard showing revenue, GST liability and expense distribution"
                className="block w-full"
              />
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-border bg-background/60">
          <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-4">
            {trustStrip.map(({ icon: Icon, label }, i) => (
              <li key={label} className="flex items-center gap-6">
                <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Icon className="size-4" style={{ color: "var(--primary)" }} />
                  {label}
                </span>
                {i < trustStrip.length - 1 && (
                  <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Everything Your Business Needs. <span className="text-primary">In One Place.</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            BizzAct brings all your important business operations together in a single, powerful
            platform.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map(({ icon: Icon, title, copy, tint }) => (
            <li key={title} className="rounded-2xl p-6 text-center clay">
              <span
                className="mx-auto grid size-12 place-items-center rounded-2xl clay-inset"
                style={{ background: `color-mix(in oklab, ${tint} 14%, var(--card))` }}
              >
                <Icon className="size-5" style={{ color: tint }} />
              </span>
              <h3 className="mt-4 text-sm font-bold">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{copy}</p>
              <span
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
                style={{ color: tint }}
              >
                Explore <ArrowRight className="size-3.5" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section id="works" className="surface-cream border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              See How BizzAct <span className="text-primary">Works</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore each module and see how BizzAct helps you manage your business better.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-card p-2 clay">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={
                  i === active
                    ? "btn-clay !px-3.5 !py-2 !text-xs"
                    : "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                <t.icon className="size-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {tab.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                {tab.title}
                <br />
                <span className="text-primary">{tab.titleAccent}</span>
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {tab.copy}
              </p>
              <ul className="mt-5 space-y-2.5">
                {tab.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4" style={{ color: "var(--brand-green)" }} />
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#demo" className="btn-clay mt-7">
                {tab.cta} <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                aria-label="Previous module"
                onClick={() => step(-1)}
                className="btn-ghost-clay !hidden !rounded-full !p-2.5 lg:!inline-flex"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="min-w-0 flex-1">
                <ShotFrame src={tab.image} alt={tab.alt} />
                <div className="mt-4 flex justify-center gap-1.5">
                  {tabs.map((t, i) => (
                    <button
                      key={t.id}
                      aria-label={`Show ${t.label}`}
                      onClick={() => setActive(i)}
                      className="size-1.5 rounded-full transition-all"
                      style={{
                        width: i === active ? "1rem" : undefined,
                        background: i === active ? "var(--primary)" : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                aria-label="Next module"
                onClick={() => step(1)}
                className="btn-ghost-clay !hidden !rounded-full !p-2.5 lg:!inline-flex"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business flow */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          Complete Business Flow. <span className="text-primary">Seamlessly Connected.</span>
        </h2>
        <ol className="mt-10 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          {flow.map(({ icon: Icon, title, copy }, i) => (
            <li key={title} className="flex flex-1 items-center gap-4">
              <div className="flex-1 rounded-2xl p-5 clay">
                <Icon className="size-6" style={{ color: "var(--primary)" }} />
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
              </div>
              {i < flow.length - 1 && (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Showcase */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {showcase.map((s) => (
            <article
              key={s.tag}
              className="overflow-hidden rounded-2xl border border-border p-5 clay"
              style={{ background: `color-mix(in oklab, ${s.tint} 7%, var(--card))` }}
            >
              <p className="text-xs font-semibold" style={{ color: s.tint }}>
                {s.tag}
              </p>
              <h3 className="mt-2 text-lg font-extrabold leading-snug">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.copy}</p>
              <ul className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="size-3.5" style={{ color: "var(--brand-green)" }} />
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#demo" className="btn-ghost-clay mt-5 !text-xs">
                {s.cta} <ArrowRight className="size-3.5" />
              </a>
              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card clay">
                <img src={s.image} alt={s.alt} loading="lazy" className="block w-full" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-16">
        <div
          className="grid items-center gap-8 rounded-3xl px-8 py-10 clay-lg lg:grid-cols-2"
          style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
        >
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> See BizzAct in Action
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              Don&apos;t Just Read About BizzAct.
              <br />
              <span className="text-primary">Experience</span> It Yourself.
            </h2>
            <p className="mt-3 max-w-sm text-sm text-ink-foreground/70">
              Request a free demo and see how BizzAct can simplify your business operations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#works"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-foreground/25 px-4 py-2.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
              >
                <PlayCircle className="size-4" /> Watch Full Demo
              </a>
            </div>
            <div className="mt-6 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-2">
              <img
                src={profileShot.url}
                alt="BizzAct business profile and invoicing defaults configuration"
                loading="lazy"
                className="block w-full rounded-xl"
              />
            </div>
          </div>
          <ContactForm />

        </div>
      </section>

      {/* Footer */}
      <footer className="surface-cream border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
              All-in-one business management software for growing businesses.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Linkedin, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#home"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-xl clay"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {footerCols.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold">{col.heading}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#home"
                      className="text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-bold">Contact Us</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-3.5" /> +91 7090077477
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5" /> info@bizzact.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-3.5" /> Bengaluru, Karnataka, India
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-4 text-xs text-muted-foreground">
            <p>© 2026 BizzAct. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <Heart className="size-3.5 fill-current text-primary" /> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
