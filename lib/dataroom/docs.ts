// Manifest of the documents served by the data room.
//
// Files live in /documents (NOT in /public) so they are never publicly
// reachable — they are streamed only through the authenticated /data-room/api/doc
// route. To add a document: drop the PDF in /documents and add an entry here.
import fs from "node:fs";
import path from "node:path";

export interface DataRoomDoc {
  id: string;
  title: string;
  category: string;
  description: string;
  fileName: string; // relative to /documents
}

export const DOCUMENTS: DataRoomDoc[] = [
  {
    id: "deck",
    title: "Pitch Deck",
    category: "Overview",
    description: "The Parry investor deck — vision, product, traction, and the round.",
    fileName: "parry-deck.pdf",
  },
  {
    id: "one-pager",
    title: "Investor One-Pager",
    category: "Overview",
    description: "A single-page summary of Parry for a fast read.",
    fileName: "parry-one-pager.pdf",
  },
  {
    id: "financials",
    title: "P&L / Financials",
    category: "Financials",
    description: "Profit & loss and the financial model.",
    fileName: "parry-pnl.pdf",
  },
  {
    id: "competitive",
    title: "Competitive Landscape",
    category: "Market",
    description: "How Parry is positioned against the market.",
    fileName: "parry-competitive.pdf",
  },
];

export function getDocs(): DataRoomDoc[] {
  return DOCUMENTS;
}

export function getDoc(id: string): DataRoomDoc | undefined {
  return DOCUMENTS.find((d) => d.id === id);
}

export function documentsDir(): string {
  return path.join(process.cwd(), "documents");
}

export function docFilePath(doc: DataRoomDoc): string {
  return path.join(documentsDir(), doc.fileName);
}

export function docExists(doc: DataRoomDoc): boolean {
  try {
    return fs.existsSync(docFilePath(doc));
  } catch {
    return false;
  }
}
