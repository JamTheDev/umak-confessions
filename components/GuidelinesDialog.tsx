"use client";

import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { guidelinesContent } from "@/lib/guidelines-content";
import { AlertCircle } from "lucide-react";

interface GuidelinesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export function GuidelinesDialog({
    open,
    onOpenChange,
    onConfirm,
}: GuidelinesDialogProps) {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            setHasScrolledToBottom(false);
            return;
        }

        // Wait a bit for dialog animation and DOM to settle
        const setupTimer = setTimeout(() => {
            const scrollArea = scrollContainerRef.current;
            if (!scrollArea) return;

            // Find the viewport element within our scroll area
            const viewport = scrollArea.querySelector('[data-radix-scroll-area-viewport]');

            if (!viewport) {
                console.log('Viewport not found, content might be short enough');
                // If viewport not found, content might be short - enable button
                setTimeout(() => setHasScrolledToBottom(true), 1000);
                return;
            }

            const checkScroll = () => {
                const threshold = 50;
                const scrollTop = viewport.scrollTop;
                const scrollHeight = viewport.scrollHeight;
                const clientHeight = viewport.clientHeight;

                const isAtBottom = scrollHeight - scrollTop - clientHeight < threshold;

                console.log('Scroll check:', { scrollTop, scrollHeight, clientHeight, isAtBottom });

                if (isAtBottom) {
                    setHasScrolledToBottom(true);
                }
            };

            // Check initially
            checkScroll();

            // Add scroll listener
            viewport.addEventListener('scroll', checkScroll);

            return () => {
                viewport.removeEventListener('scroll', checkScroll);
            };
        }, 300);

        return () => clearTimeout(setupTimer);
    }, [open]);

    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl flex flex-col bg-white border-gray-300 ">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        UMak Confessions Guidelines
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-600">
                        Please read the complete guidelines before submitting your
                        confession.
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4 rounded">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-bold mb-1">Important Notice</p>
                            <p>
                                Confessions that do not follow these guidelines may be{" "}
                                <strong>rejected or not posted</strong>. Please ensure you
                                understand and comply with all requirements before submitting.
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={scrollContainerRef}>
                    <ScrollArea className="h-[400px] w-full border rounded-lg bg-gray-50">
                        <div className="p-6">
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
                    </ScrollArea>
                </div>

                <DialogFooter className="flex flex-row justify-between items-center gap-3 mt-4">
                    <div className="flex-1 text-sm flex items-center gap-2">
                        {hasScrolledToBottom ? (
                            <span className="text-gray-600">
                                You've read the guidelines
                            </span>
                        ) : (
                            <span className="text-amber-700 flex items-center gap-2">
                                <AlertCircle size={18} />
                                Scroll to the bottom to continue
                            </span>
                        )}
                    </div>
                    <Button
                        onClick={handleConfirm}
                        disabled={!hasScrolledToBottom}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                        I Have Read and Understand
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
