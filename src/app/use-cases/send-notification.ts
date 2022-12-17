import { Injectable } from '@nestjs/common';
import Content from '../entities/notification/content';
import { Notification } from '../entities/notification/notification';
import { NotificationRepository } from '../repositories/notification-repository';

interface SendNotificationRequest {
  content: string;
  recipientId: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { content, recipientId, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
