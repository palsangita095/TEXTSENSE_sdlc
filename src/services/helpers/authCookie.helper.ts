export const ACCESS_TOKEN_COOKIE = "token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const isSecureContext = (): boolean =>
  typeof window !== "undefined" && window.location.protocol === "https:";

const cookieAttributes = (maxAge: number): string =>
  `path=/; max-age=${maxAge}; samesite=lax${isSecureContext() ? "; secure" : ""}`;

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setAuthCookie(
  name: string,
  value: string,
  maxAge: number = AUTH_COOKIE_MAX_AGE,
): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=${encodeURIComponent(value)}; ${cookieAttributes(maxAge)}`;
}

export function clearAuthCookie(name: string): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; ${cookieAttributes(0)}`;
}

export function clearAuthCookies(): void {
  clearAuthCookie(ACCESS_TOKEN_COOKIE);
  clearAuthCookie(REFRESH_TOKEN_COOKIE);
}
