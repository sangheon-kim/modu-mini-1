import "./main";
import "./styles/todo.scss";
import dayjs from "dayjs";

const timelines = new Array(48).fill(0).map((_, i) => {
  return dayjs(new Date("2021-07-01T00:00:00"))
    .add(i * 30, "minute")
    .format("HH:mm");
});

console.log(timelines);
