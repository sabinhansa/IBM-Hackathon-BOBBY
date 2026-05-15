# Bob Shell Integration Guide

**Complete guide for integrating BobFlow with Bob Shell for local automation**

## 🎯 Overview

This guide demonstrates how Bob Shell can power BobFlow workflows non-interactively for power users. The integration is **optional** and designed for teams who want to automate repository analysis workflows locally.

## ⚠️ Critical Security Requirements

### NEVER Do This

❌ **Commit API keys to version control**
```bash
# DON'T
git add .env
echo "BOBSHELL_API_KEY=sk-abc123" >> config.sh
```

❌ **Use --yolo mode without review**
```bash
# DON'T
bob --yolo -p "Make changes to production code"
```

❌ **Analyze sensitive repositories without .bobignore**
```bash
# DON'T
bob -p "Analyze everything in this repo"  # Without .bobignore
```

❌ **Share API keys in scripts or documentation**
```bash
# DON'T
export BOBSHELL_API_KEY="sk-abc123..."  # Hardcoded key
```

### ALWAYS Do This

✅ **Use environment variables for API keys**
```bash
# DO
export BOBSHELL_API_KEY="${BOBSHELL_API_KEY}"  # From secure source
```

✅ **Review all generated output before applying**
```bash
# DO
bob -p "Suggest improvements" > review.md
# Review review.md thoroughly before applying changes
```

✅ **Use .bobignore to exclude sensitive files**
```bash
# DO
cat > .bobignore << EOF
.env
.env.*
*.key
*.pem
secrets/
credentials/
node_modules/
.git/
EOF
```

✅ **Store API keys securely**
- Use password managers (1Password, LastPass, etc.)
- Use secret management tools (HashiCorp Vault, AWS Secrets Manager)
- Use environment variable management tools (direnv, dotenv)

## 📋 Prerequisites

### 1. Install Bob Shell

Follow the official IBM Bob installation guide:
```bash
# Installation instructions from IBM Bob documentation
# Visit: https://github.com/IBM/bob
```

### 2. Obtain API Key

Get your Bob Shell API key from IBM Bob:
1. Sign up for IBM Bob access
2. Generate an API key from your account settings
3. Store it securely (never commit to git)

### 3. Set Up Environment

```bash
# Create environment file (DO NOT COMMIT THIS)
cat > .env << EOF
BOBSHELL_API_KEY=your-api-key-here
BOBFLOW_OUTPUT_DIR=./bobflow-output
BOBFLOW_TARGET_REPO=.
EOF

# Add .env to .gitignore
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore

# Load environment variables
source .env
# OR use direnv: direnv allow
```

### 4. Create .bobignore

Protect sensitive files from analysis:
```bash
cat > .bobignore << EOF
# Environment variables and secrets
.env
.env.*
*.key
*.pem
secrets/
credentials/

# Dependencies
node_modules/
vendor/
.venv/

# Build outputs
dist/
build/
.vite/
*.min.js
*.bundle.js

# Git
.git/

# IDE
.vscode/
.idea/
*.swp

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db

# Test coverage
coverage/
.nyc_output/
EOF
```

## 🚀 Quick Start

### Verify Installation

```bash
# Check Bob Shell is installed
bob --version

# Verify API key is set
echo $BOBSHELL_API_KEY | grep -q "." && echo "✅ API key set" || echo "❌ API key not set"

# Test Bob Shell connection
bob --auth-method api-key --chat-mode=ask -p "Hello, Bob!"
```

### Run Your First Workflow

```bash
# Navigate to BobFlow runner directory
cd runner/commands

# Make scripts executable
chmod +x *.sh

# Run repo onboarding workflow
./onboarding.sh /path/to/your/repo

# View the generated output
cat onboarding.md
```

## 📊 Workflow Commands

### 1. Repo Onboarding

**Purpose**: Generate plain-language onboarding guide

**Command**:
```bash
./runner/commands/onboarding.sh /path/to/repo [output-file.md]
```

**Bob Mode**: Ask Mode

**Output**: Markdown document with:
- Project purpose and goals
- Key directories and their roles
- Important files to understand
- Development workflow
- First contribution steps

**Example**:
```bash
# Onboard to a new repository
./runner/commands/onboarding.sh ~/projects/my-app onboarding.md

# Review the output
less onboarding.md

# Add to repository
cp onboarding.md ~/projects/my-app/ONBOARDING.md
```

