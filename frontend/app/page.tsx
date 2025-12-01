import { redirect } from "next/navigation";

export default function Home() {
  // Default entry point = register first
  redirect("/register");
}
