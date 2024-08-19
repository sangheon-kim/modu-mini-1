// 해당 파일은 건들지 말아주세요.
function BottomTabInit() {
  const $bottomTab = document.getElementById("bottom-tab");

  const path = window.location.pathname;

  const $tab = $bottomTab?.querySelectorAll(".TabItem");

  $tab?.forEach((elem) => {
    const href = elem.getAttribute("href");
    elem.classList.toggle("active", path === href);
  });
}

BottomTabInit();
