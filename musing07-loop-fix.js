/* Musing 07 — remove redundant intro copy and ensure live cloned demo screens advance. */
(function(){
  const TEMPLATE='musing-knowledge-podcast';

  function stripIntro(root){
    if(!root || !root.querySelectorAll) return;
    root.querySelectorAll('.m07-v2-intro p').forEach((p)=>p.remove());
  }

  function bindLive(root=document){
    if(!root || !root.querySelectorAll) return;
    root.querySelectorAll('[data-m07-v2]').forEach((demo)=>{
      // Use a JS property rather than a data-* attribute because attributes are
      // copied when <template> content is cloned into the modal, while event
      // listeners and timers are not.
      if(demo.__m07LiveLoopBound) return;
      demo.__m07LiveLoopBound=true;

      const steps=[...demo.querySelectorAll('[data-v2-step]')];
      const scenes=[...demo.querySelectorAll('[data-v2-scene]')];
      const rail=demo.querySelector('.m07-v2-rail-line span');
      const loop=demo.querySelector('.m07-v2-loop i b');
      if(!steps.length || !scenes.length) return;

      let index=Math.max(0,scenes.findIndex((scene)=>scene.classList.contains('is-active')));
      let timer=null;

      function show(next){
        index=(next+scenes.length)%scenes.length;
        steps.forEach((el,i)=>el.classList.toggle('is-active',i===index));
        scenes.forEach((el,i)=>el.classList.toggle('is-active',i===index));
        if(rail) rail.style.height=((index+1)/scenes.length*100)+'%';
        if(loop){
          loop.style.animation='none';
          void loop.offsetWidth;
          loop.style.animation='m07v2Loop 8s linear forwards';
        }
      }

      function restart(){
        if(timer) clearInterval(timer);
        timer=setInterval(()=>show(index+1),8000);
      }

      steps.forEach((step,i)=>{
        step.addEventListener('click',()=>{
          show(i);
          restart();
        });
      });

      show(index);
      restart();
    });
  }

  function cleanTemplate(){
    const template=document.getElementById(TEMPLATE);
    if(template && template.content) stripIntro(template.content);
  }

  function upgrade(root=document){
    stripIntro(root);
    bindLive(root);
  }

  function start(){
    cleanTemplate();
    upgrade(document);

    const observer=new MutationObserver((mutations)=>{
      for(const mutation of mutations){
        for(const node of mutation.addedNodes){
          if(node.nodeType!==1) continue;
          upgrade(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});

    // Modal content can be injected as a result of a card click. Recheck on the
    // next frame so the newly cloned live demo always gets its own timer.
    document.addEventListener('click',()=>{
      requestAnimationFrame(()=>upgrade(document));
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
