/* Musing 07 artwork fix — reconstruct the approved sketch from verified public source chunks. */
(function(){
  const SELECTOR='.musing-thumb--knowledge-podcast img, .field-note-sketch--knowledge-podcast img';
  const BASE='/assets/dmt/m07-b64-v2/';
  const FILES=['00.txt','01.txt','02.txt','03.txt','04a.txt','04b.txt'];
  const EXPECTED_LENGTH=39432;
  const PLACEHOLDER='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 9%22%3E%3Crect width=%2216%22 height=%229%22 fill=%22%23f3dfaa%22/%3E%3C/svg%3E';
  let artSrc=PLACEHOLDER;
  let applying=false;

  function setImage(img){
    if(!img || !img.matches || !img.matches(SELECTOR)) return;
    if(img.getAttribute('src')!==artSrc) img.setAttribute('src',artSrc);
    img.removeAttribute('srcset');
    img.setAttribute('loading','eager');
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

  async function build(){
    const parts=await Promise.all(FILES.map(async(name)=>{
      const response=await fetch(BASE+name+'?v=20260826g',{cache:'no-store'});
      if(!response.ok) throw new Error('Musing 07 artwork chunk failed: '+name+' '+response.status);
      return (await response.text()).replace(/\s+/g,'');
    }));
    const b64=parts.join('');
    if(b64.length!==EXPECTED_LENGTH || !b64.startsWith('/9j/') || !b64.endsWith('/2Q==')){
      throw new Error('Musing 07 artwork validation failed: '+b64.length);
    }
    artSrc='data:image/jpeg;base64,'+b64;
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
