import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import InvitationIntro from "@/components/InvitationIntro";
import Story from "@/components/Story";
import SaveTheDate from "@/components/SaveTheDate";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <InvitationIntro />
        <Story />
        <SaveTheDate />
        <Gallery />
        <Wishes />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
