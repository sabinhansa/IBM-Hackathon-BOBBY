#!/usr/bin/env node
/**
 * BobFlow Runner - Conceptual CLI Tool
 * 
 * This is a demonstration script showing how a CLI tool could orchestrate
 * Bob Shell workflows. This is NOT a production-ready implementation.
 * 
 * Usage (conceptual):
 *   bobflow-runner onboard --repo ./target-repo
 *   bobflow-runner architecture --repo ./target-repo
 *   bobflow-runner test-plan --changed-files src/api.ts
 * 
 * Security: Requires BOBSHELL_API_KEY environment variable
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const WORKFLOWS = {
  onboard: {
    name: 'Repo Onboarding',
    script: 'onboarding.sh',
    description: 'Generate repository onboarding guide'
  },
  architecture: {
    name: 'Architecture Map',
    script: 'architecture.sh',
    description: 'Create system architecture documentation'
  },
  'doc-gaps': {
    name: 'Documentation Gap Finder',
    script: 'doc-gaps.sh',
    description: 'Identify documentation gaps'
  },
  'test-plan': {
    name: 'Test Plan Generator',
    script: 'test-plan.sh',
    description: 'Generate comprehensive test plan'
  },
  'risk-review': {
    name: 'Risk Review',
    script: 'risk-review.sh',
    description: 'Perform risk assessment'
  },
  'pr-pack': {
    name: 'PR Pack Generator',
    script: 'pr-pack.sh',
    description: 'Generate PR documentation package'
  }
};

// Security check
function checkSecurity() {
  if (!process.env.BOBSHELL_API_KEY) {
    console.error('❌ Error: BOBSHELL_API_KEY environment variable not set');
    console.error('Please set your Bob Shell API key:');
    console.error('  export BOBSHELL_API_KEY="your-api-key-here"');
    process.exit(1);
  }

  // Warn about .bobignore
  const targetRepo = process.env.BOBFLOW_TARGET_REPO || '.';
  const bobignorePath = path.join(targetRepo, '.bobignore');
  
  if (!fs.existsSync(bobignorePath)) {
    console.warn('⚠️  Warning: No .bobignore file found in target repository');
    console.warn('   Consider creating one to exclude sensitive files');
    console.warn('');
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    process.exit(0);
  }

  const workflow = args[0];
  
  if (!WORKFLOWS[workflow]) {
    console.error(`❌ Error: Unknown workflow "${workflow}"`);
    console.error('');
    showHelp();
    process.exit(1);
  }

  return {
    workflow,
    repo: getArgValue(args, '--repo') || '.',
    output: getArgValue(args, '--output'),
    changedFiles: getArgValue(args, '--changed-files')
  };
}

function getArgValue(args, flag) {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : null;
}

function showHelp() {
  console.log('BobFlow Runner - Local Bob Shell Automation');
  console.log('');
  console.log('Usage:');
  console.log('  bobflow-runner <workflow> [options]');
  console.log('');
  console.log('Workflows:');
  Object.entries(WORKFLOWS).forEach(([key, workflow]) => {
    console.log(`  ${key.padEnd(15)} ${workflow.description}`);
  });
  console.log('');
  console.log('Options:');
  console.log('  --repo <path>          Target repository path (default: current directory)');
  console.log('  --output <file>        Output file path (default: workflow-specific)');
  console.log('  --changed-files <list> Comma-separated list of changed files (for test-plan)');
  console.log('  --help, -h             Show this help message');
  console.log('');
  console.log('Environment Variables:');
  console.log('  BOBSHELL_API_KEY       Bob Shell API key (required)');
  console.log('  BOBFLOW_TARGET_REPO    Default target repository');
  console.log('  BOBFLOW_OUTPUT_DIR     Default output directory');
  console.log('');
  console.log('Examples:');
  console.log('  bobflow-runner onboard --repo ./my-project');
  console.log('  bobflow-runner architecture --repo ./my-project --output arch.md');
  console.log('  bobflow-runner test-plan --changed-files src/api.ts,src/utils.ts');
  console.log('');
  console.log('Security:');
  console.log('  - Never commit your BOBSHELL_API_KEY');
  console.log('  - Always use .bobignore to exclude sensitive files');
  console.log('  - Review all generated output before committing');
  console.log('  - Avoid --yolo mode in production');
}

// Run workflow
function runWorkflow(config) {
  const workflow = WORKFLOWS[config.workflow];
  const scriptPath = path.join(__dirname, '..', 'commands', workflow.script);

  console.log(`🚀 Running: ${workflow.name}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Build command
  const args = [config.repo];
  if (config.output) args.push(config.output);
  if (config.changedFiles) args.push(...config.changedFiles.split(','));

  const command = `bash ${scriptPath} ${args.join(' ')}`;

  try {
    // Execute the workflow script
    execSync(command, {
      stdio: 'inherit',
      env: process.env
    });
  } catch (error) {
    console.error('');
    console.error('❌ Workflow execution failed');
    process.exit(1);
  }
}

// Main execution
function main() {
  console.log('BobFlow Runner v0.1.0');
  console.log('');

  // Security checks
  checkSecurity();

  // Parse arguments
  const config = parseArgs();

  // Run workflow
  runWorkflow(config);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { WORKFLOWS, checkSecurity, parseArgs, runWorkflow };

// Made with Bob
