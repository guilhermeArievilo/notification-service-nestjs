import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(Override: Override = {}) {
  return new Notification({
    category: 'Social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'exemple-recipient-id',
    ...Override,
  });
}
