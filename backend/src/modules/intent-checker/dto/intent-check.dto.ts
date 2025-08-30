import { IsString, IsNotEmpty } from 'class-validator';

export class IntentCheckDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  sessionId?: string;
}
