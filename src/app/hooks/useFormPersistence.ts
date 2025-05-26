import { useEffect } from "react";
import {
  UseFormWatch,
  UseFormSetValue,
  UseFormReset,
} from "react-hook-form";

const LOCAL_STORAGE_KEY = "formData";

export function useFormPersistence<T extends Record<string, any>>(
  watch: UseFormWatch<T>,
  setValue: UseFormSetValue<T>,
  reset: UseFormReset<T>
) {
  let restoredFromStorage = false;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as T;
        reset(parsed);
        restoredFromStorage = true;
      } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (typeof window === "undefined") return;

      const allEmpty = Object.values(value).every(
        (val) => val === "" || val === undefined || val === null
      );

      if (!allEmpty) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const clearPersistedData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      console.log("🧹 Datos limpiados de localStorage");
    }
  };

  return { clearPersistedData };
}
