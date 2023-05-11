import{r as $,R as k}from"./clsx.m-ad2bbb9b.js";import{c as m,r as j,g as s,u as x,B as T}from"./Box-8c91be4a.js";var B=Object.defineProperty,R=Object.defineProperties,E=Object.getOwnPropertyDescriptors,c=Object.getOwnPropertySymbols,N=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,p=(r,o,t)=>o in r?B(r,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[o]=t,D=(r,o)=>{for(var t in o||(o={}))N.call(o,t)&&p(r,t,o[t]);if(c)for(var t of c(o))C.call(o,t)&&p(r,t,o[t]);return r},H=(r,o)=>R(r,E(o)),I=m((r,{captionSide:o,horizontalSpacing:t,verticalSpacing:e,fontSize:n,withBorder:d,withColumnBorders:i})=>{const a=`${j(1)} solid ${r.colorScheme==="dark"?r.colors.dark[4]:r.colors.gray[3]}`;return{root:H(D({},r.fn.fontStyles()),{width:"100%",borderCollapse:"collapse",captionSide:o,color:r.colorScheme==="dark"?r.colors.dark[0]:r.black,lineHeight:r.lineHeight,border:d?a:void 0,"& caption":{marginTop:o==="top"?0:r.spacing.xs,marginBottom:o==="bottom"?0:r.spacing.xs,fontSize:r.fontSizes.sm,color:r.colorScheme==="dark"?r.colors.dark[2]:r.colors.gray[6]},"& thead tr th, & tfoot tr th, & tbody tr th":{textAlign:"left",fontWeight:"bold",color:r.colorScheme==="dark"?r.colors.dark[0]:r.colors.gray[7],fontSize:s({size:n,sizes:r.fontSizes}),padding:`${s({size:e,sizes:r.spacing})} ${s({size:t,sizes:r.spacing})}`},"& thead tr th":{borderBottom:a},"& tfoot tr th, & tbody tr th":{borderTop:a},"& tbody tr td":{padding:`${s({size:e,sizes:r.spacing})} ${s({size:t,sizes:r.spacing})}`,borderTop:a,fontSize:s({size:n,sizes:r.fontSizes})},"& tbody tr:first-of-type td, & tbody tr:first-of-type th":{borderTop:"none"},"& thead th, & tbody td":{borderRight:i?a:"none","&:last-of-type":{borderRight:"none",borderLeft:i?a:"none"}},"& tbody tr th":{borderRight:i?a:"none"},"&[data-striped] tbody tr:nth-of-type(odd)":{backgroundColor:r.colorScheme==="dark"?r.colors.dark[6]:r.colors.gray[0]},"&[data-hover] tbody tr":r.fn.hover({backgroundColor:r.colorScheme==="dark"?r.colors.dark[5]:r.colors.gray[1]})})}});const V=I;var A=Object.defineProperty,L=Object.defineProperties,W=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,f=(r,o,t)=>o in r?A(r,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[o]=t,q=(r,o)=>{for(var t in o||(o={}))g.call(o,t)&&f(r,t,o[t]);if(l)for(var t of l(o))b.call(o,t)&&f(r,t,o[t]);return r},F=(r,o)=>L(r,W(o)),G=(r,o)=>{var t={};for(var e in r)g.call(r,e)&&o.indexOf(e)<0&&(t[e]=r[e]);if(r!=null&&l)for(var e of l(r))o.indexOf(e)<0&&b.call(r,e)&&(t[e]=r[e]);return t};const J={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7,withBorder:!1,withColumnBorders:!1},K=$.forwardRef((r,o)=>{const t=x("Table",J,r),{className:e,children:n,striped:d,highlightOnHover:i,captionSide:a,horizontalSpacing:y,verticalSpacing:_,fontSize:v,unstyled:O,withBorder:S,withColumnBorders:P,variant:u}=t,z=G(t,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize","unstyled","withBorder","withColumnBorders","variant"]),{classes:h,cx:w}=V({captionSide:a,verticalSpacing:_,horizontalSpacing:y,fontSize:v,withBorder:S,withColumnBorders:P},{unstyled:O,name:"Table",variant:u});return k.createElement(T,F(q({},z),{component:"table",ref:o,className:w(h.root,e),"data-striped":d||void 0,"data-hover":i||void 0}),n)});K.displayName="@mantine/core/Table";export{K as T};
