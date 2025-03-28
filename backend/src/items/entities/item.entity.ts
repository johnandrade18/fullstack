import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class Item {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;
}