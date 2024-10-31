import HeroSection from "@/components/UI/homepage/HeroSection";
import Specialist from "@/components/UI/homepage/specialist/Specialist";
import TopRatedDoctors from "@/components/UI/homepage/TopRatedDoctors/TopRatedDoctors";

const HomePage = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <Specialist></Specialist>
      <TopRatedDoctors />
    </>
  )
};

export default HomePage;
