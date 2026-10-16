export enum PedBones {
  HEAD    = 0x796E,
  R_HAND  = 0xDEAD,
  L_HAND  = 0x49D9,
  R_FOOT  = 0xCC4D,
  L_FOOT  = 0x3779
}

enum SunPos {
  START_DECIM     = 6.0,
  END_DECIM       = 20.0,
  DAY_SPAN        = 14.0,
  PEAK_ELEVATION  = 0.95,
  NS_SKEW         = -0.534,
}

export type BoneData = {
  id: number,
  exposed: boolean,
};

export class Vector3 {
  private static readonly SUN_MEMO = new Map<number, Vector3>;

  constructor(
    public x: number,
    public y: number,
    public z: number
  ) {}

  static getSunV(h: number, m: number): Vector3 {
    const hourDecimal = h + m / 60.0;

    if (hourDecimal < SunPos.START_DECIM || hourDecimal > SunPos.END_DECIM)
      return new Vector3(0, 0, -1.0);

    const memoV = this.SUN_MEMO.get(hourDecimal);
    if (memoV !== undefined) return memoV;

    const progress = (hourDecimal - 6.0) / SunPos.DAY_SPAN;
    const theta = progress * Math.PI;

    const sunX = Math.cos(theta);
    const sunY = SunPos.NS_SKEW * Math.sin(theta);
    const sunZ = SunPos.PEAK_ELEVATION * Math.sin(theta);

    const len = Math.sqrt(sunX * sunX + sunY * sunY + sunZ * sunZ);
    const sunV = new Vector3(sunX / len, sunY / len, sunZ / len);

    this.SUN_MEMO.set(hourDecimal, sunV);
    return sunV;
  }

  multiply(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  add(v: Vector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
}