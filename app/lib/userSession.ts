import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_COOKIE = 'user_session_id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function getUserId(): Promise<string> {
  const cookieStore = await cookies();
  let userId = cookieStore.get(USER_ID_COOKIE)?.value;
  
  if (!userId) {
    userId = uuidv4();
    cookieStore.set(USER_ID_COOKIE, userId, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }
  
  return userId;
}

export async function setUserId(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(USER_ID_COOKIE, userId, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
}
