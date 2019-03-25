import './sass/main.scss';
import Hill1 from './img/Hill.mp4';
import Hill2 from './img/Hill.webm';

const header = document.querySelector('.header');
window.addEventListener('scroll', event => {
    const { target } = event;
    let maxScroll = target.innerHeight || document.documentElement.clientHeight;
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if(currentScroll >= 0.3 * maxScroll) {
        header.classList.remove('scrollToTop');
        header.classList.add('scrollToBottom');
    }
    if(currentScroll < 0.3 * maxScroll && header.classList.contains('scrollToBottom')) {
        header.classList.remove('scrollToBottom');
        header.classList.add('scrollToTop');
    }
  });