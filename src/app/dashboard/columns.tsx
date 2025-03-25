"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export interface Coupon {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  employee: string;
  description: string;
  oldSystem: boolean;
  firstValue: number | null;
  usedValue: number | null;
  restValue: number;
  used: boolean;
  location: string | null;
  extraPayment: number | null;
  oldId: string | null;
  tip: number | null;
  couponType: string;
}

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "id",
    header: "Nummer",
  },
  {
    accessorKey: "firstValue",
    header: "Erster Betrag",
    cell: (row) => {
      const couponType = row.row.original.couponType;
      const value = row.getValue() as number;
      return couponType === "klein"
        ? "klein Becher "
        : value
        ? formatCurrency(value)
        : "-";
    },
  },
  {
    accessorKey: "usedValue",
    header: "Eingelöst",
    cell: (row) => {
      const couponType = row.row.original.couponType;
      const value = row.getValue() as number;
      return couponType === "value"
        ? formatCurrency(value)
        : row.row.original.used === true
        ? "klein Becher"
        : "-";
    },
  },
  {
    accessorKey: "restValue",
    header: "Aktuell",
    cell: (row) => {
      const couponType = row.row.original.couponType;
      console.log("row", row.row.original);
      const value = row.getValue() as number;
      console.log("value", value);
      return couponType === "value"
        ? formatCurrency(value)
        : row.row.original.used === false
        ? "klein Becher"
        : "-";
    },
  },
  {
    accessorKey: "employee",
    header: "Mitarbeiter",
  },
  {
    accessorKey: "updatedAt",
    header: "Datum",
    cell: (row) => {
      const dateValue = row.getValue() as string;
      const FirstOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const SecondOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = new Intl.DateTimeFormat(
        "de-DE",
        FirstOptions
      ).format(new Date(dateValue));
      const formattedTime = new Intl.DateTimeFormat(
        "de-DE",
        SecondOptions
      ).format(new Date(dateValue));

      return `${formattedDate},  ${formattedTime}`; // Format the date as needed
    },
  },
];
