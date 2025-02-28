import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: "indigo-left-leopard-680.mypinata.cloud", // Añade protocolo y ruta
});