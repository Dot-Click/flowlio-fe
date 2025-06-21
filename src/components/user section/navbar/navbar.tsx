import { Box } from "@/components/ui/box";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify, ArrowRight } from "lucide-react";
import { Flex } from "@/components/ui/flex";
import { Center } from "@/components/ui/center";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useRenderComponentStore } from "@/store/renderComponent";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isComponentActive , setIsComponentActive } = useRenderComponentStore();
  
  return (
    <Box className={cn("relative w-full", isComponentActive.includes('home') ? "bg-white" : "bg-black")}>
      <Box className="absolute -z-10 top-0 -left-12 w-100 h-100 bg-[#2B2BA0]/30 blur-3xl opacity-20 " />
      <Box className="absolute max-sm:hidden -z-10 top-30 right-8 w-60 h-90 bg-[#2B2BA0]/40 blur-3xl opacity-20 " />

      <header className="flex h-20 w-full shrink-0 items-center px-5 md:px-32 md:py-12">
        <Flex className="justify-between w-full">
          <Flex>
            {
              isComponentActive.includes('work-flow') ? (
            <img
              src="/logo/logowithtextwhitebg.svg"
              alt="Logo"
              onClick={() => setIsComponentActive(['home'])}
              className="h-56 w-38 cursor-pointer"
            />
            ) : (
              <img
                src="/logo/logowithtext.svg"
                alt="Logo"
                onClick={() => setIsComponentActive(['work-flow'])}
                className="h-56 w-38 cursor-pointer"
              />
            )}
            <a
              href="#"
              onClick={() => setIsComponentActive(['work-flow'])}
              className="group inline-flex h-9 w-max items-center justify-center rounded-md text-[#586689] bg-transparent px-4 py-2 text-[16px] font-medium transition-colors hover:bg-gray-100 hover:text-[#F98618] focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-none data-[state=open]:bg-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-none max-lg:hidden"
            >
              Work Flow
            </a>
            <a
              href="#"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md text-[#586689] text-[16px] bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-[#F98618] focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 max-lg:hidden"
            >
              Insights
            </a>
          </Flex>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <AlignJustify className="h-16 w-16" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <a href="#" className="mr-6 hidden lg:flex">
                <img
                  src="/logo/logowithtext.svg"
                  alt="Logo"
                  className="h-12 w-34"
                />
              </a>
              <div className="grid gap-2 py-6">
                <a
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  About
                </a>
                <a
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Contact
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </Flex>

        <Center className="ml-auto hidden lg:flex gap-3">
          <a
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-[#586689] text-[16px]  text-sm font-medium transition-colors hover:bg-gray-100 hover:text-[#F98618] focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            Pricing
          </a>
          <Box
            onClick={() => navigate("/login")}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-[#586689] text-[16px]  text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 cursor-pointer hover:text-[#F98618]"
          >
            Login
          </Box>

          <Button
            onClick={() => navigate("/login")}
            className="p-2 h-11 w-34 rounded-3xl bg-[#1797B9] cursor-pointer hover:bg-[#1797B9]/80"
          >
            Get Started
            <ArrowRight />
          </Button>
        </Center>
      </header>
    </Box>
  );
};
