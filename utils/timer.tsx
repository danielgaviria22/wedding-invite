import { TTimeLeft } from "@/types/invite.types";

export const calculateTimeLeft = (targetDate: Date): TTimeLeft => {
  const now = new Date();
  const difference = +targetDate - +now;

  let timeLeft: TTimeLeft = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    const nowCopy = new Date(now);
    let months = (targetDate.getFullYear() - nowCopy.getFullYear()) * 12;
    months -= nowCopy.getMonth();
    months += targetDate.getMonth();

    nowCopy.setMonth(nowCopy.getMonth() + months);
    if (nowCopy > targetDate) {
      months--;
      nowCopy.setMonth(nowCopy.getMonth() - 1);
    }

    const days = Math.floor(
      (difference - (nowCopy.getTime() - now.getTime())) / (1000 * 60 * 60 * 24)
    );

    timeLeft = {
      months,
      days,
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};
