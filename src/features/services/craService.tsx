import { WorkDay, WorkPeriod, WorkPeriodLine } from "@/lib/types";
import { customFetchClient } from "../fetchClient";

const API_CRA_URL = "/cra";
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

export const fetchWorkPeriodByDate = async (month: number, year: number) => {
  const { data: wp } = await customFetchClient.post<WorkPeriod>(API_CRA_URL, {
    month: month,
    year: year,
  });
  wp.lines.forEach((line) =>
    line.workDays.forEach((worday) => {
      worday.date = new Date(worday.date);
    })
  );

  return wp;
};

export const addLineOnWorkPeriod = (workPeriodId: string) => {
  return customFetchClient.get(API_CRA_URL + `/${workPeriodId}`);
};

export const deleteLineOnWorkPeriod = (workLineId: number) => {
  return customFetchClient.delete(
    API_CRA_URL + `/workPeriodLine/${workLineId}`
  );
};

export const updateWorkPeriodLine = (workPeriodLine: WorkPeriodLine) => {
  return customFetchClient.post(
    API_CRA_URL + "/workPeriodLine",
    workPeriodLine
  );
};

export const addWorkDay = (workDay: WorkDay, workPeriodLineId: string) => {
  return customFetchClient.put(
    API_CRA_URL + `/workDay/${workPeriodLineId}`,
    workDay
  );
};

export const deleteWorkDay = (workDayId: string | null) => {
  if (!workDayId) {
    return new Promise<string>((resolve) => resolve("nothing to delete"));
  }
  return customFetchClient.delete(API_CRA_URL + `/workDay/${workDayId}`);
};

export const updateWorkDay = (workDay: WorkDay) => {
  return customFetchClient.post(API_CRA_URL + "/workDay", workDay);
};
