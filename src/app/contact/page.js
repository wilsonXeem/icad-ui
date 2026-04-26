import PageHero from '@/components/shared/PageHero';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import ContactFormSection from '@/components/contact/ContactFormSection';

export const metadata = {
  title: 'Contact',
  description: 'Contact ICAD for research services, support, collaborations, and academy inquiries.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Reach ICAD for research, support, collaborations, and academy inquiries."
        description="The contact experience is designed to feel direct, credible, and ready for serious scientific conversations."
      />
      <ContactInfoSection />
      <ContactFormSection />
    </>
  );
}
