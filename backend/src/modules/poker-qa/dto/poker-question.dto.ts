import { IsString, IsNotEmpty } from 'class-validator';

export class PokerQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  sessionId?: string;
}
