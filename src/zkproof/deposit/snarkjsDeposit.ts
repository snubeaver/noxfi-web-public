import { exportCallDataGroth16 } from '../snarkjsZkproof';

export async function depositCalldata(salt: string, amount: string, asset: string) {
  const input = {
    salt: salt,
    amount: amount,
    asset: asset,
  };

  let dataResult;

  try {
    dataResult = await exportCallDataGroth16(
      input,
      '/zkproof/deposit.wasm',
      '/zkproof/deposit_final.zkey'
    );
  } catch (error) {
    console.log(error);
  }

  return dataResult;
}
