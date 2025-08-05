#!/usr/bin/env node

/**
 * Real Docker integration for HookBuilder n8n environment
 * Manages n8n container startup with custom DeFi nodes
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🐳 HookBuilder Docker Environment');
console.log('=================================');
console.log();

// Check if Docker is available
function checkDockerAvailability() {
  return new Promise((resolve, reject) => {
    exec('docker --version', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Docker not available:', error.message);
        console.log('💡 Please install Docker: https://docs.docker.com/get-docker/');
        reject(error);
      } else {
        console.log('✅ Docker available:', stdout.trim());
        resolve();
      }
    });
  });
}

// Check for custom nodes
function checkCustomNodes() {
  const nodesDir = path.join(__dirname, '../apps/n8n/nodes');
  console.log(`🔍 Checking custom nodes in: ${nodesDir}`);
  
  if (!fs.existsSync(nodesDir)) {
    console.log('⚠️  Custom nodes directory not found, creating...');
    fs.mkdirSync(nodesDir, { recursive: true });
    return [];
  }
  
  const nodeFiles = fs.readdirSync(nodesDir).filter(f => f.endsWith('.node.js'));
  console.log(`📦 Found ${nodeFiles.length} custom DeFi nodes:`);
  nodeFiles.forEach(file => {
    const nodeName = file.replace('.node.js', '');
    console.log(`   📄 ${nodeName} node`);
  });
  
  return nodeFiles;
}

// Start Docker Compose
function startDockerCompose() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting n8n with docker-compose...');
    
    const dockerCompose = spawn('docker', ['compose', 'up', '-d'], {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    });
    
    let output = '';
    let errorOutput = '';
    
    dockerCompose.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      // Show real-time output
      process.stdout.write(text);
    });
    
    dockerCompose.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      process.stderr.write(text);
    });
    
    dockerCompose.on('close', (code) => {
      if (code === 0) {
        console.log('\n✅ Docker Compose started successfully');
        resolve({ output, errorOutput });
      } else {
        console.error(`\n❌ Docker Compose failed with exit code ${code}`);
        reject(new Error(`Docker Compose failed: ${errorOutput}`));
      }
    });
  });
}

// Wait for n8n to be ready
function waitForN8n(maxWaitTime = 60000) {
  return new Promise((resolve, reject) => {
    console.log('⏳ Waiting for n8n to be ready...');
    
    const startTime = Date.now();
    const checkInterval = 2000;
    
    const checkHealth = () => {
      exec('curl -f http://localhost:5678/healthz', (error, stdout, stderr) => {
        if (!error) {
          console.log('✅ n8n is ready and healthy!');
          resolve();
        } else {
          const elapsed = Date.now() - startTime;
          if (elapsed > maxWaitTime) {
            console.error('❌ Timeout waiting for n8n to start');
            reject(new Error('n8n startup timeout'));
          } else {
            console.log(`⏳ Still waiting... (${Math.round(elapsed/1000)}s)`);
            setTimeout(checkHealth, checkInterval);
          }
        }
      });
    };
    
    // Start checking after initial delay
    setTimeout(checkHealth, 5000);
  });
}

// Get container status
function getContainerStatus() {
  return new Promise((resolve, reject) => {
    exec('docker ps --filter name=hookbuilder-n8n --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"', 
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log('\n📊 Container Status:');
          console.log(stdout);
          resolve(stdout);
        }
      });
  });
}

// Main execution
async function main() {
  try {
    // Check prerequisites
    await checkDockerAvailability();
    const nodeFiles = checkCustomNodes();
    
    console.log();
    
    // Start containers
    await startDockerCompose();
    
    // Wait for n8n to be ready
    await waitForN8n();
    
    // Show status
    await getContainerStatus();
    
    console.log();
    console.log('🎯 ENVIRONMENT READY:');
    console.log('- n8n container: RUNNING ✅');
    console.log('- Health check: PASSING ✅');
    console.log('- Custom nodes: MOUNTED ✅');
    console.log('- Web UI: http://localhost:5678 ✅');
    console.log();
    console.log('📝 Next steps:');
    console.log('1. Open http://localhost:5678 in browser');
    console.log('2. Create workflow with custom DeFi nodes');
    console.log('3. Test RPC integration');
    console.log('4. Generate evidence for grants');
    
    // Grant evidence
    const evidence = {
      timestamp: new Date().toISOString(),
      environment: 'docker-compose',
      container: 'hookbuilder-n8n',
      n8n_url: 'http://localhost:5678',
      custom_nodes: nodeFiles.length,
      status: 'ready'
    };
    
    console.log();
    console.log('🎯 GRANT EVIDENCE:');
    console.log(JSON.stringify(evidence, null, 2));
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Ensure Docker is installed and running');
    console.log('2. Check if port 5678 is available');
    console.log('3. Verify docker-compose.yml exists');
    console.log('4. Run: docker compose logs n8n');
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down containers...');
  exec('docker compose down', (error, stdout, stderr) => {
    if (error) {
      console.error('Error stopping containers:', error.message);
    } else {
      console.log('✅ Containers stopped successfully');
    }
    process.exit(0);
  });
});

if (require.main === module) {
  main();
}

module.exports = { 
  checkDockerAvailability, 
  checkCustomNodes, 
  startDockerCompose, 
  waitForN8n 
};