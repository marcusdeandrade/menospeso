import OpenAI from 'openai';

export async function verifyApiKey(apiKey: string): Promise<boolean> {
  try {
    const openai = new OpenAI({ apiKey });
    // Try to list models as a simple API test
    await openai.models.list();
    return true;
  } catch (error) {
    console.error('Error verifying API key:', error);
    return false;
  }
}

export async function fetchAssistantInfo(apiKey: string, assistantId: string) {
  try {
    const openai = new OpenAI({ apiKey });
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    return {
      name: assistant.name || null,
      model: assistant.model,
      description: assistant.description || null,
    };
  } catch (error) {
    console.error('Error fetching assistant info:', error);
    throw new Error('Failed to fetch assistant info');
  }
}

export type AssistantInfo = {
  name: string | null;
  model: string;
  description: string | null;
};
