import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
  };
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('OLLAMA_BASE_URL', 'http://localhost:11434');
    this.model = this.configService.get<string>('OLLAMA_MODEL', 'llama3.1:8b');
  }

  async generateResponse(prompt: string, temperature: number = 0.7): Promise<string> {
    try {
      this.logger.log(`Generating response with model: ${this.model}`);
      
      const request: OllamaRequest = {
        model: this.model,
        prompt,
        stream: false,
        options: {
          temperature: 0.4,
          top_p: 0.9,
          max_tokens: 1000,
        },
      };

      const response: AxiosResponse<OllamaResponse> = await axios.post(
        `${this.baseUrl}/api/generate`,
        request,
        {
          timeout: 30000, // 30 seconds timeout
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data && response.data.response) {
        this.logger.log('Successfully generated response from Ollama');
        return response.data.response.trim();
      }

      throw new Error('Invalid response from Ollama');
    } catch (error) {
      this.logger.error('Error generating response from Ollama:', error.message);
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Ollama service is not running. Please start Ollama on localhost:11434');
      }
      throw new Error('Failed to generate response from AI model');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`, { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      this.logger.error('Ollama health check failed:', error.message);
      return false;
    }
  }

  async listModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`);
      return response.data.models?.map(model => model.name) || [];
    } catch (error) {
      this.logger.error('Failed to list Ollama models:', error.message);
      return [];
    }
  }
}
