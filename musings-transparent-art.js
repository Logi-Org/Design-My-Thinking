/* Musings transparent artwork pass — 2026-08-25.
   Removes the baked cream paper from the approved illustrations at runtime
   so the sketches sit directly on the musing-card / field-note paper surface. */
(function(){
  const ART = [
    {cls:'musing-thumb--scenarios', url:'assets/dmt/musings-approved-scenarios.webp?v=20260816b'},
    {cls:'musing-thumb--questions', url:'assets/dmt/musings-approved-seed.webp?v=20260816b'},
    {cls:'musing-thumb--canvas', url:'assets/dmt/musings-approved-canvas.webp?v=20260816b'},
    {cls:'musing-thumb--html', url:'assets/dmt/musings-approved-wallpaper.webp?v=20260816b'},
    {cls:'musing-thumb--reverse-flow', url:'assets/dmt/musing-05-start-big-then-go-deep.webp?v=20260825c'},
    {cls:'field-note-sketch--scenarios', url:'assets/dmt/musings-approved-scenarios.webp?v=20260816b'},
    {cls:'field-note-sketch--questions', url:'assets/dmt/musings-approved-seed.webp?v=20260816b'},
    {cls:'field-note-sketch--canvas', url:'assets/dmt/musings-approved-canvas.webp?v=20260816b'},
    {cls:'field-note-sketch--html', url:'assets/dmt/musings-approved-wallpaper.webp?v=20260816b'},
    {cls:'field-note-sketch--reverse-flow', url:'assets/dmt/musing-05-start-big-then-go-deep.webp?v=20260825c'}
  ];

  const cache = new Map();

  function averageBackground(data,w,h){
    const samples=[];
    const padX=Math.max(8,Math.floor(w*.08));
    const padY=Math.max(8,Math.floor(h*.08));
    const areas=[
      [0,padX,0,padY], [w-padX,w,0,padY],
      [0,padX,h-padY,h], [w-padX,w,h-padY,h]
    ];
    for(const [x0,x1,y0,y1] of areas){
      for(let y=y0;y<y1;y+=2){
        for(let x=x0;x<x1;x+=2){
          const i=(y*w+x)*4;
          const r=data[i],g=data[i+1],b=data[i+2];
          const max=Math.max(r,g,b), min=Math.min(r,g,b);
          const sat=max-min;
          const lum=.2126*r+.7152*g+.0722*b;
          if(lum>165 && sat<70) samples.push([r,g,b]);
        }
      }
    }
    if(!samples.length) return [247,233,207];
    samples.sort((a,b)=>(a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]));
    const mid=samples.slice(Math.floor(samples.length*.2),Math.ceil(samples.length*.8));
    const sum=mid.reduce((s,p)=>[s[0]+p[0],s[1]+p[1],s[2]+p[2]],[0,0,0]);
    return sum.map(v=>v/mid.length);
  }

  function transparentDataURL(img){
    const c=document.createElement('canvas');
    c.width=img.naturalWidth; c.height=img.naturalHeight;
    const ctx=c.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(img,0,0);
    const image=ctx.getImageData(0,0,c.width,c.height);
    const d=image.data;
    const bg=averageBackground(d,c.width,c.height);

    for(let i=0;i<d.length;i+=4){
      const r=d[i],g=d[i+1],b=d[i+2];
      const max=Math.max(r,g,b), min=Math.min(r,g,b);
      const sat=max-min;
      const lum=.2126*r+.7152*g+.0722*b;
      const dr=r-bg[0], dg=g-bg[1], db=b-bg[2];
      const dist=Math.sqrt(dr*dr+dg*dg+db*db);

      let a=255;
      // Fully remove the sampled paper tone and very pale neutral paper texture.
      if(dist<22 && lum>145 && sat<72){
        a=0;
      } else if(dist<68 && lum>155 && sat<62){
        a=Math.round(255*((dist-22)/(68-22)));
      } else if(lum>238 && sat<34){
        a=0;
      } else if(lum>220 && sat<48 && dist<90){
        a=Math.min(a,Math.round(255*((dist-35)/55)));
      }
      d[i+3]=Math.max(0,Math.min(255,a));
    }

    ctx.clearRect(0,0,c.width,c.height);
    ctx.putImageData(image,0,0);
    return c.toDataURL('image/png');
  }

  function load(url){
    if(cache.has(url)) return cache.get(url);
    const p=new Promise((resolve,reject)=>{
      const img=new Image();
      img.decoding='async';
      img.onload=()=>{
        try{ resolve(transparentDataURL(img)); } catch(err){ reject(err); }
      };
      img.onerror=reject;
      img.src=url;
    });
    cache.set(url,p);
    return p;
  }

  function renderHost(host,url){
    if(host.dataset.transparentArt==='done') return;
    host.dataset.transparentArt='pending';
    load(url).then(src=>{
      host.style.setProperty('background-image','none','important');
      host.style.setProperty('background-color','transparent','important');
      host.innerHTML='';
      const img=document.createElement('img');
      img.className='musing-transparent-art';
      img.alt='';
      img.setAttribute('aria-hidden','true');
      img.src=src;
      host.appendChild(img);
      host.dataset.transparentArt='done';
    }).catch(()=>{ host.dataset.transparentArt='failed'; });
  }

  function renderAll(root=document){
    ART.forEach(({cls,url})=>{
      root.querySelectorAll('.'+cls).forEach(host=>renderHost(host,url));
    });
  }

  function start(){
    renderAll();
    const observer=new MutationObserver(muts=>{
      for(const m of muts){
        for(const node of m.addedNodes){
          if(node.nodeType===1){
            if(node.matches && ART.some(a=>node.classList.contains(a.cls))) renderAll(node.parentNode||document);
            else if(node.querySelector) renderAll(node);
          }
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();