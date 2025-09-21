const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080";
export const AUTHORS_URL = `${API_BASE}/api/authors`;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw { status: res.status, message: text || res.statusText } as import("@/types/author").ApiError;
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(url: string) => fetch(url, { cache: "no-store" }).then(handle<T>),
  post: <T>(url: string, body: unknown) =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(handle<T>),
  put: <T>(url: string, body: unknown) =>
    fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(handle<T>),
  delete: (url: string) => fetch(url, { method: "DELETE" }).then(handle<void>),
};
