import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
// import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('Send notifications', () => {
  it('should be able to send notifications', async () => {
    const NotificationRepository = new InMemoryNotificationRepository();
    const notification = new SendNotification(NotificationRepository);
    await notification.execute({
      category: 'social-media',
      content: 'novo pedido de amizade',
      recipientId: 'test-recepientId',
    });

    expect(NotificationRepository.notifications).toHaveLength(1);
  });
});
