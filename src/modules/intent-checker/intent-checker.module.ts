import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentCheckerController } from './intent-checker.controller';
import { IntentCheckerService } from './intent-checker.service';
import { IntentLog } from '../database/entities/intent-log.entity';
import { OllamaIntegrationModule } from '../ollama-integration/ollama-integration.module';

@Module({
  imports: [
      OllamaIntegrationModule,
  ],
  controllers: [IntentCheckerController],
  providers: [IntentCheckerService],
  exports: [IntentCheckerService],
})
export class IntentCheckerModule {}
