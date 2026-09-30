(()=>{
 const entrance=document.querySelector('.entrance');if(!entrance)return;
 const stage=entrance.querySelector('.entrance-sticky');
 Promise.all([...stage.querySelectorAll('img')].map(img=>img.decode().catch(()=>{}))).then(()=>stage.classList.add('scene-ready'));
 const welcome=entrance.querySelector('.owner-welcome');
 const welcomeLink=welcome.querySelector('a');
 const status=entrance.querySelector('[data-store-status]');
 const scrollLabel=entrance.querySelector('[data-scroll-label]');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
 const ease=v=>v*v*(3-2*v);
 let pending=false,staticMode=false;
 function render(){
  pending=false;
  staticMode=reduced.matches||document.body.classList.contains('paused');
  document.body.classList.toggle('entrance-static',staticMode);
  const distance=entrance.offsetHeight-innerHeight;
  const p=staticMode?1:clamp(-entrance.getBoundingClientRect().top/Math.max(distance,1));
  const open=ease(clamp((p-.12)/.52));
  const intro=1-ease(clamp((p-.10)/.24));
  const greeting=ease(clamp((p-.58)/.18));
  stage.style.setProperty('--door-angle',`${(open*106).toFixed(3)}deg`);
  stage.style.setProperty('--zoom',(1+ease(p)*.12).toFixed(4));
  stage.style.setProperty('--light',(.76+open*.24).toFixed(4));
  stage.style.setProperty('--intro',intro.toFixed(4));
  stage.style.setProperty('--welcome',greeting.toFixed(4));
  stage.style.setProperty('--progress',p.toFixed(4));
  stage.classList.toggle('is-open',open>.6);
  welcome.classList.toggle('visible',greeting>.9);
  welcomeLink.tabIndex=greeting>.9?0:-1;
  welcome.setAttribute('aria-hidden',String(greeting<=.9));
  const message=p<.16?'Closed. But not for you.':p<.65?'Opening up. Come on in.':'Open. Glad you’re here.';
  if(status.textContent!==message)status.textContent=message;
  scrollLabel.textContent=p<.16?'SCROLL TO OPEN THE DOORS':p<.65?'COME A LITTLE CLOSER':'KEEP SCROLLING FOR MY STORY';
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(render)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 reduced.addEventListener('change',schedule);
 document.querySelectorAll('[data-motion]').forEach(b=>b.addEventListener('click',schedule));
 const images={still:'assets/museum.webp',after:'assets/store-owner.webp'};
 document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{
  const content=document.querySelector('#project-dialog .dialog-content');
  const label=document.createElement('div');label.className='picked-up-label';label.textContent='OFF THE SHELF / TAKE A CLOSER LOOK';
  content.prepend(label);
  if(b.dataset.project==='after'){
   const img=document.createElement('img');img.src=b.dataset.project==='after'&&document.documentElement.dataset.shop==='day'?'assets/store-owner-day.webp':images[b.dataset.project];img.alt=b.dataset.project==='still'?'Still identity concept':'Thuvarakan’s storefront portfolio';img.className='picked-up-art';content.prepend(img);
  }
 }));
 render();
})();
