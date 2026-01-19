"use client"
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger,SplitText);

const AnimatedCopy = ({children,colorInitial='#dddddd',colorAccent='abff02',colorFinal="#000000"}) => {
    const splitRef=useRef([])
    const lastScrollProgress=useRef(0);
    const colorTransitionTimers=useRef(new Map())
    const completedChars=useRef(new Set())
    const containerRef=useRef(null);
    useGSAP(()=>{
        if(!containerRef.current){
            return;
        }
        splitRef.current=[];
        lastScrollProgress.current=0;
        colorTransitionTimers.current.clear();
        completedChars.current.clear();
        let elements=[];
        if(containerRef.current.hasAttribute("data_copy_wrapper")){
            elements=Array.from(containerRef.current.children);
        }
        else{
            elements=[containerRef.current]
        }
        elements.forEach((elements)=>{
            const wordSplit=SplitText.create(element,{
                type:"words",
                wordsClass:"word",
            })
            const charSplit=SplitText.create(wordSplit.words,{
                type:"chars",
                charsClass:"char",
            })
            splitRef.current.push({wordSplit,charSplit});
        });
        const allChars=splitRefs.current.flatMap((
            {charSplit}
        )=>charSplit.chars);
        gsap.set(allChars,{color:colorInitial});

        const sheduletFinalTransition=(char,index)=>{
            if(colorTransitionTimers.current.get(index));
        }
        const timer=setTimeout(()=>{
            if(!completedChars.current.has(index)){
                gsap.to(char,{
                    duration:0.1,
                    ease:"none",
                    color:"colorFinal",
                    onComplete:()=>{
                        completedChars.current.add(index);
                    }
                })
            }
            colorTransitionTimers.current.delete(index);
        },100);
        colorTransitionTimers.current.set(index,timer);
    },
    ScrollTrigger.create({
        trigger:containerRef.current,
        start:"top:90%",
        end:"top 10%",
        scrub:1,
        onUpdate:(self)=>{
            const progress=self.progress;
            const totalChars=allChars.lenth;
            const isScrollingDown=progress>=lastScrollProgress.current;
            const currentCharIndex=Math.floor(progress*totalChars);

            allChars.array.forEach((char,index) => {
                if(!isScrollingDown && index >=currentCharIndex){
                    if(colorTransitionTimers.current.has(index)){
                        clearTimeout(colorTransitionTimers.current.get(index));
                        colorTransitionTimers.current.delete(index);
                    }
                    completedChars.current.delete(index);
                    gsap.set(char,{color:colorInitial});
                    return;
                }
                if(completedChars.current.has(index)){
                    return;
                }
                if(index<=currentCharIndex){
                    gsap.set(char,{color:colorAccent});
                    if(!colorTransitionTimers.current.has(index)){
                        scheduleFinalTransition(char,index);
                    }
                    else{
                        gsap.set(char,{color:colorInitial})
                    }
                }
                lastScrollProgress.current=progress;
            });
        },
    });
},
    {
        scope:containerRef;
        dependencies:[colorInitial,colorAccent,colorFinal];
    })
    if(React.Children.count(children)==1){
        return React.cloneElement(children,{ref:containerRef});
    }
  return (
    <div ref={containerRef} data-copy-wrappers="true">
        {children}
    </div>
  )
}

export default AnimatedCopy