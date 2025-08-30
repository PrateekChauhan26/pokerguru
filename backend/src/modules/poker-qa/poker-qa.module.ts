import { Module } from '@nestjs/common';
import { PokerQAController } from './poker-qa.controller';
import { PokerQAService } from './poker-qa.service';
import { OllamaIntegrationModule } from '../ollama-integration/ollama-integration.module';

@Module({
  imports: [
    OllamaIntegrationModule,
  ],
  controllers: [PokerQAController],
  providers: [PokerQAService],
  exports: [PokerQAService],
})
export class PokerQAModule {}
