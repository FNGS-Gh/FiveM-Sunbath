import { drawSunVectorDebug } from './Draw';
import { BoneData, PedBones, SunVector, Vector3 } from './utils';

class Sun {
  private _entity = PlayerPedId();

  private readonly bones = new Array<BoneData>;
  private isCalculating = false;

  public checkThread: NodeJS.Timeout | null = null;
  public tickThread = false;
  public isExposed = false;

  constructor(
    entity: number,
    bones: number[],
    public debugLen = 0.0,
    private rayLen = 1200.0,
  ) {
    this.entity = entity;
    bones.forEach((el, idx) => {
      this.bones[idx] = { id: el, exposed: false };
    });
  }

  get entity(): number {
    return this._entity;
  }

  set entity(entity: number) {
    this._entity = DoesEntityExist(entity) ? entity : PlayerPedId();
  }

  static get vector(): SunVector {
    return new SunVector(GetClockHours(), GetClockMinutes());
  }

  private drawDebugLine(
    boneV: Vector3,
    sunV: SunVector,
    exposed: boolean
  ) {
    const rgb = exposed ? [0, 255, 0] : [255, 0, 0];
    const boneEndV = boneV.add(sunV.multiply(this.debugLen));

    DrawLine(
      boneV.x, boneV.y, boneV.z,
      boneEndV.x, boneEndV.y, boneEndV.z,
      rgb[0], rgb[1], rgb[2], 255
    );
  }

  drawVisualDebug() {
    this.bones.forEach(el => {
      const [boneX, boneY, boneZ] = GetPedBoneCoords(this.entity, el.id, 0, 0, 0);
      const boneV = new Vector3(boneX, boneY, boneZ);

      this.drawDebugLine(boneV, Sun.vector, el.exposed);
    });
  }
  
  async calcExposure() {
    if (this.isCalculating) return;
    this.isCalculating = true;

    this.isExposed = false;
    let anyExposed = false;

    for (let i = 0; i < this.bones.length; i++) {
      if (this.debugLen === 0 && anyExposed) break;

      const [boneX, boneY, boneZ] = GetPedBoneCoords(
        this.entity,
        this.bones[i].id, 0, 0, 0
      );

      const boneV = new Vector3(boneX, boneY, boneZ);
      const endV = boneV.add(Sun.vector.multiply(this.rayLen));

      const rayHandle = StartShapeTestLosProbe(
        boneV.x, boneV.y, boneV.z,
        endV.x, endV.y, endV.z,
        1 | 2 | 16,
        0,
        1 | 2
      );

      let retval = 0;
      let hit = false;
      while (retval !== 2) {
        [retval, hit] = GetShapeTestResult(rayHandle);
        await new Promise(resolve => setTimeout(resolve, 0));
      }
      
      this.bones[i].exposed = hit;
      if (hit) anyExposed = true;
    }

    this.isExposed = anyExposed;
    this.isCalculating = false;
  }
}

const EntitySun = new Sun(PlayerPedId(), [
  PedBones.HEAD,
  PedBones.R_HAND,
  PedBones.L_HAND,
  PedBones.R_FOOT,
  PedBones.L_FOOT
], 20.0);

on('playerSpawned', () => {
  EntitySun.entity = PlayerPedId();

  if (EntitySun.checkThread) {
    clearInterval(EntitySun.checkThread);
    EntitySun.checkThread = null;
  }

  EntitySun.checkThread = setInterval(() => {
    EntitySun.calcExposure();
  }, 250);

  if (!EntitySun.tickThread && EntitySun.debugLen !== 0) {
    EntitySun.tickThread = true;
    setTick(() => {
      EntitySun.drawVisualDebug();
    });
  }
});

on('PedChanged', (ped: number) => { // Edit 'PedChanged' to whatever client event handles player's ped change
  EntitySun.entity = ped;
});