import { Box } from "@/components/ui/box";
import { Hero } from "@/components/user section/hero";
import { Navbar } from "@/components/user section/navbar/navbar";
import { Superchared } from "@/components/user section/superchared";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box className="relative w-full h-full">
        <Hero />
        <Superchared />
      </Box>
    </>
  );
};

export default HomePage;
