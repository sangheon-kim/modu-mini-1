import injectHTML from "vite-plugin-html-inject";
import path from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        // 추가하고 싶은 페이지는 pages에서 추가하면 됨
        main: path.resolve(__dirname, "index.html"), // 홈
        task: path.resolve(__dirname, "pages/task.html"), // 할 일
        addTask: path.resolve(__dirname, "pages/add-task.html"), // 할 일 추가
        movies: path.resolve(__dirname, "pages/movies.html"), // 영화
        timer: path.resolve(__dirname, "pages/timer.html"), // 타이머
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    injectHTML(),
    // handlebars({
    //   partialDirectory: path.resolve(__dirname, "partials"),
    // }),
  ],
};
