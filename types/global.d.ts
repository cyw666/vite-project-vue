interface Window {
  // Global vue app instance
  webkitCancelAnimationFrame: (handle: number) => void
  mozCancelAnimationFrame: (handle: number) => void
  oCancelAnimationFrame: (handle: number) => void
  msCancelAnimationFrame: (handle: number) => void
  webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
  mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
  oRequestAnimationFrame: (callback: FrameRequestCallback) => number
  msRequestAnimationFrame: (callback: FrameRequestCallback) => number
}
