import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/entities/item.entity';
import { ItemController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { ItemService } from './items/items.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_DB_URI || "mongodb://localhost:27017/items",
      entities: [Item],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Item]),
    ItemsModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class AppModule {}