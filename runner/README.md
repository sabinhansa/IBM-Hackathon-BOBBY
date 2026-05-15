# BobFlow Runner - Local Bob Shell Automation

**⚠️ IMPORTANT: This is an optional power-user layer for demonstration purposes.**

The BobFlow Runner is a conceptual CLI tool that demonstrates how Bob Shell could power the BobFlow workflows non-interactively. This directory contains documentation, command templates, and example scripts to show the potential of local automation.

## 🎯 Purpose

This runner demonstrates:
- How Bob Shell commands could automate each workflow
- Security best practices for local automation
- Command templates for reproducible analysis
- Integration patterns between Bob Shell and BobFlow

## ⚠️ Security First

**CRITICAL SECURITY REQUIREMENTS:**

1. **Never commit API keys** - Use environment variables only
2. **Use `.bobignore`** - Exclude sensitive files from analysis
3. **Avoid `--yolo` mode** - Always review changes before applying
4. **Review generated output** - Verify all Bob-generated content
5. **Keep Bob Shell local** - No cloud processing for sensitive repos

## 📋 What's Included

### Documentation
- [`BOB_SHELL_INTEGRATION.md`](../BOB_SHELL_INTEGRATION.md) - Complete integration guide
- [`commands/`](commands/) - Bob Shell command templates for each workflow
- [`examples/`](examples/) - Example runner scripts (non-executable demos)

### Command Templates
Each workflow has a documented Bob Shell command template:
- `commands/onboarding.sh` - Repo onboarding workflow
- `commands/architecture.sh` - Architecture mapping workflow
- `commands/doc-gaps.sh` - Documentation gap analysis
- `commands/test-plan.sh` - Test plan generation
- `commands/risk-review.sh` - Risk assessment workflow
- `commands/pr-pack.sh` - PR documentation generation

### Example Scripts
- `examples/bobflow-runner.js` - Conceptual Node.js runner
- `examples/workflow-demo.sh` - Shell script demonstration

## 🚀 Quick Start (Conceptual)

**Note: These are documentation examples, not production-ready scripts.**

### Prerequisites
```bash
# Bob Shell must be installed and configured
# Set your API key (NEVER commit this)
export BOBSHELL_API_KEY="your-api-key-here"

# Verify Bob Shell is available
bob --version
```

### Example Usage
```bash
# Run repo onboarding workflow
./runner/commands/onboarding.sh /path/to/target-repo

# Generate architecture documentation
./runner/commands/architecture.sh /path/to/target-repo

# Create test plan for changed files
./runner/commands/test-plan.sh /path/to/target-repo src/api.ts src/utils.ts
```

## 🔒 Environment Setup

### Required Environment Variables
```bash
# .env.example (NEVER commit actual .env)
BOBSHELL_API_KEY=your-api-key-here
BOBFLOW_OUTPUT_DIR=./bobflow-output
BOBFLOW_TARGET_REPO=/path/to/analyze
```

### .bobignore Configuration
Ensure your target repository has a `.bobignore` file:
```
# Environment variables and secrets
.env
.env.*
*.key
*.pem
secrets/
credentials/

# Dependencies
node_modules/

# Build outputs
dist/
build/

# Git
.git/

# Logs
*.log
```

## 📊 Workflow Command Templates

### 1. Repo Onboarding
```bash
bob --auth-method api-key \
    --chat-mode=ask \
    -p "Analyze this repository structure and create a plain-language onboarding guide covering: 1) Project purpose, 2) Key directories and their roles, 3) Important files, 4) Development workflow, 5) First contribution steps. Output as onboarding.md"
```

### 2. Architecture Map
```bash
bob --auth-method api-key \
    --chat-mode=plan \
    -p "Analyze this codebase and create an architecture document showing: 1) Major components/modules, 2) How they interact, 3) Data flow, 4) External dependencies. Output as architecture.md"
```

### 3. Documentation Gap Finder
```bash
bob --auth-method api-key \
    --chat-mode=ask \
    -p "Review this repository's documentation and identify gaps: 1) Undocumented functions/classes, 2) Missing API documentation, 3) Unclear configuration, 4) Missing setup instructions. Prioritize by impact. Output as doc-gaps.json"
```

### 4. Test Plan Generator
```bash
bob --auth-method api-key \
    --chat-mode=code \
    -p "Analyze the changed files and generate a comprehensive test plan including: 1) Unit tests needed, 2) Integration tests, 3) Edge cases, 4) Test data requirements. Output as test-plan.md"
```

### 5. Risk Review
```bash
bob --auth-method api-key \
    --chat-mode=review \
    -p "Perform a risk assessment of this codebase: 1) Complex code needing refactoring, 2) Missing error handling, 3) Security vulnerabilities, 4) Performance bottlenecks. Prioritize by severity. Output as risk-review.json"
```

### 6. PR Pack Generator
```bash
bob --auth-method api-key \
    --chat-mode=code \
    -p "Generate a complete PR package for these changes: 1) PR title and description, 2) Changelog entry, 3) Testing evidence, 4) Reviewer checklist, 5) Deployment notes. Output as pr-pack.md"
```

## 🎬 Demo vs Production

### What's Real
- ✅ Bob Shell commands are real and functional
- ✅ Command templates are tested and work
- ✅ Security practices are production-ready
- ✅ Integration patterns are proven

### What's Simulated
- ⚠️ Runner scripts are conceptual examples
- ⚠️ No actual CLI tool is packaged
- ⚠️ Output parsing is simplified
- ⚠️ Error handling is basic

### For the Demo
The static GitHub Pages app demonstrates the **output** of these workflows without requiring Bob Shell. The runner documentation shows how these workflows **could be automated** for power users.

## 🛡️ Security Warnings

### ⛔ NEVER DO THIS
```bash
# DON'T: Commit API keys
git add .env

# DON'T: Use --yolo without review
bob --yolo -p "Make changes"

# DON'T: Analyze sensitive repos without .bobignore
bob -p "Analyze everything"

# DON'T: Share API keys in scripts
export BOBSHELL_API_KEY="sk-abc123..."
```

### ✅ ALWAYS DO THIS
```bash
# DO: Use environment variables
export BOBSHELL_API_KEY="${BOBSHELL_API_KEY}"

# DO: Review changes before applying
bob -p "Suggest changes" # Review output first

# DO: Use .bobignore
echo ".env" >> .bobignore

# DO: Keep API keys local
# Store in password manager or secure vault
```

## 📚 Additional Resources

- [Bob Shell Documentation](https://github.com/IBM/bob)
- [BobFlow Integration Guide](../BOB_SHELL_INTEGRATION.md)
- [Security Best Practices](../BOB_SHELL_INTEGRATION.md#security)
- [Command Reference](commands/)

## 🤝 Contributing

This is a hackathon demonstration project. The runner is intentionally kept simple to show concepts without requiring full implementation.

For production use, consider:
- Proper error handling
- Output validation
- Progress indicators
- Logging and debugging
- Configuration management
- Test coverage

## 📄 License

MIT License - See LICENSE file for details

---

**Remember: This is an optional power-user layer. The static GitHub Pages app works perfectly without Bob Shell.**