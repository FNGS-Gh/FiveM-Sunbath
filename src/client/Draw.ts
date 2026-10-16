import { PedBones, SunVector, Vector3 } from './utils';

export const drawSunVectorDebug = (ped: number, sunV: SunVector) => {
  if (!DoesEntityExist(ped) || sunV.z <= 0) return;

  const [headX, headY, headZ] = GetPedBoneCoords(ped, PedBones.HEAD, 0, 0, 0);
  const [rHandX, rHandY, rHandZ] = GetPedBoneCoords(ped, PedBones.R_HAND, 0, 0, 0);
  const [lHandX, lHandY, lHandZ] = GetPedBoneCoords(ped, PedBones.L_HAND, 0, 0, 0);
  const [rFootX, rFootY, rFootZ] = GetPedBoneCoords(ped, PedBones.R_FOOT, 0, 0, 0);
  const [lFootX, lFootY, lFootZ] = GetPedBoneCoords(ped, PedBones.L_FOOT, 0, 0, 0);

  const lineLen = 20.0;

  const headV = new Vector3(headX, headY, headZ);
  const rHandV = new Vector3(rHandX, rHandY, rHandZ);
  const lHandV = new Vector3(lHandX, lHandY, lHandZ);
  const rFootV = new Vector3(rFootX, rFootY, rFootZ);
  const lFootV = new Vector3(lFootX, lFootY, lFootZ);

  const sunPos = sunV.multiply(lineLen);

  const headEnd = headV.add(sunPos);
  const rHandEnd = rHandV.add(sunPos);
  const lHandEnd = lHandV.add(sunPos);
  const rFootEnd = rFootV.add(sunPos);
  const lFootEnd = lFootV.add(sunPos);

  DrawLine(headV.x, headV.y, headV.z, headEnd.x, headEnd.y, headEnd.z, 255, 0, 0, 255);
  DrawLine(rHandV.x, rHandV.y, rHandV.z, rHandEnd.x, rHandEnd.y, rHandEnd.z, 255, 0, 0, 255);
  DrawLine(lHandV.x, lHandV.y, lHandV.z, lHandEnd.x, lHandEnd.y, lHandEnd.z, 255, 0, 0, 255);
  DrawLine(rFootV.x, rFootV.y, rFootV.z, rFootEnd.x, rFootEnd.y, rFootEnd.z, 255, 0, 0, 255);
  DrawLine(lFootV.x, lFootV.y, lFootV.z, lFootEnd.x, lFootEnd.y, lFootEnd.z, 255, 0, 0, 255);
};