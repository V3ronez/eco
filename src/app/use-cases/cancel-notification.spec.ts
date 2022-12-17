import Content from '@app/entities/notification/content';
import { Notification } from '@app/entities/notification/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/error-notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('pedido de amizade cancelado'),
      recipientId: 'nee-recipientId-test',
    });
    await notificationRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });
    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'recipient-id-fake',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
