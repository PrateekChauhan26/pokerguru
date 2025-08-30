import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('chat_logs')
export class ChatLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userMessage: string;

  @Column('text')
  botResponse: string;

  @Column('boolean')
  isPokerRelated: boolean;

  @Column('varchar', { length: 50 })
  intentResult: string;

  @Column('text', { nullable: true })
  sessionId?: string;

  @CreateDateColumn()
  createdAt: Date;
}
