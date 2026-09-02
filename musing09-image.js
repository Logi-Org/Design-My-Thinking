/* Musing 09 artwork loader — reconstruct the selected sketch from public base64 chunks. */
(function(){
  const SELECTOR='.m09-art';
  const BASE='/assets/dmt/m09-b64-small/';
  const FILES=['00.txt','01.txt','02.txt'];
  const EXPECTED_LENGTH=39672;
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

  async function build(){
    const parts=await Promise.all(FILES.map(async(name)=>{
      const response=await fetch(BASE+name+'?v=20260902a',{cache:'no-store'});
      if(!response.ok) throw new Error('Musing 09 artwork chunk failed: '+name+' '+response.status);
      return (await response.text()).replace(/\s+/g,'');
    }));
    const b64=parts.join('');
    if(b64.length!==EXPECTED_LENGTH || !b64.startsWith('UklG')){
      throw new Error('Musing 09 artwork validation failed: '+b64.length);
    }
    artSrc='data:image/webp;base64,'+b64;
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
