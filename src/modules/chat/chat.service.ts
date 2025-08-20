import { Injectable, Logger } from '@nestjs/common';
import { IntentCheckerService } from '../intent-checker/intent-checker.service';
import { PokerQAService } from '../poker-qa/poker-qa.service';
import { ChatResponse } from './interfaces/chat-response.interface';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  private readonly rejectionMessages = [
    "I'm PokerGuru, your poker assistant! I can only help with poker-related questions. Feel free to ask me about poker strategies, rules, odds, or any other poker topics! 🃏",
    "Hi there! I specialize in poker only. Please ask me something about poker - hand rankings, strategies, tournament play, or anything poker-related! 🎰",
    "I'm here to help with poker questions only! Whether you're curious about Texas Hold'em, Omaha, poker psychology, or bankroll management, I'm your guy! ♠️♥️♦️♣️",
    "Sorry, I can only assist with poker-related topics. Ask me about poker hands, betting strategies, tournament tips, or any other poker questions! 🃏",
  ];

  constructor(
    private intentCheckerService: IntentCheckerService,
    private pokerQAService: PokerQAService,
  ) {}

  async processMessage(
    message: string,
    sessionId?: string
  ): Promise<ChatResponse> {
    try {
      this.logger.log(`Processing message: "${message.substring(0, 50)}..."`);

      // Step 1: Check intent with keywords only
      const intentResult = await this.intentCheckerService.checkIntent(
        message,
        sessionId
      );

      this.logger.log(`Intent result: ${intentResult.isPokerRelated ? 'POKER' : 'NOT_POKER'} (confidence: ${intentResult.confidence})`);

      // Step 2: Process based on intent - ONLY call Ollama if poker-related
      if (intentResult.isPokerRelated) {
        // Process as poker question
        const pokerResponse = await this.pokerQAService.answerPokerQuestion(
          message,
          sessionId
        );

        return {
          message: pokerResponse.answer,
          isPokerRelated: true,
          intentConfidence: intentResult.confidence,
          responseType: 'poker_answer',
          timestamp: new Date(),
          sessionId,
        };
      } else {
        // Reject politely
        const rejectionMessage = this.getRandomRejectionMessage();

        return {
          message: rejectionMessage,
          isPokerRelated: false,
          intentConfidence: intentResult.confidence,
          responseType: 'rejection',
          timestamp: new Date(),
          sessionId,
        };
      }
    } catch (error) {
      this.logger.error('Error processing message:', error.message);

      return {
        message: "I'm sorry, I'm having some technical difficulties right now. Please try again in a moment! 🤖",
        isPokerRelated: false,
        intentConfidence: 0,
        responseType: 'error',
        timestamp: new Date(),
        sessionId,
      };
    }
  }

  private getRandomRejectionMessage(): string {
    return this.rejectionMessages[
      Math.floor(Math.random() * this.rejectionMessages.length)
    ];
  }

  async getHealthStatus(): Promise<{ status: string; services: Record<string, boolean> }> {
    // This could be expanded to check database connectivity, Ollama status, etc.
    return {
      status: 'healthy',
      services: {
        ollama: true,
        intentChecker: true,
        pokerQA: true,
      },
    };
  }
}
