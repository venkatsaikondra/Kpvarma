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
        })
    },{
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