import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'exemple-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'exemple-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'exemple-recipient-1' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'exemple-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
