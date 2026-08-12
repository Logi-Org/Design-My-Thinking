/* Assemble the high-resolution generated artwork from small JS chunks.
   This keeps the real generated artwork while leaving copy/layout/interaction in HTML. */
(function(){
  const art=window.DMT_ART||{};
  const dataUrl=(b64)=>b64?`url("data:image/avif;base64,${b64}")`:'';

  const hero=document.querySelector('.hero-paper-v3');
  if(hero&&art.hero){
    hero.style.setProperty('background-image',dataUrl(art.hero),'important');
    hero.style.setProperty('background-size','contain','important');
    hero.style.setProperty('background-position','center','important');
    hero.style.setProperty('background-repeat','no-repeat','important');
  }

  if(art.glimpses){
    document.querySelectorAll('.gl-img').forEach((el)=>{
      el.style.setProperty('background-image',dataUrl(art.glimpses),'important');
    });
  }

  if(art.problems){
    document.querySelectorAll('.pr-img').forEach((el)=>{
      el.style.setProperty('background-image',dataUrl(art.problems),'important');
    });
  }
})();
