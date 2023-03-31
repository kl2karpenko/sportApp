import { store } from "../store/main";
import { IWorkoutSessionState } from "../store/workoutSession";
import { IActiveWorkoutState } from "./ActiveWorkoutManagerService/IActiveWorkoutState";

// rename to session storage
class LocalStorage {
  unsubscribeFromStore: Function = () => {};

  constructor() {
    if (store) {
      this.unsubscribeFromStore = store.subscribe(() => {
        const { workoutSession, activeWorkout } = store.getState();

        if (workoutSession && workoutSession?.rounds?.length) {
          this.setItem("workoutSession", JSON.stringify(workoutSession))
        }

        this.setItem("activeWorkout", JSON.stringify(activeWorkout))
      });
    }
  }

  private static getItem<T>(key: string): T | null {
    let value = null;
    try {
      value = JSON.parse(sessionStorage.getItem(key)!);
    } catch {
      // no-op
    }
    return value;
  }

  getActiveWorkoutSession(): IWorkoutSessionState | null {
    return LocalStorage.getItem<IWorkoutSessionState>("workoutSession");
  }

  getActiveWorkout(): IActiveWorkoutState | null {
    return LocalStorage.getItem("activeWorkout");
  }

  setItem(key: string, data: string): void { return sessionStorage.setItem(key, data); }
  clear(): void { return sessionStorage.clear(); }
}

const localStorageProxy = new LocalStorage();

export default localStorageProxy;