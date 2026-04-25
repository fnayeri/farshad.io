import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "48px 0", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, fontWeight: 600 }}>Not Found</h1>
      <p style={{ marginTop: 12 }}>
        <Link href="/" style={{ color: "var(--link)", textDecoration: "underline" }}>
          Back to home
        </Link>
      </p>
    </div>
  );
}
