/* Remove the small explanatory labels from the Approach hero canvas.
   Keep the main Post-it labels and decision artefacts intact. */
(function(){
  function cleanHero(){
    const canvas=document.querySelector('.approach-hero-art .approach-art-canvas');
    if(!canvas) return false;
    const ctx=canvas.getContext('2d');
    if(!ctx) return false;

    const boxes=[
      [35,70,215,70],      // lots of things on the table
      [30,425,220,75],     // coffee + notes
      [475,245,190,105],   // what are we really trying to change?
      [735,20,245,90],     // shape the space / choose methods / set conditions
      [1120,175,145,90],   // clarity emerges
      [1235,15,185,80],    // decisions people own
      [1355,405,145,90]    // action follows
    ];
    boxes.forEach(([x,y,w,h])=>ctx.clearRect(x,y,w,h));
    return true;
  }

  function run(attempt){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(!cleanHero() && attempt<20) setTimeout(()=>run(attempt+1),80);
    }));
  }

  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>run(0));
  else window.addEventListener('load',()=>run(0),{once:true});
})();
