/* Musing 06 compatibility fix — use the approved JPG directly on all browsers. */
(function(){
  const SRC='/assets/dmt/musing-06-let-the-workshop-remember.jpg?v=20260825d';

  function apply(root=document){
    root.querySelectorAll('.musing-m06-art').forEach((img)=>{
      if(img.getAttribute('src')!==SRC) img.setAttribute('src',SRC);
    });
  }

  function start(){
    apply();
    const observer=new MutationObserver((muts)=>{
      for(const m of muts){
        for(const node of m.addedNodes){
          if(node.nodeType!==1) continue;
          if(node.matches && node.matches('.musing-m06-art')) node.setAttribute('src',SRC);
          if(node.querySelectorAll) apply(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
