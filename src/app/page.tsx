import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import SaveTheDate from "@/components/SaveTheDate";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <SaveTheDate />
        <EventDetails />
        <Gallery />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
