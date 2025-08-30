import { Controller, Post, Body } from '@nestjs/common';
import { IntentCheckerService } from './intent-checker.service';
import { IntentCheckDto } from './dto/intent-check.dto';
import { IntentResult } from './interfaces/intent-result.interface';

@Controller('intent')
export class IntentCheckerController {
  constructor(private readonly intentCheckerService: IntentCheckerService) {}

  @Post('check')
  async checkIntent(@Body() intentCheckDto: IntentCheckDto): Promise<IntentResult> {
    return this.intentCheckerService.checkIntent(
      intentCheckDto.message,
      intentCheckDto.sessionId
    );
  }
}
