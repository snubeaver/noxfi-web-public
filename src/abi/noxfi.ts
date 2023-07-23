export const noxfiABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_WETHAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_DAIAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_matcherAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_depositVerifierAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_withdrawVerifierAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_orderVerifierAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_settleVerifierAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_cancelVerifierAddr',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'DAIAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETHAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'cArr',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[3]',
        name: 'input',
        type: 'uint256[3]',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelVerifierAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[3]',
        name: 'input',
        type: 'uint256[3]',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositVerifierAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'mArr',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oidx',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isMatched',
        type: 'bool',
      },
    ],
    name: 'matchOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'matcherAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'nArr',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'oArr',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'onArr',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'input',
        type: 'uint256[2]',
      },
    ],
    name: 'order',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'orderVerifierAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'setSettlementPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[4]',
        name: 'input',
        type: 'uint256[4]',
      },
    ],
    name: 'settle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleVerifierAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settlementPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[3]',
        name: 'input',
        type: 'uint256[3]',
      },
    ],
    name: 'verifyCancelProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[3]',
        name: 'input',
        type: 'uint256[3]',
      },
    ],
    name: 'verifyDepositProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'input',
        type: 'uint256[2]',
      },
    ],
    name: 'verifyOrderProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[4]',
        name: 'input',
        type: 'uint256[4]',
      },
    ],
    name: 'verifySettleProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[3]',
        name: 'input',
        type: 'uint256[3]',
      },
    ],
    name: 'verifyWithdrawProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: 'a',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: 'c',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[3]',
        name: 'input',
        type: 'uint256[3]',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawVerifierAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'zArr',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
