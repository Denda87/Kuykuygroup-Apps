export const USERS = [
  { email: "staff@kuykuy.com", password: "kuykuy123", role: "staff", staffId: 1 },
  { email: "admin@kuykuy.com", password: "admin123", role: "admin", staffId: null },
];

export function login(email: string, password: string): { role: string; staffId: number | null } | null {
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return null;
  if (typeof window !== "undefined") {
    localStorage.setItem("kuykuy_user", JSON.stringify({ role: user.role, staffId: user.staffId, email: user.email }));
  }
  return { role: user.role, staffId: user.staffId };
}

export function getUser(): { role: string; staffId: number | null; email: string } | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("kuykuy_user");
  return data ? JSON.parse(data) : null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("kuykuy_user");
  }
}
