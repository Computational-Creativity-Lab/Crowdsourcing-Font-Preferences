import styles from "../pages/index.module.css";

export default function BackgroundGradient({ keyword }) {
  let bgColor = "green";
  if (keyword == "Caring") {
    bgColor = "blue";
  } else if (keyword == "Casual") {
    bgColor = "purple";
  } else {
    bgColor = "red";
  }
  return (
    <div
      className={styles.backgroundGradient}
      style={{backgroundColor: bgColor}}
    >
    </div>
  );
}
