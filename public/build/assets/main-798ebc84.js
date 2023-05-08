import{a,j as e,r as o,F as b,R as T,c as S}from"./clsx.m-340daf83.js";import{k as C}from"./ReactToastify-2767fbe6.js";import{n as g}from"./notify-4fa6a864.js";import{L as _}from"./LeaderboardTable-dd6bf25b.js";import{u as O,M as P}from"./Modal-a0754083.js";import{T as j}from"./Table-ca06eba1.js";import{d as E}from"./uitls-6342bc87.js";import"./FocusTrap-e9c018ce.js";import"./Box-b9249870.js";import"./use-window-event-0ced1140.js";function D({ticket:s,csrfToken:n}){const i=async()=>{try{(await fetch(`admin/tickets/${s.id}/use`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":n},body:JSON.stringify({})})).ok&&(g(`${s.id} number ticket has been marked as used successfully`),setTimeout(()=>{location.reload()},1300))}catch(c){console.log(c)}};return a("div",{className:"flex gap-1 mb-1 p-1 bg-slate-200",children:[s.ticket_used_status==1&&e("span",{className:"bg-red-100",children:"Used"}),e("span",{children:s.unique_code}),s.ticket_used_status==0&&e("button",{onClick:i,className:"bg-blue-400 hover:bg-blue-500 text-[10px] text-white p-1",children:"Mark Used"})]})}function M({csrf:s,authUser:n}){const[i,c]=o.useState([]);return o.useEffect(()=>{(async()=>{try{const r=await fetch("user/game-results/leaderboard");if(r.ok){const d=await r.json();c([...d.data])}}catch(r){console.log(r)}})()},[]),e(b,{children:a("main",{className:"participants-dashboard z-10 max-w-5xl mx-auto px-4 game-screen h-screen overflow-auto text-black",children:[a("h1",{className:"text-3xl leading-14 mb-5 text-white",children:[" ","Event Participants"]}),e(_,{participantsData:i})]})})}function R({orders:s,csrfToken:n}){const[i,{open:c,close:u}]=O(!1),[r,d]=o.useState(null),[p,x]=o.useState(!0),[h,f]=o.useState("orderList"),y=t=>{c(),d(t)},k=async t=>{if(t)try{(await fetch(`admin/orders/${t.id}/tickets/use`,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":n},body:JSON.stringify({})})).ok&&(g(`${t.id} order tickets have been marked as used successfully`),setTimeout(()=>{location.reload()},1300))}catch(l){console.log(l)}},v=t=>{let l=!0;return t.tickets.forEach(m=>{m.ticket_used_status==0&&(l=!1)}),l},w=t=>new Date(t).toISOString().substr(0,10),N=s.map(t=>a("tr",{className:"dashboard-table",children:[e("td",{children:t.name}),e("td",{children:t.payment_status==1?e("span",{className:"bg-green-400 p-1",children:"Paid"}):e("span",{className:"bg-red-400 p-1",children:"Unpaid"})}),e("td",{children:t.merchant_account_phone}),e("td",{children:t.client_phone}),e("td",{children:w(t.purchase_date)}),e("td",{children:t.transaction_id}),a("td",{className:"gap-2 flex-col justify-center flex items-center",children:[e("span",{children:t.tickets.length}),t.tickets.length>1&&!v(t)&&a("button",{onClick:()=>y(t),className:"p-1 bg-blue-400 hover:bg-blue-600 text-white rounded-xl text-[10px]",children:["Mark All ",e("br",{})," ticket as used"," "]})]}),e("td",{children:t.tickets.map((l,m)=>e(D,{csrfToken:n,ticket:l}))})]},t.unique_code));return a("div",{className:"flex h-screen bg-white",children:[p&&a("div",{className:"flex flex-col w-48 bg-white border-r",children:[e("div",{className:"flex flex-col items-center h-16 bg-gray-200 justify-center",children:e("span",{className:"text-2xl font-bold",children:"Dashboard"})}),a("div",{className:"flex flex-col pt-4",children:[e("a",{href:"#",onClick:()=>f("orderList"),className:`px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${h==="orderList"&&"bg-slate-200"}`,children:"Order List"}),e("a",{href:"#",onClick:()=>f("participants"),className:`px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${h==="participants"&&"bg-slate-200"}`,children:"Participants"})]})]}),a("div",{className:"flex flex-col flex-1 overflow-y-auto",children:[a("div",{className:"flex items-center justify-between px-6 py-4 bg-white border-b",children:[e("span",{className:"text-lg font-bold",children:h}),e("button",{onClick:()=>x(!p),className:"p-2 bg-gray-200 rounded-full hover:bg-gray-300",children:e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 fill-current",children:e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4 4a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h12V6H6zm12 1.5a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5zm0 4a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5zm0 4a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5z"})})})]}),a("div",{className:"px-6 py-4",children:[h==="participants"&&e(M,{}),h==="orderList"&&a(j,{withColumnBorders:!0,highlightOnHover:!0,children:[e("thead",{children:a("tr",{children:[e("th",{children:"Name"}),e("th",{children:"Payment Status"}),e("th",{children:"Merchant Phone"}),e("th",{children:"Client Phone"}),e("th",{children:"Purchase Date"}),e("th",{children:"Transaction Id"}),e("th",{children:"Tickets Counts"}),e("th",{children:"Tickets"})]})}),e("tbody",{children:N})]})]})]}),e(P,{opened:i,onClose:u,children:a("div",{children:[a("h2",{className:"text-2xl ",children:[" ","Are you sure to update all the tickets as used!"]}),a("div",{className:"flex gap-4 mt-4",children:[e("button",{onClick:()=>u(),className:"bg-red-300 p-2 text-white hover:bg-red-600 rounded-sm",children:"Cancel"}),e("button",{onClick:()=>k(r),className:"bg-blue-300 p-2 text-white hover:bg-blue-600 rounded-sm",children:"Confirm"})]})]})})]})}window.React=T;function L({csrf:s,authUser:n}){const[i,c]=o.useState([]);return o.useEffect(()=>{n||(window.location.href=`${E}/login`)},[n]),o.useEffect(()=>{console.log(n),(async()=>{try{const r=await fetch("admin/orders/list");if(r.ok){const d=await r.json();c([...d.data.data])}}catch(r){console.log(r)}})()},[]),a(b,{children:[e(C,{}),e(R,{csrfToken:s,orders:i})]})}if(document.getElementById("dashboard")){const s=document.getElementById("dashboard"),n=S(s);let i=s.dataset.csrf_token,c=s.dataset.authuser;n.render(e(L,{csrf:i,authUser:c}))}
