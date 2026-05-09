export type Attendance = "attending" | "declined";

export type RsvpSubmission = {
  name: string;
  guests: number;
  attendance: Attendance;
};

export type WishSubmission = {
  name: string;
  message: string;
};

export type WishRecord = WishSubmission & {
  id: string;
  created_at: string;
};

export type RsvpRecord = RsvpSubmission & {
  id: string;
  created_at: string;
};

type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 700;

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

const readText = (source: Record<string, unknown>, key: string) => {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
};

const normalizeGuestCount = (value: unknown) => {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(numberValue)) return null;
  if (numberValue < 1 || numberValue > 4) return null;
  return numberValue;
};

export function parseRsvpPayload(payload: unknown): ParseResult<RsvpSubmission> {
  const source = asRecord(payload);
  if (!source) return { ok: false, error: "Invalid RSVP payload." };

  const name = readText(source, "name");
  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: "Name is too long." };
  }

  const guests = normalizeGuestCount(source.guests);
  if (!guests) {
    return { ok: false, error: "Please choose a valid guest count." };
  }

  const attendance = source.attendance;
  if (attendance !== "attending" && attendance !== "declined") {
    return { ok: false, error: "Please choose your attendance." };
  }

  return {
    ok: true,
    data: {
      name,
      guests,
      attendance,
    },
  };
}

export function parseWishPayload(payload: unknown): ParseResult<WishSubmission> {
  const source = asRecord(payload);
  if (!source) return { ok: false, error: "Invalid wish payload." };

  const name = readText(source, "name");
  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: "Name is too long." };
  }

  const message = readText(source, "message");
  if (!message) return { ok: false, error: "Please write your wish." };
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "Wish is too long." };
  }

  return { ok: true, data: { name, message } };
}
