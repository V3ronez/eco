import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';

import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });
    await notificationRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });
});
