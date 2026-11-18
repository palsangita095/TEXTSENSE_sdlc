export type UserRole = "Admin" | "Manager" | "Analyst" | "User";
export type UserStatus = "Active" | "Pending" | "Suspended";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
  lastActivity: string;
}

export const avatarClasses: string[] = [
  "bg-indigo-100 text-indigo-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export const roleBadgeClasses: Record<UserRole, string> = {
  Admin: "bg-purple-100 text-purple-700",
  Manager: "bg-blue-100 text-blue-700",
  Analyst: "bg-indigo-100 text-indigo-700",
  User: "bg-slate-100 text-slate-700",
};

export const statusTextClasses: Record<UserStatus, string> = {
  Active: "text-emerald-600",
  Pending: "text-amber-600",
  Suspended: "text-red-600",
};

export const userAvatars: string[] = [
  "/assets/images/auth/profile-1.jpg",
  "/assets/images/auth/profile-2.jpg",
  "/assets/images/auth/profile-3.jpg",
];

export const getUserAvatar = (id: number): string =>
  userAvatars[(Math.max(id, 1) - 1) % userAvatars.length];

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${MONTH_ABBR[Number(month) - 1]} ${day}, ${year}`;
};

export const getUserInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

export const toEmail = (name: string): string =>
  `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")}@example.com`;

type UserSeed = [name: string, role: UserRole, status: UserStatus, registrationDate: string];

