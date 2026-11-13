"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import axios from "axios";
import Notification from "@/components/Notification/Notification";
import { createBookingRequest } from "@/lib/api";
import styles from "./RentalForm.module.css";

interface RentalFormProps {
  carId: string;
}

interface FormValues {
  name: string;
  email: string;
  comment: string;
}

interface FormErrors {
  name: string;
  email: string;
  comment: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  comment: "",
};

export default function RentalForm({ carId }: RentalFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = (name: keyof FormValues, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your full name.";
        if (
          value.trim().length < 2 ||
          !/[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]/.test(value)
        ) {
          return "Please enter your full name.";
        }
        return "";

      case "email":
        if (!value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter your email.";
        }
        return "";

      case "comment":
        if (!value.trim()) return "Comment is required";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;

    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    }

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors: FormErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      comment: validateField("comment", values.comment),
    };

    setErrors(validationErrors);
    setIsSubmitted(true);

    if (Object.values(validationErrors).some(Boolean)) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createBookingRequest(carId, {
        name: values.name.trim(),
        email: values.email.trim(),
        comment: values.comment.trim(),
      });

      setSuccessMessage("Your booking request has been sent successfully!");
      setValues(initialValues);
      setErrors({ name: "", email: "", comment: "" });
      setIsSubmitted(false);
    } catch (error) {
      console.error("Booking request error:", error);

      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      setErrorMessage(
        typeof message === "string"
          ? message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <div
          className={`${styles.inputWrapper} ${
            isSubmitted && errors.name ? styles.invalid : ""
          }`}
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder=" "
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(isSubmitted && errors.name)}
            aria-describedby={
              isSubmitted && errors.name ? "name-error" : undefined
            }
          />
          <label
            htmlFor="name"
            className={`${styles.floatingLabel} ${
              isSubmitted && errors.name ? styles.invalidLabel : ""
            }`}
          >
            Name*
          </label>
          {isSubmitted && errors.name && (
            <span className={styles.errorIcon} aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#EC3838" />
                <path
                  d="M12 7V13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
            </span>
          )}
        </div>

        {isSubmitted && errors.name && (
          <p id="name-error" className={styles.fieldError}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div
          className={`${styles.inputWrapper} ${
            isSubmitted && errors.email ? styles.invalid : ""
          }`}
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(isSubmitted && errors.email)}
            aria-describedby={
              isSubmitted && errors.email ? "email-error" : undefined
            }
          />
          <label
            htmlFor="email"
            className={`${styles.floatingLabel} ${
              isSubmitted && errors.email ? styles.invalidLabel : ""
            }`}
          >
            Email*
          </label>
          {isSubmitted && errors.email && (
            <span className={styles.errorIcon} aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#EC3838" />
                <path
                  d="M12 7V13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
            </span>
          )}
        </div>

        {isSubmitted && errors.email && (
          <p id="email-error" className={styles.fieldError}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div
          className={`${styles.textareaWrapper} ${
            isSubmitted && errors.comment ? styles.invalid : ""
          }`}
        >
          <textarea
            id="comment"
            name="comment"
            placeholder=" "
            rows={4}
            value={values.comment}
            onChange={handleChange}
            aria-invalid={Boolean(isSubmitted && errors.comment)}
            aria-describedby={
              isSubmitted && errors.comment ? "comment-error" : undefined
            }
          />
          <label
            htmlFor="comment"
            className={`${styles.floatingLabel} ${
              isSubmitted && errors.comment ? styles.invalidLabel : ""
            }`}
          >
            Comment
          </label>
          {isSubmitted && errors.comment && (
            <span className={styles.errorIconTextarea} aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#EC3838" />
                <path
                  d="M12 7V13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
            </span>
          )}
        </div>

        {isSubmitted && errors.comment && (
          <p id="comment-error" className={styles.fieldError}>
            {errors.comment}
          </p>
        )}
      </div>

      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}

      {errorMessage && <Notification message={errorMessage} type="error" />}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
