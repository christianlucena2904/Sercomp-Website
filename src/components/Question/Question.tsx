import { useState } from "react";
import styles from "./Question.module.css";

interface QuestionProps {
  question: string;
  answer: React.ReactNode; 
}

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleQuestion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <article
      className={`${styles.faq} ${isOpen ? styles.open : ""}`}
      onClick={toggleQuestion}
    >
      <div className={styles["faq-icon"]}>
        <i className={`uil ${isOpen ? "uil-minus" : "uil-plus"}`}></i>
      </div>
      <div className={styles["question-answer"]}>
        <h4>{question}</h4>
        {isOpen && <p>{answer}</p>}
      </div>
    </article>
  );
};

export default Question;