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
} from 'firebase/firestore';

export type HabitData = {
    name: string;
    description?: string;
    frequency: string[];
    brutalMode: boolean;
};

export const AddHabit = async (habit: HabitData, userId: string) => {
    const newHabit = {
        ...habit,
        userId,
        maxStreak: 0,
        description: habit.description ?? "",
        createdAt: new Date(),
    }

    const docRef = await addDoc(collection(database, "habits"), newHabit);
    return { id: docRef.id, ...newHabit };
};

export const GetHabit = async (userId: string) => {
    const queryUserHabits = query(collection(database, "habits"), where("userId", "==", userId))
    const snapshot = await getDocs(queryUserHabits);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
};

export const updateHabit = async (habitId: string, updates: Partial<HabitData>) => {
    const habitRef = doc(database, "habits", habitId)
    await updateDoc(habitRef, updates);
};

export const deleteHabit = async (habitId: string) => {
    await deleteDoc(doc(database, 'habits', habitId));
};