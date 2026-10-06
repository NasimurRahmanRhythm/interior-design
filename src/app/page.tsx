import Hero from "@/components/sections/Hero";
import Spaces from "@/components/sections/Spaces";
import MapSection from "@/components/sections/MapSection";
import Objects from "@/components/sections/Objects";
import RoomStudy from "@/components/sections/RoomStudy";
import Connection from "@/components/sections/Connection";
import Updates from "@/components/sections/Updates";
import People from "@/components/sections/People";
import Admission from "@/components/sections/Admission";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Spaces />
      <MapSection />
      <Objects />
      <RoomStudy />
      <Connection />
      <Updates />
      <People />
      <Admission />
    </>
  );
}
