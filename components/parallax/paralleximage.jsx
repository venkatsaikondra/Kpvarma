"use client"
import React,{useRef,useEffect} from 'react'
import { useLenis } from '@studio-freight/react-lenis/types'
const lerp=(start,end,factor)=>start+(end-start)*factor;
const paralleximage = ({src,alt}) => {
    const imgRef=useRef(null);
    const bounds=useRef(null);
    const currentTranslateY=useRef(0);
    const targetTranslateY=useRef(0);
    const refId=useRef(null);
    useEffect(()=>{
        const updateBounds=()=>{
            if(imgRef.current){
                const react=imgRef.current.getBoundingClientRect();
                bounds.current={
                    top:react.top+window.scrollY,
                    bottom:react.bottom+window.scrollY,
                }
            }
        }
        updateBounds();
        window.addEventListener("resize",update);
        const animate=()=>{
            if(imgRef.current){
                currentTranslateY.current=lerp(
                    currentTranslateY.current,
                    targetTranslateY.current,
                    0.1
                );
                if(Math.abs(currentTranslateY.current-targetTranslateY.current>0.01){
                    imgRef.current.style.transform=`translateY(${currentTranslateY.current}px) scale(1.25)`
                }
                )

            }
            refId.current=requestAnimationFrame(animate)
        }
        animate();
        return()=>{
            window.removeEventListener("resize",updateBounds);
            if(refId.current){
                cancelAnimationFrame(refId.current);
            }
        }
    },[])
    useLenis(({scroll})=>{
        if(!bounds.current) return;
        const relativeScroll=scroll-bounds.current.top;
        targetTranslateY.current=relativeScroll*0.2;
    })

  return (
    <img ref={imgRef} src={src} alt={alt} style={{willChange:"transform",transform:"translateY(0) scale(1.25)"}} />
  )
}

export default paralleximage
