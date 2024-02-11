import { WorkDay, WorkPeriod, WorkPeriodLine } from "@/lib/types";
import { client } from "../fetchClient";
import { CRA, CRA_LINE, CRA_WORK_DAY } from "../urlAPI";

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

export const deleteLineOnWorkPeriod = (workLineId: number) => {
  return client(CRA_LINE, "DELETE", {} as string, workLineId.toString());
};

export const updateWorkPeriodLine = (workPeriodLine: WorkPeriodLine) => {
  return client(
    CRA_LINE,
    "POST",
    {} as WorkPeriodLine,
    undefined,
    workPeriodLine
  );
};

export const addWorkDay = (workDay: WorkDay, workPeriodLineId: string) => {
  return client(
    CRA_WORK_DAY,
    "PUT",
    {} as WorkPeriodLine,
    workPeriodLineId,
    workDay
  );
};

export const deleteWorkDay = (workDayId: string | null) => {
  if (!workDayId) {
    return new Promise<string>((resolve) => resolve("nothing to delete"));
  }
  return client(CRA_WORK_DAY, "DELETE", {} as string, workDayId);
};

export const updateWorkDay = (workDay: WorkDay) => {
  return client(CRA_WORK_DAY, "POST", {} as string, undefined, workDay);
};
