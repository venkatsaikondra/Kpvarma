import React, { useEffect } from 'react'
import { useRef,useState } from 'react'
import {motion,AnimatePresence} from 'framer-motion';
import {useChat} from '@ai-sdk/react';
import { handleBuildComplete } from 'next/dist/build/adapter/build-complete';

const chat = () => {
    const [isChatOpen,setisChatOpen]=useState(false);
    const [showChatIcon,setShowChatIcon]=useState(false);
    const chatIconRef=useRef<HTMLButtonElement>(null);
    const {messages,input,handleInputChange,handleSubmit,isLoading,stop,reload,error}=useChat({api:'/api/chatgpt'})
    useEffect(()=>{
        const haddleScroll=()=>{
            if(window.scrollY>200){
                setShowChatIcon(true);
            }
            else{
                setShowChatIcon(false);
                setisChatOpen(false);
            }
        }
        handleScroll();
        window.addEventListener("scroll",handleScroll);
        return ()=>{
            window.addEventListener("scroll",handleScroll)
        }
    },[])
    const toggleChat=()=>{
        setIsChatOpen(!isChatOpen);
    }
  return (
    <div>
      <AnimatePresence>
        {
            showChatIcon &&(<motion.div onClick={toggleChat}><button ref={chatIconRef} onClick={toggleChat} size="icon">
                {!isChatOpen?(
                    <MessageCircle>

                    </MessageCircle>
                ):(
                    <ArrowDownCircle></ArrowDownCircle>
                )}
                </button></motion.div>)
        }
      </AnimatePresence>
      <AnimatePresence>
        {
            isChatOpen && (
                <motion.div>
                    <card>
                        <cardHeader>
                            <cardTitle>
                                Chat with Kpvarma
                            </cardTitle>
                            <button>
                                onClick={toggleChat}
                                <X></X>
                                <span>Close Chat</span>
                            </button>
                        </cardHeader>
                        <cardContent>
                            <scrollArea>
                                {message?.length===0 &&(<div>
                                    <h1>No messages yet</h1>
                                </div>)}
                                {
                                    messages?.map(messages,index)==>{
                                        <div key={index}>
                                        </div>
                                    }
                                }
                               {isLoading && (
                                <div>
                                    <Loader2>
                                        <button onClick={()=>stop()}>
                                            abort
                                        </button>
                                    </Loader2>
                                </div>
                               )} 
                            </scrollArea>
                        </cardContent>
                        <cardFooter>
                            <form action="" onSubmit={handleSubmit}>
                                <input value={input} onChange={handleInputChange} placeholder='Type your message here...'>
                                <button type='submit' disabled={isLoading} size="icon"><Send></Send></button>
                                </input>
                            </form>
                        </cardFooter>
                    </card>
                </motion.div>
            )
        }
      </AnimatePresence>
    </div>
  )
}

export default chat
