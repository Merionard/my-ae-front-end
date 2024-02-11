import { WorkPeriod } from "@/lib/types";
import { client } from "../fetchClient";
import { CRA } from "../urlAPI";

export const fetchHolidays = async (year: number) => {
  const url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("error when calling api-gouv for holidays!");
  }
  const json = await response.json();
  const arrayHolidays: Array<Date> = [];
  for (const [key] of Object.entries(json)) {
    arrayHolidays.push(new Date(key));
  }
  return arrayHolidays;
};

export const fetchWorkPeriodByDate = (month: number, year: number) => {
  return client(CRA, "POST", {} as WorkPeriod, undefined, {
    month: month,
    year: year,
  });
};

export const addLineOnWorkPeriod = (workPeriodId: string) => {
  return client(CRA, "GET", {} as WorkPeriod, workPeriodId);
};
