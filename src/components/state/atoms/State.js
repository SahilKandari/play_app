import { atom } from "recoil";

export const sideNavState = atom({
  key: "sideNavState",
  default: true
});

export const authState = atom({
  key: "isAuth",
  default: false
});

// export const userState = atom({
//   key: "user",
//   default: {}
// });

export const searchedVideos = atom({
  key: "searchedVideos",
  default: []
});