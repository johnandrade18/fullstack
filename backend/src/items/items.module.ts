import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]), // Aquí puedes agregar tus entidades si es necesario
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemsModule {}
