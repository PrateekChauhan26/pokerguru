import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ChatResponse } from './interfaces/chat-response.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async sendMessage(@Body() chatMessageDto: ChatMessageDto): Promise<ChatResponse> {
    return this.chatService.processMessage(
      chatMessageDto.message,
      chatMessageDto.sessionId
    );
  }

  @Get('health')
  async getHealth(): Promise<{ status: string; services: Record<string, boolean> }> {
    return this.chatService.getHealthStatus();
  }
}
