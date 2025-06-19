import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";

export const GetSmart = () => {
  const smartDetails = [
    {
      title: "Productivity",
      description: "5 Ways Dotiziion Can Simplify Your Daily Workflow",
      img: "/home/smart1.png",
    },
    {
      title: "Team Collaboration",
      description: "How Smart Workspaces Boost Communication & Output",
      img: "/home/smart2.png",
    },
    {
      title: "Automation",
      description: "Using Dotiziion AI to Automate Time-Consuming Tasks",
      img: "/home/smart3.png",
    },
  ];

  return (
    <Center className="relative p-8 sm:p-8">
      <img
        src="/home/graydot.svg"
        alt=""
        className="z-40 size-18 absolute -top-6 left-42 max-md:left-0"
      />
      <Box
        className="bg-[url(/home/manageblock1.png)] bg-cover bg-center bg-no-repeat absolute inset-0 top-20 z-0"
        aria-hidden="true"
      />

      <Stack className="relative z-10 max-w-5xl max-lg:w-full mt-6 mb-2">
        <Flex className="items-start justify-start text-start flex-col gap-6 ml-6">
          <h1 className="text-3xl sm:text-5xl font-[100] w-sm max-lg:w-full max-sm:text-center">
            Get Smarter, With{" "}
            <span className="text-[#F98618] font-semibold">
              Dotiziion Insights
            </span>
          </h1>
          <p className="text-base sm:text-lg text-black font-light leading-6  w-2xl max-md:w-full">
            Explore tips, trends, and expert advice on boosting team
            productivity, automating workflows, and building smarter
            organizations.
          </p>
        </Flex>

        <Flex className="max-w-5xl mx-auto max-md:w-full max-lg:flex-col gap-6 sm:gap-8 lg:gap-10 justify-center items-center px-4 sm:px-6 mt-6">
          {smartDetails.map((item, index) => (
            <Flex
              key={index}
              className="w-full sm:w-80 max-w-md flex-col items-start justify-center gap-4 text-center sm:text-left"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover p-1 border border-gray-300"
                loading="lazy"
              />
              <h2 className="text-xl text-[#1797B9] font-medium">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base leading-5 font-light">
                {item.description}
              </p>
            </Flex>
          ))}
        </Flex>
      </Stack>
    </Center>
  );
};
