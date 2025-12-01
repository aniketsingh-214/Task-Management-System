import { redirect } from "next/navigation";

export default function Home() {
  // Default route redirect to login
  redirect("/login");
}
