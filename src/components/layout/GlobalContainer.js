import styles from "../../pages/index.module.css";

export default function GlobalContainer(props) {
  return <div className="h-screen">{props.children}</div>;
}
