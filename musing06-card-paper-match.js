/* Musing 06 card paper-match — 2026-08-26.
   Removes only the edge-connected baked paper background from the Musing 06
   card image so the card's own #fff8e9 Post-it colour shows through exactly. */
(function(){
  const SELECTOR='.musing-card .musing-m06-art';
  const cache=new Map();

  function estimateBackground(data,w,h){
    const samples=[];
    const padX=Math.max(8,Math.floor(w*.08));
    const padY=Math.max(8,Math.floor(h*.08));
    const areas=[[0,padX,0,padY],[w-padX,w,0,padY],[0,padX,h-padY,h],[w-padX,w,h-padY,h]];
    for(const [x0,x1,y0,y1] of areas){
      for(let y=y0;y<y1;y+=2){
        for(let x=x0;x<x1;x+=2){
          const i=(y*w+x)*4;
          const r=data[i],g=data[i+1],b=data[i+2];
          const max=Math.max(r,g,b),min=Math.min(r,g,b),sat=max-min;
          const lum=.2126*r+.7152*g+.0722*b;
          if(lum>150 && sat<95) samples.push([r,g,b]);
        }
      }
    }
    if(!samples.length) return [247,233,207];
    samples.sort((a,b)=>(a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]));
    const lo=Math.floor(samples.length*.15),hi=Math.ceil(samples.length*.85);
    const mid=samples.slice(lo,hi);
    const sum=mid.reduce((s,p)=>[s[0]+p[0],s[1]+p[1],s[2]+p[2]],[0,0,0]);
    return sum.map(v=>v/mid.length);
  }

  function edgeConnectedPaperMask(img){
    const canvas=document.createElement('canvas');
    const w=img.naturalWidth,h=img.naturalHeight;
    canvas.width=w; canvas.height=h;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(img,0,0);
    const image=ctx.getImageData(0,0,w,h),data=image.data;
    const bg=estimateBackground(data,w,h);
    const seen=new Uint8Array(w*h);
    const queue=new Int32Array(w*h);
    let head=0,tail=0;

    function isPaper(p){
      const i=p*4,r=data[i],g=data[i+1],b=data[i+2];
      const max=Math.max(r,g,b),min=Math.min(r,g,b),sat=max-min;
      const lum=.2126*r+.7152*g+.0722*b;
      const dr=r-bg[0],dg=g-bg[1],db=b-bg[2];
      const dist2=dr*dr+dg*dg+db*db;
      return lum>135 && sat<105 && dist2<6400;
    }

    function seed(p){
      if(seen[p] || !isPaper(p)) return;
      seen[p]=1; queue[tail++]=p;
    }

    for(let x=0;x<w;x++){ seed(x); seed((h-1)*w+x); }
    for(let y=1;y<h-1;y++){ seed(y*w); seed(y*w+w-1); }

    while(head<tail){
      const p=queue[head++];
      const i=p*4,r=data[i],g=data[i+1],b=data[i+2];
      const dr=r-bg[0],dg=g-bg[1],db=b-bg[2];
      const dist=Math.sqrt(dr*dr+dg*dg+db*db);
      const alpha=dist<=30?0:Math.round(255*Math.min(1,(dist-30)/50));
      data[i+3]=Math.min(data[i+3],alpha);

      const x=p%w,y=(p-x)/w;
      let n;
      if(x>0){ n=p-1; if(!seen[n] && isPaper(n)){ seen[n]=1; queue[tail++]=n; } }
      if(x<w-1){ n=p+1; if(!seen[n] && isPaper(n)){ seen[n]=1; queue[tail++]=n; } }
      if(y>0){ n=p-w; if(!seen[n] && isPaper(n)){ seen[n]=1; queue[tail++]=n; } }
      if(y<h-1){ n=p+w; if(!seen[n] && isPaper(n)){ seen[n]=1; queue[tail++]=n; } }
    }

    ctx.clearRect(0,0,w,h);
    ctx.putImageData(image,0,0);
    return canvas.toDataURL('image/png');
  }

  function converted(url){
    if(cache.has(url)) return cache.get(url);
    const promise=new Promise((resolve,reject)=>{
      const source=new Image();
      source.decoding='async';
      source.onload=()=>{
        try{ resolve(edgeConnectedPaperMask(source)); }
        catch(err){ reject(err); }
      };
      source.onerror=reject;
      source.src=url;
    });
    cache.set(url,promise);
    return promise;
  }

  function process(img){
    if(img.dataset.paperMatch==='done' || img.dataset.paperMatch==='pending') return;
    const url=img.currentSrc||img.src;
    if(!url || url.startsWith('data:')) return;
    img.dataset.paperMatch='pending';
    converted(url).then(src=>{
      img.dataset.paperMatch='done';
      img.src=src;
    }).catch(()=>{ img.dataset.paperMatch='failed'; });
  }

  function scan(root=document){
    if(root.matches && root.matches(SELECTOR)) process(root);
    if(root.querySelectorAll) root.querySelectorAll(SELECTOR).forEach(process);
  }

  function start(){
    scan();
    const observer=new MutationObserver(mutations=>{
      for(const mutation of mutations){
        for(const node of mutation.addedNodes){
          if(node.nodeType===1) scan(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
