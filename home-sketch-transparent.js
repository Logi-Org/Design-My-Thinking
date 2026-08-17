/* Transparent-background homepage sketch renderer — 2026-08-17.
   Same approved hand-drawn content as home-sketch-fix.js, but no coloured canvas/paper rectangle. */
(function(){
  const INK = '#2c251f';
  const PINK = '#ec91a6';
  const YELLOW = '#f5d252';
  const BLUE = '#94cdda';
  const GREEN = '#bbd1aa';

  function rng(seed){
    let s = seed >>> 0;
    return function(){ s = (1664525 * s + 1013904223) >>> 0; return s / 4294967296; };
  }

  function setupCanvas(host, width, height, label){
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'handdrawn-canvas';
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label',label);
    host.appendChild(canvas);
    return canvas;
  }

  function roughLine(ctx, points, rand, width=3, passes=2, jitter=2){
    ctx.save();
    ctx.strokeStyle = INK;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = width;
    for(let p=0;p<passes;p++){
      ctx.beginPath();
      points.forEach((pt,i)=>{
        const x = pt[0] + (rand()-.5)*jitter*2;
        const y = pt[1] + (rand()-.5)*jitter*2;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
    }
    ctx.restore();
  }

  function roughPoly(ctx, points, rand, fill=null, width=3, jitter=2.5){
    const p = points.map(([x,y])=>[x+(rand()-.5)*jitter*2,y+(rand()-.5)*jitter*2]);
    ctx.save();
    if(fill){
      ctx.fillStyle = fill;
      ctx.beginPath();
      p.forEach((pt,i)=>i?ctx.lineTo(pt[0],pt[1]):ctx.moveTo(pt[0],pt[1]));
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    roughLine(ctx,[...p,p[0]],rand,width,2,1.4);
  }

  function roughEllipse(ctx,x,y,w,h,rand,width=3,passes=2){
    ctx.save();
    ctx.strokeStyle=INK;
    ctx.lineWidth=width;
    for(let p=0;p<passes;p++){
      ctx.beginPath();
      ctx.ellipse(x+(rand()-.5)*5,y+(rand()-.5)*5,w/2+(rand()-.5)*5,h/2+(rand()-.5)*5,(rand()-.5)*.025,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function handText(ctx, text, x, y, size, weight='700', align='center'){
    ctx.save();
    ctx.fillStyle=INK;
    ctx.font = `${weight} ${size}px Caveat, cursive`;
    ctx.textAlign=align;
    ctx.textBaseline='middle';
    const lines = String(text).split('\n');
    const step=size*.88;
    lines.forEach((line,i)=>ctx.fillText(line,x,y+(i-(lines.length-1)/2)*step));
    ctx.restore();
  }

  function sticky(ctx,x,y,w,h,color,label,rand,rotation=0){
    ctx.save();
    ctx.translate(x+w/2,y+h/2);
    ctx.rotate(rotation);
    ctx.translate(-w/2,-h/2);
    ctx.shadowColor='rgba(45,34,25,.16)';
    ctx.shadowBlur=8;
    ctx.shadowOffsetX=5;
    ctx.shadowOffsetY=7;
    const pts=[[4,5],[w-4,1],[w,h-5],[2,h]];
    ctx.fillStyle=color;
    ctx.beginPath();
    pts.forEach((pt,i)=>i?ctx.lineTo(pt[0],pt[1]):ctx.moveTo(pt[0],pt[1]));
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor='transparent';
    ctx.strokeStyle='rgba(55,43,34,.55)';
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.32)';
    ctx.lineWidth=1;
    for(let i=0;i<10;i++){
      const yy=12+rand()*(h-24);
      ctx.beginPath();
      ctx.moveTo(12+rand()*22,yy);
      ctx.lineTo(w-12-rand()*24,yy+(rand()-.5)*2);
      ctx.stroke();
    }
    handText(ctx,label,w/2,h/2+2,Math.max(23,h*.34),'700');
    ctx.restore();
  }

  function bust(ctx,cx,cy,s,rand,pointDir=0){
    roughEllipse(ctx,cx,cy,34*s,34*s,rand,2.5,1);
    roughLine(ctx,[[cx-11*s,cy-11*s],[cx,cy-17*s],[cx+12*s,cy-9*s]],rand,2,1,1.4);
    roughLine(ctx,[[cx-5*s,cy+17*s],[cx-7*s,cy+29*s]],rand,2,1,1);
    roughLine(ctx,[[cx+5*s,cy+17*s],[cx+7*s,cy+29*s]],rand,2,1,1);
    roughLine(ctx,[[cx-36*s,cy+45*s],[cx-8*s,cy+29*s],[cx+8*s,cy+29*s],[cx+37*s,cy+45*s]],rand,3,1,1.5);
    roughLine(ctx,[[cx-36*s,cy+45*s],[cx-30*s,cy+91*s],[cx+31*s,cy+91*s],[cx+37*s,cy+45*s]],rand,3,1,1.6);
    if(pointDir) roughLine(ctx,[[cx+pointDir*25*s,cy+52*s],[cx+pointDir*78*s,cy+31*s]],rand,3,1,1.6);
  }

  function drawPriorities(host){
    const canvas=setupCanvas(host,1200,700,'Hand-drawn workshop table showing eight competing priorities worked through as visible trade-offs into one decision');
    const ctx=canvas.getContext('2d');
    const rand=rng(4117);

    [[70,105,PINK,'people',-.08],[250,70,YELLOW,'speed',.045],[440,110,BLUE,'quality',-.05],[105,275,YELLOW,'cost',-.035],[315,255,PINK,'risk',.07],[505,270,GREEN,'impact',-.03],[210,430,PINK,'effort',.045],[440,425,BLUE,'time',-.06]].forEach(([x,y,c,t,r])=>sticky(ctx,x,y,145,92,c,t,rand,r));
    bust(ctx,82,525,.72,rand,1); bust(ctx,760,520,.70,rand,-1);
    roughEllipse(ctx,720,300,205,195,rand,4,3);
    for(let i=0;i<13;i++) roughLine(ctx,[[642+rand()*30,220+rand()*150],[785+rand()*25,220+rand()*150]],rand,1.4,1,2.8);
    handText(ctx,'trade-offs',720,292,37,'700');
    [[205,150],[395,115],[585,155],[245,320],[455,305],[645,315],[350,475],[580,470]].forEach(([sx,sy])=>{
      const pts=[[sx,sy]];
      for(let t=1;t<=4;t++){ const u=t/4; pts.push([sx*(1-u)+650*u+Math.sin(u*Math.PI)*(rand()-.5)*70,sy*(1-u)+300*u+Math.sin(u*Math.PI)*(rand()-.5)*70]); }
      roughLine(ctx,pts,rand,2,1,3.2);
    });
    roughPoly(ctx,[[900,115],[1120,108],[1107,565],[880,552]],rand,'#fffaf0',4,5);
    roughPoly(ctx,[[956,91],[1044,87],[1048,124],[952,127]],rand,'rgba(215,186,133,.72)',1,2);
    handText(ctx,'one decision',1000,165,37,'700');
    sticky(ctx,920,255,155,96,YELLOW,'choose',rand,-.025);
    roughLine(ctx,[[946,405],[974,443],[1035,378]],rand,7,2,2);
    handText(ctx,'owner + next step',1000,495,27,'500');
    roughLine(ctx,[[825,304],[850,318],[878,301]],rand,4,2,3); roughLine(ctx,[[864,288],[880,301],[865,315]],rand,4,1,2);
    handText(ctx,'make the tensions visible',55,662,30,'700','left');
  }

  function drawDecision(host){
    const canvas=setupCanvas(host,1200,620,'Hand-drawn people having a good discussion, then making a visible choice with an owner and next step');
    const ctx=canvas.getContext('2d');
    const rand=rng(7821);

    bust(ctx,115,325,.66,rand,0); bust(ctx,250,290,.76,rand,1); bust(ctx,415,315,.70,rand,0); bust(ctx,550,300,.68,rand,-1);
    roughEllipse(ctx,340,445,420,120,rand,4,2);
    sticky(ctx,245,420,90,58,PINK,'A',rand,-.055); sticky(ctx,350,430,90,58,YELLOW,'B',rand,.035); sticky(ctx,455,415,90,58,BLUE,'C',rand,-.03);
    [[[55,65],[210,150],'what are\nwe deciding?'],[[245,45],[430,135],'good\nconversation'],[[455,72],[625,150],'but what\nchanges?']].forEach(([[x0,y0],[x1,y1],copy])=>{
      roughPoly(ctx,[[x0+12,y0+18],[x0+42,y0],[x1-30,y0+3],[x1,y0+34],[x1-14,y1-12],[x0+32,y1],[x0,y0+68]],rand,'rgba(255,250,240,.92)',3,5);
      handText(ctx,copy,(x0+x1)/2,(y0+y1)/2-2,27,'500');
    });
    handText(ctx,'a good discussion',335,560,32,'700');
    roughPoly(ctx,[[715,78],[1130,90],[1115,540],[700,530]],rand,'rgba(255,250,240,.72)',4,5);
    handText(ctx,'make the choice visible',915,115,31,'700');
    sticky(ctx,770,175,108,67,PINK,'A',rand,-.045); sticky(ctx,900,165,108,67,YELLOW,'B',rand,.035); sticky(ctx,1025,183,108,67,BLUE,'C',rand,-.03);
    roughEllipse(ctx,958,205,145,120,rand,5,3);
    sticky(ctx,845,320,215,120,BLUE,'DECISION',rand,-.015);
    roughLine(ctx,[[865,454],[892,485],[938,438]],rand,7,2,2.5); handText(ctx,'owner\nnext step',995,468,27,'500'); bust(ctx,720,400,.62,rand,1);
    roughLine(ctx,[[585,372],[625,365],[655,387],[690,350],[720,353]],rand,3,2,3.5); roughLine(ctx,[[707,339],[724,353],[709,367]],rand,3,1,2);
    handText(ctx,'decision = choice + ownership',890,575,29,'700');
  }

  function render(){
    const priorities=document.querySelector('.art-glimpse-01');
    const decision=document.querySelector('.art-problem-03');
    if(priorities) drawPriorities(priorities);
    if(decision) drawDecision(decision);
  }

  if(document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  else window.addEventListener('load',render,{once:true});
})();
