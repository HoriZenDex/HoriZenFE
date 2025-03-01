import { PinataSDK } from "pinata-web3";

// Asegurarnos de que estamos accediendo correctamente a las variables de entorno
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT || "";
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL || "indigo-left-leopard-680.mypinata.cloud";

// Para verificar que el token está disponible en desarrollo
if (!PINATA_JWT) {
  console.warn("⚠️ NEXT_PUBLIC_PINATA_JWT no está configurado en las variables de entorno");
}

export const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY
});