#!/bin/bash
# BobFlow - PR Pack Generator Workflow
# Generates complete PR documentation package

set -e

TARGET_REPO="${1:-.}"
OUTPUT_FILE="${2:-pr-pack.md}"
BRANCH="${3:-HEAD}"

if [ -z "$BOBSHELL_API_KEY" ]; then
    echo "❌ Error: BOBSHELL_API_KEY environment variable not set"
    exit 1
fi

if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repository not found: $TARGET_REPO"
    exit 1
fi

echo "📦 BobFlow - PR Pack Generator Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target Repository: $TARGET_REPO"
echo "Output File: $OUTPUT_FILE"
echo "Branch: $BRANCH"
echo ""

cd "$TARGET_REPO"

# Get git diff for context
echo "📊 Analyzing changes..."
DIFF_SUMMARY=$(git diff --stat $BRANCH 2>/dev/null || echo "No git changes detected")
echo "$DIFF_SUMMARY"
echo ""

echo "📝 Generating PR documentation package..."
echo ""

bob --auth-method api-key \
    --chat-mode=code \
    -p "Generate a complete Pull Request documentation package for the current changes. Include:

1. **PR Title**:
   - Concise, descriptive title following conventional commits format
   - Example: 'feat: Add user authentication system'

2. **PR Description**:
   - What: What changes were made?
   - Why: Why were these changes necessary?
   - How: How were the changes implemented?
   - Impact: What's the impact on users/system?

3. **Changelog Entry**:
   - User-facing changes in changelog format
   - Breaking changes clearly marked
   - New features, improvements, bug fixes

4. **Testing Evidence**:
   - What tests were run?
   - Test results and coverage
   - Manual testing performed
   - Screenshots/recordings if applicable

5. **Reviewer Checklist**:
   - Key areas for reviewers to focus on
   - Potential concerns or edge cases
   - Performance implications
   - Security considerations

6. **Deployment Notes**:
   - Any special deployment steps?
   - Database migrations needed?
   - Configuration changes required?
   - Rollback plan if issues occur

7. **Related Issues**:
   - Link to related issues/tickets
   - Closes/Fixes references

Format as a complete, ready-to-submit PR description in markdown.
Make it professional and comprehensive.

Git diff summary for context:
$DIFF_SUMMARY

Output to: $OUTPUT_FILE"

echo ""
echo "✅ PR package generated: $OUTPUT_FILE"
echo ""
echo "📝 Next Steps:"
echo "   1. Review the generated PR description"
echo "   2. Add any missing context or details"
echo "   3. Attach screenshots or recordings if needed"
echo "   4. Copy to your PR on GitHub/GitLab"
echo "   5. Request reviews from appropriate team members"
echo ""
echo "💡 Tips:"
echo "   - Ensure all tests pass before submitting"
echo "   - Link to relevant documentation"
echo "   - Tag reviewers with specific expertise"
echo "   - Be responsive to review feedback"

# Made with Bob
