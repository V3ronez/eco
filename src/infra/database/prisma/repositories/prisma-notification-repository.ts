import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification/notification';
import { NotificationRepository } from '@app/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from './prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const persistence = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: persistence,
    });
  }
  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
