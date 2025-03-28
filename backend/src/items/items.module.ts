import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemController } from './items.controller';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemsModule {}
