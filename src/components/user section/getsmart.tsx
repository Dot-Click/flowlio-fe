import { Box } from "../ui/box";
import { Center } from "../ui/center";

export const GetSmart = () => {
  return (
    <Box className="relative">
      <Box className="bg-[url(/home/manageblock1.png)] bg-cover bg-center bg-no-repeat z-10 w-full h-full absolute top-0 left-0" />

      <Center className="items-start max-sm:items-center gap-6 w-xl max-sm:w-full p-2 flex-col text-5xl font-[100] max-sm:text-2xl text-white  ">
        <h1 className="max-sm:text-center text-black">
          Get Smarter, With
          <span className="text-[#F98618] font-semibold p-0">
            Dotiziion Insights
          </span>
        </h1>
        <p className="text-black font-extralight text-[16px] w-md leading-5">
          Explore tips, trends, and expert advice on boosting team productivity,
          automating workflows, and building smarter organizations.
        </p>
      </Center>
    </Box>
  );
};
