/* Remove the pale canvas rectangle from the two approved homepage sketches.
   The actual ink, coloured Post-its and text remain; only very light paper pixels
   are made transparent so the drawing sits on the card surface like its neighbours. */
(function(){
  function clearLightPaper(canvas){
    if(!canvas || canvas.dataset.bgCleaned === '1') return;
    const ctx = canvas.getContext('2d', {willReadFrequently:true});
    if(!ctx) return;
    const image = ctx.getImageData(0,0,canvas.width,canvas.height);
    const d = image.data;
    for(let i=0;i<d.length;i+=4){
      const r=d[i], g=d[i+1], b=d[i+2];
      const max=Math.max(r,g,b), min=Math.min(r,g,b);
      /* Cream/paper/grain range only. Coloured notes and dark ink stay intact. */
      if(r>220 && g>210 && b>195 && (max-min)<38){
        d[i+3]=0;
      }
    }
    ctx.putImageData(image,0,0);
    canvas.dataset.bgCleaned='1';
  }

  function clean(){
    document.querySelectorAll('.art-glimpse-01 canvas, .art-problem-03 canvas').forEach(clearLightPaper);
  }

  function schedule(){
    requestAnimationFrame(()=>requestAnimationFrame(clean));
    setTimeout(clean,120);
    setTimeout(clean,400);
  }

  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(schedule);
  } else if(document.readyState === 'loading'){
    window.addEventListener('load',schedule,{once:true});
  } else {
    schedule();
  }
})();
