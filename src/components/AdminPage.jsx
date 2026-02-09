import AdminLogin from "./AdminLogin";
import AdminQueue from "./AdminQueue";

export default function AdminPage({ students, refetch, adminPassword, setAdminPassword }) {
  return (
    <div className="h-full flex flex-col bg-gray-100">
      <header
        className="shrink-0 text-white px-4 pb-3 text-center"
        style={{
          background: "linear-gradient(135deg, #4ECDC4 0%, #3BA8A0 100%)",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
        }}
      >
        <div className="flex items-center justify-between">
          <a
            href="#main"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Back
          </a>
          <h1
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Admin
          </h1>
          <div className="w-12" />
        </div>
      </header>

      {adminPassword ? (
        <AdminQueue
          students={students}
          adminPassword={adminPassword}
          onBadPassword={() => setAdminPassword("")}
          refetch={refetch}
        />
      ) : (
        <AdminLogin onLogin={setAdminPassword} />
      )}
    </div>
  );
}
