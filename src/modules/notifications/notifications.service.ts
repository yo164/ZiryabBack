import prisma from '../../config/prisma.js';

export type CreateNotificationData = {
  recipientFirebaseUID: string;
  title: string;
  message: string;
  type?: string;
};

export const findForRecipient = async (
  recipientFirebaseUID: string,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const [total, notifications] = await prisma.$transaction([
    prisma.notification.count({
      where: { recipientFirebaseUID },
    }),
    prisma.notification.findMany({
      where: { recipientFirebaseUID },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const markAsRead = async (id: number, recipientFirebaseUID: string) => {
  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification || notification.recipientFirebaseUID !== recipientFirebaseUID) {
    throw new Error('NOT_FOUND');
  }

  if (notification.isRead) {
    return notification;
  }

  return prisma.notification.update({
    where: { id },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
};

export const create = async (data: CreateNotificationData) => {
  return prisma.notification.create({
    data: {
      recipientFirebaseUID: data.recipientFirebaseUID,
      title: data.title,
      message: data.message,
      type: data.type?.trim() || 'INFO',
    },
  });
};
