import { Module } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountNotification } from '@app/use-cases/count-notification-recipient';
import { GetNotificationByRecipient } from '@app/use-cases/get-recipient-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    CountNotification,
    GetNotificationByRecipient,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
