import { AIChat } from '@/components/ai-chat';
import { ShoppingCart, Package, TrendingUp, CheckCircle2 } from 'lucide-react';

const PLATFORMS = [
  { name: 'Amazon', logo: '🛒', commission: '8-15%', strength: 'Largest reach, best for food products', color: 'bg-orange-50 border-orange-200' },
  { name: 'Flipkart', logo: '🛍️', commission: '5-12%', strength: 'Strong in handicrafts & textiles', color: 'bg-blue-50 border-blue-200' },
  { name: 'Meesho', logo: '🛒', commission: '1.8%', strength: 'Lowest commission, social commerce', color: 'bg-pink-50 border-pink-200' },
  { name: 'GeM Portal', logo: '🏛️', commission: '0%', strength: 'Government bulk orders, guaranteed payment', color: 'bg-green-50 border-green-200' },
];

const STEPS = [
  { step: '01', title: 'Get Documents Ready', desc: 'PAN, GST, FSSAI (for food), bank account', icon: Package },
  { step: '02', title: 'Choose Platform', desc: 'AI recommends best platform for your product', icon: ShoppingCart },
  { step: '03', title: 'Create Seller Account', desc: 'Step-by-step AI-guided registration', icon: CheckCircle2 },
  { step: '04', title: 'List & Sell', desc: 'AI writes your product listing, optimizes SEO', icon: TrendingUp },
];

export default function EcommercePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <ShoppingCart className="w-3 h-3" /> MODULE 2
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">E-Commerce Onboarding</h1>
        <p className="text-muted-foreground max-w-2xl">
          Take your SHG products from village to national market. Our AI assistant guides you through registration on Amazon, Flipkart, Meesho, and GeM Portal — step by step, in Hinglish.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: Info + Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* How it works */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
            <div className="space-y-4">
              {STEPS.map(({ step, title, desc, icon: Icon }) => (
                <div key={step} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform cards */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Supported Platforms</h3>
            <div className="space-y-3">
              {PLATFORMS.map(p => (
                <div key={p.name} className={`rounded-lg border p-3 ${p.color}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-foreground">{p.logo} {p.name}</span>
                    <span className="text-xs font-medium text-muted-foreground">Commission: {p.commission}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Income impact stat */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Income Impact</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Before (village market)</span>
                <span className="font-bold text-foreground">₹5,000/month</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full w-[10%]" />
              </div>
              <div className="flex justify-between text-sm mt-3">
                <span className="text-muted-foreground">After (e-commerce)</span>
                <span className="font-bold text-primary">₹50,000+/month</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-full" />
              </div>
              <p className="text-xs text-muted-foreground pt-1">Average 10x income growth within 6 months</p>
            </div>
          </div>
        </div>

        {/* Right: AI Chat */}
        <div className="lg:col-span-3">
          <div className="mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-foreground">SHG Bazaar AI Assistant</span>
            <span className="text-xs text-muted-foreground">— Powered by DeepSeek V4</span>
          </div>
          <AIChat
            agentType="ecommerce"
            initialMessage="Namaste! 🙏 Main aapka SHG Bazaar AI Assistant hoon.

Main aapko **step-by-step guide** karunga ki apne SHG ke products ko **Amazon, Flipkart, ya Meesho** pe kaise list karein.

Pehle batao:
👉 **Aapka SHG kya banata hai?** (e.g., pickles, handicrafts, sarees, honey, etc.)

Ek baar main product jaanunga, main aapko bilkul sahi platform recommend karunga aur poora registration process explain karunga! 🚀"
            placeholder="Apna product type batao (e.g., 'hum aam ka achaar banate hain')"
          />
        </div>
      </div>
    </div>
  );
}
