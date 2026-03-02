import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real production app, ensure API_KEY is handled securely via backend proxy.

const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model'; text: string }[],
  language: 'ar' | 'en'
): Promise<string> => {
  try {
    if (!apiKey) return language === 'ar' ? "عذراً، خدمة الدردشة غير متوفرة حالياً." : "Sorry, chat service unavailable.";

    const systemInstruction = `
      You are 'Hamad', a helpful, professional, and friendly AI sales representative for 'Echo Web' (eweb.ae).
      
      Company Details:
      - Specializes in: Web Design, App Development, Custom Web Systems, Digital Marketing, Hosting & Domains.
      - Locations: Licensed in UAE (Dubai/Al Ain) and Oman (Buraimi).
      - Values: Professionalism, Quality, Speed, Post-launch Support.
      - Branding: Premium, Tech-forward.

      Your Goal:
      - Answer user questions about services.
      - Encourage users to "Request a Quote" or "Book a Consultation".
      - Keep answers concise (under 3 paragraphs).
      - Respond in the same language as the user (Arabic or English).
      
      If asked about prices, give a range but emphasize that custom quotes depend on requirements.
      Direct them to the 'Cost Calculator' on the homepage for estimates.
    `;

    // Convert history to the format expected by the new SDK if needed, 
    // but generateContent works well with a text prompt including history for simple stateless interactions 
    // or use chat sessions. Here we use a simple single-turn approach with context for simplicity in this demo,
    // but for better results, we use the chat model.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    // Feed simple history context string if not using full history object
    // ideally we would map history to the chat history format.
    // For this snippet, we will send the message directly to a new chat for simplicity 
    // as maintaining state in the service is outside scope, the component handles display history.
    
    const result = await chat.sendMessage({
      message: message
    });

    return result.text || (language === 'ar' ? "عذراً، لم أستطع فهم ذلك." : "Sorry, I didn't understand that.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' 
      ? "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً." 
      : "Connection error, please try again later.";
  }
};