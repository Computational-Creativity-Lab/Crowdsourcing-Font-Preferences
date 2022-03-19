import styles from "../../pages/index.module.css";

export default function GlobalContainer(props) {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">{props.children}</div>
  );
}
