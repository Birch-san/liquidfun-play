interface TypedArray extends ArrayBufferView {
  length: number
}
interface ArrayBufferViewCtor<T extends TypedArray> {
  new (): T
  new (
    buffer: ArrayBufferLike,
    byteOffset?: number,
    length?: number
  ): T
  new (
    length: number
  ): T
}

class GrowableTypedArray<T extends TypedArray> {
  private buffer: T
  constructor (
    private readonly ctor: ArrayBufferViewCtor<T>
  ) {
    this.buffer = new ctor()
  }

  ensureLength (desiredLength: number): void {
    if (this.buffer.length < desiredLength) {
      this.buffer = new this.ctor(desiredLength)
    }
  }

  getSlice (desiredLength: number): T {
    return this.buffer.length === desiredLength
      ? this.buffer
      : new this.ctor(this.buffer.buffer, 0, desiredLength)
  }
}

class GrowableQuadArray extends GrowableTypedArray<Float32Array> {
  private readonly floatsPerQuad: number
  constructor () {
    super(Float32Array)
    const quadVertices = 4
    const floatsPerVec2 = 2
    this.floatsPerQuad = quadVertices * floatsPerVec2
  }

  ensureLength (quads: number): void {
    super.ensureLength(quads * this.floatsPerQuad)
  }

  getSlice (quads: number): Float32Array {
    return super.getSlice(quads * this.floatsPerQuad)
  }
}
export const growableQuadArray = new GrowableQuadArray()