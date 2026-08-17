/* Homepage AI transformation sketch — 2026-08-17.
   Purpose-built for the problem card: task -> workflow -> function -> company.
   Transparent background; only the four hand-drawn steps and their contents remain. */
(function(){
  const INK='#2c251f';
  const PINK='#ec91a6';
  const YELLOW='#f5d252';
  const BLUE='#94cdda';
  const PAPER='rgba(255,250,240,.82)';

  function rng(seed){let s=seed>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296;};}

  function setup(host){
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.style.setProperty('display','flex','important');
    host.style.setProperty('align-items','center','important');
    host.style.setProperty('justify-content','center','important');
    host.innerHTML='';
    const c=document.createElement('canvas');
    c.className='handdrawn-canvas ai-levels-canvas';
    c.width=1200;c.height=690;
    c.setAttribute('role','img');
    c.setAttribute('aria-label','Hand-drawn four-step AI transformation ladder from task level to workflow level, function level and company level');
    host.appendChild(c);
    return c;
  }

  function roughLine(ctx,pts,rand,width=3,passes=2,jitter=2.3){
    ctx.save();ctx.strokeStyle=INK;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=width;
    for(let p=0;p<passes;p++){
      ctx.beginPath();
      pts.forEach((pt,i)=>{const x=pt[0]+(rand()-.5)*jitter*2,y=pt[1]+(rand()-.5)*jitter*2;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
      ctx.stroke();
    }
    ctx.restore();
  }

  function roughPoly(ctx,pts,rand,fill=PAPER,width=3,jitter=3){
    const p=pts.map(([x,y])=>[x+(rand()-.5)*jitter*2,y+(rand()-.5)*jitter*2]);
    ctx.save();
    if(fill){ctx.fillStyle=fill;ctx.beginPath();p.forEach((pt,i)=>i?ctx.lineTo(pt[0],pt[1]):ctx.moveTo(pt[0],pt[1]));ctx.closePath();ctx.fill();}
    ctx.restore();roughLine(ctx,[...p,p[0]],rand,width,2,1.4);
  }

  function roughEllipse(ctx,x,y,w,h,rand,width=3,passes=2){
    ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=width;
    for(let p=0;p<passes;p++){ctx.beginPath();ctx.ellipse(x+(rand()-.5)*4,y+(rand()-.5)*4,w/2+(rand()-.5)*4,h/2+(rand()-.5)*4,(rand()-.5)*.025,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }

  function text(ctx,str,x,y,size,weight='700',align='center'){
    ctx.save();ctx.fillStyle=INK;ctx.font=`${weight} ${size}px Caveat, cursive`;ctx.textAlign=align;ctx.textBaseline='middle';
    const lines=String(str).split('\n'),step=size*.88;
    lines.forEach((line,i)=>ctx.fillText(line,x,y+(i-(lines.length-1)/2)*step));ctx.restore();
  }

  function sticky(ctx,x,y,w,h,color,label,rand,rot=0){
    ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);
    ctx.shadowColor='rgba(45,34,25,.13)';ctx.shadowBlur=7;ctx.shadowOffsetX=4;ctx.shadowOffsetY=6;
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(3,5);ctx.lineTo(w-4,1);ctx.lineTo(w,h-5);ctx.lineTo(2,h);ctx.closePath();ctx.fill();
    ctx.shadowColor='transparent';ctx.strokeStyle='rgba(55,43,34,.55)';ctx.lineWidth=2;ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.26)';ctx.lineWidth=1;
    for(let i=0;i<7;i++){const yy=10+rand()*(h-20);ctx.beginPath();ctx.moveTo(10+rand()*18,yy);ctx.lineTo(w-10-rand()*18,yy+(rand()-.5)*2);ctx.stroke();}
    text(ctx,label,w/2,h/2+1,Math.max(22,h*.31),'700');ctx.restore();
  }

  function arrow(ctx,x1,y1,x2,y2,rand){
    roughLine(ctx,[[x1,y1],[x2,y2]],rand,3,2,2);
    const a=Math.atan2(y2-y1,x2-x1),len=14;
    roughLine(ctx,[[x2-Math.cos(a-.55)*len,y2-Math.sin(a-.55)*len],[x2,y2],[x2-Math.cos(a+.55)*len,y2-Math.sin(a+.55)*len]],rand,3,1,1.7);
  }

  function robot(ctx,x,y,rand){
    roughPoly(ctx,[[x-34,y-28],[x+34,y-28],[x+37,y+29],[x-37,y+29]],rand,'rgba(255,250,240,.45)',3,2);
    roughEllipse(ctx,x-13,y,8,8,rand,2,1);roughEllipse(ctx,x+13,y,8,8,rand,2,1);
    roughLine(ctx,[[x-13,y+15],[x,y+21],[x+15,y+14]],rand,2,1,1.5);
    roughLine(ctx,[[x,y-28],[x,y-46]],rand,2,2,1);roughEllipse(ctx,x,y-50,7,7,rand,2,1);
    roughLine(ctx,[[x-36,y-5],[x-47,y-5],[x-47,y+13],[x-36,y+13]],rand,2,1,1);
    roughLine(ctx,[[x+36,y-5],[x+47,y-5],[x+47,y+13],[x+36,y+13]],rand,2,1,1);
  }

  function workflowIcon(ctx,x,y,rand){
    roughPoly(ctx,[[x-70,y-35],[x-18,y-35],[x-18,y+7],[x-70,y+7]],rand,YELLOW,2,2);
    roughPoly(ctx,[[x+4,y-5],[x+58,y-5],[x+58,y+36],[x+4,y+36]],rand,BLUE,2,2);
    roughPoly(ctx,[[x-66,y+25],[x-17,y+25],[x-17,y+66],[x-66,y+66]],rand,PINK,2,2);
    arrow(ctx,x-16,y-15,x+3,y+7,rand);arrow(ctx,x-16,y+45,x+2,y+20,rand);
  }

  function teamIcon(ctx,x,y,rand){
    [[x-48,y+10],[x,y-10],[x+49,y+10]].forEach(([cx,cy])=>{roughEllipse(ctx,cx,cy,28,28,rand,2,1);roughLine(ctx,[[cx-20,cy+46],[cx-12,cy+18],[cx+12,cy+18],[cx+20,cy+46]],rand,2,1,1.3);});
    roughPoly(ctx,[[x+90,y-45],[x+228,y-45],[x+228,y+65],[x+90,y+65]],rand,'rgba(255,250,240,.35)',2.5,2);
    [[x+112,y-22,YELLOW],[x+156,y-22,BLUE],[x+198,y-22,PINK],[x+132,y+20,PINK],[x+182,y+20,YELLOW]].forEach(([sx,sy,c])=>roughPoly(ctx,[[sx,sy],[sx+25,sy],[sx+25,sy+22],[sx,sy+22]],rand,c,1.5,1.2));
  }

  function companyIcon(ctx,x,y,rand){
    roughPoly(ctx,[[x-65,y+42],[x-65,y-35],[x-20,y-35],[x-20,y-68],[x+25,y-68],[x+25,y-25],[x+70,y-25],[x+70,y+42]],rand,'rgba(255,250,240,.25)',3,2);
    for(let r=0;r<3;r++)for(let c=0;c<3;c++) roughPoly(ctx,[[x-50+c*35,y-18+r*22],[x-39+c*35,y-18+r*22],[x-39+c*35,y-6+r*22],[x-50+c*35,y-6+r*22]],rand,BLUE,1.3,1);
    roughLine(ctx,[[x+105,y+37],[x+105,y+2],[x+145,y+2],[x+145,y-25],[x+185,y-25],[x+185,y-58]],rand,5,2,2);
    roughLine(ctx,[[x+173,y-46],[x+185,y-58],[x+196,y-45]],rand,4,1,1.5);
  }

  function drawStep(ctx,rand,pts,label,labelColor,labelX,labelY,copy,copyX,copyY,iconFn){
    roughPoly(ctx,pts,rand,PAPER,3.4,3.2);
    sticky(ctx,labelX,labelY,170,90,labelColor,label,rand,(rand()-.5)*.05);
    if(iconFn) iconFn(ctx,copyX-165,copyY,rand);
    text(ctx,copy,copyX+85,copyY,33,'700','center');
  }

  function renderAI(host){
    const canvas=setup(host),ctx=canvas.getContext('2d'),rand=rng(92017);

    drawStep(ctx,rand,[[80,520],[1010,520],[1085,500],[1085,648],[80,648]],'Task\nlevel',YELLOW,65,545,'Automate\na single task',520,584,(c,x,y,r)=>robot(c,x,y,r));
    sticky(ctx,765,555,100,67,PINK,'draft',rand,-.03);arrow(ctx,870,590,900,590,rand);sticky(ctx,905,555,120,67,YELLOW,'summarise',rand,.02);arrow(ctx,1030,590,1052,590,rand);sticky(ctx,1058,555,115,67,BLUE,'translate',rand,-.02);

    drawStep(ctx,rand,[[190,365],[1040,365],[1110,342],[1110,515],[190,515]],'Workflow\nlevel',PINK,170,385,'Connect\nmultiple steps',710,445,(c,x,y,r)=>workflowIcon(c,x,y,r));
    drawStep(ctx,rand,[[315,210],[1065,210],[1135,188],[1135,360],[315,360]],'Function\nlevel',BLUE,292,230,'Redesign how\nthe team works',780,286,(c,x,y,r)=>teamIcon(c,x,y,r));
    drawStep(ctx,rand,[[470,60],[1090,60],[1160,38],[1160,205],[470,205]],'Company\nlevel',YELLOW,447,78,'Transform\nthe business',875,132,(c,x,y,r)=>companyIcon(c,x,y,r));
  }

  function showAIForVerification(){
    if(new URLSearchParams(location.search).get('verify-ai')!=='1') return;
    const section=document.querySelector('#problems');
    const next=section&&section.querySelector('.dmt-slider__button--next');
    if(!next) return;
    let guard=0;
    while(!next.disabled&&guard<10){next.click();guard+=1;}
  }

  function boot(){
    const host=document.querySelector('.art-problem-05');
    if(host) renderAI(host);
    showAIForVerification();
  }
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(boot);else window.addEventListener('load',boot,{once:true});
})();
