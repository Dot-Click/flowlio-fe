import { cn } from "@/lib/utils";
import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Flex } from "../ui/flex";

export const TeamMember = () => {
  const teamMembers = [
    {
      name: "Jessy Pinkman",
      image: "/home/team1.svg",
    },
    {
      name: "Dotizion Lead",
      image: "/home/team2.svg",
    },
    {
      name: "Will Betehiem",
      image: "/home/team3.svg",
    },
  ];

  return (
    <Center className="flex-col w-full h-full px-4 py-14 bg-black relative overflow-hidden z-30">
      <Box className="bg-[url(/home/grid.png)] bg-contain bg-center bg-no-repeat z-10 w-full h-[40rem] absolute top-10 max-sm:top-0 left-0"></Box>

      <Center className="p-2 flex-col gap-2 text-5xl font-[100] max-sm:text-2xl text-white text-center  ">
        <h1>
          A Team That
          <span className="text-[#F98618] font-semibold "> Works </span>
          With You,
        </h1>
        <h1>Not Just For You</h1>
      </Center>

      <Box className="bg-[#4E43C3] w-5xl h-[26rem] max-lg:w-full max-md:h-full p-4 relative mt-34 max-sm:mt-10 z-20 rounded-2xl">
        <Center className="bg-[#6255FA] flex-col w-full h-full p-4 rounded-2xl relative">
          <Center className="relative -mt-40 max-sm:-mt-0 w-[40rem] h-full gap-4 max-sm:flex-col-reverse">
            {teamMembers.map((member, index) => (
              <Flex
                key={member.name}
                className={`flex-col text-center bg-white p-3 rounded-lg ${
                  index === 1 &&
                  "-mt-14 max-sm:-mt-0 shadow-2xl shadow-black/40 "
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={cn(`size-40`, index === 1 && "size-55")}
                />
                <h1 className="my-2">{member.name}</h1>
              </Flex>
            ))}
          </Center>

          <Center className="gap-2 flex-col text-center w-full max-sm:mt-10">
            <Flex>
              <h1 className="text-white font-semibold text-2xl">
                Meet the Minds Behind Dotiziion
              </h1>
              <img
                src="/home/stardot.svg"
                alt="star"
                className="size-5 fill-white"
              />
            </Flex>

            <h1 className="text-white text-lg font-extralight w-4xl max-lg:w-full">
              Our leadership team brings together years of experience in product
              innovation, teamwork, and execution—committed to helping your
              business run smarter.
            </h1>
          </Center>
        </Center>
      </Box>
    </Center>
  );
};
