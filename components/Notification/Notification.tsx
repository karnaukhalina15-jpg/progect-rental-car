import styles from "./Notification.module.css";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

export default function Notification({ message, type }: NotificationProps) {
  return (
    <div
      className={`${styles.notification} ${styles[type]}`}
      role={type === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
}
