import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// ...existing code...
import { IntentCheckerModule } from './modules/intent-checker/intent-checker.module';
import { PokerQAModule } from './modules/poker-qa/poker-qa.module';
import { OllamaIntegrationModule } from './modules/ollama-integration/ollama-integration.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    OllamaIntegrationModule,
    IntentCheckerModule,
    PokerQAModule,
    ChatModule,
  ],
})
export class AppModule {}
