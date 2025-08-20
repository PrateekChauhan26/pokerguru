import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { IntentCheckerModule } from '../intent-checker/intent-checker.module';
import { PokerQAModule } from '../poker-qa/poker-qa.module';

@Module({
  imports: [IntentCheckerModule, PokerQAModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
