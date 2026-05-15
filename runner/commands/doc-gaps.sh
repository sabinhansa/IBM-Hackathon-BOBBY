#!/bin/bash
# BobFlow - Documentation Gap Finder Workflow
# Identifies missing or inadequate documentation

set -e

TARGET_REPO="${1:-.}"
OUTPUT_FILE="${2:-doc-gaps.json}"

if [ -z "$BOBSHELL_API_KEY" ]; then
    echo "❌ Error: BOBSHELL_API_KEY environment variable not set"
    exit 1
fi

if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repository not found: $TARGET_REPO"
    exit 1
fi

echo "📚 BobFlow - Documentation Gap Finder Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target Repository: $TARGET_REPO"
echo "Output File: $OUTPUT_FILE"
echo ""

cd "$TARGET_REPO"

echo "🔍 Analyzing documentation coverage..."
echo ""

bob --auth-method api-key \
    --chat-mode=ask \
    -p "Review this repository's documentation and identify gaps. Analyze:

1. **Undocumented Functions/Classes**: Find public APIs without documentation
2. **Missing API Documentation**: Identify endpoints or interfaces lacking docs
3. **Unclear Configuration**: Find config options without explanations
4. **Missing Setup Instructions**: Check for incomplete installation/setup guides
5. **Inadequate Code Comments**: Identify complex code lacking explanatory comments
6. **Missing Examples**: Find features without usage examples

For each gap found, provide:
- Category (API, Setup, Config, Comments, Examples, etc.)
- Location (file path and line number if applicable)
- Priority (high/medium/low based on impact)
- Description of what's missing
- Recommendation for what should be added

Output as structured JSON with this format:
{
  \"summary\": {
    \"totalGaps\": number,
    \"highPriority\": number,
    \"mediumPriority\": number,
    \"lowPriority\": number
  },
  \"gaps\": [
    {
      \"category\": \"string\",
      \"location\": \"string\",
      \"priority\": \"high|medium|low\",
      \"description\": \"string\",
      \"recommendation\": \"string\"
    }
  ]
}

Output to: $OUTPUT_FILE"

echo ""
echo "✅ Documentation gap analysis complete: $OUTPUT_FILE"
echo ""
echo "📝 Next Steps:"
echo "   1. Review identified gaps and prioritize"
echo "   2. Create issues for high-priority gaps"
echo "   3. Assign documentation tasks to team"
echo "   4. Track progress on documentation improvements"

# Made with Bob
