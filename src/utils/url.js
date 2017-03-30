export function getUrlQuery (key) {
    const search = window.location.search
    if (!search) {
        return ''
    }
    const reg = new RegExp(`[&|?]${key}=([^&]*)`, 'i')
    const result = reg.exec(search)

    return result ? result[1] : ''
}

export function addUrlQuery (url, kv) {
    const hasQuery = /\?/.test(url)
    return Object.keys(kv).reduce(function (str, key, i) {
        let delimiter, val
        delimiter = (i === 0 && !hasQuery) ? '?' : '&'
        key = encodeURIComponent(key)
        val = encodeURIComponent(kv[key])
        return [str, delimiter, key, '=', val].join('')
    }, url)
}
