import { Injectable, Logger } from '@nestjs/common';
import { PokerResponse } from './interfaces/poker-response.interface';

@Injectable()
export class PokerQAService {
  private readonly logger = new Logger(PokerQAService.name);

  // GeminiService will be injected here

  async answerPokerQuestion(question: string, sessionId?: string): Promise<PokerResponse> {
    try {
      this.logger.log(`Processing poker question: "${question.substring(0, 50)}..."`);

      const prompt = this.buildPokerPrompt(question);
      // Call GeminiService here for response
      const answer = await this.getGeminiResponse(prompt);
      // No conversation logging

      return {
        answer: answer || "I'm not sure about that. Let me learn more about this poker topic.",
        confidence: 0.8,
        timestamp: new Date(),
        sessionId,
      };
    } catch (error) {
      this.logger.error('Error answering poker question:', error.message);
      const fallbackAnswer = this.getFallbackAnswer(question);

      return {
        answer: fallbackAnswer,
        confidence: 0.3,
        timestamp: new Date(),
        sessionId,
      };
    }
  }

  private async getGeminiResponse(prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    try {
      const response = await fetch(endpoint + '?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      if (data && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      if (data.error) {
        this.logger.error('Gemini API error:', data.error.message);
        return 'Error from Gemini: ' + data.error.message;
      }
      this.logger.error('Unexpected Gemini response:', JSON.stringify(data));
      return 'No response from Gemini';
    } catch (error) {
      this.logger.error('Error calling Gemini API:', error.message);
      return 'Failed to get response from Gemini';
    }
  }

  private buildPokerPrompt(question: string): string {
    return `
You are a poker expert. Explain the answer in simple layman terms so that even a beginner can understand.
Give only ACCURATE information.

POKER HAND RANKINGS (from WEAKEST to STRONGEST):
1. High Card (weakest)
2. One Pair
3. Two Pair
4. Three of a Kind
5. Straight
6. Flush
7. Full House
8. Four of a Kind (Quads)
9. Straight Flush
10. Royal Flush (strongest)

IMPORTANT: A hand beats ALL hands below it in ranking. 
Example: Four of a Kind beats Full House, Flush, Straight, etc.

Question: "${question}"

Answer in under 50 words, in layman terms, with facts only:`;
  }

  private getFallbackAnswer(question: string): string {
    const fallbackResponses = [
      "I'm not sure about that specific poker question. Let me learn more about this topic to give you a better answer next time.",
      "That's an interesting poker question! While I don't have a complete answer right now, I'd recommend checking with experienced players or poker resources.",
      "I need to study that poker concept more. In the meantime, you might want to consult poker strategy books or forums for detailed information.",
      "That's a great poker question! I'm still learning about some of the more nuanced aspects of the game.",
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

}
