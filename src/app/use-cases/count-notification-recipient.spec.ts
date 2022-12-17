import Content from '@app/entities/notification/content';
import { Notification } from '@app/entities/notification/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/error-notification-not-found';

describe('Count notification by recipient', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('pedido de amizade cancelado'),
        recipientId: 'recipientId-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('pedido de amizade cancelado'),
        recipientId: 'recipientId-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('pedido de amizade cancelado'),
        recipientId: 'recipientId-2',
      }),
    );

    const count = await notificationRepository.countManyByRecipientId(
      'recipientId-1',
    );
    expect(count).toEqual(2);
  });
});
