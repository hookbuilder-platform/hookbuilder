const { NodeOperationError } = require('n8n-workflow');

class EthereumBalance {
  description = {
    displayName: 'Ethereum Balance',
    name: 'ethereumBalance',
    group: ['defi'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Get Ethereum balance for any address - HookBuilder DeFi Node',
    defaults: {
      name: 'Ethereum Balance',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Get Balance',
            value: 'getBalance',
            description: 'Get ETH balance for an address',
            action: 'Get balance for an address',
          },
        ],
        default: 'getBalance',
      },
      {
        displayName: 'Network',
        name: 'network',
        type: 'options',
        options: [
          {
            name: 'Mainnet',
            value: 'mainnet',
          },
          {
            name: 'Sepolia',
            value: 'sepolia',
          },
          {
            name: 'Polygon',
            value: 'polygon',
          },
        ],
        default: 'sepolia',
        description: 'The Ethereum network to use',
      },
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        placeholder: '0x...',
        description: 'The Ethereum address to check balance for',
        required: true,
      },
      {
        displayName: 'RPC URL',
        name: 'rpcUrl',
        type: 'string',
        default: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
        description: 'Custom RPC URL (optional - uses public endpoints by default)',
        required: false,
      },
    ],
  };

  async execute() {
    const items = this.getInputData();
    const returnData = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const operation = this.getNodeParameter('operation', i);
        const network = this.getNodeParameter('network', i);
        const address = this.getNodeParameter('address', i);
        let rpcUrl = this.getNodeParameter('rpcUrl', i);

        // Default RPC URLs for different networks
        if (!rpcUrl || rpcUrl.includes('YOUR_PROJECT_ID')) {
          const defaultRpcUrls = {
            mainnet: 'https://eth.llamarpc.com',
            sepolia: 'https://sepolia.gateway.tenderly.co',
            polygon: 'https://polygon.llamarpc.com',
          };
          rpcUrl = defaultRpcUrls[network];
        }

        if (operation === 'getBalance') {
          // Make RPC call to get balance
          const response = await this.helpers.request({
            method: 'POST',
            url: rpcUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              jsonrpc: '2.0',
              method: 'eth_getBalance',
              params: [address, 'latest'],
              id: 1,
            },
            json: true,
          });

          if (response.error) {
            throw new NodeOperationError(
              this.getNode(),
              `RPC Error: ${response.error.message}`,
              { itemIndex: i }
            );
          }

          // Convert hex balance to decimal
          const balanceWei = parseInt(response.result, 16);
          const balanceEth = balanceWei / Math.pow(10, 18);

          const executionData = {
            json: {
              address,
              network,
              balanceWei: balanceWei.toString(),
              balanceEth: balanceEth.toString(),
              balanceFormatted: `${balanceEth.toFixed(6)} ETH`,
              timestamp: new Date().toISOString(),
              rpcUrl,
              // Evidence for grant applications
              hookbuilder: {
                node: 'EthereumBalance',
                version: '1.0.0',
                evidence: 'First custom DeFi node for HookBuilder POC',
              },
            },
          };

          returnData.push(executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
              address: this.getNodeParameter('address', i),
            },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

module.exports = {
  EthereumBalance,
};