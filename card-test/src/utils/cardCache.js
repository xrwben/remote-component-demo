class componentCache {
  constructor() {
    this.urlMap = new Map()
    this.componentMap = new Map()
  }
  getComponent(url) {
    return this.componentMap.get(url)
  }
  setComponent(url, component) {
    this.componentMap.set(url, component)
  }
  getUrl(url) {
    return this.urlMap.get(url)
  }
  setUrl(url, component) {
    this.urlMap.set(url, component)
  }
}

export const cardCache = new componentCache()