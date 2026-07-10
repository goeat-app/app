# Code Review Guidance

Standards for in-depth reviews of the GoEat Expo application. Use this with the parent [code-review skill](../SKILL.MD), the repository `README.md`, `package.json`, and applicable configuration or `AGENTS.md` files.

## 1. Review structure

Address every changed file and use these sections in order:

| Section | Purpose |
| --- | --- |
| **Summary** | What the change does and its file/behavior scope. |
| **Architecture** | Whether it matches, extends, or conflicts with the app's existing layers. |
| **Clarity** | Intent, naming, scope, and ownership. |
| **Simplicity** | Unnecessary abstraction, duplication, or avoidable state. |
| **Quality** | Readability, types, platform behavior, and lint/typecheck results. |
| **Testing** | Coverage, edge cases, and checks actually run. |
| **Concerns** | Correctness, security/privacy, performance, and release risk. |
| **Strengths** | What is done well. |
| **Opportunities** | Non-blocking improvements. |
| **Recommendations** | Prioritized, actionable changes. |
| **Verdict** | Approve / Approve with recommendations / Do not merge until… |

## 2. Project architecture alignment

GoEat is a TypeScript Expo/React Native application targeting iOS, Android, and web. Review changes against the responsibilities already visible in the repository:

- `app/`: Expo Router screens, layouts, and screen models.
- `src/components/`: reusable presentation and interaction components.
- `use-cases/`: application workflows and result types.
- `services/`: backend and device-service access.
- `lib/`: shared API, Firebase auth, storage, and utilities.
- `store/`: shared Zustand state.
- `hooks/`: reusable React/native lifecycle integration.
- `styles/` and `global.css`: shared visual tokens and NativeWind styling.

Classify the change as:

- **Matches:** follows these boundaries and existing contracts.
- **Extends:** adds a capability while keeping ownership, routing, and callers explicit.
- **Conflicts:** duplicates state or business rules, bypasses a layer, or introduces a competing pattern without justification.

Flag incomplete wiring, including an Expo Router screen that cannot be reached, protected-route changes not reflected in navigation/auth handling, unused use cases/services, and changed response shapes not propagated through service, use-case, store/model, and UI consumers.

## 3. Critical issues (must fix before merge)

Call out the location, impact, and concrete fix for:

| Category | GoEat examples |
| --- | --- |
| **Broken behavior** | A route is unreachable, a screen crashes, API data is mapped incorrectly, or loading/error state never settles. |
| **Cross-platform regression** | Native-only APIs execute on web, Android/iOS host handling is wrong, or a platform file/fallback is missing. |
| **Authentication/security** | Protected content is reachable while signed out, token refresh loops, auth listeners leak, or credentials/tokens are logged or committed. |
| **Privacy/permissions** | Location is requested without correct denial handling, sensitive profile/location data is exposed, or permission state is treated as valid coordinates. |
| **Broken contract** | API, use-case, store, route-param, or component types disagree with runtime data. |
| **Unsafe input/state** | Route params, API responses, nullable Firebase state, storage values, or external URLs are trusted without appropriate guards. |
| **Doc/behavior mismatch** | Comments, README instructions, or tests promise behavior the implementation does not provide. |

## 4. React Native and Expo quality

- Check iOS, Android, and web behavior for `Platform` branches, maps, location, Google sign-in, keyboard avoidance, safe areas, deep links, and browser-only globals.
- Verify Expo Router route names, dynamic parameters, redirects, back behavior, and protected-route transitions.
- Ensure effects have correct dependencies and cleanup; avoid updates after unmount, duplicated listeners, request races, and redirect loops.
- Keep render paths cheap. Flag unstable callbacks/objects when they cause real downstream work, unbounded list rendering, repeated geocoding/API calls, and oversized images.
- Preserve accessibility: labels/roles for interactive controls, readable contrast, scalable text, usable touch targets, and keyboard/web interaction where relevant.
- Prefer shared theme tokens and established NativeWind/component patterns over duplicated literal styles when the repository already has a suitable token.

