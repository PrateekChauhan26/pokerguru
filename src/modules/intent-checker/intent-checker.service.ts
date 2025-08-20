import { Injectable, Logger } from '@nestjs/common';
import { IntentResult } from './interfaces/intent-result.interface';

@Injectable()
export class IntentCheckerService {
  private readonly logger = new Logger(IntentCheckerService.name);

  // Poker-related keywords for simple detection
  private readonly pokerKeywords = [
    'poker', 'texas holdem', 'hold em', 'holdem', 'omaha', 'stud', 
    'blinds', 'ante', 'flop', 'turn', 'river', 'preflop', 'showdown',
    'bet', 'betting', 'raise', 'call', 'fold', 'check', 'all-in', 'bluff',
    'hand', 'cards', 'card', 'aces', 'ace', 'kings', 'king', 'queens', 'queen',
    'jacks', 'jack', 'royal flush', 'straight flush', 'four of a kind',
    'full house', 'flush', 'straight', 'three of a kind', 'two pair',
    'pair', 'high card', 'kicker', 'outs', 'pot odds', 'odds',
    'position', 'button', 'small blind', 'big blind', 'tournament',
    'cash game', 'wsop', 'suited', 'offsuit', 'pocket', 'hole cards'
  ];

  // No AI service required in constructor

  async checkIntent(message: string, sessionId?: string): Promise<IntentResult> {
    try {
      this.logger.log(`Checking intent for message: "${message.substring(0, 50)}..."`);

      // Simple keyword-based detection only
      const result = this.checkIntentWithKeywords(message);

      // Log the intent result
      // No intent logging

      return result;
    } catch (error) {
      this.logger.error('Error checking intent:', error.message);
      // Fallback to basic detection
      const fallbackResult: IntentResult = {
        isPokerRelated: false,
        confidence: 0.1,
        method: 'keyword',
        message: 'Error during intent detection'
      };
      // No intent logging
      return fallbackResult;
    }
  }

  private checkIntentWithKeywords(message: string): IntentResult {
    const lowerMessage = message.toLowerCase();
    const foundKeywords = this.pokerKeywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );

    const isPokerRelated = foundKeywords.length > 0;
    // More generous confidence - if we find poker keywords, it's likely poker-related
    const confidence = isPokerRelated ? Math.min(0.6 + (foundKeywords.length * 0.1), 0.95) : 0.1;

    return {
      isPokerRelated,
      confidence,
      method: 'keyword',
      message: isPokerRelated 
        ? `Found poker keywords: ${foundKeywords.join(', ')}` 
        : 'No poker keywords detected'
    };
  }

// Removed logIntentCheck method
}
