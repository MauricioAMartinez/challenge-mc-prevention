"use client";
import React, { useEffect, useState } from "react";
import styles from "./captchaComponent.module.css";

interface CaptchaComponentProps {
  isLoading: boolean;
  isReady: boolean;
  errorMessage?: string;
  messageCaptcha: string;
}

export default function CaptchaComponent({
  isLoading,
  isReady,
  errorMessage,
  messageCaptcha,
}: CaptchaComponentProps) {
  const [hasJS, setHasJS] = useState(false);

  useEffect(() => {
    setHasJS(true);
  }, []);


  if (!hasJS)
    return (
      <noscript>
        <div className={styles.captchaWrapper}>
          <label className={styles.captchaLabel}>
            <input
              type="checkbox"
              className={styles.captchaCheckbox}
              name="captchaConsent"
              required
            />
            Soy humano
          </label>
        </div>
      </noscript>
    );

  return (
    <section>
      {isLoading && (
        <div className={styles.captchaWrapper}>
          <p className={styles.captchaLoading}>Loading Captcha...</p>
        </div>
      )}

      {errorMessage && (
        <div className={styles.captchaWrapper}>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      )}
    </section>
  );
}
