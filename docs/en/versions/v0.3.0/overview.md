---
title: v0.3.0 Overview
description: What changed in Agent UI v0.3.0.
---

# v0.3.0 Overview

v0.3.0 corrects the scope language around Agent UI. Agent UI is not centered on one or two adjacent standards. It sits in the full agent product ecosystem and defines how facts from that ecosystem become visible, controllable, resumable, editable, and auditable.

## Highlights

- Adds a reference page for ecosystem boundaries.
- Treats runtimes, models, tools, skills/workflows, context stores, artifacts, evidence, permissions, sessions, and design systems as first-class neighboring systems.
- Moves the boundary guide out of the start section and into reference navigation.
- Removes the old Skills/Knowledge-centered boundary page source files.
- Updates the README, overview, definition, and specification wording to describe Agent UI as the projection layer across the full agent product stack.

## Compatibility

- No runtime event schema changes from v0.2.0.
- v0.2.x implementations remain valid.
- New readers should start from runtime facts, surface contracts, controlled writes, and ecosystem boundaries.
