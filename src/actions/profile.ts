'use server';
import { getUserId } from '@/lib/session';
import { db } from '@/lib/db';

export async function getUserFullName() {
  const user = (await getUserId()) as string;
  const data = await db.user.findUnique({
    where: {
      id: user,
    },
  });
  if (!data) return 'N/A';
  return `${data.firstName} ${data.lastName}`;
}
