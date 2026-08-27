/* Musing 08 artwork loader — reconstruct the selected sketch, then remove the
   edge-connected cream paper so the illustration inherits whatever paper it
   sits on (card or field-note modal). */
(function(){
  const SELECTOR='.m08-art';
  const BASE='/assets/dmt/m08-b64-small/';
  const FILES=['00.txt','01.txt','02.txt'];
  const EXPECTED_LENGTH=42976;
  let artSrc='';

  function apply(root=document){
    if(!artSrc) return;
    if(root.matches && root.matches(SELECTOR)) root.src=artSrc;
    if(root.querySelectorAll) root.querySelectorAll(SELECTOR).forEach(img=>{
      if(img.getAttribute('src')!==artSrc) img.setAttribute('src',artSrc);
      img.removeAttribute('srcset');
      img.setAttribute('loading','eager');
    });
  }

  function loadImage(src){
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.onload=()=>resolve(img);
      img.onerror=reject;
      img.src=src;
    });
  }

  function makePaperTransparent(img){
    const canvas=document.createElement('canvas');
    canvas.width=img.naturalWidth||img.width;
    canvas.height=img.naturalHeight||img.height;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(img,0,0);

    const frame=ctx.getImageData(0,0,canvas.width,canvas.height);
    const data=frame.data;
    const w=canvas.width;
    const h=canvas.height;
    const seen=new Uint8Array(w*h);
    const queue=new Int32Array(w*h);
    let head=0;
    let tail=0;

    /* Sampled from the generated artwork's outer paper, not from the website. */
    const rr=253, rg=247, rb=234;
    const threshold2=42*42;

    function eligible(pixel){
      const p=pixel*4;
      const r=data[p], g=data[p+1], b=data[p+2];
      if(r<195 || g<195 || b<195) return false;
      const dr=r-rr, dg=g-rg, db=b-rb;
      return dr*dr+dg*dg+db*db<threshold2;
    }

    function add(pixel){
      if(pixel<0 || pixel>=w*h || seen[pixel] || !eligible(pixel)) return;
      seen[pixel]=1;
      queue[tail++]=pixel;
    }

    for(let x=0;x<w;x++){ add(x); add((h-1)*w+x); }
    for(let y=0;y<h;y++){ add(y*w); add(y*w+w-1); }

    while(head<tail){
      const pixel=queue[head++];
      const p=pixel*4;
      data[p+3]=0;
      const x=pixel%w;
      if(x>0) add(pixel-1);
      if(x<w-1) add(pixel+1);
      if(pixel>=w) add(pixel-w);
      if(pixel<w*(h-1)) add(pixel+w);
    }

    ctx.putImageData(frame,0,0);
    return canvas.toDataURL('image/png');
  }

  async function build(){
    const parts=await Promise.all(FILES.map(async(name)=>{
      const response=await fetch(BASE+name+'?v=20260827a',{cache:'no-store'});
      if(!response.ok) throw new Error('Musing 08 artwork chunk failed: '+name+' '+response.status);
      return (await response.text()).replace(/\s+/g,'');
    }));
    const b64=parts.join('');
    if(b64.length!==EXPECTED_LENGTH || !b64.startsWith('UklG')){
      throw new Error('Musing 08 artwork validation failed: '+b64.length);
    }

    const original='data:image/webp;base64,'+b64;
    const img=await loadImage(original);
    artSrc=makePaperTransparent(img);
    apply(document);
  }

  function start(){
    const observer=new MutationObserver(mutations=>{
      for(const mutation of mutations){
        for(const node of mutation.addedNodes){
          if(node.nodeType===1) apply(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
    build().catch(error=>console.error(error));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
