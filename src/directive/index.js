export function defaultImg(a, b) {
  a.onerror = function() {
    a.src = b.value
  }
}
