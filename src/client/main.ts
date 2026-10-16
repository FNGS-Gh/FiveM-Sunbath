import { drawSunVectorDebug } from './Draw';
import { SunVector } from './utils';

class SunHandler {
  private _ped = PlayerPedId();

  exposed = false;
  sheltered = false;

  constructor(
    private readonly coreBone: number,
    private readonly extraBones: number[]
  ) {}

  get ped(): number {
    return this._ped;
  }

  set ped(ped: number) {
    this._ped = IsEntityAPed(ped) ? ped : PlayerPedId();
  }

  static getVector(): SunVector {
    const h = GetClockHours();
    const m = GetClockMinutes();

    return new SunVector(h, m);
  }
}

setTick(() => {
  const ped = PlayerPedId();

  drawSunVectorDebug(ped, SunHandler.getVector());
});