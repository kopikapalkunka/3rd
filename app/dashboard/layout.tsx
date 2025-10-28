import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Our Anniversary',
  description: 'Your romantic anniversary dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

