import Content from '@app/entities/notification/content';
import {
  Notification,
  NotificationProps,
} from '@app/entities/notification/notification';

type Override = Partial<NotificationProps>;
export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('pedido de amizade cancelado'),
    recipientId: 'recipientId-2',
    ...override,
  });
}
