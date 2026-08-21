/* Exact approved problem illustrations — cleaned transparent treatment, 2026-08-21.
   Preserve the approved artwork, remove its faint baked-in paper colour at runtime,
   trim excess whitespace and let each sketch occupy more of the card. */
(function(){
  const VERSION='20260821problems4';
  const sources=[
    `assets/dmt/problem-exact/p1.webp?v=${VERSION}`,
    `assets/dmt/problem-exact/p2.webp?v=${VERSION}`,
    `assets/dmt/problem-exact/p3.webp?v=${VERSION}`,
    `assets/dmt/problem-exact/p4.webp?v=${VERSION}`,
    `assets/dmt/problem-exact/p5.webp?v=${VERSION}`
  ];
  const labels=[
    'A repeating loop of the same conversation',
    'People uncertain about a tangled central problem',
    'Many voices narrowing into one clear decision',
    'Many stakeholders connected to one unclear central knot',
    'AI progressing from task automation through workflow, function and company impact'
  ];

  function installStyles(){
    if(document.getElementById('problem-art-clean-styles')) return;
    const style=document.createElement('style');
    style.id='problem-art-clean-styles';
    style.textContent=`
      #problems .problem-note{min-height:395px!important;padding-bottom:18px!important}
      #problems .problem-art{height:210px!important;margin-top:6px!important;background:none!important;overflow:visible!important;display:flex!important;align-items:center!important;justify-content:center!important}
      #problems .problem-exact-canvas{display:block!important;width:auto!important;height:auto!important;max-width:118%!important;max-height:100%!important;mix-blend-mode:normal!important;filter:none!important}
      #problems .problem-note:nth-child(5) .problem-exact-canvas{max-width:112%!important}
      @media(max-width:1000px){
        #problems .problem-note{min-height:385px!important}
        #problems .problem-art{height:205px!important}
      }
      @media(max-width:700px){
        #problems .problem-note{min-height:370px!important;padding-bottom:16px!important}
        #problems .problem-art{height:200px!important;margin-top:4px!important}
        #problems .problem-exact-canvas{max-width:112%!important}
        #problems .problem-note:nth-child(5) .problem-exact-canvas{max-width:108%!important}
      }
    `;
    document.head.appendChild(style);
  }

  function median(values){
    values.sort((a,b)=>a-b);
    return values[Math.floor(values.length/2)]||0;
  }

  function sampleBackground(data,w,h){
    const rs=[],gs=[],bs=[];
    const patch=Math.max(4,Math.floor(Math.min(w,h)*.045));
    const corners=[[0,0],[w-patch,0],[0,h-patch],[w-patch,h-patch]];
    corners.forEach(([sx,sy])=>{
      for(let y=sy;y<Math.min(h,sy+patch);y+=2){
        for(let x=sx;x<Math.min(w,sx+patch);x+=2){
          const i=(y*w+x)*4;
          if(data[i+3]<220) continue;
          const max=Math.max(data[i],data[i+1],data[i+2]);
          const min=Math.min(data[i],data[i+1],data[i+2]);
          if(max-min>48) continue;
          rs.push(data[i]);gs.push(data[i+1]);bs.push(data[i+2]);
        }
      }
    });
    return [median(rs),median(gs),median(bs)];
  }

  function removePaperAndTrim(img,index){
    const source=document.createElement('canvas');
    source.width=img.naturalWidth||img.width;
    source.height=img.naturalHeight||img.height;
    const ctx=source.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(img,0,0);
    const image=ctx.getImageData(0,0,source.width,source.height);
    const d=image.data;
    const [br,bg,bb]=sampleBackground(d,source.width,source.height);

    let minX=source.width,minY=source.height,maxX=-1,maxY=-1;
    for(let y=0;y<source.height;y++){
      for(let x=0;x<source.width;x++){
        const i=(y*source.width+x)*4;
        const a=d[i+3];
        if(!a) continue;
        const r=d[i],g=d[i+1],b=d[i+2];
        const dr=r-br,dg=g-bg,db=b-bb;
        const distance=Math.sqrt(dr*dr+dg*dg+db*db);
        const max=Math.max(r,g,b),min=Math.min(r,g,b);
        const chroma=max-min;
        const lum=.2126*r+.7152*g+.0722*b;

        let keep=1;
        if(distance<=18){
          keep=0;
        }else if(distance<58 && lum>175 && chroma<66){
          keep=(distance-18)/40;
        }else if(lum>232 && chroma<35 && distance<78){
          keep=Math.min(keep,(distance-16)/62);
        }
        keep=Math.max(0,Math.min(1,keep));
        d[i+3]=Math.round(a*keep);

        if(d[i+3]>28){
          if(x<minX) minX=x;
          if(x>maxX) maxX=x;
          if(y<minY) minY=y;
          if(y>maxY) maxY=y;
        }
      }
    }
    ctx.putImageData(image,0,0);

    if(maxX<minX||maxY<minY) return source;
    const padX=Math.max(8,Math.round((maxX-minX)*.035));
    const padY=Math.max(8,Math.round((maxY-minY)*.045));
    const sx=Math.max(0,minX-padX),sy=Math.max(0,minY-padY);
    const ex=Math.min(source.width,maxX+padX+1),ey=Math.min(source.height,maxY+padY+1);
    const out=document.createElement('canvas');
    out.width=ex-sx;
    out.height=ey-sy;
    out.className='problem-exact-canvas';
    out.dataset.problemExact=String(index+1);
    out.dataset.problemVersion=VERSION;
    out.setAttribute('role','img');
    out.setAttribute('aria-label',labels[index]);
    out.getContext('2d').drawImage(source,sx,sy,out.width,out.height,0,0,out.width,out.height);
    return out;
  }

  function fallback(host,img,index){
    img.className='problem-exact-image';
    img.dataset.problemExact=String(index+1);
    img.alt=labels[index];
    img.draggable=false;
    img.style.cssText='display:block;width:auto;height:auto;max-width:118%;max-height:100%;object-fit:contain;mix-blend-mode:multiply;filter:brightness(1.08) contrast(1.08);';
    host.replaceChildren(img);
  }

  function install(host,index){
    const src=sources[index];
    if(!host||!src) return;
    const existing=host.querySelector(`.problem-exact-canvas[data-problem-version="${VERSION}"]`);
    if(existing) return;
    if(host.dataset.problemCleanBusy==='1') return;
    host.dataset.problemCleanBusy='1';
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.style.setProperty('display','flex','important');
    host.style.setProperty('align-items','center','important');
    host.style.setProperty('justify-content','center','important');
    host.style.setProperty('overflow','visible','important');

    const img=new Image();
    img.decoding='async';
    img.onload=()=>{
      try{
        const canvas=removePaperAndTrim(img,index);
        if(!canvas.classList.contains('problem-exact-canvas')){
          canvas.className='problem-exact-canvas';
          canvas.dataset.problemExact=String(index+1);
          canvas.dataset.problemVersion=VERSION;
          canvas.setAttribute('role','img');
          canvas.setAttribute('aria-label',labels[index]);
        }
        host.replaceChildren(canvas);
      }catch(err){
        fallback(host,img,index);
      }finally{
        host.dataset.problemCleanBusy='0';
      }
    };
    img.onerror=()=>{host.dataset.problemCleanBusy='0';};
    img.src=src;
  }

  function render(){
    installStyles();
    document.querySelectorAll('#problems .pr-img').forEach((host,index)=>install(host,index));
  }

  function protect(){
    document.querySelectorAll('#problems .pr-img').forEach((host,index)=>{
      if(host.dataset.problemExactObserver==='clean') return;
      host.dataset.problemExactObserver='clean';
      new MutationObserver(()=>{
        if(host.dataset.problemCleanBusy!=='1' && !host.querySelector(`.problem-exact-canvas[data-problem-version="${VERSION}"]`)) install(host,index);
      }).observe(host,{childList:true});
    });
  }

  render();
  protect();
  requestAnimationFrame(()=>{render();protect();});
  window.addEventListener('load',()=>{render();protect();setTimeout(render,250);setTimeout(render,1200);},{once:true});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{render();protect();});
})();
