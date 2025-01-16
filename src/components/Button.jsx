import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
  return (
    // a template literal is needed if we want to add more than one class in className below. Note the syntax "styles[type]"
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
