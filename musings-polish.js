/* Musings route assurance, paper transparency and restrained watercolour accents. */
(function(){
'use strict';
function syncCardRoute(card){
 const link=card.querySelector('a.musing-open[href]');
 const modal=document.getElementById('serviceModal');
 if(!link||!modal||!modal.classList.contains('is-open'))return;
 const next=new URL(link.href,location.href);
 if(next.origin!==location.origin||!next.pathname.startsWith('/musings/'))return;
 if(location.pathname!==next.pathname)history.pushState({musing:next.pathname},'',next.pathname);
 document.title=(card.getAttribute('data-modal-label')||card.querySelector('h3')?.textContent||'Musings')+' — Design My Thinking';
}
document.addEventListener('click',e=>{
 const card=e.target.closest?.('.musing-grid .musing-card[data-modal-template]');
 if(card&&!e.target.closest('a.musing-open'))syncCardRoute(card);
});
document.addEventListener('keydown',e=>{
 if(e.key!=='Enter'&&e.key!==' ')return;
 const card=e.target.closest?.('.musing-grid .musing-card[data-modal-template]');
 if(card)requestAnimationFrame(()=>syncCardRoute(card));
});
const selectors=[
 '.musing-card--ai .musing-thumb img','.field-note--ai .field-note-sketch img',
 '.musing-thumb--output-pack img','.field-note-sketch--output-pack img',
 '.musing-thumb--workshop-vs-presentation img','.field-note-sketch--workshop-vs-presentation img',
 '.musing-thumb--land-workshop img','.field-note-sketch--land-workshop img'
].join(',');
const cache=new Map(),seen=new WeakMap(),processedOutputs=new Set();
const accents={
14:[[.24,.29,.14,.09,'rgba(245,215,72,.19)'],[.47,.75,.19,.09,'rgba(159,210,222,.14)']],
15:[[.77,.51,.23,.22,'rgba(239,164,187,.19)'],[.45,.47,.15,.13,'rgba(159,210,222,.13)']],
16:[[.28,.48,.19,.13,'rgba(159,210,222,.18)'],[.49,.29,.20,.12,'rgba(245,215,72,.16)']],
17:[[.48,.57,.19,.18,'rgba(216,191,238,.20)'],[.83,.69,.14,.13,'rgba(245,215,72,.15)']],
18:[[.45,.49,.18,.20,'rgba(159,210,222,.18)'],[.31,.76,.25,.09,'rgba(239,164,187,.17)']],
19:[[.46,.49,.18,.21,'rgba(159,210,222,.16)'],[.76,.34,.17,.13,'rgba(245,215,72,.17)']]
};
async function renderImage(src){
 const original=new Image();
 original.decoding='async';
 await new Promise((resolve,reject)=>{original.onload=resolve;original.onerror=reject;original.src=src;});
 const w=original.naturalWidth,h=original.naturalHeight;
 if(!w||!h||w*h>17000000)throw new Error('Unsupported image dimensions');
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
 const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(original,0,0);
 const raw=c.getImageData(0,0,w,h),pixels=raw.data;
 const corners=[[2,2],[w-3,2],[2,h-3],[w-3,h-3]];
 const paper=[0,1,2].map(ch=>corners.reduce((sum,pt)=>sum+pixels[(pt[1]*w+pt[0])*4+ch],0)/4);
 for(let i=0;i<pixels.length;i+=4){
  const r=pixels[i],g=pixels[i+1],b=pixels[i+2];
  const diff=Math.max(Math.abs(r-paper[0]),Math.abs(g-paper[1]),Math.abs(b-paper[2]));
  const colour=Math.max(r,g,b)-Math.min(r,g,b);
  let alpha=Math.min(255,Math.max(0,(diff-10)*5));
  if(colour>22&&(r+g+b)/3<240)alpha=Math.max(alpha,Math.min(255,(colour-14)*4));
  pixels[i+3]=Math.min(255,Math.round(alpha*pixels[i+3]/255));
 }
 const ink=document.createElement('canvas');ink.width=w;ink.height=h;ink.getContext('2d').putImageData(raw,0,0);
 const result=document.createElement('canvas');result.width=w;result.height=h;
 const ctx=result.getContext('2d');
 const match=src.match(/ai-musing-(1[4-9])\.webp/),article=match?Number(match[1]):null;
 if(article&&accents[article]){
  for(const [x,y,rx,ry,col] of accents[article]){
   ctx.save();ctx.filter='blur('+Math.round(w*.009)+'px)';ctx.fillStyle=col;ctx.beginPath();
   ctx.ellipse(x*w,y*h,rx*w,ry*h,-.16,0,Math.PI*2);ctx.fill();ctx.restore();
  }
 }
 ctx.drawImage(ink,0,0);
 return result.toDataURL('image/webp',.88);
}
function polish(img){
 if(!img.matches?.(selectors))return;
 const raw=img.getAttribute('src');
 if(!raw||raw.startsWith('blob:')||processedOutputs.has(raw)||seen.get(img)===raw)return;
 seen.set(img,raw);
 const url=raw.startsWith('data:')?raw:new URL(raw,document.baseURI).href;
 if(!cache.has(url))cache.set(url,renderImage(url).catch(error=>{console.warn('Sketch fallback:',error);return null;}));
 cache.get(url).then(data=>{if(data&&img.getAttribute('src')===raw){processedOutputs.add(data);img.src=data;img.dataset.paperTransparent='true';}});
}
function scan(node){
 if(node.nodeType!==1&&node.nodeType!==9&&node.nodeType!==11)return;
 if(node.nodeType===1&&node.matches?.(selectors))polish(node);
 node.querySelectorAll?.(selectors).forEach(polish);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan(document),{once:true});
else scan(document);
new MutationObserver(records=>{
 for(const item of records){
  if(item.type==='attributes'){polish(item.target);continue;}
  for(const node of item.addedNodes)scan(node);
 }
}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
})();
