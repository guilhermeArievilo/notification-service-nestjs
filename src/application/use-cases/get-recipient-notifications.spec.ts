import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'exemple-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'exemple-recipient-id' }),
        expect.objectContaining({ recipientId: 'exemple-recipient-id' }),
      ]),
    );
  });
});
