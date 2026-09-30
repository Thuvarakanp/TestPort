(()=>{
 const root=document.documentElement;
 const buttons=[...document.querySelectorAll('[data-shop-choice]')];
 function setShop(theme,save=false){
  if(theme!=='day'&&theme!=='night')return;
  root.dataset.shop=theme;
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.shopChoice===theme)));
  document.querySelector('[data-shop-name]').textContent=theme==='day'?'day shop':'night shop';
  document.querySelector('[data-shop-caption]').textContent=theme==='day'?'DAY SHOP · A NEW DAY, SAME DREAM':'NIGHT SHOP · THE DREAM STAYS LIT';
  if(save)try{localStorage.setItem('thuvarakan-shop',theme)}catch{}
 }
 buttons.forEach(button=>button.addEventListener('click',()=>setShop(button.dataset.shopChoice,true)));
 setShop(root.dataset.shop);
})();
