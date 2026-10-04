import ContactHeader from "./components/ContactHeader";
import ContactForm from "./components/ContactForm";
import ContactDirectCards from "./components/ContactDirectCards";
import ContactFaq from "./components/ContactFaq";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 flex flex-col gap-12 sm:gap-16"
    >
      <ContactHeader />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-12 w-full">
        <div className="w-full lg:w-7/12">
          <ContactForm />
        </div>
        <div className="w-full lg:w-5/12">
          <ContactDirectCards />
        </div>
      </div>
      <ContactFaq />
    </section>
  );
}
