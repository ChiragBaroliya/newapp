We need to generate structured markdown documentation: Summary of changes, Components affected, Technical explanation. Provide markdown. So analyze diff.

Key changes:

- rename comment: Checkout Code (FULL HISTORY FIX) -> FULL HISTORY
- persist-credentials comment unchanged.
- comment Disable CI strict mode changed.
- In diff loop: earlier used ${{ github.event.head_commit.message }} to check commit message for infinite loop. Now uses LAST_COMMIT_MSG=$(git log -1 --pretty=%B) and checks that variable.

- DIFF calculation: changed to git diff HEAD~1..HEAD (two dots). Previously diff HEAD~1 HEAD. Not much difference? Usually same; but two dots ensures symmetrical? but fine.

- Removed comment about preventing infinite loop; added check for proper loop.

- Added comments for FIX.

- For API call: previously constructed JSON via string interpolation inside -d. Now uses jq to produce safe JSON payload and stores in PAYLOAD variable. Then uses -d "$PAYLOAD".

- Added comment "Preparing Groq request".

- Also added "✅ FIX: Safe JSON payload" comment.

- Also added "✅ FIX: Robust parsing" comment before jq parse of RESPONSE.

- Also added fallback handling comment.

Thus components: GitHub Actions workflow .github/workflows/react-ai-docs.yml. Also Groq API call. Also usage of jq for safe JSON, and new logic to avoid infinite loop.

Technical explanation: changes improve robustness: use of git log to get commit message to avoid expansion issues, use jq to avoid JSON injection, proper diff syntax, better fallback. Also removed some comments.

Now produce markdown doc summarizing.

Let's produce sections: Summary, Affected Components, Technical Changes. Provide bullet points.

Also mention that workflow now uses actions/checkout v4 with full history, persist credentials, etc.

Let's produce final answer.
