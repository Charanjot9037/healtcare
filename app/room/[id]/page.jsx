"use client";
import { useParams } from 'next/navigation'
import React from 'react'
import { useRef ,useEffect} from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const page = () => {
  const containerref=useRef(null)
   const {id}=useParams();
  const mymeeting=async(element)=>{
const appID=288120298;
const serverSecret="0b1b76157ccc08632c164766433f85d1";
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id?.toString()||'', Date.now().toString(),"enter name");
      const zp = ZegoUIKitPrebuilt.create(kitToken); 
      zp.joinRoom({
           turnOnCameraWhenJoining: false,
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              id,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });

      

}
useEffect(()=>{
  if(!containerref.current){
    console.log("container not found");
    return;
  }
  
    mymeeting(containerref.current)
  
  
},[id])


   
  return (
   <div className='h-100vh w-100vw' ref={containerref}/>
  )
}

export default page