import { NextResponse } from "next/server";
import { clsx } from "clsx"
import { message } from "statuses"
import { twMerge } from "tailwind-merge"

export function cn (...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = ({ date, timeZone, options }) => {
  return new Intl.DateTimeFormat("es-ES", {
    ...options,
    timeZone
  }).format(date)
}

export const formatDateInfoEvent = ({startDateStr, endDateStr, location}) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const locale = "es-ES"
  
  const startMonth = startDate.toLocaleString(locale, { month: 'short' });
  const startDay = startDate.getDate();
  const endMonth = endDate.toLocaleString(locale, { month: 'short' });
  const endDay = endDate.getDate();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  let result = '';

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      result = `${startMonth} ${startDay}-${endDay} ${startYear} | ${location}`;
    } else {
      result = `${startMonth} ${startDay}-${endMonth} ${endDay} ${startYear} | ${location}`;
    }
  } else {
    result = `${startMonth} ${startDay} ${startYear}-${endMonth} ${endDay} ${endYear} | ${location}`;
  }

  return result;
};

export const response = ({ data, code=200, statusCode=200, message: msg }) => {
  return NextResponse.json({
    data,
    status: {
      code: statusCode,
      message: msg ?? message[(statusCode)],
      timestamp: new Date().toISOString()
    }
  }, { status: code ?? statusCode });
}