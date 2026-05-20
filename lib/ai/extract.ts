import OpenAI from 'openai';
import { generateExtractionPrompt } from './extraction-prompt';
// @ts-expect-error - pdf-parse types do not specify a default export but it works at runtime
import pdfParse from 'pdf-parse';

export async function extractFromDocument(
  fileUrl: string,
  documentType: string
): Promise<Record<string, unknown>> {
  
  // Initialize OpenAI client configured for NVIDIA's DeepSeek API
  const openai = new OpenAI({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey: process.env.NVIDIA_API_KEY || "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",
  });
  
  // Fetch document from storage
  const response = await fetch(fileUrl);
  const buffer = await response.arrayBuffer();
  
  // Extract text from the PDF as DeepSeek API doesn't natively accept base64 PDFs like Claude
  const pdfData = await pdfParse(Buffer.from(buffer));
  const documentText = pdfData.text;

  // Generate prompts
  const extractionInstructions = generateExtractionPrompt(documentType);
  const promptContent = `Extract the required JSON data from the following document text.\n\nDOCUMENT TEXT:\n${documentText}\n\nINSTRUCTIONS:\n${extractionInstructions}\n\nIMPORTANT: Return ONLY valid JSON.`;
  
  const completion = await openai.chat.completions.create({
    model: "deepseek-ai/deepseek-v4-pro",
    messages: [
      { role: "user", content: promptContent }
    ],
    temperature: 0.2, // Lowered slightly from 1 for more consistent JSON output
    top_p: 0.95,
    max_tokens: 16384,
    // @ts-expect-error - Custom NVIDIA endpoint parameters
    chat_template_kwargs: { thinking: false }
  });

  const textContent = completion.choices[0]?.message?.content;
  if (!textContent) {
    throw new Error('No text content in DeepSeek response');
  }

  // Parse JSON response using Regex in case DeepSeek wraps it in Markdown blocks (e.g. ```json ... ```)
  const jsonMatch = textContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("Failed to parse DeepSeek response:", textContent);
    throw new Error('No JSON found in DeepSeek response');
  }

  return JSON.parse(jsonMatch[0]);
}
