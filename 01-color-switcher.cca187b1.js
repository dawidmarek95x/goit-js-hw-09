const t=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");e(n);let o=null;function e(t){t.disabled=!0}function c(t){t.disabled=!1}function r(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(function(){const a=document.body.style;a.backgroundColor=r(),e(t),c(n),o=setInterval((()=>{a.backgroundColor=r()}),1e3)})),n.addEventListener("click",(function(){clearInterval(o),e(n),c(t)}));
//# sourceMappingURL=01-color-switcher.cca187b1.js.map
