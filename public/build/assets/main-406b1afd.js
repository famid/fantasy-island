import{a as s,j as e,R as m,c as l,r as o,F as u}from"./clsx.m-ad2bbb9b.js";import{k as p}from"./ReactToastify-a2a4b38b.js";import{N as d}from"./navbar-512eac0e.js";import{L as f}from"./LeaderboardTable-259cbcae.js";import"./logo-link-cf68767f.js";import"./Table-871f67b7.js";import"./Box-8c91be4a.js";function h({participantsData:t}){return s("div",{className:" w-full h-screen",style:{background:"url('/assets/images/bg.webp')"},children:[e(d,{}),s("main",{className:" z-10 pt-40 max-w-5xl mx-auto px-4 game-screen h-screen overflow-auto",children:[s("h1",{className:"text-3xl leading-14 mb-5 text-white",children:[" ","Event Participants"]}),e(f,{participantsData:t})]})]})}window.React=m;function g({csrf:t,authUser:c}){const[r,n]=o.useState([]);return o.useEffect(()=>{(async()=>{try{const a=await fetch("user/game-results/leaderboard");if(a.ok){const i=await a.json();n([...i.data])}}catch(a){console.log(a)}})()},[]),s(u,{children:[e(p,{}),e(h,{participantsData:r})]})}if(document.getElementById("participants")){const t=document.getElementById("participants"),c=l(t);let r=t.dataset.csrf_token,n=t.dataset.authuser;c.render(e(g,{csrf:r,authUser:n}))}