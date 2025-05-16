declare module 'postcss-px-to-viewport' {
  interface Options {
    unitToConvert?: string
    viewportWidth?: number
    viewportHeight?: number
    unitPrecision?: number
    viewportUnit?: string
    fontViewportUnit?: string
    selectorBlackList?: string[]
    propList?: string[]
    minPixelValue?: number
    mediaQuery?: boolean
    replace?: boolean
    exclude?: RegExp | RegExp[]
    include?: RegExp | RegExp[]
    landscape?: boolean
    landscapeUnit?: string
    landscapeWidth?: number
  }

  export default function (options: Options): any
}
