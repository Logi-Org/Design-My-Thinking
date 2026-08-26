/* Musing 07 artwork fix — reconstruct the approved sketch from verified public source chunks, then let the field-note paper show through. */
(function(){
  const SELECTOR='.musing-thumb--knowledge-podcast img, .field-note-sketch--knowledge-podcast img';
  const BASE='/assets/dmt/m07-b64-v2/';
  const FILES=['00.txt','01.txt','02.txt','03.txt','04a.txt','04b.txt'];
  const EXPECTED_LENGTH=39432;
  const PLACEHOLDER='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 9%22%3E%3Crect width=%2216%22 height=%229%22 fill=%22%23fff8e9%22/%3E%3C/svg%3E';
  let artSrc=PLACEHOLDER;
  let applying=false;

  function setImage(img){
    if(!img || !img.matches || !img.matches(SELECTOR)) return;
    if(img.getAttribute('src')!==artSrc) img.setAttribute('src',artSrc);
    img.removeAttribute('srcset');
    img.setAttribute('loading','eager');
    img.style.background='transparent';
  }

  function apply(root=document){
    if(applying) return;
    applying=true;
    try{
      setImage(root);
      if(root.querySelectorAll) root.querySelectorAll(SELECTOR).forEach(setImage);
    }finally{
      applying=false;
    }
  }

  function paperMatch(src){
    return new Promise((resolve,reject)=>{
      const image=new Image();
      image.onload=()=>{
        try{
          const canvas=document.createElement('canvas');
          canvas.width=image.naturalWidth;
          canvas.height=image.naturalHeight;
          const ctx=canvas.getContext('2d',{willReadFrequently:true});
          if(!ctx) return resolve(src);
          ctx.drawImage(image,0,0);
          const frame=ctx.getImageData(0,0,canvas.width,canvas.height);
          const data=frame.data;
          const w=canvas.width, h=canvas.height;

          // The original sketch has a warm cream baked into it. Sample that paper
          // from the outer edge, then make only paper-like pixels transparent so
          // the actual Musing Post-it colour (#fff8e9) underneath shows through.
          const samples=[];
          const xs=[0,Math.floor(w*.25),Math.floor(w*.5),Math.floor(w*.75),w-1];
          const ys=[0,Math.floor(h*.25),Math.floor(h*.5),Math.floor(h*.75),h-1];
          const add=(x,y)=>{
            const i=(y*w+x)*4;
            samples.push([data[i],data[i+1],data[i+2]]);
          };
          xs.forEach(x=>{ add(x,0); add(x,Math.min(5,h-1)); add(x,Math.max(0,h-6)); add(x,h-1); });
          ys.forEach(y=>{ add(0,y); add(Math.min(5,w-1),y); add(Math.max(0,w-6),y); add(w-1,y); });
          const median=(values)=>values.sort((a,b)=>a-b)[Math.floor(values.length/2)];
          const bg=[0,1,2].map(c=>median(samples.map(s=>s[c])));

          for(let i=0;i<data.length;i+=4){
            const r=data[i], g=data[i+1], b=data[i+2];
            if(r<=230 || g<=220 || b<=195) continue;
            const dr=r-bg[0], dg=g-bg[1], db=b-bg[2];
            const distance=Math.sqrt(dr*dr+dg*dg+db*db);
            if(distance<=18){
              data[i+3]=0;
            }else if(distance<42){
              data[i+3]=Math.round(255*((distance-18)/24));
            }
          }
          ctx.putImageData(frame,0,0);
          resolve(canvas.toDataURL('image/png'));
        }catch(error){
          console.warn('Musing 07 paper match fell back to original artwork.',error);
          resolve(src);
        }
      };
      image.onerror=reject;
      image.src=src;
    });
  }

  async function build(){
    const parts=await Promise.all(FILES.map(async(name)=>{
      const response=await fetch(BASE+name+'?v=20260826h',{cache:'no-store'});
      if(!response.ok) throw new Error('Musing 07 artwork chunk failed: '+name+' '+response.status);
      return (await response.text()).replace(/\s+/g,'');
    }));
    const b64=parts.join('');
    if(b64.length!==EXPECTED_LENGTH || !b64.startsWith('/9j/') || !b64.endsWith('/2Q==')){
      throw new Error('Musing 07 artwork validation failed: '+b64.length);
    }
    const jpeg='data:image/jpeg;base64,'+b64;
    artSrc=await paperMatch(jpeg);
    apply(document);
  }

  function start(){
    apply(document);
    const observer=new MutationObserver((mutations)=>{
      for(const mutation of mutations){
        if(mutation.type==='childList'){
          for(const node of mutation.addedNodes){
            if(node.nodeType===1) apply(node);
          }
        }else if(mutation.type==='attributes'){
          setImage(mutation.target);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
    build().catch((error)=>console.error(error));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
