import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { GetNotificationByRecipient } from './get-recipient-notification';

describe('Get notification by recipient', () => {
  it('should be able to get  notification by recipient', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientId = new GetNotificationByRecipient(
      notificationRepository,
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipientId-2' }),
    );

    const { notifications } = await getRecipientId.execute({
      recipientId: 'recipientId-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId-1' }),
        expect.objectContaining({ recipientId: 'recipientId-1' }),
      ]),
    );
  });
});
