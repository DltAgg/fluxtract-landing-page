import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { FileText, Contact, ChevronRight } from "lucide-react";
import styles from "./Templates.module.scss";

const templateCards = [
  {
    icon: FileText,
    title: "Resumes",
    description:
      "Analyze curricula, extract valuable information, and organize data in a clear and structured way",
    orange: false,
  },
  {
    icon: Contact,
    title: "Get contact info",
    description:
      "Examine documents, extract essential contact details, and arrange the information in a clear and structured format.",
    orange: true,
  },
  {
    icon: FileText,
    title: "Real estate contracts",
    description:
      "Review real estate contracts, gather essential details, and arrange the information in a clear and systematic manner.",
    orange: false,
  },
  {
    icon: FileText,
    title: "Real estate contracts",
    description:
      "Review real estate contracts, gather essential details, and arrange the information in a clear and systematic manner.",
    orange: false,
  },
];

export function Templates() {
  return (
    <>
      <SectionLayout sectionName="templates" />
      <PageSlot dividerBottom noPadding>
        <div className={styles.cardRow}>
          {templateCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`${styles.card} ${card.orange ? styles.cardOrange : ""}`}
              >
                <Icon className={styles.icon} />
                <h3 className={styles.title}>{card.title}</h3>
                <p
                  className={`${styles.description} ${card.orange ? styles.descriptionWhite : ""}`}
                >
                  {card.description}
                </p>
                <a href="#" className={styles.link}>
                  Get template <ChevronRight size={20} />
                </a>
                <div className={styles.decorativeCircle} />
              </div>
            );
          })}
        </div>
      </PageSlot>
    </>
  );
}
