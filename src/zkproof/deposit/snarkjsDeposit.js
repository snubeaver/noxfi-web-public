import { exportCallDataGroth16 } from "../snarkjsZkproof";

export async function depositCalldata(salt, amount, asset) {
  const input = {
    salt: salt,
    amount: amount,
    asset: asset
  };

  let dataResult;

  try {
    dataResult = await exportCallDataGroth16(
      input,
      "/zkproof/deposit.wasm",
      "/zkproof/deposit_final.zkey"
    );
  } catch (error) {
    console.log(error);
  }

  return dataResult;
}
