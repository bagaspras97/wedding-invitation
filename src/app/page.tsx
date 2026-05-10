import Nav from "@/components/Nav";
import InvitationCover from "@/components/InvitationCover";
import Hero from "@/components/Hero";
import InvitationIntro from "@/components/InvitationIntro";
import Story from "@/components/Story";
import SaveTheDate from "@/components/SaveTheDate";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import Rsvp from "@/components/Rsvp";
import CelebrationVision from "@/components/CelebrationVision";
import LoveGift from "@/components/LoveGift";
import Footer from "@/components/Footer";
import MusicDock from "@/components/MusicDock";

export default function Page() {
  return (
    <>
      <InvitationCover />
      <Nav />
      <MusicDock />
      <main>
        <Hero />
        <InvitationIntro />
        <Story />
        <SaveTheDate />
        {/* <Gallery /> */}
        <Wishes />
        <Rsvp />
        <LoveGift />
        <CelebrationVision />
      </main>
      <Footer />
    </>
  );
}
