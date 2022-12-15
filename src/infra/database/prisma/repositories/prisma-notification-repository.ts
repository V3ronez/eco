import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notification/notification';
import { NotificationRepository } from '../../../../app/repositories/notification-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        recepientId: notification.recipientId,
        content: notification.content.value,
        readAt: notification.readAt,
        createAt: notification.createdAt,
      },
    });
  }
}
