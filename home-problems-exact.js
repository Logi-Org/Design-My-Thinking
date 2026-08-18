/* Exact approved simplified problem illustrations — 2026-08-18. */
(function(){
  const sources=[
    'assets/dmt/problem-exact/p1.webp?v=20260818problems1',
    'assets/dmt/problem-exact/p2.webp?v=20260818problems1',
    'assets/dmt/problem-exact/p3.webp?v=20260818problems1',
    'assets/dmt/problem-exact/p4.webp?v=20260818problems1',
    'assets/dmt/problem-exact/p5.webp?v=20260818problems1'
  ];
  const labels=[
    'A repeating loop of the same conversation',
    'People uncertain about a tangled central problem',
    'Many voices narrowing into one clear decision',
    'Many stakeholders connected to one unclear central knot',
    'AI progressing from task automation through workflow, team and company impact'
  ];

  function install(host,index){
    const src=sources[index];
    if(!host||!src) return;
    const existing=host.querySelector('img.problem-exact-image');
    if(existing?.dataset.problemExact===String(index+1) && existing.getAttribute('src')===src) return;
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.style.setProperty('display','flex','important');
    host.style.setProperty('align-items','center','important');
    host.style.setProperty('justify-content','center','important');
    host.style.setProperty('overflow','hidden','important');
    host.replaceChildren();
    const img=document.createElement('img');
    img.className='problem-exact-image';
    img.dataset.problemExact=String(index+1);
    img.src=src;
    img.alt=labels[index];
    img.decoding='async';
    img.draggable=false;
    img.style.width='100%';
    img.style.height='100%';
    img.style.maxWidth='100%';
    img.style.maxHeight='100%';
    img.style.objectFit='contain';
    img.style.display='block';
    host.appendChild(img);
  }

  function render(){
    document.querySelectorAll('#problems .pr-img').forEach((host,index)=>install(host,index));
  }

  function protect(){
    document.querySelectorAll('#problems .pr-img').forEach((host,index)=>{
      if(host.dataset.problemExactObserver==='1') return;
      host.dataset.problemExactObserver='1';
      new MutationObserver(()=>install(host,index)).observe(host,{childList:true});
    });
  }

  render();
  protect();
  requestAnimationFrame(()=>{render();protect();});
  window.addEventListener('load',()=>{render();protect();setTimeout(render,250);setTimeout(render,1200);},{once:true});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{render();protect();});
})();
