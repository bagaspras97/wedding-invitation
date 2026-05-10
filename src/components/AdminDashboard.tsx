"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Attendance, RsvpRecord, WishRecord } from "@/lib/submissions/validation";

type AdminData = {
  rsvps: RsvpRecord[];
  wishes: WishRecord[];
  summary: {
    totalRsvps: number;
    attending: number;
    declined: number;
    guestCount: number;
    wishes: number;
  };
};

type InviteMode = "template" | "free";

const STORAGE_KEY = "yolla-pras-admin-password";
const INVITATION_ORIGIN = "https://yollapras.vercel.app";

const emptyData: AdminData = {
  rsvps: [],
  wishes: [],
  summary: {
    totalRsvps: 0,
    attending: 0,
    declined: 0,
    guestCount: 0,
    wishes: 0,
  },
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const attendanceLabel: Record<Attendance, string> = {
  attending: "Attending",
  declined: "Unable",
};

const defaultInviteText = `*Assalamualaikum Wr. Wb.*

Dengan penuh rasa syukur dan kebahagiaan, kami mengundang *Bapak/Ibu/Saudara/i {{guestName}}* untuk menghadiri dan memberikan doa restu pada acara pernikahan kami:

*Yolla & Pras*

Yang akan dilaksanakan pada:
*Hari, Tanggal* : Sabtu, 6 Juni 2026
*Tempat*        : Villa Edwin, Sirnagalih, Bogor

Untuk informasi lebih lanjut, silakan membuka undangan melalui tautan berikut:
{{link}}

_Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu._

*Wassalamualaikum Wr. Wb.*`;

const buildInvitationUrl = (guestName: string) => {
  if (typeof window === "undefined") return "";

  const url = new URL(INVITATION_ORIGIN);
  const trimmedName = guestName.trim();

  if (trimmedName) {
    url.searchParams.set("to", trimmedName);
  }

  return url.toString();
};

const normalizeWhatsappNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
};

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white/45 p-5 md:p-6">
      <p className="eyebrow text-[0.62rem]">{label}</p>
      <p className="mt-4 font-display text-5xl font-light leading-none text-ink md:text-6xl">
        {value}
      </p>
    </div>
  );
}