### 2. Architecture Map

**Purpose**: Create system architecture documentation

**Command**:
```bash
./runner/commands/architecture.sh /path/to/repo [output-file.md]
```

**Bob Mode**: Plan Mode

**Output**: Architecture document with:
- System overview
- Major components and responsibilities
- Component interactions and data flow
- External dependencies
- Design patterns
- Scalability considerations

**Example**:
```bash
# Generate architecture documentation
./runner/commands/architecture.sh ~/projects/my-app architecture.md

# Review and share with team
code architecture.md
```

### 3. Documentation Gap Finder

**Purpose**: Identify missing or inadequate documentation

**Command**:
```bash
./runner/commands/doc-gaps.sh /path/to/repo [output-file.json]
```

**Bob Mode**: Ask Mode + Review Mode

**Output**: JSON report with:
- Summary statistics (total gaps, priority breakdown)
- Detailed gap list with locations
- Prioritized recommendations

**Example**:
```bash
# Find documentation gaps
./runner/commands/doc-gaps.sh ~/projects/my-app doc-gaps.json

# View summary
jq '.summary' doc-gaps.json

# View high-priority gaps
jq '.gaps[] | select(.priority == "high")' doc-gaps.json
```

### 4. Test Plan Generator

**Purpose**: Generate comprehensive test plans

**Command**:
```bash
./runner/commands/test-plan.sh /path/to/repo [output-file.md] [changed-files...]
```

**Bob Mode**: Code Mode

**Output**: Test plan with:
- Unit tests needed
- Integration tests required
- Edge cases to cover
- Test data requirements
- Expected coverage
- Test code examples

**Example**:
```bash
# Generate test plan for specific files
./runner/commands/test-plan.sh ~/projects/my-app test-plan.md \
  src/api/users.ts \
  src/utils/validation.ts

# Generate test plan for all changes
cd ~/projects/my-app
git diff --name-only main | xargs ./runner/commands/test-plan.sh . test-plan.md
```

### 5. Risk Review

**Purpose**: Identify risky code and security concerns

**Command**:
```bash
./runner/commands/risk-review.sh /path/to/repo [output-file.json]
```

**Bob Mode**: Review Mode

**Output**: Risk assessment with:
- Summary by severity and category
- Security vulnerabilities
- Code quality issues
- Reliability concerns
- Performance bottlenecks
- Remediation steps

**Example**:
```bash
# Perform risk assessment
./runner/commands/risk-review.sh ~/projects/my-app risk-review.json

# View critical risks
jq '.risks[] | select(.severity == "critical")' risk-review.json

# Generate risk report
jq -r '.risks[] | "\(.severity | ascii_upcase): \(.description) (\(.location))"' \
  risk-review.json > risk-report.txt
```

### 6. PR Pack Generator

**Purpose**: Generate complete PR documentation

**Command**:
```bash
./runner/commands/pr-pack.sh /path/to/repo [output-file.md] [branch]
```

**Bob Mode**: Code Mode + Plan Mode

**Output**: PR package with:
- PR title and description
- Changelog entry
- Testing evidence
- Reviewer checklist
- Deployment notes
- Related issues

**Example**:
```bash
# Generate PR documentation for current branch
cd ~/projects/my-app
../bobflow/runner/commands/pr-pack.sh . pr-pack.md HEAD

# Generate PR for specific branch
./runner/commands/pr-pack.sh ~/projects/my-app pr-pack.md feature/new-api

# Copy to clipboard (macOS)
cat pr-pack.md | pbcopy
```

## 🔧 Advanced Usage

### Batch Processing

Process multiple repositories:
```bash
#!/bin/bash
# batch-onboard.sh

REPOS=(
  ~/projects/app1
  ~/projects/app2
  ~/projects/app3
)

for repo in "${REPOS[@]}"; do
  echo "Processing $repo..."
  ./runner/commands/onboarding.sh "$repo" "${repo}/ONBOARDING.md"
done
```

### CI/CD Integration

Run workflows in CI/CD pipelines:
```yaml
# .github/workflows/bobflow.yml
name: BobFlow Analysis

on:
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Risk Review
        env:
          BOBSHELL_API_KEY: ${{ secrets.BOBSHELL_API_KEY }}
        run: |
          ./runner/commands/risk-review.sh . risk-review.json
          
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: risk-review
          path: risk-review.json
```

### Custom Workflows

