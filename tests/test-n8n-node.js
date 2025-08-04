#!/usr/bin/env node

/**
 * Test script for HookBuilder n8n EthereumBalance node
 * Simulates n8n environment to test our custom node
 */

const { EthereumBalance } = require('../apps/n8n/nodes/EthereumBalance.node.js');

// Mock n8n environment
class MockN8nContext {
  constructor() {
    this.parameters = {
      operation: 'getBalance',
      network: 'sepolia',
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address
      rpcUrl: ''
    };
    this.inputData = [{}];
  }

  getInputData() {
    return this.inputData;
  }

  getNodeParameter(name, index) {
    return this.parameters[name];
  }

  getNode() {
    return { name: 'EthereumBalance Test' };
  }

  continueOnFail() {
    return false;
  }

  helpers = {
    async request(options) {
      console.log(`🌐 Making RPC request to: ${options.url}`);
      console.log(`📦 Request body:`, JSON.stringify(options.body, null, 2));
      
      try {
        const fetch = require('node-fetch');
        const response = await fetch(options.url, {
          method: options.method,
          headers: options.headers,
          body: JSON.stringify(options.body)
        });
        
        const result = await response.json();
        console.log(`✅ RPC Response:`, JSON.stringify(result, null, 2));
        return result;
      } catch (error) {
        console.error(`❌ RPC Error:`, error.message);
        throw error;
      }
    }
  };
}

async function testEthereumBalanceNode() {
  console.log('🚀 Testing HookBuilder EthereumBalance Node');
  console.log('=' .repeat(50));
  
  try {
    // Create mock n8n context
    const context = new MockN8nContext();
    
    // Create node instance
    const node = new EthereumBalance();
    
    // Bind context to node
    Object.setPrototypeOf(node, context);
    
    console.log('📋 Node Description:');
    console.log(`   Name: ${node.description.displayName}`);
    console.log(`   Version: ${node.description.version}`);
    console.log(`   Group: ${node.description.group.join(', ')}`);
    console.log('');
    
    console.log('⚙️  Test Parameters:');
    console.log(`   Network: ${context.parameters.network}`);
    console.log(`   Address: ${context.parameters.address}`);
    console.log(`   Operation: ${context.parameters.operation}`);
    console.log('');
    
    console.log('🔄 Executing node...');
    const result = await node.execute.call(context);
    
    console.log('');
    console.log('✅ Execution completed successfully!');
    console.log('📊 Result:');
    console.log(JSON.stringify(result[0][0].json, null, 2));
    
    // Evidence for grant applications
    const evidence = result[0][0].json.hookbuilder;
    console.log('');
    console.log('🎯 Grant Evidence Generated:');
    console.log(`   Node: ${evidence.node}`);
    console.log(`   Version: ${evidence.version}`);
    console.log(`   Evidence: ${evidence.evidence}`);
    
    console.log('');
    console.log('🎉 HookBuilder n8n Node Test PASSED!');
    console.log('📋 Ready for grant demonstration');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run test if called directly
if (require.main === module) {
  testEthereumBalanceNode();
}

module.exports = { testEthereumBalanceNode };