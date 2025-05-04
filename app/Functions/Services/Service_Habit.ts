import { database } from '../../../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

type HabitData = {
  name: string;
  description?: string;
  frequency: string[];
  brutalMode: boolean;
};

export type Habit = HabitData & {
    id: string;
    userId: string;
    streak: number;
    maxStreak: number;
    createdAt: Date;
}

export const AddHabit = async (habit: HabitData, userId: string) => {
    const newHabit = {
        ...habit,
        userId,
        streak: 0,
        maxStreak: 0,
        description: habit.description ?? "",
        createdAt: new Date(),
    }

    const docRef = await addDoc(collection(database, "habits"), newHabit);
    return { id: docRef.id, ...newHabit };
};

export const GetHabits = async (userId: string) => {
    const queryUserHabits = query(collection(database, "habits"), where("userId", "==", userId))
    const snapshot = await getDocs(queryUserHabits);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description ?? "",
        frequency: data.frequency,
        brutalMode: data.brutalMode,
        userId: data.userId,
        streak: data.streak,
        maxStreak: data.maxStreak,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt),
      };
    });
};

export const updateHabit = async (habitId: string, updates: Partial<HabitData>) => {
    const habitRef = doc(database, "habits", habitId)
    await updateDoc(habitRef, updates);
};

export const deleteHabit = async (habitId: string) => {
    await deleteDoc(doc(database, 'habits', habitId));
};