Create custom workflow combinations:
```bash
#!/bin/bash
# full-analysis.sh - Complete repository analysis

REPO="${1:-.}"
OUTPUT_DIR="${2:-./bobflow-analysis}"

mkdir -p "$OUTPUT_DIR"

echo "🚀 Running complete BobFlow analysis..."

# 1. Onboarding
./runner/commands/onboarding.sh "$REPO" "$OUTPUT_DIR/onboarding.md"

# 2. Architecture
./runner/commands/architecture.sh "$REPO" "$OUTPUT_DIR/architecture.md"

# 3. Documentation Gaps
./runner/commands/doc-gaps.sh "$REPO" "$OUTPUT_DIR/doc-gaps.json"

# 4. Risk Review
./runner/commands/risk-review.sh "$REPO" "$OUTPUT_DIR/risk-review.json"

echo "✅ Analysis complete! Results in $OUTPUT_DIR"
```

## 🛡️ Security Best Practices

### 1. API Key Management

**Use Secret Management Tools**:
```bash
# Using 1Password CLI
export BOBSHELL_API_KEY=$(op read "op://Private/Bob Shell/api-key")

# Using AWS Secrets Manager
export BOBSHELL_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id bobshell-api-key \
  --query SecretString \
  --output text)

# Using HashiCorp Vault
export BOBSHELL_API_KEY=$(vault kv get -field=api-key secret/bobshell)
```

### 2. Repository Scanning

**Always use .bobignore**:
```bash
# Verify .bobignore exists before running
if [ ! -f "$REPO/.bobignore" ]; then
  echo "⚠️  Warning: No .bobignore found!"
  echo "Create one? (y/n)"
  read -r response
  if [ "$response" = "y" ]; then
    cp .bobignore.template "$REPO/.bobignore"
  fi
fi
```

### 3. Output Sanitization

**Review output for sensitive data**:
```bash
# Check for potential secrets in output
grep -E "(password|secret|key|token)" output.md && \
  echo "⚠️  Potential secrets found in output!"

# Sanitize before committing
sed -i 's/sk-[a-zA-Z0-9]\{32\}/[REDACTED]/g' output.md
```

### 4. Audit Logging

**Log all Bob Shell invocations**:
```bash
# Add to your scripts
log_bob_usage() {
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | $USER | $1" >> ~/.bobflow-audit.log
}

# Usage
log_bob_usage "onboarding: $REPO"
./runner/commands/onboarding.sh "$REPO"
```

## 🐛 Troubleshooting

### API Key Issues

**Problem**: "BOBSHELL_API_KEY not set"
```bash
# Solution: Verify environment variable
echo $BOBSHELL_API_KEY

# If empty, set it
export BOBSHELL_API_KEY="your-key-here"

# Make permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export BOBSHELL_API_KEY="your-key-here"' >> ~/.bashrc
```

### Bob Shell Not Found

**Problem**: "bob: command not found"
```bash
# Solution: Verify Bob Shell installation
which bob

# If not found, install Bob Shell
# Follow: https://github.com/IBM/bob
```

### Permission Denied

**Problem**: "Permission denied" when running scripts
```bash
# Solution: Make scripts executable
chmod +x runner/commands/*.sh

# Or run with bash explicitly
bash runner/commands/onboarding.sh
```

### Output Not Generated

**Problem**: Script runs but no output file created
```bash
# Solution: Check Bob Shell output for errors
bob --auth-method api-key --chat-mode=ask -p "Test" 2>&1 | tee bob-debug.log

# Verify output directory exists
mkdir -p ./bobflow-output

# Check file permissions
ls -la ./bobflow-output
```

## 📚 Additional Resources

- [IBM Bob Documentation](https://github.com/IBM/bob)
- [BobFlow GitHub Repository](https://github.com/hansasabin/IBM-Hackathon-BOBBY)
- [Bob Shell Command Reference](https://github.com/IBM/bob/docs/commands)
- [Security Best Practices](https://github.com/IBM/bob/docs/security)

## 🤝 Contributing

Found an issue or have a suggestion? Please open an issue on the [BobFlow repository](https://github.com/hansasabin/IBM-Hackathon-BOBBY/issues).

## 📄 License

MIT License - See LICENSE file for details

---

**Remember**: This integration is optional. The static GitHub Pages app works perfectly without Bob Shell. This guide is for power users who want local automation capabilities.