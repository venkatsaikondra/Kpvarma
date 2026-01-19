"use client"
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText);

const AnimatedCopy = ({ children, colorInitial = '#444444', colorAccent = '#abff02', colorFinal = '#ffffff' }) => {
    const containerRef = useRef(null);
    const splitRefs = useRef([]);
    const lastScrollProgress = useRef(0);
    const colorTransitionTimers = useRef(new Map());
    const completedChars = useRef(new Set());

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
            ? Array.from(containerRef.current.children)
            : [containerRef.current];

        elements.forEach((element) => {
            const wordSplit = new SplitText(element, { type: "words", wordsClass: "word" });
            const charSplit = new SplitText(wordSplit.words, { type: "chars", charsClass: "char" });
            splitRefs.current.push({ wordSplit, charSplit });
        });

        const allChars = splitRefs.current.flatMap(({ charSplit }) => charSplit.chars);
        gsap.set(allChars, { color: colorInitial });

        const scheduleFinalTransition = (char, index) => {
            if (colorTransitionTimers.current.has(index)) return;

            const timer = setTimeout(() => {
                if (!completedChars.current.has(index)) {
                    gsap.to(char, {
                        duration: 0.4,
                        color: colorFinal,
                        ease: "power2.out",
                        onComplete: () => completedChars.current.add(index)
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
                        // Resetting when scrolling back up
                        if (colorTransitionTimers.current.has(index)) {
                            clearTimeout(colorTransitionTimers.current.get(index));
                            colorTransitionTimers.current.delete(index);
                        }
                        completedChars.current.delete(index);
                        gsap.set(char, { color: colorInitial });
                    } 
                    else if (index <= currentCharIndex && !completedChars.current.has(index)) {
                        gsap.set(char, { color: colorAccent });
                        scheduleFinalTransition(char, index);
                    }
                });
                lastScrollProgress.current = progress;
            },
        });
    }, { scope: containerRef, dependencies: [children] });

    if (React.Children.count(children) === 1) {
        return React.cloneElement(children, { ref: containerRef });
    }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );
}

export default AnimatedCopy;