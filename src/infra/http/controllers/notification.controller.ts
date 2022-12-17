import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-model/notification-view-model';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CountNotification } from '@app/use-cases/count-notification-recipient';
import { GetNotificationByRecipient } from '@app/use-cases/get-recipient-notification';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private countRecipientNotification: CountNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getNotificationsRecipients: GetNotificationByRecipient,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getNotificationsOfRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getNotificationsRecipients.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });
    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
