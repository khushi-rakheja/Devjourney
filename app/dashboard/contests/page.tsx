"use client"

import { CodechefContestCard, CodeforcesContestCard, LeetcodeContestCard } from "@/components/contestcard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Contests(){
    const[codechefLoading,setCodechefLoading]=useState(true);
    const[codeforcesLoading,setforcesLoading]=useState(true);
    const[leetcodefLoading,setLeetcodeLoading]=useState(true);
    const[codechefContests,setCodechefContests]=useState([{
        contest_start_date:"Loading...",
        contest_code:"Loading...",
        contest_name:"Loading..."
    },{
        contest_start_date:"Loading...",
        contest_code:"Loading...",
         contest_name:"Loading..."
    }]);
    const[codeforcesContests,setCodeforcesContests]=useState([{
        startTimeSeconds:0,
        name:"Loading..."

    },
    {
        startTimeSeconds:0,
        name:"Loading..."

    },
    {
        startTimeSeconds:0,
        name:"Loading..."

    },
    {
        startTimeSeconds:0,
        name:"Loading..."

    },
    {
        startTimeSeconds:0,
        name:"Loading..."

    }]);

    const [leetcodeContests,setLeetcodeCOntests]=useState([{
        title:"Loading",
        startTime:0,
        duration:0,
        
        
    },
    {
        title:"Loading",
        startTime:0,
        duration:0,
        
        
    }]);
    // useEffect(()=>{
    //     axios.post('https://proxy.cors.sh/https://leetcode.com/graphql', {
    //         query: `
    //             query {
    //                 allContests {
    //                     title
    //                     startTime
    //                     duration
                        
    //                 }
    //             }
    //         `
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "x-cors-api-key":"temp_adfb017fadb769bcaf560cce1ff7479f"
    //         }
    //     })
    //     .then(response => {
    //         setLeetcodeCOntests(response.data.data.allContests);
    //         if(response.data){
    //             setLeetcodeLoading(false);
    //         }
    //         console.log(response.data.data.allContests);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching contests:', error);
    //         return [];
    //     });
    // },[])
 

    // Modified useEffect to use your proxy
useEffect(() => {
    axios.post('/api/leetcodeProxy', {
        query: `
            query {
                allContests {
                    title
                    startTime
                    duration                                             
                }
            }
        `
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        setLeetcodeCOntests(response.data.data.allContests);
        if(response.data){
            setLeetcodeLoading(false);
        }
        console.log(response.data.data.allContests);
    })
    .catch(error => {
        console.error('Error fetching contests:', error);
        setLeetcodeLoading(false); // Don't forget to stop loading on error
        return [];
    });
}, [])
   


    // useEffect(()=>{
    //     try{
    //         axios.get("/api/proxy")
    //         .then(res => {
    //           setCodeforcesContests(res.data.result);
    //           console.log(res.data.result);
    //           if (res.data) {
    //             setforcesLoading(false);
    //           }
    //         })
            
    //         const upcomingContests = codeforcesContests.filter((contest:any) => contest.phase === "BEFORE").sort((a, b) => a.startTimeSeconds - b.startTimeSeconds).slice(0, 2); 
    //         setCodeforcesContests(upcomingContests);
    //     }
    //     catch{
    //         alert("error while fetching data,please refresh")
    //     }
    // },[])
    // useEffect(() => {
    //     const fetchContests = async () => {
    //       try {
    //         const res = await axios.get("/api/proxy");
    //         const contests = res.data.result;
      
    //         if (contests) {
    //           const upcomingContests = contests
    //             .filter((contest: any) => contest.phase === "BEFORE")
    //             .sort((a:any, b:any) => a.startTimeSeconds - b.startTimeSeconds)
    //             .slice(0, 2);
      
    //           setCodeforcesContests(upcomingContests);
    //           setforcesLoading(false);
    //         }
    //       } catch {
    //         alert("Error while fetching data, please refresh");
    //       }
    //     };
      
    //     fetchContests();
    //   }, []);
      
    // useEffect(() => {
    //     const fetchContests = async () => {
    //       try {
    //         const res = await axios.get("/api/proxy");
    //         const contests = res.data.result;
      
    //         if (contests) {
    //           const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    //           const upcomingContests = contests
    //             .filter((contest: any) => contest.startTimeSeconds > currentTime) // Only future contests
    //             .sort((a: any, b: any) => a.startTimeSeconds - b.startTimeSeconds)
    //             .slice(0, 2);
      
    //           setCodeforcesContests(upcomingContests);
    //           setforcesLoading(false);
    //         }
    //       } catch {
    //         alert("Error while fetching data, please refresh");
    //       }
    //     };
      
    //     fetchContests();
    //   }, []);
      
