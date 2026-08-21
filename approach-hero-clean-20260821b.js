/* Selected Approach mock-up sections, 2026-08-21.
   Redraws ONLY the hero illustration and the After-the-workshop illustration.
   The three content boxes requested to remain unchanged are untouched. */
(function(){
  const INK='#2b241f', PINK='#ee9db4', YELLOW='#f4d452', BLUE='#9ecfda', GREEN='#bfd5ae', PAPER='rgba(255,250,240,.82)';

  function rng(seed){let s=seed>>>0;return()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};}
  function setup(host,w,h,label){
    host.innerHTML=''; host.style.background='none';
    const c=document.createElement('canvas');
    c.className='approach-art-canvas'; c.width=w; c.height=h;
    c.setAttribute('role','img'); c.setAttribute('aria-label',label);
    host.appendChild(c); return c.getContext('2d');
  }
  function line(ctx,pts,r,width=3,passes=2,jitter=2){
    ctx.save();ctx.strokeStyle=INK;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=width;
    for(let p=0;p<passes;p++){
      ctx.beginPath();
      pts.forEach(([x,y],i)=>{x+=(r()-.5)*jitter*2;y+=(r()-.5)*jitter*2;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
      ctx.stroke();
    }
    ctx.restore();
  }
  function poly(ctx,pts,r,fill=null,width=3){
    const q=pts.map(([x,y])=>[x+(r()-.5)*3,y+(r()-.5)*3]);
    if(fill){ctx.save();ctx.fillStyle=fill;ctx.beginPath();q.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();ctx.restore();}
    line(ctx,[...q,q[0]],r,width,2,1.2);
  }
  function ellipse(ctx,x,y,w,h,r,width=3){
    ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=width;
    for(let p=0;p<2;p++){ctx.beginPath();ctx.ellipse(x+(r()-.5)*3,y+(r()-.5)*3,w/2+(r()-.5)*3,h/2+(r()-.5)*3,(r()-.5)*.02,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }
  function text(ctx,s,x,y,size=26,weight=700,align='center'){
    ctx.save();ctx.fillStyle=INK;ctx.font=`${weight} ${size}px Caveat, cursive`;ctx.textAlign=align;ctx.textBaseline='middle';
    const lines=String(s).split('\n'),step=size*.86;
    lines.forEach((t,i)=>ctx.fillText(t,x,y+(i-(lines.length-1)/2)*step));
    ctx.restore();
  }
  function sticky(ctx,x,y,w,h,color,label,r,rot=0,fs=24){
    ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);
    ctx.shadowColor='rgba(45,34,25,.14)';ctx.shadowBlur=7;ctx.shadowOffsetX=4;ctx.shadowOffsetY=5;
    poly(ctx,[[2,5],[w-3,1],[w,h-4],[1,h]],r,color,1.4);
    ctx.shadowColor='transparent';ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1;
    for(let i=0;i<5;i++){const yy=10+r()*(h-20);ctx.beginPath();ctx.moveTo(8+r()*10,yy);ctx.lineTo(w-8-r()*12,yy+(r()-.5)*2);ctx.stroke();}
    text(ctx,label,w/2,h/2+1,fs,700);ctx.restore();
  }
  function paper(ctx,x,y,w,h,r,rot=0){
    ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);
    ctx.shadowColor='rgba(45,34,25,.08)';ctx.shadowBlur=7;ctx.shadowOffsetX=4;ctx.shadowOffsetY=5;
    poly(ctx,[[0,4],[w-4,0],[w,h-4],[w*.82,h],[1,h-2]],r,PAPER,2);
    ctx.restore();
  }
  function arrow(ctx,x1,y1,x2,y2,r,width=3){
    const mx=(x1+x2)/2+(r()-.5)*14,my=(y1+y2)/2+(r()-.5)*12;
    line(ctx,[[x1,y1],[mx,my],[x2,y2]],r,width,2,2);
    const a=Math.atan2(y2-my,x2-mx),L=14;
    line(ctx,[[x2-L*Math.cos(a-.55),y2-L*Math.sin(a-.55)],[x2,y2],[x2-L*Math.cos(a+.55),y2-L*Math.sin(a+.55)]],r,width,2,1.2);
  }
  function person(ctx,x,y,s,r,pose='stand'){
    ellipse(ctx,x,y,22*s,24*s,r,2);line(ctx,[[x,y+12*s],[x,y+45*s]],r,2,1,1);
    if(pose==='point') line(ctx,[[x,y+26*s],[x+30*s,y+10*s]],r,2,1,1);
    else {line(ctx,[[x,y+26*s],[x-17*s,y+37*s]],r,2,1,1);line(ctx,[[x,y+26*s],[x+17*s,y+37*s]],r,2,1,1);}
    line(ctx,[[x,y+45*s],[x-14*s,y+73*s]],r,2,1,1);line(ctx,[[x,y+45*s],[x+14*s,y+73*s]],r,2,1,1);
  }
  function wall(ctx,x,y,w,h,r){
    paper(ctx,x,y,w,h,r,-.01);
    const cols=[YELLOW,PINK,BLUE,GREEN];
    for(let i=0;i<9;i++){
      const sx=x+24+(i%3)*((w-86)/3),sy=y+27+Math.floor(i/3)*48;
      sticky(ctx,sx,sy,48,30,cols[i%4],'',r,(r()-.5)*.08,12);
    }
  }
  function magnifier(ctx,x,y,r){ellipse(ctx,x,y,58,58,r,4);line(ctx,[[x+21,y+21],[x+65,y+64]],r,7,2,1.7);}
  function checkbox(ctx,x,y,r,checked=true){
    poly(ctx,[[x,y],[x+18,y],[x+18,y+18],[x,y+18]],r,null,2);
    if(checked) line(ctx,[[x+3,y+9],[x+8,y+15],[x+20,y-2]],r,3,2,1);
  }
  function decisionSheet(ctx,x,y,w,h,r){
    paper(ctx,x,y,w,h,r,.012);text(ctx,'DECISIONS',x+w/2,y+38,24,700);
    [0,1,2].forEach(i=>{const yy=y+76+i*46;checkbox(ctx,x+22,yy-8,r,true);line(ctx,[[x+55,yy],[x+w-20,yy]],r,2,1,1);});
  }
  function speech(ctx,x,y,w,h,r){
    poly(ctx,[[x,y],[x+w,y+2],[x+w-3,y+h-6],[x+w*.58,y+h-4],[x+w*.47,y+h+10],[x+w*.38,y+h-4],[x+2,y+h-5]],r,null,2);
    ellipse(ctx,x+w*.34,y+h*.47,4,4,r,1);ellipse(ctx,x+w*.50,y+h*.47,4,4,r,1);ellipse(ctx,x+w*.66,y+h*.47,4,4,r,1);
  }

  function drawHero(host){
    const ctx=setup(host,1500,430,'Hand-drawn journey from sponsor brief to better decisions');
    const r=rng(82101);

    // Sponsor brief stack
    for(let i=0;i<4;i++) paper(ctx,35+i*8,126-i*7,205,190,r,(i-1.5)*.022);
    sticky(ctx,80,160,128,82,PINK,'SPONSOR\nBRIEF',r,-.035,25);
    arrow(ctx,250,220,330,220,r,3);

    // Interrogate
    sticky(ctx,345,128,160,94,YELLOW,'INTERROGATE\nTHE REAL\nQUESTION',r,-.02,22);
    magnifier(ctx,422,292,r);
    arrow(ctx,520,220,595,220,r,3);

    // Design right intervention
    sticky(ctx,610,128,172,94,BLUE,'DESIGN THE\nRIGHT\nINTERVENTION',r,.018,22);
    arrow(ctx,800,220,875,220,r,3);

    // Make thinking visible + workshop wall
    sticky(ctx,888,98,184,86,YELLOW,'MAKE THINKING\nVISIBLE',r,-.018,23);
    wall(ctx,882,205,232,166,r);
    person(ctx,854,304,.64,r,'point'); person(ctx,1138,310,.62,r,'stand');
    arrow(ctx,1125,220,1190,220,r,3);

    // Better decisions
    sticky(ctx,1202,98,168,80,PINK,'BETTER\nDECISIONS',r,.025,23);
    decisionSheet(ctx,1200,205,210,184,r);
  }

  function drawAfter(host){
    const ctx=setup(host,1500,430,'Hand-drawn workshop momentum sequence from visible thinking to decisions, shareback, continued conversation and action beyond the room');
    const r=rng(82102);

    // Visible thinking in the room
    wall(ctx,35,105,270,205,r);
    person(ctx,28,326,.62,r,'point');person(ctx,117,330,.58,r,'stand');person(ctx,235,330,.58,r,'stand');person(ctx,314,326,.62,r,'stand');
    arrow(ctx,330,214,430,214,r,3);

    // Capture what matters
    paper(ctx,455,72,250,292,r,-.012);
    sticky(ctx,505,54,130,66,PINK,'KEY\nINSIGHTS',r,.018,20);
    const rows=['DECISIONS','ACTIONS','OWNERS','NEXT STEPS'];
    rows.forEach((lab,i)=>{const yy=150+i*48;checkbox(ctx,495,yy-9,r,true);text(ctx,lab,535,yy,20,700,'left');});
    sticky(ctx,625,320,116,62,YELLOW,'SHARE\nBACK',r,-.025,18);
    arrow(ctx,735,214,825,214,r,3);

    // Share back / keep the conversation moving
    speech(ctx,815,65,76,44,r);speech(ctx,960,72,76,44,r);speech(ctx,1088,112,76,44,r);
    person(ctx,845,250,.62,r,'stand');person(ctx,925,310,.58,r,'stand');person(ctx,1004,255,.62,r,'stand');person(ctx,1090,302,.58,r,'stand');
    paper(ctx,882,208,178,110,r,.01);
    sticky(ctx,902,225,44,28,PINK,'',r,-.03,11);sticky(ctx,956,244,44,28,BLUE,'',r,.02,11);sticky(ctx,1006,226,44,28,YELLOW,'',r,-.02,11);
    arrow(ctx,1125,214,1200,214,r,3);

    // Car park / continuation beyond the room
    line(ctx,[[1208,244],[1310,244],[1335,260],[1354,260],[1364,285],[1210,285],[1200,264],[1208,244]],r,2.5,2,2);
    ellipse(ctx,1238,286,28,28,r,2);ellipse(ctx,1328,286,28,28,r,2);
    line(ctx,[[1250,245],[1278,220],[1312,220],[1332,244]],r,2.2,2,1.5);
    // road + small sun/tree marks
    line(ctx,[[1375,420],[1420,382],[1460,350],[1490,338]],r,2.3,2,3);
    line(ctx,[[1348,420],[1392,382],[1438,350],[1480,338]],r,1.5,1,2);
    ellipse(ctx,1435,88,34,34,r,2);for(let i=0;i<8;i++){const a=i*Math.PI/4;line(ctx,[[1435+26*Math.cos(a),88+26*Math.sin(a)],[1435+38*Math.cos(a),88+38*Math.sin(a)]],r,1.6,1,1);}
    line(ctx,[[1382,214],[1382,169]],r,2,2,1);poly(ctx,[[1368,180],[1382,143],[1398,180]],r,null,2);poly(ctx,[[1364,198],[1382,158],[1401,198]],r,null,2);
  }

  function render(){
    const hero=document.querySelector('.approach-hero-art'); if(hero) drawHero(hero);
    const after=document.querySelector('.after-work-art'); if(after) drawAfter(after);
  }
  function boot(){requestAnimationFrame(()=>requestAnimationFrame(render));}
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(boot);
  else window.addEventListener('load',boot,{once:true});
})();
