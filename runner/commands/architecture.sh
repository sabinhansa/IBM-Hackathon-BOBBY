#!/bin/bash
# BobFlow - Architecture Map Workflow
# Generates system architecture documentation with component relationships

set -e

TARGET_REPO="${1:-.}"
OUTPUT_FILE="${2:-architecture.md}"

if [ -z "$BOBSHELL_API_KEY" ]; then
    echo "❌ Error: BOBSHELL_API_KEY environment variable not set"
    exit 1
fi

if [ ! -d "$TARGET_REPO" ]; then
    echo "❌ Error: Target repository not found: $TARGET_REPO"
    exit 1
fi

echo "🏗️  BobFlow - Architecture Map Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target Repository: $TARGET_REPO"
echo "Output File: $OUTPUT_FILE"
echo ""

cd "$TARGET_REPO"

echo "🔍 Analyzing codebase architecture..."
echo ""

bob --auth-method api-key \
    --chat-mode=plan \
    -p "Analyze this codebase and create a comprehensive architecture document showing:

1. **System Overview**: High-level description of the system architecture
2. **Major Components/Modules**: List all major components and their responsibilities
3. **Component Interactions**: How do components communicate? What are the data flows?
4. **External Dependencies**: What external services, APIs, or libraries are used?
5. **Design Patterns**: What architectural patterns are employed (MVC, microservices, etc.)?
6. **Data Flow**: How does data move through the system?
7. **Scalability Considerations**: What makes this architecture scalable or what could be improved?

Include ASCII diagrams showing component relationships and data flow.
Format as a technical architecture document suitable for new team members.

Output to: $OUTPUT_FILE"

echo ""
echo "✅ Architecture documentation generated: $OUTPUT_FILE"
echo ""
echo "📝 Next Steps:"
echo "   1. Review component relationships for accuracy"
echo "   2. Verify external dependencies are complete"
echo "   3. Add any missing architectural decisions"
echo "   4. Share with team for feedback"

# Made with Bob
