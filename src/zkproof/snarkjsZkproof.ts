const { groth16 } = require('snarkjs');

async function fetchFile(path: string) {
  const response = await fetch(path);
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

export async function exportCallDataGroth16(
  input: {
    salt: string;
    amount: string;
    asset: string;
  },
  wasmPath: string,
  zkeyPath: string
) {
  const wasmData = await fetchFile(wasmPath);
  const zkeyData = await fetchFile(zkeyPath);

  const { proof: _proof, publicSignals: _publicSignals } = await groth16.fullProve(
    input,
    wasmData,
    zkeyData
  );

  const calldata = await groth16.exportSolidityCallData(_proof, _publicSignals);

  const argv: string[] = calldata
    .replace(/["[\]\s]/g, '')
    .split(',')
    .map((x: string) => BigInt(x).toString());

  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const Input: string[] = [];

  for (let i = 8; i < argv.length; i++) {
    Input.push(argv[i]);
  }

  return { a, b, c, Input };
}
