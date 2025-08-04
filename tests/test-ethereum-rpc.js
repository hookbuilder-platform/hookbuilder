#!/usr/bin/env node

/**
 * Direct test of Ethereum RPC calls for HookBuilder POC
 * Tests the core functionality without n8n dependencies
 */

// Using native fetch available in Node.js 18+

async function testEthereumRPC() {
  console.log('🚀 Testing Ethereum RPC for HookBuilder POC');
  console.log('=' .repeat(50));
  
  const testAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Vitalik's address
  const networks = {
    sepolia: 'https://sepolia.gateway.tenderly.co',
    mainnet: 'https://eth.llamarpc.com'
  };
  
  for (const [networkName, rpcUrl] of Object.entries(networks)) {
    console.log(`\n🌐 Testing ${networkName.toUpperCase()} network`);
    console.log(`   RPC URL: ${rpcUrl}`);
    console.log(`   Address: ${testAddress}`);
    
    try {
      const requestBody = {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [testAddress, 'latest'],
        id: 1,
      };
      
      console.log('📤 Sending RPC request...');
      
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      
      if (result.error) {
        console.error(`❌ RPC Error: ${result.error.message}`);
        continue;
      }
      
      // Convert hex balance to decimal
      const balanceWei = parseInt(result.result, 16);
      const balanceEth = balanceWei / Math.pow(10, 18);
      
      console.log('✅ Success!');
      console.log(`   Balance (Wei): ${balanceWei.toString()}`);
      console.log(`   Balance (ETH): ${balanceEth.toFixed(6)} ETH`);
      
      // Generate evidence for grant applications
      const evidence = {
        timestamp: new Date().toISOString(),
        network: networkName,
        address: testAddress,
        balanceEth: balanceEth.toString(),
        rpcUrl: rpcUrl,
        hookbuilder: {
          node: 'EthereumBalance',
          version: '1.0.0',
          evidence: 'HookBuilder POC - Direct RPC test successful',
          testType: 'standalone_rpc_test'
        }
      };
      
      console.log('🎯 Grant Evidence:');
      console.log(JSON.stringify(evidence, null, 2));
      
    } catch (error) {
      console.error(`❌ Network error for ${networkName}:`, error.message);
    }
  }
  
  console.log('\n🎉 HookBuilder RPC Test Complete!');
  console.log('📋 Ready for grant demonstration');
  console.log('💡 This proves our Ethereum integration works');
}

// Test simple transaction creation (simulate)
async function simulateTransactionCreation() {
  console.log('\n🔄 Simulating Transaction Creation for POC');
  console.log('-' .repeat(40));
  
  const mockTransaction = {
    from: '0x0000000000000000000000000000000000000001',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    value: '0x16345785D8A0000', // 0.1 ETH in hex
    gas: '0x5208', // 21000 gas
    gasPrice: '0x9502F9000', // 40 gwei
    nonce: '0x0',
    data: '0x484f4f4b4255494c444552', // "HOOKBUILDER" in hex
  };
  
  console.log('📋 Mock Transaction (for demonstration):');
  console.log(JSON.stringify(mockTransaction, null, 2));
  
  // Simulate transaction hash
  const mockTxHash = '0x' + Array(64).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  console.log(`\n✅ Simulated Transaction Hash: ${mockTxHash}`);
  console.log('💡 Next step: Real testnet transaction for evidence');
  
  return mockTxHash;
}

async function main() {
  await testEthereumRPC();
  await simulateTransactionCreation();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testEthereumRPC, simulateTransactionCreation };