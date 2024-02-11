"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFirstLetterDayName, isDateEqual } from "@/lib/utils";

import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DateHeader } from "./dateHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  addLineOnWorkPeriod,
  fetchHolidays,
  fetchWorkPeriodByDate,
} from "@/features/services/craService";
import { Customer } from "@/lib/types";
import CraTableRow from "./craTableRow";

type Props = {
  userId: string;
  customers: Customer[];
};

export default function CraTable({ customers }: Props) {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());

  const {
    data: workPeriod,
    isError,
    isLoading,
  } = useQuery(["workPeriod", year, month], () =>
    fetchWorkPeriodByDate(month, year)
  );
  const {
    data: holidays,
    isError: isErrorOnHolidays,
    isLoading: isLoadingHolidays,
  } = useQuery(["holidays", year, month], () => fetchHolidays(year));

  const queryClient = useQueryClient();

  const addLineMutation = useMutation({
    mutationFn: (workPeriodId: string) => addLineOnWorkPeriod(workPeriodId),
    onSuccess: () => {
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const onChangeMonth = (newMonth: number) => {
    setMonth(newMonth);
  };

  if (isLoading || isLoadingHolidays) {
    return (
      <>
        <DateHeader
          changeMonth={onChangeMonth}
          setYear={setYear}
          month={month}
          year={year}
        />
        <Loader2 className="animate-spin mx-auto" />
      </>
    );
  }

  if (isError || !workPeriod) {
    return "Une erreur est survenue";
  }
  if (isErrorOnHolidays || !holidays) {
    return "Une erreur est survenue lors de la récupération des jours fériés";
  }

  const currentDate = new Date(year, month + 1, 0);
  const daysInMonth = currentDate.getDate();
  let nbBusinessDays = 0;

  const datesOfCurrentMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    if (
      date.getDay() !== 6 &&
      date.getDay() !== 0 &&
      !holidays?.some((h) => isDateEqual(h, date))
    ) {
      nbBusinessDays++;
    }
    datesOfCurrentMonth.push(date);
  }

  const columnDayNumber = [];
  const columnsDayName = [];
  for (let i = 1; i <= daysInMonth; i++) {
    columnsDayName.push(
      <TableHead
        key={i}
        className="border text-center"
        style={{ minWidth: "60px" }}
      >
        {getFirstLetterDayName(new Date(year, month, i))}
      </TableHead>
    );
    columnDayNumber.push(
      <TableHead className="border text-center" key={i}>
        {i}
      </TableHead>
    );
  }
  columnsDayName.unshift(
    <TableHead key={0} className="border">
      TOTAL JOURS OUVRABLES: {nbBusinessDays}
    </TableHead>
  );
  columnDayNumber.unshift(<TableHead key={0} className="border"></TableHead>);

  const handleClickAddLine = () => {
    addLineMutation.mutate(workPeriod.id.toString());
  };

  return (
    <Card>
      <CardHeader>
        <DateHeader
          changeMonth={onChangeMonth}
          setYear={setYear}
          month={month}
          year={year}
        />
      </CardHeader>
      <CardContent>
        <Button
          className="flex justify-start gap-2 mb-3"
          variant={"outline"}
          onClick={() => handleClickAddLine()}
        >
          <PlusCircle /> Ajouter une ligne
        </Button>

        <Table>
          <TableHeader>
            <TableRow>{columnsDayName}</TableRow>
            <TableRow>{columnDayNumber}</TableRow>
          </TableHeader>
          <TableBody>
            {workPeriod.lines.map((workLine) => (
              <CraTableRow
                key={workLine.id}
                customers={customers}
                datesOfCurrentMonth={datesOfCurrentMonth}
                workLine={workLine}
                month={month}
                year={year}
                holidays={holidays}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
