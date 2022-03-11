import styles from "../../pages/index.module.css";

export default function GlobalContainer(props) {
  return <div className={styles.globalContainer}>{props.children}</div>;
}
