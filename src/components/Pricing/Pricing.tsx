"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import styles from "./Pricing.module.scss";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Pricing() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const panelsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = panelsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <div id="pricing">
      <SectionLayout sectionName="pricing" />
      <PageSlot dividerTop dottedBg intersections={["topLeft", "topRight"]}>
        <div className={styles.panelWrapper}>
          <div ref={panelsRef} className={`${styles.panels} ${visible ? styles.fadeVisible : styles.fadeHidden}`}>
            {/* Left panel — glass sign-up card */}
            <div id="pricing-form" className={styles.leftPanel}>
              <h3 className={styles.formTitle}>
                Sign up for the
                <br />
                waiting list
              </h3>

              <form onSubmit={handleSubmit} className={styles.fields}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Name"
                  aria-label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "loading"}
                />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />

                <CtaButton
                  label={status === "loading" ? "Subscribing..." : "Subscribe"}
                  type="submit"
                  disabled={status === "loading"}
                />

                {status === "success" && (
                  <p className={styles.feedback} data-variant="success">
                    You&apos;re on the list! We&apos;ll be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.feedback} data-variant="error">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Right panel — mockup */}
            <div className={styles.rightPanel}>
              <img
                src="/mockup.png"
                alt="Fluxtract app mockup"
                className={styles.mockupImage}
              />
            </div>
          </div>
        </div>
      </PageSlot>
    </div>
  );
}
