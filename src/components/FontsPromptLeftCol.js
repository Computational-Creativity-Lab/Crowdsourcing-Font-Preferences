import styles from "../pages/index.module.css";

export default function FontsPromptLeftCol(props) {
  return (
    <div className={styles.leftCol}>
      <div className={styles.topLeft}>
        <h2 className={styles.question}> Choose a font that feels</h2>
        <h1 className={styles.adjective}>{props.keyword}</h1>
      </div>
      <h3 className={styles.bottomLeft}>Q{props.qCount}/10</h3>
    </div>
  );
}
