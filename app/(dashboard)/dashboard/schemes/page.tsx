import { AIChat } from '@/components/ai-chat';
import { Landmark, IndianRupee, Clock, CheckCircle2 } from 'lucide-react';

const TOP_SCHEMES = [
  { name: 'PMEGP', benefit: '₹25L subsidy', tag: 'Manufacturing', color: 'bg-emerald-50 border-emerald-200 text-emerald-700', eligibility: '35% free grant for women' },
  { name: 'Mudra Loan', benefit: '₹50K – ₹10L', tag: 'All Categories', color: 'bg-blue-50 border-blue-200 text-blue-700', eligibility: 'Collateral-free loan' },
  { name: 'GeM Portal', benefit: 'Govt contracts', tag: 'All Products', color: 'bg-purple-50 border-purple-200 text-purple-700', eligibility: 'Government bulk orders' },
  { name: 'SFURTI', benefit: '₹1L grant', tag: 'Handicrafts', color: 'bg-orange-50 border-orange-200 text-orange-700', eligibility: 'Cluster-based artisan support' },
  { name: 'NRLM CIF', benefit: '₹2L interest-free', tag: 'NRLM SHGs', color: 'bg-rose-50 border-rose-200 text-rose-700', eligibility: 'Community investment fund' },
  { name: 'Stand-Up India', benefit: '₹10L – ₹1Cr', tag: 'Greenfield', color: 'bg-indigo-50 border-indigo-200 text-indigo-700', eligibility: 'Large enterprise setup' },
];

const STATS = [
  { icon: IndianRupee, label: 'Total Schemes', value: '50+', sub: 'Central + State' },
  { icon: Landmark, label: 'Max Benefit', value: '₹1 Cr+', sub: 'Per SHG eligible' },
  { icon: Clock, label: 'Avg Approval', value: '30-90 days', sub: 'For most schemes' },
  { icon: CheckCircle2, label: 'Success Rate', value: '78%', sub: 'With AI-generated apps' },
];

export default function SchemesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <Landmark className="w-3 h-3" /> MODULE 3
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Government Scheme Navigator</h1>
        <p className="text-muted-foreground max-w-2xl">
          Don't leave money on the table. Our AI scans 50+ central and state government schemes to find everything your SHG is eligible for — and helps you apply.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4 shadow-sm text-center">
            <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: Scheme list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Key Schemes We Navigate</h3>
            <div className="space-y-3">
              {TOP_SCHEMES.map(s => (
                <div key={s.name} className={`rounded-lg border p-3 ${s.color}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-sm">{s.name}</span>
                    <span className="text-xs font-bold">{s.benefit}</span>
                  </div>
                  <p className="text-xs opacity-80">{s.eligibility}</p>
                  <span className="mt-1.5 inline-block text-xs border border-current/30 rounded-full px-2 py-0.5 opacity-70">{s.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheme stacking tip */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">💡 Scheme Stacking</p>
            <p className="text-sm text-amber-800">Most SHGs can apply for 3-5 schemes simultaneously! Our AI identifies the best combination for maximum benefit.</p>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs font-medium text-amber-700">
                <span>PMEGP + Mudra + State subsidy</span>
                <span className="font-bold">₹26.5L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Chat */}
        <div className="lg:col-span-3">
          <div className="mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-foreground">Scheme Navigator AI</span>
            <span className="text-xs text-muted-foreground">— Powered by DeepSeek V4</span>
          </div>
          <AIChat
            agentType="schemes"
            initialMessage="Namaste! 🙏 Main **Scheme Navigator** hoon — aapka government scheme expert.

Main aapke SHG ke liye **₹12L-1Cr tak ka benefit** dhundh sakta hoon! 💰

Pehle mujhe thodi information chahiye:

1️⃣ **Aapka SHG kab se registered hai?** (kitne saal purana?)
2️⃣ **Aap kya banate hain?** (product/service type)
3️⃣ **Last year ka total business kitna tha?** (annual turnover in ₹)
4️⃣ **Aap kis state mein hain?**

In 4 sawalo ke jawab dene ke baad main **sab eligible schemes** aapke liye sort karke dikha dunga! 🎯"
            placeholder="Apne SHG ke baare mein batao (turnover, product, state...)"
          />
        </div>
      </div>
    </div>
  );
}
