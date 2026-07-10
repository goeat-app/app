---
name: code-review
description: Review current branch for code quality, clarity, maintainability, performance, and security. Use when reviewing code, doing a code review, checking a PR, auditing code quality, optimizing slow paths, or checking for vulnerabilities. Triggers on "code review", "review this branch", "performance review", "review performance", "check performance", "security review", "review security", "check for vulnerabilities".
metadata:
  status: trial
---

# Code Review

Review the current branch for code quality, clarity, and maintainability.

## Workflow

1. Determine the actual base branch (prefer the PR target/upstream; do not assume `main`) and run `git diff <base>...HEAD` to see all changes
2. Read changed files in full to understand context
3. Check `README.md`, `package.json`, configuration files, and any applicable `AGENTS.md` for project conventions
4. Evaluate each changed file against the review checklist below
5. For UI, navigation, authentication, networking, or location changes, verify behavior on every affected target: iOS, Android, and web
6. If a related requirement, issue, or planning document is available, briefly consider whether the change aligns with its intended scope
7. Run the relevant non-destructive checks from `package.json` (normally `yarn typecheck`, `yarn lint`, and focused Jest tests when present)
8. Produce the review using the output format and verdict wording in [references/code-review-guidance.MD](references/code-review-guidance.MD)
9. Verify that all changed files and all failed or skipped checks are accounted for in the review

## Focus Modes

- Default mode: Use the general checklist in this file and the output format in [references/code-review-guidance.MD](references/code-review-guidance.MD).
- When a focus mode is selected, keep the shared workflow above and use the matching checklist/output format from the referenced file.

## Review Checklist

### 1. Clarity & Purpose

- What is this trying to accomplish? Summarize in one sentence.
- Is the intent clear from reading the code?
- Are names meaningful? Do variables, functions, and types describe their purpose?
- Is the scope appropriate? Does each change do one thing well?
- If related requirements or planning notes are available, consider whether the change aligns with their stated scope.

### 2. Simplicity & Complexity

- Could this be simpler? Look for unnecessary abstraction, indirection, or cleverness.
- Is complexity justified? Does it solve a real problem that simple code cannot?
- Are there unused or duplicate patterns? Flag anything that doesn't pull its weight.
- Can logic be extracted? Look for repeated patterns that should be shared.

### 3. Code Quality

- Is it readable? Does the code flow naturally? Are functions appropriately sized?
- Is it well-structured? Do files and directories make sense?
- Does it follow existing patterns? Check consistency with the rest of the codebase.
- Are there linter errors? Run the project's lint command if available.

### 4. Testing & Documentation

- Is it well-tested? Are there tests for the new/changed behavior?
- Do tests describe behavior? Tests should read like documentation.
- Are tests broken? Broken tests = broken documentation. Flag immediately.
- Are edge cases covered? Missing error handling or boundary conditions?
- Is documentation updated? README, comments, or inline docs as needed.

### 5. Security & Production Readiness

- Is Firebase authentication, token refresh, sign-out, and protected-route handling correct?
- Are secrets protected? No tokens or keys in code.
- Are `EXPO_PUBLIC_*` values treated as public client configuration rather than secrets?
- Are permissions and user data (especially location and profile data) handled safely?
- Is error handling appropriate across unreliable network, permission-denied, and offline paths?
- Are there performance concerns such as unnecessary renders, repeated API calls, unbounded lists, or leaked subscriptions/listeners?
- Is it production-ready? Edge cases, failure modes, observability.

### 6. Writing & Communication

- Are commit messages concise? No jargon, clear intent.
- Are comments direct? Say what you mean.
- Is PR description clear? What changed, why, and how to test.
- Avoid new ad-hoc ALL_CAPS doc files. Convention files (README, CONTRIBUTING, AGENTS, SKILL.md) are fine; prefer docs/ or code comments for new documentation.

### 7. Beyond the Checklist

Look for things the checklist doesn't cover:

- Are there better approaches? Different solutions, tradeoffs?
- What patterns emerge? Repeated code suggesting a missing abstraction?
- What might break? Edge cases, race conditions, failure modes?
- How will this age? Easy to understand in 6 months? Easy to change?
- What's missing? Observability, logging, type safety?
- Are there ecosystem best practices not being followed?
- What assumptions are being made? Are they documented and valid?

Don't limit yourself to the checklist. If you see an issue, name it. If you see a better way, suggest it.

Be direct.
Flag real issues.
Complexity is our enemy.

## Output Format

Use the **canonical output format and verdict wording** in [references/code-review-guidance.MD](references/code-review-guidance.MD) (Summary, Architecture, Clarity, Simplicity, Quality, Testing, Concerns, Strengths, Opportunities, Recommendations, Verdict). That keeps all reviews consistent and ensures Architecture and Verdict are included.
