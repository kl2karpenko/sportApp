import { store } from "../store/main";
import { IWorkoutSessionState } from "../store/workoutSession";

class LocalStorage {
  unsubscribeFromStore: Function = () => {};

  constructor() {
    console.log(store, " store");
    if (store) {

      this.unsubscribeFromStore = store.subscribe(() => {
        const { workoutSession, activeWorkout } = store.getState();

        this.setItem("workoutSession", JSON.stringify(workoutSession))
        this.setItem("activeWorkout", JSON.stringify(activeWorkout))
      });
    }
  }

  private static getItem<T>(key: string): T | null {
    let value = null;
    try {
      value = JSON.parse(localStorage.getItem(key)!);
    } catch {
      // no-op
    }
    return value;
  }
  getActiveWorkoutSession(): IWorkoutSessionState | null {
    return LocalStorage.getItem<IWorkoutSessionState>("workoutSession");
  }

  getActiveWorkout(): string | null {
    return LocalStorage.getItem("activeWorkout");
  }

  setItem(key: string, data: string): void { return localStorage.setItem(key, data); }
  clear(): void { return localStorage.clear(); }
}

const localStorageProxy = new LocalStorage();

export default localStorageProxy;