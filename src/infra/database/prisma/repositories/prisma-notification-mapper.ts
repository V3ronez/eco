import { Notification } from '@app/entities/notification/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      recepientId: notification.recipientId,
      content: notification.content.value,
      readAt: notification.readAt,
      createAt: notification.createdAt,
    };
  }
}
