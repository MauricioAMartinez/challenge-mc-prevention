// app/hooks/useInitialFormLoad.ts
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface FormUserData {
  fullName?: string;
  address?: string;
  country?: string;
  phoneNumber?: string;
  gender?: string;
  cpf?: string;
}

interface CountryOption {
  value: string;
  label: string;
}

export function useInitialFormLoad<T extends FormUserData>(
  setValue: UseFormSetValue<T>
) {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [initialDataError, setInitialDataError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingInitialData(true);
      setInitialDataError(null);
      try {
        const userRes = await fetch("/api/user-data");
        if (userRes.ok) {
          const userData: FormUserData = await userRes.json();
          Object.keys(userData).forEach((key) => {
            setValue(key as unknown as import("react-hook-form").Path<T>, userData[key as keyof FormUserData] as any);
          });
          console.log("Datos de usuario cargados desde la API:", userData);
        } else {
          console.warn("No se pudieron cargar los datos de usuario preexistentes.");
        }

        const countriesRes = await fetch("/api/countries");
        if (countriesRes.ok) {
          const countriesData: CountryOption[] = await countriesRes.json();
          setCountryOptions(countriesData);
          console.log("Opciones de países cargadas:", countriesData);
        } else {
          console.error("Error al cargar opciones de países.");
          setInitialDataError("Failed to load country options.");
        }
      } catch (error) {
        console.error("Error en useInitialFormLoad:", error);
        setInitialDataError("Error al cargar datos iniciales.");
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    if (typeof window !== "undefined") { 
      loadData();
    }
  }, [setValue]);

  return { countryOptions, isLoadingInitialData, initialDataError };
}
