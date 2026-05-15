#!/bin/bash
# BobFlow - Test Plan Generator Workflow
# Generates comprehensive test plans based on code changes

set -e

TARGET_REPO="${1:-.}"
OUTPUT_FILE="${2:-test-plan.md}"
shift 2 2>/dev/null || true
CHANGED_FILES="$@"

if [ -z "$BOBSHELL_API_KEY" ]; then
    echo "❌ Error: BOBSHELL_API_KEY environment variable not set"
    exit 1
fi

if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repository not found: $TARGET_REPO"
    exit 1
fi

echo "🧪 BobFlow - Test Plan Generator Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target Repository: $TARGET_REPO"
echo "Output File: $OUTPUT_FILE"
if [ -n "$CHANGED_FILES" ]; then
    echo "Changed Files: $CHANGED_FILES"
fi
echo ""

cd "$TARGET_REPO"

# Build the prompt with changed files context
PROMPT="Analyze the codebase"
if [ -n "$CHANGED_FILES" ]; then
    PROMPT="$PROMPT, focusing on these changed files: $CHANGED_FILES,"
fi

PROMPT="$PROMPT and generate a comprehensive test plan including:

1. **Unit Tests Needed**:
   - List specific functions/methods requiring unit tests
   - Describe test cases for each
   - Include expected inputs and outputs
   - Provide sample test code

2. **Integration Tests Required**:
   - Identify component interactions to test
   - Describe integration test scenarios
   - List dependencies and mocking requirements

3. **Edge Cases to Cover**:
   - Boundary conditions
   - Error scenarios
   - Null/undefined handling
   - Race conditions
   - Performance edge cases

4. **Test Data Requirements**:
   - What test data is needed?
   - How to generate or mock it?
   - Data cleanup considerations

5. **Expected Test Coverage**:
   - Target coverage percentage
   - Critical paths that must be covered
   - Areas where lower coverage is acceptable

6. **Test Implementation Examples**:
   - Provide actual test code examples
   - Use the project's testing framework
   - Include setup and teardown code

Format as a detailed markdown document with code examples.
Make it actionable and ready for developers to implement.

Output to: $OUTPUT_FILE"

echo "🔍 Analyzing code changes and generating test plan..."
echo ""

bob --auth-method api-key \
    --chat-mode=code \
    -p "$PROMPT"

echo ""
echo "✅ Test plan generated: $OUTPUT_FILE"
echo ""
echo "📝 Next Steps:"
echo "   1. Review test cases for completeness"
echo "   2. Prioritize tests by criticality"
echo "   3. Assign test implementation to developers"
echo "   4. Set up CI/CD to run tests automatically"
echo "   5. Track test coverage metrics"

# Made with Bob
