"use client"

import Navbar from "@/components/navbar";
import axios from "axios";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { stringify } from "querystring";
import DecryptedText from "@/components/DecryptedText";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [isHovered, setIsHovered] = useState(false);
    const router=useRouter();
   const[name,setName]=useState("");
   const[loading,setLoading]=useState(false);
   useEffect(()=>{
    //@ts-ignore
    if(localStorage.getItem("user"))
    {
      //@ts-ignore
      const user=JSON.parse(localStorage.getItem("user"));
      setName(user.name);
    }
    else{
      setLoading(true);
      try{
        axios.get("https://dev-journey-zeta.vercel.app/api/dashboard",{
          headers:{
            //@ts-ignore
            authorization:localStorage.getItem("token") 
               }
        }).then(res=>{
          if(res.data.success){
            localStorage.setItem("user",JSON.stringify(res.data.user));
            setName(res.data.user.name);
            setLoading(false)
          }
          else{
            router.push("/signin")
          }
    
        })
      }
      catch{
        alert("error fetching username");
      }
    }
    

   },[router])
   function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/")
   }
   const[contest,setContest]=useState(false);
   const[rating,setRating]=useState(true);
   const[job,setJob]=useState(false);
   const[project,setProject]=useState(false);
   const[exploreProjects,setExploreProjects]=useState(false);

    return (
    <div className="bg-darkBlue-custom h-screen overflow-y-hidden">
      <div className="md:hidden">
           <Navbar name={name}
/>
      </div>
      <div>
              <div className="bg-cardBlue-custom p-2 m-3 rounded-xl justify-between hidden md:flex ">
              <Link href="/" className="text-white cursor-pointer  flex  text-4xl font-thin items-center">
  <div className='text-white cursor-pointer  flex text-4xl font-'>
  &lt;/&gt;DevJourney
  </div>
  </Link>
  
        <div className="flex items-center -mt-2">
        <div className="text-white text-2xl pr-2 ">                
          {/* Hello {name} */}
       
<DecryptedText
      text={`Hello ${name}`}
      speed={100}
      maxIterations={25}
      characters="ABCD1234!?"
      className="revealed"
      animateOn="view"
      revealDirection="center"
      parentClassName="all-letters"
      encryptedClassName="encrypted"
    />
        </div>






              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mt-4 " onClick={logout}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              LOG OUT
              </span>
              </button>
              
        </div>
      </div>
      </div>

      <div className="flex justify-center md:grid md:grid-cols-6 overflow-y-hidden">
        <div className="bg-cardBlue-custom flex flex-col mx-3 rounded-xl h-full  items-center hidden md:flex">
           <div className="flex flex-col text-md mt-4">
           
           <div className={`hover:bg-hoverBlue-custom p-2  pr-6 hover:text-white ${rating ? 'bg-hoverBlue-custom text-white' : ""} rounded-lg text-textBlue-custom cursor-pointer `}  onClick={()=>{
            setContest(false);
            setJob(false);
            setRating(true);
            setProject(false);
            setExploreProjects(false);

            router.push("/dashboard/platformRatings")
           }}>Platform Ratings </div>
           <div className={`hover:bg-hoverBlue-custom p-2 ${contest ? 'bg-hoverBlue-custom text-white' : ""} my-0.5 hover:text-white rounded-lg text-textBlue-custom cursor-pointer `} onClick={()=>{
            setContest(true);
            setJob(false);
            setRating(false);
            setProject(false);
            setExploreProjects(false);

            router.push("/dashboard/contests")
           }} >Contests </div>
           <div className={`hover:bg-hoverBlue-custom p-2 ${job ? 'bg-hoverBlue-custom text-white' : ""} my-0.5 hover:text-white rounded-lg text-textBlue-custom cursor-pointer `} onClick={()=>{
            setContest(false);
            setJob(true);
            setRating(false);
            setProject(false);
            setExploreProjects(false);

            router.push("/dashboard/jobs")
           }}>Jobs </div>
           <div className={`hover:bg-hoverBlue-custom p-2 ${project ? 'bg-hoverBlue-custom text-white' : ""} my-0.5 hover:text-white rounded-lg text-textBlue-custom cursor-pointer `}  onClick={()=>{
            setContest(false);
            setJob(false);
            setRating(false);
            setProject(true);
            setExploreProjects(false);
            router.push("/dashboard/projects")
           }}>Projects </div>
           <div className={`hover:bg-hoverBlue-custom p-2 ${exploreProjects ? 'bg-hoverBlue-custom text-white' : ""} my-0.5 hover:text-white rounded-lg text-textBlue-custom cursor-pointer `}  onClick={()=>{
            setContest(false);
            setJob(false);
            setRating(false);
            setProject(false);
            setExploreProjects(true);
            router.push("/dashboard/exploreProjects")
           }}>Explore Projects </div>
           {/* <div className={`hover:bg-hoverBlue-custom p-2 my-0.5 hover:text-white rounded-lg text-textBlue-custom cursor-pointer `}  onClick={()=>{
            router.push("/signup")
           }}>Sign Up </div>
           
           <div className={`hover:bg-hoverBlue-custom p-2  my-0.5 hover:text-white rounded-lg text-textBlue-custom cursor-pointer `}  onClick={()=>{
            router.push("/signin")
           }}>Sign In </div> */}
           </div>
           
        </div>
        <div className="md:col-span-5 ml-3 md:ml-0  md:mr-3 w-full">
      
        {children}
        </div>

        
      </div> 

        
        
    </div>
    );
  }