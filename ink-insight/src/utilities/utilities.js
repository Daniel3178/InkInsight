export const SETTING_PAGES = [{ name: "Login", path: "/signIn" }];
export const ALL_PAGES = [
  { name: "Search Page", path: "/" },
  { name: "Lists Page", path: "/listPage" },
  { name: "About Us", path: "/aboutUs" },
  { name: "Login", path: "/signIn" },
];

export function whichPath(props) {
  if (props.location.state === "/") {
    const currentbook = props.bookDetialsCurrentBook;
    return currentbook;
  } else if (
    props.location.state === "/oneListPage" ||
    props.location.state === "/listPage"
  ) {
    const currentbook = props.listCurrentBook;
    return currentbook;
  }
}

export function verifyRatingCriteria(info) {
  let answer = true;
  if (!info.isLoggedIn) {
    alert("Please log in to rate and review!");
    answer = false;
  } else if (info.rating === "") {
    alert("please select at least one star to submit a review and rating!");
    answer = false;
  } else if (info.review === "") {
    alert("please write a review to submit rating and review!");
    answer = false;
  }
  return answer;
}

export function truncateSummary(summary, maxLength) {
  if (summary != null && summary != undefined && summary.length > maxLength) {
    return summary.substring(0, maxLength) + "...";
  } else if (summary != null && summary.length === 0) {
    return "No Summary Avaialble";
  } else {
    return summary;
  }
}
const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

export const getCurrentDateTime = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = addLeadingZero(currentDate.getMonth() + 1);
  const day = addLeadingZero(currentDate.getDate());
  const hours = addLeadingZero(currentDate.getHours());
  const minutes = addLeadingZero(currentDate.getMinutes());
  const seconds = addLeadingZero(currentDate.getSeconds());

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};
