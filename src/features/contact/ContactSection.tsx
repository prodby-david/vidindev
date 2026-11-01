import ContactHeader from "./components/form/ContactHeader";
import ContactForm from "./components/form/ContactForm";
import ContactDirectCards from "./components/direct/ContactDirectCards";
import ContactFaq from "./components/faq/ContactFaq";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 flex flex-col gap-12 sm:gap-16"
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
