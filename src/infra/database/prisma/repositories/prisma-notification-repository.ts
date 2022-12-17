import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification/notification';
import { NotificationRepository } from '@app/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from './prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      return null;
    }
    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recepientId: recipientId },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
    // return notifications.map((notification) => {
    //   return PrismaNotificationMapper.toDomain(notification);
    // });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recepientId: recipientId },
    });
    return count;
  }

  async create(notification: Notification): Promise<void> {
    const persistence = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: {
        id: persistence.id,
        recepientId: persistence.recipientId,
        content: persistence.content,
        category: persistence.category,
        readAt: persistence.readAt,
      },
    });
  }
  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        content: notification.content.value,
        recepientId: notification.recipientId,
        category: notification.category,
        canceledAt: notification.canceledAt,
        readAt: notification.readAt,
      },
    });
  }
}
