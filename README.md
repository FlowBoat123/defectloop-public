# DefectLoop

DefectLoop helps developers trace a reported defect to its cause, the affected code, and a regression check. This public engineering demo contains the TypeScript validator and deterministic graph compiler from the project. The runnable example uses a fictional task board and synthetic records.

## Run the demo

Requires Node.js 20 or later.

```sh
npm ci
npm run demo
```

The demo validates the YAML registry and writes `build/knowledge-index.json`. The graph connects the example defect to a defect family, an invariant, a code reference, a fix, evidence, and a regression guardrail.

## Example

Archiving a task updates the list while leaving the active task count stale on the dashboard. The example traces the stale count to a separate summary cache and records the regression check that should catch it.

| Path | Contents |
| --- | --- |
| `knowledge/` | Synthetic incident, defect family, invariant, and guardrail |
| `contracts/knowledge/` | JSON Schema contracts for the registry |
| `packages/knowledge-validator/src/` | YAML loading, schema and cross-reference validation, and graph compilation |

The validator requires a confirmed defect to connect its root-cause analysis to affected code, evidence, and a regression guardrail or documented exception. Repeated builds on the same input produce the same graph and source digest.

## Check the code

```sh
npm run typecheck
npm test
```
