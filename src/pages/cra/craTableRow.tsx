import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { isDateEqual } from "@/lib/utils";

import clsx from "clsx";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

import CustomerComboBox from "./customerComboBox";
import { Customer, WorkDay, WorkPeriodLine } from "@/lib/types";
import {
  addWorkDay,
  deleteLineOnWorkPeriod,
  deleteWorkDay,
  updateWorkDay,
  updateWorkPeriodLine,
} from "@/features/services/craService";

type Props = {
  workPeriodLine: WorkPeriodLine;
  customers: Customer[];
  datesOfCurrentMonth: Array<Date>;
  year: number;
  month: number;
  holidays: Date[];
};

export default function CraTableRow({
  customers,
  datesOfCurrentMonth,
  workPeriodLine: line,
  year,
  month,
  holidays,
}: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState(() =>
    initSelectedCustomer()
  );

  function initSelectedCustomer() {
    const customer = customers.find((c) => c.id === line.customerId);
    return customer ? customer : customers.length > 0 ? customers[0] : null;
  }

  const isWeekEnd = (date: Date) => {
    return (
      date.getDay() === 6 ||
      date.getDay() === 0 ||
      holidays.some((h) => isDateEqual(h, date))
    );
  };

  const isDayWorked = (date: Date, workDays: WorkDay[]) => {
    return workDays.some(
      (w) =>
        w.date.getDate() === date.getDate() &&
        w.date.getMonth() === date.getMonth() &&
        w.date.getFullYear() === date.getFullYear()
    );
  };

  const queryClient = useQueryClient();
  const workPeriodLineMutation = useMutation({
    mutationFn: (workPeriodLine: WorkPeriodLine) =>
      updateWorkPeriodLine(workPeriodLine),
    onSuccess: () => {
      queryClient.invalidateQueries(["workPeriod", year, month]);
      toast.success("Ligne mise à jour avec succès!");
    },
  });

  const AddWorkDayMutation = useMutation({
    mutationFn: (param: { workDay: WorkDay; workLineId: string }) =>
      addWorkDay(param.workDay, param.workLineId),
    onSuccess: () => {
      toast.success("Jour travaillé ajouté avec succès");
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const deleteWorkDayMutation = useMutation({
    mutationFn: (id: string | null) => deleteWorkDay(id),
    onSuccess: () => {
      toast.success("suppression effectuée avec succès!");
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const updateWorkDayMutation = useMutation({
    mutationFn: (workDay: WorkDay) => updateWorkDay(workDay),
    onSuccess: () => {
      toast.success("mise à jour effectuée avec succès!");
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const deleteLineMutation = useMutation({
    mutationFn: (lineId: number) => deleteLineOnWorkPeriod(lineId),
    onSuccess: () => {
      toast.success("suppression effectuée avec succès!");
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const updateSelectedCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    const lineToUpdate = {
      ...line,
      customerId: customer.id,
      workDays: [],
    };
    workPeriodLineMutation.mutate(lineToUpdate);
  };

  const handleSelectDuration = (
    date: Date,
    workPeriodLineId: number,
    duration: string
  ) => {
    console.log(date);
    if (!isDayWorked(date, line.workDays) && Number(duration) > 0) {
      const workDay: WorkDay = {
        date: date,
        duration: Number(duration),
        id: null,
      };
      AddWorkDayMutation.mutate({
        workDay: workDay,
        workLineId: workPeriodLineId.toString(),
      });
    }

    if (isDayWorked(date, line.workDays)) {
      if (Number(duration) === 0) {
        const workDayToDelete = line.workDays.find((w) =>
          isDateEqual(w.date, date)
        );
        if (workDayToDelete) {
          deleteWorkDayMutation.mutate(
            workDayToDelete.id != null ? workDayToDelete.id.toString() : null
          );
        }
      } else {
        const workDayToUpdate = line.workDays.find((w) =>
          isDateEqual(w.date, date)
        );
        if (workDayToUpdate) {
          updateWorkDayMutation.mutate({
            ...workDayToUpdate,
            duration: Number(duration),
          });
        }
      }
    }
  };

  const getWorkDayDuration = (date: Date) => {
    const workDay = line.workDays.find((w) => isDateEqual(date, w.date));
    return workDay?.duration.toString() ?? "0";
  };

  const getTotalDuration = () => {
    return line.workDays
      .map((w) => w.duration)
      .reduce((a, b) => a + Number(b), 0);
  };

  const HandleClickDeleteLine = () => {
    deleteLineMutation.mutate(line.id);
  };

  return (
    <TableRow key={line.id}>
      <TableCell className="border p-3 min-w-[300px] h-12">
        <div className="flex flex-col gap-2">
          <CustomerComboBox
            customers={customers}
            customer={selectedCustomer}
            onSelectCustomer={updateSelectedCustomer}
          />
          <div className="flex justify-between items-baseline">
            <div className="flex gap-2 items-center">
              <Typography variant={"muted"}>Nb jour travaillés:</Typography>
              <span className="font-bold">{getTotalDuration()}</span>
            </div>
            <Button
              variant={"destructive"}
              onClick={HandleClickDeleteLine}
              size={"sm"}
            >
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      </TableCell>
      {datesOfCurrentMonth.map((date) => (
        <TableCell
          key={date.toDateString()}
          className={clsx("border p-1", {
            "bg-gray-500": isWeekEnd(date),
            "cursor-pointer": !isWeekEnd(date),
            "bg-blue-500": Number(getWorkDayDuration(date)) > 0,
          })}
        >
          {!isWeekEnd(date) && (
            <Select
              onValueChange={(duration) =>
                handleSelectDuration(date, line.id, duration)
              }
              value={getWorkDayDuration(date)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Durée</SelectLabel>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="0.5">0.5</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
