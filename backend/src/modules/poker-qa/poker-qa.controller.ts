import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PokerQAService } from './poker-qa.service';
import { PokerQuestionDto } from './dto/poker-question.dto';
import { PokerResponse } from './interfaces/poker-response.interface';
// ...existing code...

@Controller('poker')
export class PokerQAController {
  constructor(private readonly pokerQAService: PokerQAService) {}

  @Post('ask')
  async askPokerQuestion(@Body() pokerQuestionDto: PokerQuestionDto): Promise<PokerResponse> {
    return this.pokerQAService.answerPokerQuestion(
      pokerQuestionDto.question,
      pokerQuestionDto.sessionId
    );
  }

// ...existing code...
}
