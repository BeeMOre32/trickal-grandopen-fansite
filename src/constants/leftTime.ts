import dayjs from "dayjs";

export const getLeftTimeTo202309271200 = () => {
  const now = dayjs();

  const targetTime = dayjs("2023-09-27T12:00:00");

  // 남은 시간을 계산합니다.
  const diff = targetTime.diff(now);
  let remainingSeconds = diff / 1000;

  const diffDays = Math.floor(remainingSeconds / (24 * 60 * 60));
  remainingSeconds -= diffDays * 24 * 60 * 60;

  const diffHours = Math.floor(remainingSeconds / (60 * 60));
  remainingSeconds -= diffHours * 60 * 60;

  const diffMinutes = Math.floor(remainingSeconds / 60);
  remainingSeconds -= diffMinutes * 60;

  const diffSeconds = Math.floor(remainingSeconds);

  return {
    diffSeconds,
    diffMinutes,
    diffHours,
    diffDays,
  };
};
