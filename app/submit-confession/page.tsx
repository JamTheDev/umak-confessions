"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NextPage } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Loader2, BookOpen, CheckCircle2 } from "lucide-react";
import { GuidelinesDialog } from "@/components/GuidelinesDialog";
import Link from "next/link";

// --- Validation Schema ---
const ConfessionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  body: z.string().min(10, "Confession must be at least 10 characters"),
  isStudent: z.boolean(),
  course: z.string().optional(),
  college: z.string().optional(),
  yearLevel: z.string().optional(),
  isGraduate: z.boolean(),
  batchYear: z.string().optional(),
  senderName: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

type ConfessionFormValues = z.infer<typeof ConfessionSchema>;

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const childVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// --- Part One Component ---
const SubmitPageFormPartOne = ({
  form,
  onNext,
}: {
  form: any;
  onNext: () => void;
}) => {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = form;

  const handleNext = async () => {
    const isValid = await trigger(["title", "category", "body"]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4 h-full"
    >
      <div className="w-full flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <Input
            {...register("title")}
            placeholder="An interesting confession title..."
            className={cn(
              "outline-none text-black bg-white/90 border-2 border-white focus:border-white/50 rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:ring-2 focus:ring-[#3c8aff] focus:scale-[1.01]",
              errors.title && "border-red-500 ring-2 ring-red-500"
            )}
          />
          {errors.title && (
            <span className="text-red-300 text-xs px-4">
              {errors.title.message}
            </span>
          )}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="relative overflow-hidden bg-white border-2 border-white rounded-full px-6 h-12 shadow-xl w-24 font-bold grid place-items-center hover:bg-white group hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <div className="absolute bg-white w-full h-full group-hover:bg-[#3c8aff] duration-100 transition-colors"></div>
                <div className="absolute bg-gradient-to-r from-[#F27171] to-white group-hover:to-[#3c8aff] w-[160px] h-[200px] -translate-x-full group-hover:rotate-45 rounded-full group-hover:translate-x-0 transition-transform duration-700 "></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                  className="text-black group-hover:text-white duration-500 absolute"
                >
                  <path
                    fill="currentColor"
                    d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-6 py-2 my-2 bg-white rounded-lg text-black z-50 shadow-lg">
              <p className="text-sm">Enhance title using AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <motion.div
        variants={childVariants}
        className="w-full flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex-1 w-full flex flex-col gap-1">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn(
                    "outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:ring-2 focus:ring-[#3c8aff] focus:scale-[1.01]",
                    errors.category && "border-red-500 ring-2 ring-red-500"
                  )}
                >
                  <SelectValue placeholder="#UMakConfessions - Pick a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="lovelife">Love Life</SelectItem>
                    <SelectItem value="academics">Academics</SelectItem>
                    <SelectItem value="campus_life">Campus Life</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="shoutout">Shoutout</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <span className="text-red-300 text-xs px-4">
              {errors.category.message}
            </span>
          )}
        </div>

        <span className="text-white font-bold hidden md:block">or</span>

        <Button
          type="button"
          className="relative rounded-full overflow-hidden px-6 h-12 w-full md:w-48 shadow-xl font-bold grid place-items-center text-black border-2 border-white hover:bg-white group hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <div className="absolute bg-white w-full h-full group-hover:bg-[#3c8aff] duration-100 transition-colors"></div>
          <div className="absolute bg-gradient-to-r from-[#F27171] to-white group-hover:to-[#3c8aff] w-[160px] h-[200px] -translate-x-full group-hover:rotate-45 rounded-full group-hover:translate-x-0 transition-transform duration-700 "></div>
          <p className="absolute text-black group-hover:text-white duration-500 transition-colors">
            Let AI Decide
          </p>
        </Button>
      </motion.div>

      <motion.div variants={childVariants} className="h-full w-full flex flex-col">
        <Textarea
          {...register("body")}
          placeholder="This is an interesting body..."
          className={cn(
            "flex-1 min-h-[300px] bg-white/90 rounded-t-lg rounded-b-none px-6 py-6 resize-none transition-all focus:ring-2 focus:ring-[#3c8aff] border-2 border-white focus:scale-[1.01]",
            errors.body && "border-red-500 ring-2 ring-red-500"
          )}
        />
        <div className="flex flex-row-reverse items-center px-6 h-16 rounded-t-none rounded-b-lg bg-gradient-to-r from-[#c83a68] to-[#004fc5] gap-3">
          <div className="h-fit">
            <Button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-white border-2 border-white px-10 h-[20%] group hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <p className="text-black group-hover:text-[#c83a68] text-sm font-bold">
                Next
              </p>
            </Button>
          </div>

          <div className="h-fit">
            <Button
              type="button"
              onClick={() => form.reset()}
              className="rounded-full bg-transparent border-2 border-white px-10 h-[20%] group hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <p className="text-white text-sm font-bold">Clear</p>
            </Button>
          </div>
        </div>
        {errors.body && (
          <span className="text-red-300 text-xs px-4 mt-2">
            {errors.body.message}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

// --- Part Two Component ---
const SubmitPageFormPartTwo = ({
  form,
  onBack,
  onSubmit,
  isSubmitting,
  hasReadGuidelines,
  onGuidelinesRead,
}: {
  form: any;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  hasReadGuidelines: boolean;
  onGuidelinesRead: () => void;
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const isStudent = watch("isStudent");
  const isGraduate = watch("isGraduate");
  const [guidelinesDialogOpen, setGuidelinesDialogOpen] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <motion.div variants={childVariants} className="flex flex-row space-x-2">
          <Controller
            control={control}
            name="isStudent"
            render={({ field }) => (
              <Checkbox
                id="is-student"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
            )}
          />
          <label
            htmlFor="is-student"
            className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
          >
            I am a student at the University of Makati
          </label>
        </motion.div>

        <AnimatePresence>
          {isStudent && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-6 overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-2">
                <Input
                  {...register("course")}
                  placeholder="Course / Elective"
                  className="outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:scale-[1.01]"
                />

                <Input
                  {...register("college")}
                  placeholder="College"
                  className="outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:scale-[1.01]"
                />

                {!isGraduate && (
                  <Controller
                    control={control}
                    name="yearLevel"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:scale-[1.01]">
                          <SelectValue placeholder="Year Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select your year level</SelectLabel>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                            <SelectItem value="5">5th Year</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}

                <div className="flex flex-row space-x-2 py-2">
                  <Controller
                    control={control}
                    name="isGraduate"
                    render={({ field }) => (
                      <Checkbox
                        id="is-umak-graduate"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                      />
                    )}
                  />
                  <label
                    htmlFor="is-umak-graduate"
                    className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                  >
                    I am a Graduate of the University of Makati
                  </label>
                </div>

                {isGraduate && (
                  <Input
                    {...register("batchYear")}
                    placeholder="Batch / Year of Graduation"
                    className="outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:scale-[1.01]"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={childVariants} className="flex flex-col gap-2">
          <h5 className="text-lg text-white font-metropolis font-bold">
            Anonymous Sender Name <span className="text-xs font-normal opacity-70">(Optional)</span>
          </h5>
          <Input
            {...register("senderName")}
            placeholder="Hidden Fellow"
            className="outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:scale-[1.01]"
          />
        </motion.div>

        <motion.div variants={childVariants} className="flex flex-col gap-2">
          <h5 className="text-lg text-white font-metropolis font-bold">
            Valid Email Address <span className="text-xs font-normal opacity-70">(Optional)</span>
          </h5>
          <Input
            {...register("email")}
            placeholder="john.doe@example.com"
            className="outline-none text-black bg-white/90 border-2 border-white rounded-full px-6 h-12 shadow-xl font-bold transition-all focus:scale-[1.01]"
            type="email"
          />
          {errors.email && (
            <span className="text-red-300 text-xs px-4">
              {errors.email.message}
            </span>
          )}
        </motion.div>

        <motion.div variants={childVariants} className="flex flex-col gap-4">
          {/* Guidelines Section */}
          <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-500/50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="text-amber-300 flex-shrink-0 mt-1" size={20} />
              <div>
                <h6 className="text-white font-bold text-base mb-1">Community Guidelines Required</h6>
                <p className="text-amber-100 text-sm leading-relaxed">
                  You must read and understand our community guidelines before submitting.
                  <strong className="block mt-1 text-amber-200">
                    Confessions that do not follow these guidelines may be rejected or not posted.
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                onClick={() => setGuidelinesDialogOpen(true)}
                className="bg-white text-black hover:bg-gray-100 font-bold border-2 border-white hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <BookOpen size={18} className="mr-2" />
                Read Guidelines
              </Button>
              <Link href="/guidelines" target="_blank">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 font-bold hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto"
                >
                  Open in New Tab
                </Button>
              </Link>
            </div>
          </div>

          <GuidelinesDialog
            open={guidelinesDialogOpen}
            onOpenChange={setGuidelinesDialogOpen}
            onConfirm={onGuidelinesRead}
          />
        </motion.div>

        <motion.div variants={childVariants} className="flex flex-row justify-between items-center mt-4">
          <Button
            type="button"
            onClick={onBack}
            className="rounded-full bg-transparent border-2 border-white px-8 h-12 hover:bg-white/10 text-white font-bold hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !hasReadGuidelines}
            className="relative rounded-full overflow-hidden px-6 h-12 w-48 shadow-xl font-bold grid place-items-center text-black border-2 border-white hover:bg-white group disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin text-black" />
            ) : (
              <>
                <div className="absolute bg-white w-full h-full group-hover:bg-[#3c8aff] duration-100 transition-colors"></div>
                <div className="absolute bg-gradient-to-r from-[#F27171] to-white group-hover:to-[#3c8aff] w-[160px] h-[200px] -translate-x-full group-hover:rotate-45 rounded-full group-hover:translate-x-0 transition-transform duration-700 "></div>
                <p className="absolute text-black group-hover:text-white duration-500 transition-colors">
                  Submit
                </p>
              </>
            )}

          </Button>
        </motion.div>
      </div >
    </motion.div >
  );
};

// --- Main Page Component ---
const SubmitPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [hasReadGuidelines, setHasReadGuidelines] = useState(false);

  // Initialize form with Zod/Hook Form
  const form = useForm<ConfessionFormValues>({
    resolver: zodResolver(ConfessionSchema),
    defaultValues: {
      title: "",
      category: "",
      body: "",
      isStudent: false,
      isGraduate: false,
      email: "",
      senderName: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ConfessionFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log("Submitting:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setOpenAlert(false);
    alert("Confession submitted! (Mock)");
    form.reset();
    setStep(1);
  };

  const handleFinalSubmit = () => {
    // Manually trigger validation for part 2 before showing alert
    form.trigger().then((isValid) => {
      if (isValid) {
        form.handleSubmit(onSubmit)();
      }
    });
  }

  return (
    <main className="w-full max-w-4xl mx-auto mt-24 container font-metropolis px-4 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold pb-6 text-white tracking-tight">
          Submit a confession
        </h2>
      </motion.div>


      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <SubmitPageFormPartOne
              key="part-one"
              form={form}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <SubmitPageFormPartTwo
              key="part-two"
              form={form}
              onBack={() => setStep(1)}
              onSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
              hasReadGuidelines={hasReadGuidelines}
              onGuidelinesRead={() => setHasReadGuidelines(true)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default SubmitPage;
