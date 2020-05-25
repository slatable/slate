export let isUsingMicroTask = false;
export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
export const isIE = UA && /msie|trident/.test(UA);

const callbacks: (() => void)[] = [];
let pending = false;
let timerFunc: () => void;

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  }
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  }
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function createNextTick(handleError: (e: Error, ctx?: Object) => void) { 
  return (cb?: Function, ctx?: Object) => {
    let _resolve: (ctx?: Object) => void;
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx);
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    })
    if (!pending) {
      pending = true
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(resolve => _resolve = resolve);
    }
  }
}

export function isNative (Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) copies[i]();
}

export function noop (a?: any, b?: any, c?: any) {}