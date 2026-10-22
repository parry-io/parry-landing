import React from "react";
import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import GoogleDataSection from "../../components/landing/GoogleDataSection";

/* The Google user-data disclosure (Limited Use) has its own page, linked from the
 * homepage footer. The homepage (public/home.html) describes the product in its first
 * viewport, which the SCRUM-297 data-access submission requires. */

export const metadata: Metadata = {
  title: "How Parry uses Google user data · Parry",
  description:
    "What Parry does with Gmail and Google Drive data, the scopes it requests, and its Limited Use commitments.",
  alternates: { canonical: "https://www.parry-io.com/google-data" },
  robots: { index: true, follow: true },
};

export default function GoogleDataPage() {
  return (
    <DocPage>
      <GoogleDataSection />
    </DocPage>
  );
}
