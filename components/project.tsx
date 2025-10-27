
import React, { useState } from 'react';
import { Router, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
//@ts-ignore
export function Tag({text}){
    return(
        <div className='flex mx-1 my-1'>
            <div className='bg-hoverBlue-custom text-white px-4 rounded-lg'>{text}</div>
        </div>
    )
}
//@ts-ignore
export default function ProjectCard({project,handleDelete}){
    const[loading,setLoading]=useState(false);
    const projectId={
        projectId:project._id
    }
    const router=  useRouter();
     function onDelete(){
        setLoading(true)
        axios.post("http://localhost:3000/api/deleteProject",projectId).then(res=>{
            
            handleDelete();
            setLoading(false);
        })

     }
   const str=project.Tags;  
   const array = str.split(' ');
   
  
    return(
    //     <div className="bg-cardBlue-custom rounded-lg shadow-md w-full pl-2 pt-2 my-3 pb-2">
    //        <h1 className="text-gray-300 text-3xl font-semibold ">{project.Title}</h1>
           
    //        <h3 className="text-gray-400">Description:{project.Description}</h3>
    //        <h3 className="text-gray-400">Github Link: <a href={project.Github_link}  className='text-blue-300 underline'>Github</a></h3>
    //        <h3 className="text-gray-400">Deployment Link: <a href={project.Project_link}  className='text-blue-300 underline'>{project.Title}</a></h3>
    //        <div className='flex flex-wrap'> {array.map((tag:any,key:any)=><Tag key={key} text={tag}/>)}</div>
    //        <button
    //   onClick={onDelete}
    //   className="flex items-center justify-center px-4 py-1 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out my-1"
    // >
    //   <Trash2 size={18} className="mr-2" />{loading ? "Deleting..." : "Delete"}
      
    // </button>
    //     </div>
    <div className="bg-cardBlue-custom rounded-xl shadow-lg my-2 p-5 transform transition-all duration-300 hover:shadow-xl border border-blue-700/30 w-full">
  <div className="flex flex-col space-y-4">
    {/* Header with title */}
    <div className="flex justify-between items-center">
      <h1 className="text-gray-300 text-3xl font-bold tracking-tight">{project.Title}</h1>
      <div className="flex space-x-3">
        {/* GitHub button */}
        <a 
          href={project.Github_link} 
          className="flex items-center justify-center p-2 rounded-lg bg-blue-800/40 hover:bg-blue-800/70 text-gray-300 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        {/* Live demo button */}
        <a 
          href={project.Project_link} 
          className="flex items-center justify-center p-2 rounded-lg bg-blue-800/40 hover:bg-blue-800/70 text-gray-300 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
    
    {/* Description */}
    <div className="mx-1">
      <h3 className="text-gray-400 mb-2">Description: <span className="text-gray-300">{project.Description}</span></h3>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
        <h3 className="text-gray-400">Github Link:</h3>
        <a 
          href={project.Github_link} 
          className="text-blue-300 hover:text-blue-200 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <h3 className="text-gray-400">Deployment Link:</h3>
        <a 
          href={project.Project_link} 
          className="text-blue-300 hover:text-blue-200 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.Title}
        </a>
      </div>
    </div>
    
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mx-1">
      {array.map((tag: any, key: any) => (
        <span 
          key={key} 
          className="px-3 py-1 text-xs font-medium rounded-full bg-blue-700/30 text-blue-100"
        >
          {tag}
        </span>
      ))}
    </div>
    
    {/* Delete button */}
    <div className="mt-4 mx-1">
      <button
        onClick={onDelete}
        className="group flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
      >
        <Trash2 size={18} className="mr-2 group-hover:scale-110 transition-transform" />
        <span>{loading ? "Deleting..." : "Delete Project"}</span>
      </button>
    </div>
  </div>
</div>
    )
}