const seeds: UserSeed[] = [
  ["Sarah Mitchell", "Admin", "Active", "2026-10-01"],
  ["Daniel Okafor", "Manager", "Active", "2026-09-25"],
  ["Priya Nair", "Analyst", "Pending", "2026-09-20"],
  ["Marcus Lee", "User", "Active", "2026-09-15"],
  ["Elena Rossi", "Analyst", "Suspended", "2026-09-10"],
  ["James Carter", "Manager", "Active", "2026-09-05"],
  ["Aisha Khan", "User", "Pending", "2026-08-28"],
  ["Chloe Dubois", "User", "Active", "2026-08-20"],
  ["Liam Walker", "Manager", "Active", "2026-08-15"],
  ["Zoe Hernandez", "Analyst", "Active", "2026-08-10"],
  ["Noah Fischer", "User", "Active", "2026-08-05"],
  ["Fatima Zahra", "Analyst", "Pending", "2026-07-31"],
  ["Ethan Quinn", "User", "Active", "2026-07-26"],
  ["Maya Sharma", "Manager", "Active", "2026-07-21"],
  ["Oliver Grant", "Admin", "Active", "2026-07-16"],
  ["Isabel Torres", "User", "Active", "2026-07-11"],
  ["Caleb Wright", "Analyst", "Active", "2026-07-06"],
  ["Nina Kowalski", "User", "Suspended", "2026-07-01"],
  ["Adam Bakr", "Manager", "Active", "2026-06-26"],
  ["Lucy Fontaine", "Analyst", "Active", "2026-06-21"],
  ["Mateo Silva", "User", "Active", "2026-06-16"],
  ["Hannah Kim", "Manager", "Active", "2026-06-11"],
  ["Omar Haddad", "Analyst", "Pending", "2026-06-06"],
  ["Grace Adeyemi", "User", "Active", "2026-06-01"],
  ["Felix Novak", "User", "Active", "2026-05-27"],
  ["Sana Iqbal", "Analyst", "Active", "2026-05-22"],
  ["Victor Reyes", "Manager", "Suspended", "2026-05-17"],
  ["Lena Petrov", "User", "Active", "2026-05-12"],
  ["Tom Becker", "Analyst", "Active", "2026-05-07"],
  ["Aria Delgado", "User", "Pending", "2026-05-02"],
  ["Kevin Zhao", "Manager", "Active", "2026-04-27"],
  ["Ruth Cohen", "Analyst", "Active", "2026-04-22"],
  ["Dylan Murphy", "User", "Active", "2026-04-17"],
  ["Sofia Marchetti", "Analyst", "Active", "2026-04-12"],
  ["Peter Osei", "Manager", "Active", "2026-04-07"],
  ["Jade Robinson", "User", "Suspended", "2026-04-02"],
  ["Andre Costa", "Analyst", "Active", "2026-03-28"],
  ["Kira Ivanova", "User", "Active", "2026-03-23"],
  ["Sean Doyle", "Manager", "Active", "2026-03-18"],
  ["Amara Diallo", "Analyst", "Pending", "2026-03-13"],
  ["Felix Andersson", "User", "Active", "2026-03-08"],
  ["Maria Santos", "Admin", "Active", "2026-03-03"],
  ["Leo Lombardi", "User", "Active", "2026-02-26"],
  ["Tessa Moore", "Analyst", "Active", "2026-02-21"],
  ["Ivan Volkov", "User", "Active", "2026-02-16"],
  ["Nadia Rahman", "Manager", "Active", "2026-02-11"],
  ["Jared Wilson", "Analyst", "Active", "2026-02-06"],
  ["Yara Nasser", "User", "Pending", "2026-02-01"],
  ["Bruno Almeida", "Analyst", "Suspended", "2026-01-27"],
  ["Clara Jensen", "Manager", "Active", "2026-01-22"],
  ["Simon Park", "User", "Active", "2026-01-17"],
  ["Ida Sorensen", "Analyst", "Active", "2026-01-12"],
  ["Malik Johnson", "Manager", "Active", "2026-01-07"],
  ["Eva Novotna", "User", "Active", "2026-01-02"],
  ["Hugo Lambert", "Analyst", "Active", "2025-12-28"],
  ["Rebecca Stone", "Admin", "Active", "2025-12-23"],
  ["Arjun Mehta", "User", "Pending", "2025-12-18"],
  ["Paula Vargas", "Analyst", "Active", "2025-12-13"],
  ["Karl Berger", "User", "Active", "2025-12-08"],
  ["Layla Ahmed", "Manager", "Active", "2025-12-03"],
  ["Miles Turner", "Analyst", "Active", "2025-11-28"],
  ["Ines Rocha", "User", "Active", "2025-11-23"],
  ["Dmitri Sokolov", "Manager", "Suspended", "2025-11-18"],
  ["Alice Moreau", "Analyst", "Active", "2025-11-13"],
  ["Jordan Blake", "User", "Active", "2025-11-08"],
  ["Suki Tanaka", "Analyst", "Pending", "2025-11-03"],
  ["Pablo Herrera", "Manager", "Active", "2025-10-29"],
  ["Nora Lindgren", "User", "Active", "2025-10-24"],
  ["Kareem Adel", "Analyst", "Active", "2025-10-19"],
  ["Bianca Ferri", "User", "Active", "2025-10-14"],
  ["Neil Chandra", "Manager", "Active", "2025-10-09"],
  ["Freya Olsen", "Analyst", "Active", "2025-10-04"],
  ["Samir Chaudhary", "User", "Pending", "2025-09-29"],
  ["Tara Bishop", "Analyst", "Suspended", "2025-09-24"],
  ["Giovanni Russo", "Admin", "Active", "2025-09-19"],
  ["Mei Lin", "User", "Active", "2025-09-14"],
  ["Aaron Levine", "Analyst", "Active", "2025-09-09"],
  ["Rosa Diaz", "User", "Active", "2025-09-04"],
  ["Frank Boateng", "Manager", "Active", "2025-08-30"],
  ["Vera Pavlova", "User", "Active", "2025-08-25"],
];

const lastActivities: string[] = [
  "2 hours ago",
  "5 hours ago",
  "1 day ago",
  "3 days ago",
  "1 week ago",
  "2 days ago",
  "5 days ago",
  "4 days ago",
  "Just now",
  "12 minutes ago",
  "1 hour ago",
  "8 hours ago",
  "6 days ago",
  "2 weeks ago",
  "3 weeks ago",
  "1 month ago",
];

export const users: AdminUser[] = seeds.map(
  ([name, role, status, registrationDate], index) => ({
    id: index + 1,
    name,
    email: toEmail(name),
    role,
    status,
    registrationDate,
    lastActivity: lastActivities[index % lastActivities.length],
  }),
);
