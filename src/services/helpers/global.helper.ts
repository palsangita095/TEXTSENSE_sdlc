import { AxiosError, isAxiosError } from "axios";


const pickMessage = (data: unknown): string | null => {
  if (!data || typeof data !== "object") return null;

  const record = data as Record<string, unknown>;

  for (const key of ["message", "detail", "error"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }

 
  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      const first = value.find((item) => typeof item === "string" && item.trim());
      if (typeof first === "string") return first;
    } else if (value && typeof value === "object") {
      const nested = pickMessage(value);
      if (nested) return nested;
    } else if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
};

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;

    if (!axiosError.response) {
      return "Unable to reach the server. Please check your connection and try again.";
    }

    const data = axiosError.response.data;

    if (typeof data === "string" && data.trim() && !data.trimStart().startsWith("<")) {
      return data;
    }

    return (
      pickMessage(data) ||
      `Server error (${axiosError.response.status}). Please try again later.`
    );
  }

  if (error instanceof TypeError) {
    return "Network error. Please check your connection and try again.";
  }

  return "Something went wrong. Please try again.";
};

export const getColumnValue = (
  obj: Record<string, unknown>,
  path: string,
): unknown => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  return "Something went wrong";
};
