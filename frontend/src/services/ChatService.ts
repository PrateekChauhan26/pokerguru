import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  message: string;
  isPokerRelated: boolean;
  intentConfidence: number;
  responseType: 'poker_answer' | 'rejection' | 'error';
  timestamp: string;
  sessionId?: string;
}

export interface HealthResponse {
  status: string;
  services: Record<string, boolean>;
}

export class ChatService {
  static async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat/message`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  static async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/health`);
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw new Error('Failed to check health');
    }
  }

  static async checkIntent(message: string, sessionId?: string): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/intent/check`, {
        message,
        sessionId,
      });
      return response.data;
    } catch (error) {
      console.error('Error checking intent:', error);
      throw new Error('Failed to check intent');
    }
  }

  static async askPokerQuestion(question: string, sessionId?: string): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/poker/ask`, {
        question,
        sessionId,
      });
      return response.data;
    } catch (error) {
      console.error('Error asking poker question:', error);
      throw new Error('Failed to ask poker question');
    }
  }
}
