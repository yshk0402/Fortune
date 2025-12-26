import Link from "next/link";

const LEGAL_LINKS = [
  { label: "利用規約", href: "/legal/terms.html" },
  { label: "プライバシーポリシー", href: "/legal/privacy.html" },
  { label: "決済・返金ポリシー", href: "/legal/refund.html" },
  { label: "特定商取引法", href: "/legal/commercial.html" },
];

export default function LegalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-white/60 px-4 py-3 text-[0.65rem] text-ink/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="tracking-[0.15em] text-ink/60">© {currentYear} 六命占術×MBTI診断</p>
        <div className="flex flex-wrap items-center gap-3">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-gold"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
