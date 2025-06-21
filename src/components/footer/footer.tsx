import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Flex } from "../ui/flex";
import Logo from "/logo/5000x5000-3.svg";
import { FiGlobe } from "react-icons/fi";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

export const Footer = () => {
  return (
    <Box  className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <Flex className="container mx-auto max-w-5xl justify-between items-start flex-wrap gap-8">

        {/* Column 1: Logo, text, and language */}
        <Center className="w-full md:w-1/4 max-sm:items-center items-start flex-col">
          <img src={Logo} alt="Dotvizion" className="h-18 w-auto mb-4" />
          <p className="text-gray-400 mb-6 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum.
          </p>
          <Flex className="items-center text-gray-400 cursor-pointer hover:text-white transition-colors duration-300">
            <FiGlobe className="mr-2" />
            <span>English</span>
          </Flex>
            </Center>

        {/* Column 2: Quick Links */}
        <Center className="w-full sm:w-1/2 md:w-auto max-sm:items-center flex-col">
          <h3 className="font-semibold text-cyan-400 mb-4">Quick Links</h3>
          <Flex className="flex-col space-y-2">
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">How It Works</FooterLink>
            <FooterLink href="#">Use Cases</FooterLink>
            <FooterLink href="#">Integrations</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
          </Flex>
        </Center>

        {/* Column 3: Support */}
        <Center className="w-full sm:w-1/2 md:w-auto max-sm:items-center flex-col">
          <h3 className="font-semibold text-cyan-400 mb-4">Support</h3>
          <Flex className="flex-col space-y-2">
            <FooterLink href="#">HelpCenter</FooterLink>
            <FooterLink href="#">Community</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </Flex>
        </Center>

        {/* Column 4: Stay in Touch */}
        <Center className="w-full sm:w-1/2 md:w-auto items-start flex-col max-sm:items-center">
          <h3 className="font-semibold text-cyan-400 mb-4">Stay in Touch</h3>
          <Flex className="flex-col space-y-2 text-gray-400 items-start max-sm:items-center">
            <span>(000) 555-0123</span>
            <span>support@tasker.com</span>
            <span>3891 Ranchview, California 62693</span>
          </Flex>
        </Center>

      </Flex>
    </Box>
  );
};
