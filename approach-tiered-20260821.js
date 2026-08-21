/* Approved tiered Approach illustrations, 2026-08-21.
   Replaces ONLY the hero and After-the-workshop canvases with larger descending-step compositions.
   The three During-the-workshop content boxes are untouched. */
(function(){
  const INK='#2b241f', PINK='#ee9db4', YELLOW='#f4d452', BLUE='#9ecfda', GREEN='#bfd5ae', PAPER='rgba(255,250,240,.82)';

  function rng(seed){let s=seed>>>0;return()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};}
  function setup(host,w,h,label){host.innerHTML='';host.style.background='none';const c=document.createElement('canvas');c.className='approach-art-canvas tiered-art-canvas';c.width=w;c.height=h;c.setAttribute('role','img');c.setAttribute('aria-label',label);host.appendChild(c);return c.getContext('2d');}
  function line(ctx,pts,r,width=3,passes=2,jitter=2){ctx.save();ctx.strokeStyle=INK;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=width;for(let p=0;p<passes;p++){ctx.beginPath();pts.forEach(([x,y],i)=>{const xx=x+(r()-.5)*jitter*2,yy=y+(r()-.5)*jitter*2;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);});ctx.stroke();}ctx.restore();}
  function poly(ctx,pts,r,fill=null,width=3){const q=pts.map(([x,y])=>[x+(r()-.5)*3,y+(r()-.5)*3]);if(fill){ctx.save();ctx.fillStyle=fill;ctx.beginPath();q.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();ctx.restore();}line(ctx,[...q,q[0]],r,width,2,1.2);}
  function ellipse(ctx,x,y,w,h,r,width=3){ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=width;for(let p=0;p<2;p++){ctx.beginPath();ctx.ellipse(x+(r()-.5)*3,y+(r()-.5)*3,w/2+(r()-.5)*3,h/2+(r()-.5)*3,(r()-.5)*.02,0,Math.PI*2);ctx.stroke();}ctx.restore();}
  function text(ctx,s,x,y,size=28,weight=700,align='center'){ctx.save();ctx.fillStyle=INK;ctx.font=`${weight} ${size}px Caveat, cursive`;ctx.textAlign=align;ctx.textBaseline='middle';const ls=String(s).split('\n'),step=size*.86;ls.forEach((t,i)=>ctx.fillText(t,x,y+(i-(ls.length-1)/2)*step));ctx.restore();}
  function sticky(ctx,x,y,w,h,color,label,r,rot=0,fs=24){ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);ctx.shadowColor='rgba(45,34,25,.14)';ctx.shadowBlur=8;ctx.shadowOffsetX=4;ctx.shadowOffsetY=6;poly(ctx,[[2,5],[w-3,1],[w,h-4],[1,h]],r,color,1.5);ctx.shadowColor='transparent';ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1;for(let i=0;i<6;i++){const yy=9+r()*(h-18);ctx.beginPath();ctx.moveTo(8+r()*10,yy);ctx.lineTo(w-8-r()*12,yy+(r()-.5)*2);ctx.stroke();}text(ctx,label,w/2,h/2+1,fs,700);ctx.restore();}
  function paper(ctx,x,y,w,h,r,rot=0){ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);ctx.shadowColor='rgba(45,34,25,.09)';ctx.shadowBlur=8;ctx.shadowOffsetX=4;ctx.shadowOffsetY=6;poly(ctx,[[0,4],[w-4,0],[w,h-4],[w*.82,h],[1,h-2]],r,PAPER,2);ctx.restore();}
  function arrow(ctx,x1,y1,x2,y2,r,width=3){const mx=(x1+x2)/2+(r()-.5)*14,my=(y1+y2)/2+(r()-.5)*12;line(ctx,[[x1,y1],[mx,my],[x2,y2]],r,width,2,2);const a=Math.atan2(y2-my,x2-mx),L=14;line(ctx,[[x2-L*Math.cos(a-.55),y2-L*Math.sin(a-.55)],[x2,y2],[x2-L*Math.cos(a+.55),y2-L*Math.sin(a+.55)]],r,width,2,1.2);}
  function person(ctx,x,y,s,r,pose='stand'){ellipse(ctx,x,y,22*s,24*s,r,2);line(ctx,[[x,y+12*s],[x,y+45*s]],r,2,1,1);if(pose==='point')line(ctx,[[x,y+26*s],[x+30*s,y+10*s]],r,2,1,1);else{line(ctx,[[x,y+26*s],[x-17*s,y+37*s]],r,2,1,1);line(ctx,[[x,y+26*s],[x+17*s,y+37*s]],r,2,1,1);}line(ctx,[[x,y+45*s],[x-14*s,y+73*s]],r,2,1,1);line(ctx,[[x,y+45*s],[x+14*s,y+73*s]],r,2,1,1);}
  function wall(ctx,x,y,w,h,r){paper(ctx,x,y,w,h,r,-.01);const cols=[YELLOW,PINK,BLUE,GREEN];for(let i=0;i<9;i++){const sx=x+24+(i%3)*((w-86)/3),sy=y+27+Math.floor(i/3)*48;sticky(ctx,sx,sy,48,30,cols[i%4],'',r,(r()-.5)*.08,12);}}
  function magnifier(ctx,x,y,r){ellipse(ctx,x,y,62,62,r,4);line(ctx,[[x+23,y+23],[x+71,y+70]],r,7,2,1.7);}
  function checkbox(ctx,x,y,r){poly(ctx,[[x,y],[x+18,y],[x+18,y+18],[x,y+18]],r,null,2);line(ctx,[[x+3,y+9],[x+8,y+15],[x+20,y-2]],r,3,2,1);}
  function decisionSheet(ctx,x,y,w,h,r){paper(ctx,x,y,w,h,r,.012);text(ctx,'DECISIONS',x+w/2,y+36,27,700);[0,1,2].forEach(i=>{const yy=y+78+i*48;checkbox(ctx,x+22,yy-8,r);line(ctx,[[x+56,yy],[x+w-20,yy]],r,2,1,1);});}
  function speech(ctx,x,y,w,h,r){poly(ctx,[[x,y],[x+w,y+2],[x+w-3,y+h-6],[x+w*.58,y+h-4],[x+w*.47,y+h+10],[x+w*.38,y+h-4],[x+2,y+h-5]],r,null,2);ellipse(ctx,x+w*.34,y+h*.47,4,4,r,1);ellipse(ctx,x+w*.50,y+h*.47,4,4,r,1);ellipse(ctx,x+w*.66,y+h*.47,4,4,r,1);}
  function stair(ctx,steps,r){for(let i=0;i<steps.length-1;i++){const a=steps[i],b=steps[i+1],x1=a.x+a.w*.82,y1=a.y+a.h*.8,x2=b.x-18,y2=b.y+b.h*.18;line(ctx,[[x1,y1],[x1+34,y1],[x1+34,y2-24],[x2,y2-24],[x2,y2]],r,3,2,2.5);arrow(ctx,x1+44,y1-12,x2-6,y2-12,r,2.4);}}

  function drawHero(host){
    const ctx=setup(host,1200,760,'Tiered hand-drawn journey from sponsor brief to better decisions');
    const r=rng(82121);
    const steps=[
      {x:55,y:58,w:190,h:160},
      {x:270,y:170,w:180,h:112},
      {x:500,y:294,w:200,h:116},
      {x:735,y:408,w:230,h:190},
      {x:980,y:548,w:190,h:175}
    ];
    stair(ctx,steps,r);

    for(let i=0;i<4;i++) paper(ctx,steps[0].x+i*7,steps[0].y+20-i*7,steps[0].w,steps[0].h,r,(i-1.5)*.018);
    sticky(ctx,88,103,128,82,PINK,'SPONSOR\nBRIEF',r,-.035,25);

    sticky(ctx,steps[1].x,steps[1].y,steps[1].w,steps[1].h,YELLOW,'INTERROGATE\nTHE REAL\nQUESTION',r,-.02,23);
    magnifier(ctx,300,332,r);

    sticky(ctx,steps[2].x,steps[2].y,steps[2].w,steps[2].h,BLUE,'DESIGN THE\nRIGHT\nINTERVENTION',r,.018,23);
    for(let i=0;i<5;i++)person(ctx,530+i*34,444,.58,r,'stand');

    sticky(ctx,steps[3].x+18,steps[3].y-34,steps[3].w-36,86,GREEN,'MAKE THINKING\nVISIBLE',r,-.018,23);
    wall(ctx,steps[3].x,steps[3].y+54,steps[3].w,146,r);
    person(ctx,715,566,.62,r,'point');person(ctx,985,574,.60,r,'stand');

    sticky(ctx,steps[4].x+10,steps[4].y-44,steps[4].w-20,82,PINK,'BETTER\nDECISIONS',r,.025,23);
    decisionSheet(ctx,steps[4].x,steps[4].y+44,steps[4].w,160,r);
    person(ctx,1170,702,.58,r,'point');
  }

  function drawAfter(host){
    const ctx=setup(host,1200,760,'Tiered hand-drawn after-workshop sequence: capture what matters, share back quickly, stay interested in what happens next');
    const r=rng(82122);
    const steps=[
      {x:45,y:80,w:300,h:220},
      {x:405,y:286,w:300,h:230},
      {x:785,y:500,w:360,h:205}
    ];
    stair(ctx,steps,r);

    sticky(ctx,42,38,58,58,PINK,'1',r,-.03,32);
    text(ctx,'CAPTURE WHAT MATTERS',112,68,30,700,'left');
    wall(ctx,76,104,250,178,r);
    person(ctx,54,300,.62,r,'point');person(ctx,142,304,.60,r,'stand');person(ctx,230,304,.60,r,'stand');person(ctx,324,300,.62,r,'stand');

    sticky(ctx,410,244,58,58,YELLOW,'2',r,.025,32);
    text(ctx,'SHARE BACK QUICKLY',485,274,30,700,'left');
    paper(ctx,455,338,205,135,r,.01);
    sticky(ctx,478,362,48,30,PINK,'',r,-.03,11);sticky(ctx,534,392,48,30,BLUE,'',r,.02,11);sticky(ctx,590,364,48,30,YELLOW,'',r,-.02,11);
    speech(ctx,440,286,74,44,r);speech(ctx,575,296,74,44,r);speech(ctx,665,365,74,44,r);
    person(ctx,420,462,.62,r,'stand');person(ctx,510,506,.58,r,'stand');person(ctx,655,470,.62,r,'stand');

    sticky(ctx,790,458,58,58,BLUE,'3',r,-.02,32);
    text(ctx,'STAY INTERESTED IN\nWHAT HAPPENS NEXT',865,477,29,700,'left');
    // larger hand-drawn car
    line(ctx,[[820,610],[930,610],[962,628],[990,630],[1003,662],[811,662],[802,636],[820,610]],r,3,2,2);
    ellipse(ctx,844,664,34,34,r,2.4);ellipse(ctx,963,664,34,34,r,2.4);
    line(ctx,[[850,610],[884,578],[928,578],[956,610]],r,2.5,2,1.5);
    // road, trees and sun
    line(ctx,[[1002,744],[1045,714],[1094,678],[1140,652],[1192,642]],r,3,2,3);
    line(ctx,[[970,744],[1016,708],[1063,674],[1110,648],[1180,632]],r,1.7,1,2);
    ellipse(ctx,1100,548,40,40,r,2);for(let i=0;i<8;i++){const a=i*Math.PI/4;line(ctx,[[1100+29*Math.cos(a),548+29*Math.sin(a)],[1100+44*Math.cos(a),548+44*Math.sin(a)]],r,1.7,1,1);}
    [[1045,630],[1125,617],[1168,603]].forEach(([x,y],idx)=>{line(ctx,[[x,y],[x,y-50-idx*4]],r,2,2,1);poly(ctx,[[x-14,y-30],[x,y-65-idx*4],[x+16,y-30]],r,null,2);poly(ctx,[[x-18,y-12],[x,y-52-idx*4],[x+20,y-12]],r,null,2);});
  }

  function render(){const hero=document.querySelector('.approach-hero-art');if(hero)drawHero(hero);const after=document.querySelector('.after-work-art');if(after)drawAfter(after);}
  function boot(){requestAnimationFrame(()=>requestAnimationFrame(render));}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(boot);else window.addEventListener('load',boot,{once:true});
})();
