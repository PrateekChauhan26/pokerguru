export interface ChatResponse {
  message: string;
  isPokerRelated: boolean;
  intentConfidence: number;
  responseType: 'poker_answer' | 'rejection' | 'error';
  timestamp: Date;
  sessionId?: string;
}
