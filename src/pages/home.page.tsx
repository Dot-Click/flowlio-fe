import { Footer } from "@/components/footer/footer";
import { Box } from "@/components/ui/box";
import { GetSmart } from "@/components/user section/getsmart";
import { Hero } from "@/components/user section/hero";
import { ManageSmarter } from "@/components/user section/managesmarter";
import { ManageTask } from "@/components/user section/managetask";
import { Navbar } from "@/components/user section/navbar/navbar";
import { SubscribeTo } from "@/components/user section/subscribeto";
import { Superchared } from "@/components/user section/superchared";
import { TeamMember2 } from "@/components/user section/teammember2";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center min-h-screen bg-white">
        <Box className="animate-pulse">
          <img
            src="/logo/logowithtext.svg"
            alt="Loading..."
            className="h-20 w-auto"
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box className="relative w-full h-full">
        <Hero />
        <Superchared isWorkFlow={false} />
      </Box>
      {/* <TeamMember /> */}
      <TeamMember2 />
      <ManageTask />
      <ManageSmarter />
      <GetSmart />
      <SubscribeTo />
      <Footer />
    </>
  );
};

export default HomePage;
