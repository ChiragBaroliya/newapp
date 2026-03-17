We need structured markdown documentation. We should provide summary of changes, components affected, technical explanation. The diff shows modifications to GitHub workflow react-ai-docs.yml. It adds new steps: extraction of added lines, formatting them in green color, appending them to the generated documentation file. Also changed comment to "Groq + Highlight". The script modifications: replaced comments, changed some logic, added safe payload comment, added formatted changes logic. Also changed writing of docs file: writing doc + latest changes. Let's craft documentation.

We can structure:

## Summary of Changes
- Updated workflow to include change highlighting.

## Components Affected
- .github/workflows/react-ai-docs.yml
- CI pipeline for AI documentation generation

Also mention environment variables: JQ, etc.

## Technical Explanation

Explain: infinite loop check, commit count handling, diff extraction, added lines extraction, formatting with HTML span green, building JSON payload to Groq API, parsing response, fallback, writing docs, including formatted changes.

Also mention that diff is limited to first 12k characters, etc.

Maybe mention new variable ADDED_LINES etc.

Let's produce markdown.

## 🟢 Latest Changes

<span style="color:green">+     # Generate AI Documentation (Groq + Highlight)</span>
<span style="color:green">+         # Prevent infinite loop</span>
<span style="color:green">+         # Get diff</span>
<span style="color:green">+         echo "🟢 Extracting added lines..."</span>
<span style="color:green">+ </span>
<span style="color:green">+         # Extract added lines</span>
<span style="color:green">+ </span>
<span style="color:green">+         # Format with green color</span>
<span style="color:green">+         FORMATTED_CHANGES=$(echo "$ADDED_LINES" | sed 's/.*/<span style="color:green">+ &<\/span>/')</span>
<span style="color:green">+ </span>
<span style="color:green">+         if [ -z "$FORMATTED_CHANGES" ]; then</span>
<span style="color:green">+           FORMATTED_CHANGES="No new changes detected."</span>
<span style="color:green">+         fi</span>
<span style="color:green">+ </span>
<span style="color:green">+         # Safe payload</span>
<span style="color:green">+         # Parse response</span>
<span style="color:green">+         echo "📄 Writing documentation..."</span>
<span style="color:green">+ </span>
<span style="color:green">+         {</span>
<span style="color:green">+           echo "$DOC"</span>
<span style="color:green">+           echo ""</span>
<span style="color:green">+           echo "## 🟢 Latest Changes"</span>
<span style="color:green">+           echo ""</span>
<span style="color:green">+           echo "$FORMATTED_CHANGES"</span>
<span style="color:green">+         } > docs/auto-generated.md</span>
