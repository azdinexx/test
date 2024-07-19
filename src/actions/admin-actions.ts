import { db } from '@/lib/db';

export async function getallCommercials() {
  const allCommercials = await db.user.findMany({
    where: {
      role: 'USER',
    },
  });
  return allCommercials || [];
}
