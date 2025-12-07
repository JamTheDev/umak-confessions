"use client";

import { NextPage } from "next";
import { guidelinesContent } from "@/lib/guidelines-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const GuidelinesPage: NextPage = () => {
    return (
        <main className="w-full max-w-4xl mx-auto mt-24 container font-metropolis px-4 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/submit-confession">
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10 gap-2"
                        >
                            <ArrowLeft size={18} />
                            Back to Submit
                        </Button>
                    </Link>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold pb-6 text-white tracking-tight">
                    Community Guidelines
                </h1>

                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="prose prose-sm max-w-none">
                        {guidelinesContent.split("\n").map((line, index) => {
                            if (line.startsWith("# ")) {
                                return (
                                    <h1
                                        key={index}
                                        className="text-2xl font-bold mt-6 mb-3 text-gray-900 first:mt-0"
                                    >
                                        {line.substring(2)}
                                    </h1>
                                );
                            } else if (line.startsWith("## ")) {
                                return (
                                    <h2
                                        key={index}
                                        className="text-xl font-bold mt-5 mb-2 text-gray-800"
                                    >
                                        {line.substring(3)}
                                    </h2>
                                );
                            } else if (line.startsWith("### ")) {
                                return (
                                    <h3
                                        key={index}
                                        className="text-lg font-semibold mt-4 mb-2 text-gray-700"
                                    >
                                        {line.substring(4)}
                                    </h3>
                                );
                            } else if (line.startsWith("**") && line.endsWith("**")) {
                                return (
                                    <p key={index} className="font-bold my-2 text-gray-900">
                                        {line.replace(/\*\*/g, "")}
                                    </p>
                                );
                            } else if (line.startsWith("- ")) {
                                return (
                                    <li key={index} className="ml-4 my-1 text-gray-700">
                                        {line.substring(2)}
                                    </li>
                                );
                            } else if (line === "---") {
                                return <hr key={index} className="my-4 border-gray-300" />;
                            } else if (line.trim() === "") {
                                return <br key={index} />;
                            } else {
                                return (
                                    <p key={index} className="my-2 text-gray-700 leading-relaxed">
                                        {line}
                                    </p>
                                );
                            }
                        })}
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default GuidelinesPage;
