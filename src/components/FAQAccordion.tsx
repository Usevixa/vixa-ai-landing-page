import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Does AI move money without consent?",
    answer: "No. VIXA AI never executes financial actions without your explicit confirmation. Every transaction requires your PIN, and you always see a preview before anything is finalized.",
  },
  {
    question: "Does it understand Pidgin?",
    answer: "Yes! VIXA AI is trained to understand Nigerian Pidgin, Swahili, and casual conversational language across multiple African contexts. You can chat naturally.",
  },
  {
    question: "Can AI make mistakes?",
    answer: "VIXA AI is designed with multiple verification layers. It always asks for confirmation before executing actions. If it's unsure about your intent, it will ask clarifying questions.",
  },
  {
    question: "Which countries are supported?",
    answer: "VIXA AI currently supports payments across Nigeria, Ghana, Kenya, South Africa, and expanding to more African countries. Check our supported countries list for the latest coverage.",
  },
  {
    question: "Do I need to know crypto?",
    answer: "Not at all. VIXA AI handles all the technical complexity behind the scenes. You just chat naturally about sending money, and we convert everything automatically.",
  },
  {
    question: "How is my privacy protected?",
    answer: "Your conversations are encrypted end-to-end. We never store sensitive financial data in chat logs. All AI processing happens in secure, compliance-certified environments.",
  },
  {
    question: "What if I send the wrong command?",
    answer: "VIXA AI always confirms before executing. If you made a mistake, simply reply 'cancel' or don't provide your PIN. You can also check transaction history and reverse eligible transactions.",
  },
  {
    question: "Can VIXA AI handle voice notes?",
    answer: "Yes! VIXA AI can process voice messages in multiple languages and accents. Just send a voice note like you would to a friend, and VIXA will understand and respond.",
  },
];

const FAQAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqData.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="glass-card border-none rounded-xl px-6"
        >
          <AccordionTrigger className="text-left font-heading text-base sm:text-lg hover:text-primary transition-colors py-5">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
