// 全局资源加载器
const resourceCache = new Map();
const loadingPromises = new Map();

/**
 * 加载远程脚本资源
 * @param {string} url - 资源URL
 * @returns {Promise<Object>} - 返回组件和加载状态
 */
export async function loadRemoteScript(url) {
  // 如果URL为空，直接返回失败
  if (!url) {
    return { loaded: false, component: null };
  }
  
  // 检查是否已经缓存了该资源
  if (resourceCache.has(url)) {
    return resourceCache.get(url);
  }
  
  // 检查是否正在加载中
  if (loadingPromises.has(url)) {
    // 如果正在加载中，返回同一个Promise
    return loadingPromises.get(url);
  }
  
  // 创建加载Promise并缓存
  const loadingPromise = new Promise((resolve) => {
    if (!window.Vue) {
      import('vue').then(module => {
        window.Vue = module;
      });
    }

    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      // 检查自定义元素是否注册成功
      if (!customElements.get('im-card-element')) {
        console.error('自定义元素未注册');
        const result = { loaded: false, component: null };
        resourceCache.set(url, result);
        loadingPromises.delete(url);
        resolve(result);
        return;
      }
      
      // 创建Vue组件
      const component = Vue.defineComponent({
        render() {
          return Vue.h('im-card-element', {}, this.$slots.default());
        }
      });
      
      const result = { loaded: true, component };
      resourceCache.set(url, result);
      loadingPromises.delete(url);
      resolve(result);
    };
    
    script.onerror = () => {
      console.error(`加载脚本失败: ${url}`);
      const result = { loaded: false, component: null };
      resourceCache.set(url, result);
      loadingPromises.delete(url);
      resolve(result);
    };
    
    document.head.appendChild(script);
  });
  
  // 缓存加载Promise，确保相同URL的多次请求共享同一个Promise
  loadingPromises.set(url, loadingPromise);
  
  return loadingPromise;
}

/**
 * 清除指定URL的缓存
 * @param {string} url - 要清除的资源URL
 */
export function clearResourceCache(url) {
  if (url) {
    resourceCache.delete(url);
  } else {
    // 如果没有指定URL，清除所有缓存
    resourceCache.clear();
  }
}