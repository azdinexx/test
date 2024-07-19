import { db } from '@/lib/db';

export async function getUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}
