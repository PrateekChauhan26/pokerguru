export interface IntentResult {
  isPokerRelated: boolean;
  confidence: number;
  method: 'keyword' | 'ai';
  message?: string;
}