useEffect(() => {
  const fetchContests = async () => {
    try {
      const res = await axios.get("/api/proxy");
      const contests = res.data.result;

      if (contests && Array.isArray(contests)) {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        
        const upcomingContests = contests
          .filter((contest) => {
            // Filter for upcoming contests (phase is "BEFORE" and start time is in future)
            return contest.phase === "BEFORE" && contest.startTimeSeconds > currentTime;
          })
          .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds) // Sort by start time (earliest first)
          .slice(0, 2); // Get only the first 2 upcoming contests
        console.log(upcomingContests);
        setCodeforcesContests(upcomingContests);
        setforcesLoading(false);
      } else {
        console.error("Invalid contests data received");
        setforcesLoading(false);
      }
    } catch (error) {
      console.error("Error fetching contests:", error);
      setforcesLoading(false);
      alert("Error while fetching data, please refresh");
    }
  };

  fetchContests();
}, []);







    useEffect(()=>{
        try{
            axios.get("/api/codechefContestProxy",{
                headers:{
                    
                }
            }).then(res=>{
                setCodechefContests(res.data.future_contests);
                
                if(res.data){
                    setCodechefLoading(false);
                }
            })
        }
        catch(e){
            alert("error, please refresh");
        }
        
    },[])
    return(
        <div className="h-screen bg-darkBlue-custom   ">
           <div className="h-5/6  overflow-y-auto mr-3 grid grid-cols-1 gap-4 md:grid xl:grid-cols-2 3xl:grid-cols-3">

            <div id="codechef contests" >
            <div className="text-2xl text-white font-semibold mb-2 ">
                Codechef Contests
            </div>
            <div>
                
            </div>
            {codechefLoading?<div className="flex">
            <div className="skeleton-loader w-74 h-80 bg-cardBlue-custom rounded-lg shadow-md p-6 w-60 shadow-md p-6 mr-3 animate-pulse">
  <div className="w-3/4 h-6 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-1/2 h-8 bg-cardBlue-light rounded"></div>
</div><div className="skeleton-loader w-74 h-80 bg-cardBlue-custom rounded-lg shadow-md p-6 w-60 shadow-md p-6 animate-pulse">
  <div className="w-3/4 h-6 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-1/2 h-8 bg-cardBlue-light rounded"></div>
</div>
            </div>:  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">

            {codechefContests.map((contest,index)=><CodechefContestCard key={index} contestInfo={contest}/>)}
            
            </div>}
            
           
            </div>
            

            {/* codeforces contests */}
            <div className="">
            <div className="text-2xl text-white font-semibold mb-2 ">
                Codeforces Contests
            </div>
            {codeforcesLoading? <div className="flex">
            <div className="skeleton-loader w-74 h-80 bg-cardBlue-custom rounded-lg shadow-md p-6 w-60 shadow-md p-6  mr-3 animate-pulse">
  <div className="w-3/4 h-6 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-1/2 h-8 bg-cardBlue-light rounded"></div>
</div><div className="skeleton-loader w-74 h-80 bg-cardBlue-custom rounded-lg shadow-md p-6 w-60 shadow-md p-6 animate-pulse">
  <div className="w-3/4 h-6 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-1/2 h-8 bg-cardBlue-light rounded"></div>
</div>
            </div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {codeforcesContests.map((contest:any) => (
  <CodeforcesContestCard key={contest.id} contestInfo={contest} />
))}
            </div>}
             
            </div>

            <div className="">
            <div className="text-2xl text-white font-semibold mb-2 ">
                LeetCode Contests
            </div>
            {leetcodefLoading?<div className="flex">
            <div className="skeleton-loader w-74 h-80 bg-cardBlue-custom rounded-lg shadow-md p-6 w-60 shadow-md p-6  mr-3 animate-pulse">
  <div className="w-3/4 h-6 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-1/2 h-8 bg-cardBlue-light rounded"></div>
</div><div className="skeleton-loader w-74 h-80 bg-cardBlue-custom rounded-lg shadow-md p-6 w-60 shadow-md p-6 animate-pulse">
  <div className="w-3/4 h-6 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-2"></div>
  <div className="w-full h-4 bg-cardBlue-light rounded mb-4"></div>
  <div className="w-1/2 h-8 bg-cardBlue-light rounded"></div>
</div>
            </div>: <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            <LeetcodeContestCard contestInfo={leetcodeContests[0]}/>
            <LeetcodeContestCard contestInfo={leetcodeContests[1]}/>
            </div>}
            
            </div>








            
           </div>
        </div>
    )
}