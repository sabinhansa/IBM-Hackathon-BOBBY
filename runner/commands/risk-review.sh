#!/bin/bash
# BobFlow - Risk Review Workflow
# Identifies risky code areas and security concerns

set -e

TARGET_REPO="${1:-.}"
OUTPUT_FILE="${2:-risk-review.json}"

if [ -z "$BOBSHELL_API_KEY" ]; then
    echo "❌ Error: BOBSHELL_API_KEY environment variable not set"
    exit 1
fi

if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repository not found: $TARGET_REPO"
    exit 1
fi

echo "⚠️  BobFlow - Risk Review Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target Repository: $TARGET_REPO"
echo "Output File: $OUTPUT_FILE"
echo ""

cd "$TARGET_REPO"

echo "🔍 Performing comprehensive risk assessment..."
echo ""

bob --auth-method api-key \
    --chat-mode=review \
    -p "Perform a comprehensive risk assessment of this codebase. Identify:

1. **Security Vulnerabilities**:
   - Hardcoded secrets or API keys
   - SQL injection risks
   - XSS vulnerabilities
   - Insecure authentication/authorization
   - Exposed sensitive data
   - Insecure dependencies

2. **Code Quality Issues**:
   - Complex code needing refactoring (high cyclomatic complexity)
   - Code duplication
   - Poor naming conventions
   - Inconsistent coding style
   - Missing type safety

3. **Reliability Concerns**:
   - Missing error handling
   - Unhandled promise rejections
   - Race conditions
   - Memory leaks
   - Resource leaks (file handles, connections)

4. **Performance Bottlenecks**:
   - Inefficient algorithms
   - N+1 query problems
   - Unnecessary computations
   - Blocking operations
   - Large bundle sizes

5. **Maintainability Issues**:
   - Tight coupling
   - Missing tests
   - Unclear configuration
   - Lack of documentation
   - Technical debt

For each risk found, provide:
- Category (Security, Code Quality, Reliability, Performance, Maintainability)
- Severity (critical, high, medium, low)
- Location (file path and line number)
- Description of the issue
- Impact if not addressed
- Remediation steps

Output as structured JSON:
{
  \"summary\": {
    \"totalRisks\": number,
    \"critical\": number,
    \"high\": number,
    \"medium\": number,
    \"low\": number,
    \"categories\": {
      \"security\": number,
      \"codeQuality\": number,
      \"reliability\": number,
      \"performance\": number,
      \"maintainability\": number
    }
  },
  \"risks\": [
    {
      \"category\": \"string\",
      \"severity\": \"critical|high|medium|low\",
      \"location\": \"string\",
      \"description\": \"string\",
      \"impact\": \"string\",
      \"remediation\": \"string\"
    }
  ]
}

Output to: $OUTPUT_FILE"

echo ""
echo "✅ Risk assessment complete: $OUTPUT_FILE"
echo ""
echo "📝 Next Steps:"
echo "   1. Review critical and high severity risks immediately"
echo "   2. Create security issues for vulnerabilities"
echo "   3. Prioritize remediation by severity and impact"
echo "   4. Schedule refactoring for code quality issues"
echo "   5. Track risk reduction over time"
echo ""
echo "⚠️  Security Reminder:"
echo "   - Address critical security issues immediately"
echo "   - Never commit fixes containing sensitive data"
echo "   - Test security fixes thoroughly"

# Made with Bob