## 5. Data, networking, and state

- Keep Axios configuration, authorization, retry behavior, and API base-URL resolution centralized in `lib/api`.
- Check timeout, offline, unauthorized, empty, partial, and malformed-response paths. User-facing errors should be useful without exposing internal details.
- Ensure a 401 retry cannot loop and sign-out/navigation behavior remains consistent.
- Keep backend/device access in services and workflows in use cases; screens should not duplicate mapping or business rules already owned there.
- Treat Zustand as shared state, not a default home for local component state. Avoid duplicate sources of truth between stores, screen models, Firebase auth, and server data.
- Validate or guard external data at the boundary when a bad value could crash navigation/rendering or cause an unsafe action; TypeScript assertions alone are not runtime validation.

## 6. Security and privacy

- Never commit private keys, service-account credentials, OAuth client secrets, bearer/refresh tokens, or real user data.
- `EXPO_PUBLIC_*` variables are bundled into the client and must never contain secrets. Firebase client configuration is public configuration, but access must still be protected by Firebase/backend rules.
- Do not log auth tokens, full error payloads containing user data, precise location, or sensitive profile fields.
- Review external URLs, rendered remote content, persistent storage, and API inputs for validation appropriate to their use.
- Confirm emulator settings and development endpoints cannot be accidentally enabled in production builds.

## 7. Testing and verification

- Run `yarn typecheck` and `yarn lint` unless scope makes one irrelevant; report failures rather than silently omitting them.
- Run focused Jest tests when tests exist. The repository's `yarn test` is watch mode, so use a non-watch Jest invocation for automated review when appropriate.
- New behavior should test success, failure, and important boundary states. Prioritize use cases, mapping utilities, auth/API retry logic, location permission/fallback behavior, stores, and complex screen models.
- For UI or platform-specific work, supplement automated checks with targeted iOS/Android/web verification when feasible, and clearly identify anything not verified.
- Broken or skipped tests are part of the review evidence. Do not claim a check passed unless it was run successfully.

## 8. Output format

```markdown
## Code Review: [PR title or branch]

### Summary

[What changed and its scope.]

### Architecture

[Matches / extends / conflicts; affected layers and any missing wiring.]

### Clarity

[Intent, naming, scope, ownership.]

### Simplicity

[Complexity and duplication.]

### Quality

[Readability, types, platform behavior, lint/typecheck.]

### Testing

[Coverage, checks run, edge cases, and unverified targets.]

### Concerns

[Correctness, security/privacy, performance, release risk.]

### Strengths

[What is done well.]

### Opportunities

[Non-blocking improvements.]

### Recommendations

[Prioritized and actionable.]

### Verdict

[Approve | Approve with recommendations | Do not merge until [blocking fixes].]
```

## 9. Verdict wording

- **Approve:** no blocking issues; only optional follow-ups.
- **Approve with recommendations:** non-blocking issues worth addressing or explicitly accepting.
- **Do not merge until…:** at least one correctness, security/privacy, contract, data-loss, or material cross-platform issue blocks release. List each required fix.

Keep severity proportional to user impact and evidence. Do not block solely for personal style preferences.

## 10. Repository references

- [`README.md`](../../../../README.md) — setup, environment, supported platforms, backend, and PWA behavior.
- [`package.json`](../../../../package.json) — supported scripts and dependency stack.
- [`app/_layout.tsx`](../../../../app/_layout.tsx) — root navigation and protected-route behavior.
- [`lib/api/api.ts`](../../../../lib/api/api.ts) — Axios authentication and retry flow.
- [`lib/auth/firebase-auth.ts`](../../../../lib/auth/firebase-auth.ts) — Firebase persistence and emulator behavior.
- [`tsconfig.json`](../../../../tsconfig.json) — TypeScript and path-alias configuration.
