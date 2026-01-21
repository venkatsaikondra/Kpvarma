"use client"
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText);

// 1. Define types for the component props
interface AnimatedCopyProps {
    children: React.ReactNode;
    colorInitial?: string;
    colorAccent?: string;
    colorFinal?: string;
}

// 2. Define types for the SplitText tracking
interface SplitInstance {
    wordSplit: SplitText;
    charSplit: SplitText;
}

const AnimatedCopy = ({ 
    children, 
    colorInitial = '#444444', 
    colorAccent = '#abff02', 
    colorFinal = '#ffffff' 
}: AnimatedCopyProps) => {
    
    // 3. Properly type the refs
    const containerRef = useRef<HTMLDivElement>(null);
    const splitRefs = useRef<SplitInstance[]>([]);
    const lastScrollProgress = useRef<number>(0);
    const colorTransitionTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());
    const completedChars = useRef<Set<number>>(new Set());

    useGSAP(() => {
        if (!containerRef.current) return;

        // Cleanup previous splits
        splitRefs.current.forEach(split => {
            split.charSplit.revert();
            split.wordSplit.revert();
        });
        
        splitRefs.current = [];
        completedChars.current.clear();

        const elements = containerRef.current.hasAttribute("data-copy-wrapper")
            ? Array.from(containerRef.current.children) as HTMLElement[]
            : [containerRef.current as HTMLElement];

        elements.forEach((element) => {
            const wordSplit = new SplitText(element, { type: "words", wordsClass: "word" });
            const charSplit = new SplitText(wordSplit.words, { type: "chars", charsClass: "char" });
            splitRefs.current.push({ wordSplit, charSplit });
        });

        const allChars = splitRefs.current.flatMap(({ charSplit }) => charSplit.chars);
        gsap.set(allChars, { color: colorInitial });

       const scheduleFinalTransition = (char: HTMLElement, index: number) => {
    if (colorTransitionTimers.current.has(index)) return;

    const timer = setTimeout(() => {
        if (!completedChars.current.has(index)) {
            gsap.to(char, {
                duration: 0.4,
                color: colorFinal,
                ease: "power2.out",
                // Explicitly return void by using braces
                onComplete: () => { 
                    completedChars.current.add(index); 
                }
            });
        }
        colorTransitionTimers.current.delete(index);
    }, 150);
    colorTransitionTimers.current.set(index, timer);
};
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalChars = allChars.length;
                const isScrollingDown = progress >= lastScrollProgress.current;
                const currentCharIndex = Math.floor(progress * totalChars);

                allChars.forEach((char, index) => {
                    if (!isScrollingDown && index >= currentCharIndex) {
                        const activeTimer = colorTransitionTimers.current.get(index);
                        if (activeTimer) {
                            clearTimeout(activeTimer);
                            colorTransitionTimers.current.delete(index);
                        }
                        completedChars.current.delete(index);
                        gsap.set(char, { color: colorInitial });
                    } 
                    else if (index <= currentCharIndex && !completedChars.current.has(index)) {
                        gsap.set(char, { color: colorAccent });
                        scheduleFinalTransition(char as HTMLElement, index);
                    }
                });
                lastScrollProgress.current = progress;
            },
        });
    }, { scope: containerRef, dependencies: [children] });

    // Handle single child VS multiple children
    if (React.Children.count(children) === 1 && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, { 
            ref: containerRef 
        });
    }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );
}

export default AnimatedCopy;