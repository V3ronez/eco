import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';

describe('Count notification by recipient', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId-2' }),
    );

    const count = await notificationRepository.countManyByRecipientId(
      'recipientId-1',
    );
    expect(count).toEqual(2);
  });
});