function AttendanceBadge({ attendance }: { attendance: Attendance }) {
  const isAttending = attendance === "attending";

  return (
    <span
      className={[
        "inline-flex rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest2",
        isAttending
          ? "border-ink/15 bg-ink text-ivory"
          : "border-stone/20 bg-white/50 text-stone",
      ].join(" ")}
    >
      {attendanceLabel[attendance]}
    </span>
  );
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [activePassword, setActivePassword] = useState("");
  const [data, setData] = useState<AdminData>(emptyData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inviteMode, setInviteMode] = useState<InviteMode>("template");
  const [inviteGuest, setInviteGuest] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [freeInviteText, setFreeInviteText] = useState("");
  const [inviteNotice, setInviteNotice] = useState("");

  const sortedWishes = useMemo(() => data.wishes, [data.wishes]);
  const invitationUrl = useMemo(() => buildInvitationUrl(inviteGuest), [inviteGuest]);
  const invitationMessage = useMemo(() => {
    if (inviteMode === "free") {
      return freeInviteText || invitationUrl;
    }

    return defaultInviteText
      .replace("{{guestName}}", inviteGuest.trim() || "Tamu Undangan")
      .replace("{{link}}", invitationUrl);
  }, [freeInviteText, invitationUrl, inviteGuest, inviteMode]);
  const whatsappUrl = useMemo(() => {
    const normalizedPhone = normalizeWhatsappNumber(invitePhone);
    if (!normalizedPhone) return "";

    return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(invitationMessage)}`;
  }, [invitationMessage, invitePhone]);

  const loadResponses = async (passwordValue: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/responses", {
        headers: {
          "x-admin-password": passwordValue,
        },
        cache: "no-store",
      });
      const responseData = (await response.json().catch(() => null)) as
        | AdminData
        | { error?: string }
        | null;

      if (!response.ok) {
        const serverError =
          responseData && "error" in responseData ? responseData.error : undefined;

        throw new Error(
          serverError ||
            (response.status === 401 ? "Wrong password." : "Unable to load responses."),
        );
      }

      setData(responseData as AdminData);
      setActivePassword(passwordValue);
      window.sessionStorage.setItem(STORAGE_KEY, passwordValue);
    } catch (requestError) {
      setData(emptyData);
      setActivePassword("");
      window.sessionStorage.removeItem(STORAGE_KEY);
      setError(requestError instanceof Error ? requestError.message : "Unable to load responses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedPassword = window.sessionStorage.getItem(STORAGE_KEY);
    if (savedPassword) {
      setPassword(savedPassword);
      void loadResponses(savedPassword);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setError("Please enter the password.");
      return;
    }

    void loadResponses(trimmedPassword);
  };

  const handleLock = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setActivePassword("");
    setData(emptyData);
    setError("");
  };

  const handleCopyInvitation = async () => {
    try {
      await navigator.clipboard.writeText(invitationMessage);
      setInviteNotice("Invitation text copied.");
      window.setTimeout(() => setInviteNotice(""), 2600);
    } catch {
      setInviteNotice("Unable to copy invitation text.");
    }
  };

  const handleOpenWhatsapp = () => {
    if (!whatsappUrl) {
      setInviteNotice("Add a WhatsApp number first.");
      window.setTimeout(() => setInviteNotice(""), 2600);
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (!activePassword) {
    return (
      <main className="min-h-screen bg-ivory px-5 py-8 text-ink md:px-10 md:py-12">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-[2.5rem] border border-ink/10 bg-white/45 p-7 shadow-[0_28px_90px_rgba(42,36,30,0.08)] md:p-12"
          >
            <p className="eyebrow">Private Dashboard</p>
            <h1 className="mt-8 font-display text-6xl font-light leading-[0.95] md:text-8xl">
              guest
              <br />
              responses
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-stone md:text-xl">
              Enter the password to review RSVP confirmations and guest wishes for Yolla
              and Pras.
            </p>

            <label className="mt-12 block">
              <span className="eyebrow">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                className="mt-5 w-full border-0 border-b border-ink/20 bg-transparent px-0 pb-4 text-2xl text-ink outline-none placeholder:text-stone/40 focus:border-ink"
                placeholder="Enter password"
              />
            </label>

            {error ? <p className="mt-5 text-sm text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-ink px-9 text-xs font-bold uppercase tracking-widest2 text-white transition hover:bg-ink/90 disabled:cursor-wait disabled:opacity-60"
            >
              {isLoading ? "Checking..." : "Enter Dashboard"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory px-5 py-8 text-ink md:px-10 md:py-12">
      <section className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-8 rounded-[2.5rem] border border-ink/10 bg-white/45 p-7 md:flex-row md:items-end md:justify-between md:p-10">
          <div>
            <p className="eyebrow">Yolla & Pras</p>
            <h1 className="mt-5 font-display text-6xl font-light leading-none md:text-8xl">
              admin
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void loadResponses(activePassword)}
              disabled={isLoading}
              className="rounded-full border border-ink/15 px-6 py-3 text-xs font-bold uppercase tracking-widest2 text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
            >
              {isLoading ? "Refreshing" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={handleLock}
              className="rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest2 text-white transition hover:bg-ink/90"
            >
              Lock
            </button>
          </div>
        </header>

        {error ? <p className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700">{error}</p> : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="RSVPs" value={data.summary.totalRsvps} />
          <StatCard label="Attending" value={data.summary.attending} />
          <StatCard label="Unable" value={data.summary.declined} />
          <StatCard label="Guests" value={data.summary.guestCount} />
          <StatCard label="Wishes" value={data.summary.wishes} />
        </div>

        <section className="mt-8 rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="eyebrow">Send Invitation</p>
              <h2 className="mt-3 font-display text-5xl font-light leading-none md:text-6xl">
                invite
                <br />
                guests
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-stone">
                Generate a personalized invitation link, then copy the message or send it
                directly through WhatsApp.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-5 md:grid-cols-2">
                <label>
                  <span className="eyebrow text-[0.62rem]">Guest Name</span>
                  <input
                    value={inviteGuest}
                    onChange={(event) => setInviteGuest(event.target.value)}
                    className="mt-3 w-full border-0 border-b border-ink/15 bg-transparent px-0 pb-3 text-xl text-ink outline-none placeholder:text-stone/40 focus:border-ink"
                    placeholder="Name on cover"
                  />
                </label>

                <label>
                  <span className="eyebrow text-[0.62rem]">WhatsApp Number</span>
                  <input
                    value={invitePhone}
                    onChange={(event) => setInvitePhone(event.target.value)}
                    className="mt-3 w-full border-0 border-b border-ink/15 bg-transparent px-0 pb-3 text-xl text-ink outline-none placeholder:text-stone/40 focus:border-ink"
                    placeholder="08..."
                    inputMode="tel"
                  />
                </label>
              </div>

              <div>
                <p className="eyebrow text-[0.62rem]">Message Type</p>
                <div className="mt-3 grid grid-cols-2 gap-3 rounded-full border border-ink/10 bg-cream/55 p-1">
                  {(["template", "free"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setInviteMode(mode)}
                      className={[
                        "rounded-full px-4 py-3 text-[0.68rem] font-bold uppercase tracking-widest2 transition",
                        inviteMode === mode
                          ? "bg-ink text-white shadow-[0_16px_44px_-30px_rgba(43,38,32,0.75)]"
                          : "text-stone hover:text-ink",
                      ].join(" ")}
                    >
                      {mode === "template" ? "Template" : "Free Text"}
                    </button>
                  ))}
                </div>
              </div>

              <label>
                <span className="eyebrow text-[0.62rem]">Invitation Message</span>
                <textarea
                  value={inviteMode === "template" ? invitationMessage : freeInviteText}
                  onChange={(event) => setFreeInviteText(event.target.value)}
                  readOnly={inviteMode === "template"}
                  className="mt-3 min-h-64 w-full resize-y rounded-[1.5rem] border border-ink/10 bg-ivory/65 p-5 text-base leading-7 text-ink outline-none placeholder:text-stone/40 focus:border-ink read-only:text-stone"
                  placeholder="Write your invitation message..."
                />
              </label>

              <div className="rounded-[1.5rem] border border-ink/10 bg-white/35 p-4">
                <p className="eyebrow text-[0.58rem]">Personalized Link</p>
                <p className="mt-2 break-all text-sm leading-6 text-stone">{invitationUrl}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleCopyInvitation}
                  className="rounded-full border border-ink/15 px-6 py-4 text-xs font-bold uppercase tracking-widest2 text-ink transition hover:bg-white"
                >
                  Copy Message
                </button>
                <button
                  type="button"
                  onClick={handleOpenWhatsapp}
                  className="rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-widest2 text-white transition hover:bg-ink/90"
                >
                  Open WhatsApp
                </button>
                {inviteNotice ? (
                  <p className="text-sm text-stone" role="status">
                    {inviteNotice}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <p className="eyebrow">Guest List</p>
                <h2 className="mt-2 font-display text-4xl font-light">RSVP</h2>
              </div>
              <p className="text-sm text-stone">{data.rsvps.length} entries</p>
            </div>

            <div className="divide-y divide-ink/10">
              {data.rsvps.length ? (
                data.rsvps.map((rsvp) => (
                  <article
                    key={rsvp.id}
                    className="grid gap-4 py-5 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-3xl font-light leading-tight">
                          {rsvp.name}
                        </h3>
                        <AttendanceBadge attendance={rsvp.attendance} />
                      </div>
                      <p className="mt-2 text-sm text-stone">{formatDate(rsvp.created_at)}</p>
                    </div>
                    <p className="text-sm uppercase tracking-widest text-stone">
                      {rsvp.guests} {rsvp.guests === 1 ? "guest" : "guests"}
                    </p>
                  </article>
                ))
              ) : (
                <p className="py-12 text-center text-stone">No RSVP confirmations yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-ink/10 bg-white/45 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <p className="eyebrow">Warm Notes</p>
                <h2 className="mt-2 font-display text-4xl font-light">Wishes</h2>
              </div>
              <p className="text-sm text-stone">{sortedWishes.length} entries</p>
            </div>

            <div className="max-h-[42rem] overflow-y-auto pr-2">
              <div className="divide-y divide-ink/10">
                {sortedWishes.length ? (
                  sortedWishes.map((wish) => (
                    <article key={wish.id} className="py-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-3xl font-light leading-tight">
                          {wish.name}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-stone">
                          {formatDate(wish.created_at)}
                        </p>
                      </div>
                      <p className="mt-4 text-base leading-7 text-stone">{wish.message}</p>
                    </article>
                  ))
                ) : (
                  <p className="py-12 text-center text-stone">No wishes yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
