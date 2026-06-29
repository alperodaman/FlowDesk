import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div className="flex min-h-screen bg-app-bg">
      {/* Left panel — branding (desktop only) */}
      <div className="hidden flex-1 flex-col justify-between bg-brand-700 p-12 xl:flex">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-control bg-white/15">
              <span className="text-base font-bold text-white">F</span>
            </div>
            <span className="text-lg font-semibold text-white">FlowDesk</span>
          </div>
          <div className="mt-16 max-w-sm">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Manage your workflows with confidence.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              Create requests, track approvals, and collaborate — all in one calm, organized workspace.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Requests handled', value: '2,400+' },
            { label: 'Avg. approval time', value: '4 hrs' },
            { label: 'Teams onboarded', value: '38' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="mt-0.5 text-sm text-brand-200">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 xl:max-w-120">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2.5 xl:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-control bg-brand-700">
            <span className="text-sm font-bold text-white">F</span>
          </div>
          <span className="text-lg font-semibold text-ink">FlowDesk</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ink">Welcome back</h2>
            <p className="mt-1.5 text-sm text-ink-muted">Sign in to your account to continue</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
