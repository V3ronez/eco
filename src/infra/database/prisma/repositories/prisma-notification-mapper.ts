import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@app/entities/notification/notification';
import Content from '@app/entities/notification/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      recipientId: notification.recipientId,
      content: notification.content.value,
      readAt: notification.readAt,
      createAt: notification.createdAt,
    };
  }

  static toDomain(rawNotification: RawNotification) {
    return new Notification(
      {
        category: rawNotification.category,
        recipientId: rawNotification.recepientId,
        content: new Content(rawNotification.content),
        readAt: rawNotification.readAt,
        createdAt: rawNotification.createAt,
      },
      rawNotification.id,
    );
  }
}
