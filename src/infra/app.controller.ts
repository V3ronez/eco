import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }
  c;
  @Post()
  create(@Body() body: CreateNotificationBody) {
    const { recepientId, content, category } = body;
    return this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recepientId,
      },
    });
  }
}
