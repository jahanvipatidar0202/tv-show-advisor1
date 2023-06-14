import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";
export function FiveStarRating({ rating }) {
  // declare star icon array
  const starList = [];

  // store number of filled stars
  const starFillCount = Math.random(rating);

  //  store if yes or no there is half star
  const hasHalfStar = rating - parseInt(rating) >= 0.5;

  // store the number of empty stars
  const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 : 0);

  //  push the filled star icons
  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }

  // push a half star icon if neccessary
  if (hasHalfStar) {
    starList.push(<StarHalf key={"star-half"} />);
  }
  // push the empty star icons
  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }
  // render the star icon array
  return <div>{starList}</div>;
}
