import type { Metadata } from "next";
import SignIn from "./SignIn";

export const metadata: Metadata = {
  title: "Edit",
  robots: { index: false, follow: false },
};

export default function EditPage() {
  return <SignIn />;
}
