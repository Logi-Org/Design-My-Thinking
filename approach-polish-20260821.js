/* Enlarge the three small handwritten captions under the after-work sketch. */
(function(){
  function drawLines(ctx, lines, x, y, size, step){
    ctx.save();
    ctx.fillStyle='#2b241f';
    ctx.font=`700 ${size}px Caveat, cursive`;
    ctx.textAlign='left';
    ctx.textBaseline='middle';
    lines.forEach((line,i)=>ctx.fillText(line,x,y+i*step));
    ctx.restore();
  }

  function roughUnderline(ctx,x1,y,x2){
    ctx.save();
    ctx.strokeStyle='#2b241f';
    ctx.lineWidth=4;
    ctx.lineCap='round';
    ctx.beginPath();
    ctx.moveTo(x1,y);
    ctx.quadraticCurveTo((x1+x2)/2,y+2,x2,y-1);
    ctx.stroke();
    ctx.restore();
  }

  function polish(){
    const canvas=document.querySelector('.after-work-art .approach-art-canvas');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');

    // Remove the original tiny labels only; the sketch remains untouched.
    ctx.clearRect(58,418,320,82);
    ctx.clearRect(540,414,360,86);
    ctx.clearRect(1090,402,390,98);

    drawLines(ctx,['From energy in','the room...'],92,440,31,28);
    drawLines(ctx,['Capture what matters','in a usable way...'],565,440,31,28);
    drawLines(ctx,['...so the work','continues beyond','the car park.'],1120,424,29,25);
    roughUnderline(ctx,1140,480,1325);
  }

  function boot(){
    const run=()=>requestAnimationFrame(()=>requestAnimationFrame(polish));
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(run);
    else window.addEventListener('load',run,{once:true});
  }
  boot();
})();
