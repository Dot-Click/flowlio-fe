import { ComponentWrapper } from "@/components/common/componentwrapper";
import { EmblaCarousel } from "@/components/ui/emblacarousel";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useSidebar } from "@/components/ui/sidebar";
import { type BoxProps } from "@/components/ui/box";
import { OngoingTaskCard } from "./ongoingtaskcard";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { useMediaQuery } from "usehooks-ts";
import { ListChecks } from "lucide-react";
import { useMemo, type FC } from "react";
import { cn } from "@/lib/utils";

export const OngoingTasks: FC<BoxProps> = ({ className, ...props }) => {
  const is1154 = useMediaQuery("(max-width: 1154px)");
  const is950 = useMediaQuery("(max-width: 950px)");
  const { state, isMobile } = useSidebar();

  const carouselMaxWidth = useMemo(() => {
    const sidebarWidth = state === "collapsed" ? 82 : 256;

    if (isMobile) return "100vw";
    if (is950) return `calc(90vw - ${sidebarWidth}px)`;
    if (is1154) return `calc(58vw - ${sidebarWidth}px)`;

    return `calc(65vw - ${sidebarWidth}px)`;
  }, [isMobile, is950, is1154, state]);

  return (
    <ComponentWrapper className={cn("p-5 rounded-lg", className)} {...props}>
      <Stack className="gap-5 items-center">
        <Flex className="justify-start mr-auto">
          <ListChecks />
          <h1 className="text-lg font-medium">Ongoing Tasks</h1>
        </Flex>

        <img
          src="/general/curved-border 1.svg"
          className="mt-2 opacity-80"
          alt="curved border"
        />

        <EmblaCarousel
          withOutDots
          style={{ maxWidth: carouselMaxWidth }}
          carouselClassName="relative max-w-[45vw]"
          options={{ align: "start", dragFree: true }}
          slides={Array.from({ length: 4 }).map(() => (
            <OngoingTaskCard
              taskName="Site Foundation WorkSite Foundation Work"
              className="md:basis-1/1 lg:basis-1/1 min-w-[17.5rem]"
              createdAt="Jan,02 2002"
              createdBy="mike wangi"
              assignees={Array.from({ length: 3 }).map(() => ({
                src: "https://github.com/shadcn.png",
                userName: "jhon doe",
              }))}
            />
          ))}
        >
          {(emblaApi) => (
            <>
              <Button
                className="rounded-full shadow-lg absolute bg-white top-0 left-0 inset-y-0 m-auto -translate-x-5"
                onClick={() => emblaApi.scrollPrev()}
                variant="ghost"
                size="icon"
              >
                <FaCaretLeft />
              </Button>
              <Button
                className="rounded-full shadow-lg absolute bg-white top-0 right-0 inset-y-0 m-auto translate-x-5"
                onClick={() => emblaApi.scrollNext()}
                variant="ghost"
                size="icon"
              >
                <FaCaretRight />
              </Button>
            </>
          )}
        </EmblaCarousel>
      </Stack>
    </ComponentWrapper>
  );
};
