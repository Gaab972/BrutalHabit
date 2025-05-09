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
  getDoc,
} from 'firebase/firestore';

type HabitData = {
  name: string;
  description?: string;
  frequency: number[];
  brutalMode: boolean;
};

type CompletionDate =  {
  date: Date,
  completed: boolean,
}

export type Habit = HabitData & {
    id: string;
    userId: string;
    streak: number;
    maxStreak: number;
    completionDates: CompletionDate[];
    createdAt: Date;
}

export const AddHabit = async (habitData: HabitData, userId: string) => {
    const newHabit = {
        ...habitData,
        userId,
        streak: 0,
        maxStreak: 0,
        completionDates: new Array<CompletionDate>(),
        description: habitData.description ?? "",
        createdAt: new Date(),
    }

    const docRef = await addDoc(collection(database, "habits"), newHabit);
    return { id: docRef.id, ...newHabit };
};

export const GetHabits = async (userId: string) : Promise<Habit[]> => {
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
        completionDates: (data.completionDates ?? []).map((c: any) => ({
          date: c.date.toDate?.() ?? new Date(c.date),
          completed: c.completed,
        })),
        createdAt: data.createdAt,
      };
    });
};

export const GetHabit = async (habitId: string) : Promise<Habit | null> => {
  const habitRef = doc(database, "habits", habitId)
  const snapshot = await getDoc(habitRef);
  
  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      description: data.description ?? "",
      frequency: data.frequency,
      brutalMode: data.brutalMode,
      userId: data.userId,
      streak: data.streak,
      maxStreak: data.maxStreak,
      completionDates: (data.completionDates ?? []).map((c: any) => ({
        date: c.date.toDate?.() ?? new Date(c.date),
        completed: c.completed,
      })),
      createdAt: data.createdAt,
    };
  }

  return null;
}

export const updateHabit = async (habitId: string, updates: Partial<HabitData>) => {
    const habitRef = doc(database, "habits", habitId)
    await updateDoc(habitRef, updates);
};

export const deleteHabit = async (habitId: string) => {
    await deleteDoc(doc(database, 'habits', habitId));
};