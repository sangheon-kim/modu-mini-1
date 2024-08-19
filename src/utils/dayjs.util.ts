import dayjs, { Dayjs } from "dayjs";

type DayjsType = "year" | "month" | "week" | "day";
type LangType =
  | "ko"
  | "en"
  | "ja"
  | "zh"
  | "vi"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "ru";

/**
 * @description 요일 텍스트 맵
 * @type {Map<"ko" | "en" | "ja"
 *  | "zh" | "vi" | "fr" | "de" | "es" | "it" | "ru", string[]>}
 * @example DAY_TEXT_MAP.get("ko") // ["일", "월", "화", "수", "목", "금", "토"]
 * @author @sangheon-kim (ksj8367@gmail.com)
 */
const DAY_TEXT_MAP = new Map([
  ["ko", ["일", "월", "화", "수", "목", "금", "토"]],
  ["en", ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]],
  ["ja", ["日", "月", "火", "水", "木", "金", "土"]],
  ["zh", ["日", "一", "二", "三", "四", "五", "六"]],
  ["vi", ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]],
  ["fr", ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]],
  ["de", ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]],
  ["es", ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]],
  ["it", ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]],
  ["ru", ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]],
]);

/**
 *
 * @param {*} date  {string} - 날짜
 * @param {*} param1 {
 *  type {string} - "month" | "week" | "year" | "day",
 *  value {number} - 빼는 값
 * }
 * @summary 날짜를 뺀다.
 */
export const subtractCalendar = (
  date: string,
  { type = "month", value = 1 }: { type: DayjsType; value: number }
) => {
  return dayjs(date).subtract(value, type);
};

/**
 *  @param {*} date  {string} - 날짜
 * @param {*} param1 {
 * type {string} - "month" | "week" | "year" | "day",
 * value {number} - 더하는 값
 * }
 * @summary 날짜를 더한다.
 */
export const addCalendar = (
  date: string,
  { type = "month", value = 1 }: { type: DayjsType; value: number }
) => {
  return dayjs(date).add(value, type);
};

/**
 *
 * @param {*} date {string} - 날짜
 * @param {*} lang {string} - "ko" | "en" | "ja" | "zh" | "vi" | "fr" | "de" | "es" | "it" | "ru"
 * @returns {string} - 년월 텍스트
 * @example getYearAndMonthText("2024-08-07", "ko") // "2024년 08월"
 * @example getYearAndMonthText("2024-08-07", "en") // "Aug 2024"
 * @author @sangheon-kim (ksj8367@gmail.com)
 */
export const getYearAndMonthText = (date: string, lang = "ko") => {
  switch (lang) {
    case "ko":
      return dayjs(date).format(`YYYY년 MM월`);
    case "en":
      return dayjs(date).format(`MMM YYYY`);
    case "ja":
      return dayjs(date).format(`YYYY年 MM月`);
    case "zh":
      return dayjs(date).format(`YYYY年 MM月`);
    case "vi":
      return dayjs(date).format(`MM/YYYY`);
    case "fr":
      return dayjs(date).format(`MMM YYYY`);
    case "de":
      return dayjs(date).format(`MMM YYYY`);
    case "es":
      return dayjs(date).format(`MMM YYYY`);
    case "it":
      return dayjs(date).format(`MMM YYYY`);
    case "ru":
      return dayjs(date).format(`MMM YYYY`);
    default:
      return dayjs(date).format(`YYYY-MM`);
  }
};

/**
 * @description 달력의 컬럼을 채우는 함수
 * @param {*} columns {dayjs.Dayjs[]} - 달력의 컬럼
 * @param {*} start {dayjs.Dayjs} - 시작 날짜
 * @param {*} end {dayjs.Dayjs} - 끝 날짜
 * @return {dayjs.Dayjs[]} - 채워진 컬럼
 * @author @sangheon-kim (ksj8367@gmail.com)
 */
export const fillEmptyColumns = (
  columns: Dayjs[],
  start: Dayjs,
  end: Dayjs
) => {
  const filledColumns = columns.slice(0);

  const startDay = dayjs(start).get("day");
  /** 앞에 채우기 */
  for (let i = 1; i <= startDay; i++) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }

  const endDay = dayjs(end).get("day");

  for (let i = 1; i <= 6 - endDay; i++) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};

/**
 *
 * @description 달력의 컬럼을 생성하는 함수
 * @param {*} date {string} - 현재 날짜
 * @param {*} isFill {boolean} - 빈 날짜를 채울지 여부
 * @return {dayjs.Dayjs[]} - 달력의 컬럼
 * @author @sangheon-kim (ksj8367@gmail.com)
 */
export const getCalendarColumns = (date: string, isFill = false) => {
  const start = dayjs(date).startOf("month");
  const end = dayjs(date).endOf("month");

  const endDate = dayjs(end).get("date");

  const columns = [];

  /** 해당 달의 시작 일부터 끝일 까지 채워주기 */
  for (let i = 0; i < endDate; i++) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = isFill
    ? fillEmptyColumns(columns, start, end)
    : columns;

  return filledColumns;
};

/**
 * @description 한주의 컬럼을 생성하는 함수
 * @param {*} nowDate {string} - 현재 날짜
 * @param {*} isWeekDay {boolean} - 평일만 가져올지 여부
 * @param {*} startMon {boolean} - 월요일부터 시작할지 여부
 * @return {dayjs.Dayjs[]} - 한주의 컬럼
 * @author @sangheon-kim (ksj8367@gmail.com)
 *
 */
export const getWeekdayColumns = (
  date: string,
  isWeekDay = false,
  startMon = false
) => {
  const start = dayjs(date)
    .startOf("week")
    .add(isWeekDay || startMon ? 1 : 0, "day");

  const columns = [];

  const endNumber = isWeekDay ? 5 : 7;

  for (let i = 0; i < endNumber; i++) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  return columns;
};

/**
 * @description 요일 텍스트를 가져오는 함수
 * @param {*} day {number} - 요일
 * @param {*} lang {string} - "ko" | "en" | "ja" | "zh" | "vi" | "fr" | "de" | "es" | "it" | "ru"
 * @return {string} - 요일 텍스트
 * @author @sangheon-kim (ksj8367@gmail.com)
 */
export const getDayText = (day: number, lang: LangType = "ko") => {
  return DAY_TEXT_MAP.get(lang)?.[day];
};

/**
 * @description 요일 색상을 가져오는 함수
 * @param {*} day {number} - 요일
 * @return {string} - 요일 색상
 */
export const getDayColor = (day: number) => {
  return day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
};
