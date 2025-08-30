import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('intent_logs')
export class IntentLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userInput: string;

  @Column('boolean')
  isPokerRelated: boolean;

  @Column('varchar', { length: 100 })
  detectionMethod: string; // 'keyword' or 'ai'

  @Column('float', { nullable: true })
  confidenceScore?: number;

  @Column('text', { nullable: true })
  sessionId?: string;

  @CreateDateColumn()
  createdAt: Date;
}
