#!/bin/bash
# BobFlow - Repo Onboarding Workflow
# Generates a plain-language onboarding guide for a repository

set -e

# Configuration
TARGET_REPO="${1:-.}"
OUTPUT_FILE="${2:-onboarding.md}"

# Validate environment
if [ -z "$BOBSHELL_API_KEY" ]; then
    echo "❌ Error: BOBSHELL_API_KEY environment variable not set"
    echo "Please set your Bob Shell API key:"
    echo "  export BOBSHELL_API_KEY='your-api-key-here'"
    exit 1
fi

# Validate target repository
if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repository not found: $TARGET_REPO"
    exit 1
fi

echo "🚀 BobFlow - Repo Onboarding Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target Repository: $TARGET_REPO"
echo "Output File: $OUTPUT_FILE"
echo ""

# Change to target repository
cd "$TARGET_REPO"

# Check for .bobignore
if [ ! -f ".bobignore" ]; then
    echo "⚠️  Warning: No .bobignore file found"
    echo "   Consider creating one to exclude sensitive files"
    echo ""
fi

echo "📊 Analyzing repository structure..."
echo ""

# Run Bob Shell in Ask Mode
bob --auth-method api-key \
    --chat-mode=ask \
    -p "Analyze this repository structure and create a plain-language onboarding guide covering:

1. **Project Purpose**: What does this project do? What problem does it solve?
2. **Key Directories**: What are the main directories and what role does each play?
3. **Important Files**: Which files are critical to understand (config, entry points, tests)?
4. **Development Workflow**: How do developers work with this codebase? What commands are used?
5. **First Contribution Steps**: What should a new developer do to make their first contribution?

Format the output as a well-structured markdown document suitable for a README.md or ONBOARDING.md file.
Include code examples where helpful.
Make it friendly and accessible to developers unfamiliar with the project.

Output the complete guide to: $OUTPUT_FILE"

echo ""
echo "✅ Onboarding guide generated: $OUTPUT_FILE"
echo ""
echo "📝 Next Steps:"
echo "   1. Review the generated onboarding guide"
echo "   2. Verify accuracy of project description"
echo "   3. Add any missing context or details"
echo "   4. Consider adding to your repository as ONBOARDING.md"
echo ""
echo "⚠️  Security Reminder:"
echo "   - Review output for any sensitive information"
echo "   - Ensure no API keys or secrets are included"
echo "   - Verify all paths and commands are correct"

# Made with Bob
