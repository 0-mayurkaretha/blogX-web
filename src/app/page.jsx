"use client"

import BlogCard from '../components/blogCard/BlogCard'
import { blogs } from '../lib/data'
import Image from 'next/image'
import classes from './page.module.css'
import { useState, useEffect} from "react"
import NextCors from 'nextjs-cors';




export default async function Home() {
  // const blogs = await fetchBlogs()

  const [blogs, setBlogs]=useState();

  useEffect(()=>{
    
    async function fetchBlogs() {

      const res = await fetch(
        'http://localhost:3000/api/blog', {cache: 'no-store'}
      );
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  },[]);

  if(!blogs){
   return (<div>Loading...</div>)
  }

  return (
   <div className={classes.container}>
    {blogs?.length > 0 && <h2>BlogX Website</h2>}
     <div className={classes.wrapper}>
      {blogs?.length > 0 
       ? blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog}/>
      )) : <h3 className={classes.noBlogs}>No blogs are currently in the</h3>}
     </div>
   </div>
  )
}
