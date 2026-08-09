export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#F8FBFF] min-h-screen">
      <div className="flex-1 w-full min-w-0">{children}</div>
    </div>
  );
}
