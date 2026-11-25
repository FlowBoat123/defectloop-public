import assert from "node:assert/strict";
import test from "node:test";

import {
  compileGraph,
  loadRegistry,
  serializeGraph,
  validateRegistry,
} from "../packages/knowledge-validator/src/index.js";

test("the synthetic archive incident compiles into a deterministic evidence graph", async () => {
  const registry = await loadRegistry(process.cwd());
  const validation = validateRegistry(registry);
  assert.equal(validation.valid, true, JSON.stringify(validation.errors));

  const graph = compileGraph(registry);
  const incident = graph.nodes.find((node) => node.id === "BUG:demo:101");
  assert.equal(incident?.attributes.status, "CONFIRMED");
  assert.ok(
    graph.edges.some(
      (edge) => edge.type === "GUARDED_BY" && edge.from === incident?.id && edge.to === "GRD-DEMO-001",
    ),
  );
  assert.ok(graph.edges.some((edge) => edge.type === "EVIDENCED_BY" && edge.from === incident?.id));
  assert.equal(serializeGraph(graph), serializeGraph(compileGraph(await loadRegistry(process.cwd()))));
});
