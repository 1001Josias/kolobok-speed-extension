let scriptInject = document.createElement('script')
scriptInject.src = chrome.runtime.getURL('script.js')
document.documentElement.appendChild(scriptInject)
scriptInject.onload = ()=>{
   scriptInject.parentNode.removeChild(scriptInject)
}