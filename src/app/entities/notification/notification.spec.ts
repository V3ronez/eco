import Content from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('it should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('bella te mandou uma nova mensagem'),
      category: 'social media',
      recipientId: 'test-recipient-id',
    });
    expect(notification).toBeTruthy();
  });
});
