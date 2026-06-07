/**
 * Calculations for the countdown until July 12, 2026.
 */

export interface TimeRemaining {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeRemaining(targetDateStr: string = "2026-07-12T00:00:00+02:00"): TimeRemaining {
  // Target date at Wroclaw timezone (Poland)
  const targetDate = new Date(targetDateStr);
  const now = new Date();
  
  const diffMs = targetDate.getTime() - now.getTime();
  
  // Safe bounds check
  if (diffMs <= 0) {
    return {
      totalSeconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate calendar days in Europe/Warsaw timezone to be 100% accurate for Wroclaw
  let days = 0;
  try {
    const targetInWroclawStr = targetDate.toLocaleString("en-US", { timeZone: "Europe/Warsaw" });
    const nowInWroclawStr = now.toLocaleString("en-US", { timeZone: "Europe/Warsaw" });
    
    const targetW = new Date(targetInWroclawStr);
    const nowW = new Date(nowInWroclawStr);
    
    const d1 = new Date(nowW.getFullYear(), nowW.getMonth(), nowW.getDate());
    const d2 = new Date(targetW.getFullYear(), targetW.getMonth(), targetW.getDate());
    
    const diffDaysMs = d2.getTime() - d1.getTime();
    days = Math.round(diffDaysMs / (1000 * 60 * 60 * 24));
  } catch (e) {
    // Fallback if formatting fails
    days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    days: days > 0 ? days : 0,
    hours,
    minutes,
    seconds,
  };
}

/**
 * Returns a beautifully formatted readable countdown string.
 * It will display "X days, Y hours, Z minutes, and S seconds" 
 * or similar dynamic configurations.
 */
export function formatTimeRemaining(time: TimeRemaining): string {
  if (time.totalSeconds <= 0) {
    return "0 days";
  }

  const parts: string[] = [];
  
  // Custom display logic based on time left
  if (time.days > 0) {
    parts.push(`${time.days} ${time.days === 1 ? "day" : "days"}`);
  }
  
  // If there are hours, add them to make it sweet and exact!
  if (time.hours > 0 || time.days > 0) {
    parts.push(`${time.hours} ${time.hours === 1 ? "hour" : "hours"}`);
  }

  if (time.minutes > 0 || time.hours > 0 || time.days > 0) {
    parts.push(`${time.minutes} ${time.minutes === 1 ? "minute" : "minutes"}`);
  }

  parts.push(`${time.seconds} ${time.seconds === 1 ? "second" : "seconds"}`);

  // Create Oxford comma-separated string
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}
