import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemService } from './items.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Post()
  async create(@Body() item: Partial<Item>): Promise<Item> {
    return this.itemService.create(item);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() item: Partial<Item>): Promise<Item> {
    return this.itemService.update(id, item);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.itemService.delete(id);
  }
}