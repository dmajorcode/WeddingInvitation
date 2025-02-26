// APIs/APIGuestBook.js
import { child, get, push, ref, update } from 'firebase/database';
import { realtimeDb, dbref } from './firebase';

const APIGuestBook = {
  getCount: async () => {
    const res = await get(child(dbref, '/like'));
    try {
      return res.val();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  setCount: async (value: number) => {
    const res = await update(ref(realtimeDb, 'guestBook'), {
      count: value,
    });
    return res;
  },

  getGuestBook: async () => {
    const res = await get(child(dbref, 'guestBook'));
    try {
      return res.val();
    } catch (err) {
      throw err;
    }
  },

  postGuestBook: async (nickname: string, comment: string) => {
    const count = await APIGuestBook.getCount();
    APIGuestBook.setCount(count + 1);
    const inputData = {
      nickname,
      comment,
      created_at: new Date().toISOString(),
    };
    const res = await push(ref(realtimeDb, 'guestBook/guestBook'), inputData);
    return res;
  },

  resetGuestBook: async () => {
    const res = await update(ref(realtimeDb, 'guestBook'), {
      count: 0,
      guestBook: '',
    });
    return res;
  },
};

export default APIGuestBook;
