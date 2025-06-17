import { Box } from "../ui/box";
import { Flex } from "../ui/flex";

export const Superchared = () => {
  return (
    <Box className="absolute top-212 max-sm:top-170 left-0 w-full h-96 bg-white z-[20]">
      <img
        src="/home/graydot.svg"
        alt="dot"
        className="size-20 absolute left-18 max-sm:hidden"
      />

      <Flex className="flex-col mt-10">
        <Box className="text-5xl max-sm:text-3xl font-extralight text-[#333333]">
          Your Workflow,
          <span className="text-[#F98618] font-semibold px-2 py-1 rounded-md">
            Supercharged
          </span>
        </Box>

        <Box className="font-light text-[#333333] text-[0.95rem]">
          Tailored modules for every department — pick what fits your workflow.
        </Box>
      </Flex>
    </Box>
  );
};
