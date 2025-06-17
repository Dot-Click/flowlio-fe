import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import { UserManagementHeaderProps } from "./usermanagementheader";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { FC, useCallback } from "react";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import "./phonenumberstyle.css";
import { Box } from "../ui/box";
import { z } from "zod";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Must be Email Address.",
  }),
  phonenumber: z.string().refine((val) => !Number.isNaN(parseInt(val, 8)), {
    message: "Must be proper phone number",
  }),
});

const AddProjectMemberForm: FC<UserManagementHeaderProps> = ({
  goToStep,
  previous,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    goToStep("member role");
  }
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  const { getInputProps, open } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-300 p-6 gap-6 grid grid-cols-1">
            <Box className="grid grid-cols-1">
              <p className="text-md mb-2 font-semibold">
                Upload Profile Picture
              </p>
              <Center
                className="flex-col border-dashed border-2 border-black/30 bg-gray-100/50 rounded-lg min-h-40 w-44 max-md:w-full cursor-pointer"
                onClick={open}
              >
                <Camera className="size-12" />
                <p className="">Image must be</p>
                <p>500px by 500px</p>
              </Center>
              <input {...getInputProps()} />
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name
                      <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        size="lg"
                        type="text"
                        placeholder="Enter First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name
                      <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter Last Name"
                        type="text"
                        size="lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address{" "}
                      <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter Email Address"
                        type="email"
                        size="lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        specialLabel="Phone Number"
                        country={"us"}
                        placeholder="Phone Number"
                        enableSearch={true}
                        inputClass="mt-2 w-full h-12 bg-white border border-gray-300 rounded-xl px-4 text-black focus:ring-0 focus:outline-none"
                        buttonClass="border-r h-12 border-gray-300 bg-transparent"
                        dropdownClass="bg-white border border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>
          </Box>

          <Flex className="gap-4 justify-end mt-4">
            <Button
              onClick={previous}
              className="w-24 h-10 bg-white text-black border border-black cursor-pointer hover:bg-white hover:text-black  "
            >
              <ArrowLeft />
            </Button>
            <Button className="w-36 h-10 cursor-pointer" type="submit">
              Next
              <ArrowRight />
            </Button>
          </Flex>
        </form>
      </Form>
    </>
  );
};

export { AddProjectMemberForm };
