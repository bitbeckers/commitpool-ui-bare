import { DateTime } from "luxon"

const parseSecondTimestampToFullString = (timestamp: number): string => {
    return DateTime.fromSeconds(timestamp).toLocaleString({
        weekday: "long",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
}

export { parseSecondTimestampToFullString}