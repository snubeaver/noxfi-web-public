import { exportCallDataGroth16 } from '../snarkjsZkproof';

export async function depositCalldata(salt: string, amount: string, asset: string) {
  const input = {
    salt: salt,
    amount: amount,
    asset: asset,
  };

  try {
    const dataResult: {
      a: string[];
      b: string[][];
      c: string[];
      Input: string[];
    } = await exportCallDataGroth16(input, '/zkproof/deposit.wasm', '/zkproof/deposit_final.zkey');

    return dataResult;
  } catch (error) {
    console.log(error);
  }

  return null;
}
