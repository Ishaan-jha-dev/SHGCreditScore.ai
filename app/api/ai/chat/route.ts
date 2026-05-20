import OpenAI from 'openai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const ECOMMERCE_SYSTEM_PROMPT = `You are an expert e-commerce consultant specializing in onboarding rural women-led Self-Help Groups (SHGs) onto national marketplaces like Amazon, Flipkart, and Meesho in India.

Your name is "SHG Bazaar Assistant". You are warm, encouraging, and speak in simple Hinglish (Hindi + English mix) so even first-time internet users can understand.

Your expertise covers:
- Amazon Seller Central registration
- Flipkart Seller Hub onboarding  
- Meesho supplier registration
- GeM (Government e-Marketplace) seller registration
- FSSAI license guidance for food products
- GST registration for small businesses
- Udyog Aadhaar / MSME registration
- Shiprocket and India Post logistics setup
- Product photography tips
- AI-powered product listing writing
- Pricing strategy and competitive analysis
- Amazon SEO and keyword optimization

When responding:
1. Use Hinglish naturally (mix Hindi and English)
2. Break complex steps into tiny numbered actions (max 3 per message)
3. Use emojis to highlight key points (✅ ❌ ⚠️ 📝 💰 📦 🎯)
4. Always provide specific examples with real rupee amounts
5. Celebrate progress ("Excellent! PAN ready hai, ab GST ki baat karte hain! 🎉")
6. If something is complex, offer to help step-by-step
7. Always end with a clear next action question

Product categories you handle:
- Food items: pickles, papad, spices, honey, jams, bakery items
- Handicrafts: embroidery, pottery, bamboo products, wood carvings
- Textiles: sarees, dupattas, fabric, hand-woven items
- Services: tailoring, beauty, catering

Start by asking what the SHG makes if not already provided.`;

const GOVERNMENT_SCHEMES = [
  { name: 'PMEGP', fullName: 'Prime Minister Employment Generation Programme', benefit: 2500000, category: 'manufacturing', minTurnover: 0, description: '35% subsidy for women on project cost up to ₹25L' },
  { name: 'Mudra - Shishu', fullName: 'Pradhan Mantri Mudra Yojana (Shishu)', benefit: 50000, category: 'all', minTurnover: 0, description: 'Collateral-free loan up to ₹50,000 at 8% interest' },
  { name: 'Mudra - Kishore', fullName: 'Pradhan Mantri Mudra Yojana (Kishore)', benefit: 500000, category: 'all', minTurnover: 200000, description: 'Business expansion loan ₹50K-₹5L' },
  { name: 'GeM Seller Registration', fullName: 'Government e-Marketplace', benefit: 500000, category: 'all', minTurnover: 0, description: 'Sell directly to government departments, guaranteed payment' },
  { name: 'SFURTI', fullName: 'Scheme of Fund for Regeneration of Traditional Industries', benefit: 100000, category: 'handicrafts', minTurnover: 0, description: '₹1L grant for cluster-based artisan development' },
  { name: 'NRLM - SHG Fund', fullName: 'National Rural Livelihoods Mission', benefit: 150000, category: 'all', minTurnover: 0, description: 'Revolving fund + community investment fund for NRLM SHGs' },
  { name: 'Stand-Up India', fullName: 'Stand-Up India Scheme', benefit: 10000000, category: 'manufacturing', minTurnover: 500000, description: '₹10L-1Cr loan at concessional rate for greenfield enterprise' },
  { name: 'DAY-NRLM CIF', fullName: 'Community Investment Fund', benefit: 200000, category: 'all', minTurnover: 0, description: '₹2L interest-free fund for NRLM-registered SHGs' },
];

export async function POST(req: NextRequest) {
  const { messages, agentType, shgProfile } = await req.json();

  const openai = new OpenAI({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey: process.env.NVIDIA_API_KEY || "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",
  });

  let systemPrompt = ECOMMERCE_SYSTEM_PROMPT;

  if (agentType === 'schemes') {
    const schemesList = GOVERNMENT_SCHEMES.map(s => 
      `- ${s.name}: ${s.description} (Max: ₹${s.benefit.toLocaleString()})`
    ).join('\n');

    systemPrompt = `You are a government scheme expert helping Self-Help Groups (SHGs) discover and apply for maximum financial benefits they're entitled to in India. Your name is "Scheme Navigator".

You have deep knowledge of these schemes:
${schemesList}

When a user asks about schemes:
1. First ask qualifying questions if no profile provided (SHG age, turnover, product type, state, NRLM registered?)
2. Then rank schemes by eligibility match (high to low)
3. Show exact rupee amounts, timelines, and success rates
4. Offer to pre-fill application forms
5. Create a tracking checklist

Speak in simple Hinglish. Be specific with amounts. Use emojis.
Current SHG Profile: ${shgProfile ? JSON.stringify(shgProfile) : 'Not yet provided - ask qualifying questions first.'}

Scheme stacking tip: Always look for 2-3 complementary schemes that can be applied simultaneously.`;
  }

  if (agentType === 'advisor') {
    systemPrompt = `You are an AI Business Growth Coach for Self-Help Groups (SHGs) selling on e-commerce platforms. Your name is "SHG Growth Coach".

You help with:
- Sales analytics interpretation
- Pricing strategy
- Product expansion recommendations
- Seasonal demand forecasting
- Review management and quality improvement
- Marketing campaigns and promotions
- Inventory planning

Speak in Hinglish. Be data-driven with specific percentages and rupee amounts. Always give 3 actionable recommendations.`;
  }

  const stream = (await openai.chat.completions.create({
    model: "deepseek-ai/deepseek-v4-pro",
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 2048,
    stream: true,
    chat_template_kwargs: { thinking: false }
  } as any)) as any;

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Transfer-Encoding': 'chunked',
    },
  });
}
