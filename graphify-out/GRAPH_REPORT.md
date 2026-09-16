# Codebase Architectural Report

> **Auto-generated** by graphify knowledge graph analysis  
> **Purpose**: Dependency map, connection analysis, subsystem breakdown, and quality hotspots.

---

## 1. Executive Summary

- **Total Components**: `88`
- **Total Connections**: `123`
- **Subsystem Modules**: `1`
- **Dependency Types**: `4`

**Key Architectural Hubs:**

| # | Component | File | Type | Connections |
|---|-----------|------|------|-------------|
| 1 | `AdminDashboard.jsx` | `frontend/src/components/AdminDashboard.jsx` | class | 11 |
| 2 | `storage.js` | `frontend/src/utils/storage.js` | file | 11 |
| 3 | `validateSubmission()` | `frontend/src/utils/validation.js` | method | 11 |
| 4 | `App.jsx` | `frontend/src/App.jsx` | class | 10 |
| 5 | `validation.js` | `frontend/src/utils/validation.js` | file | 10 |
| 6 | `InterestForm.jsx` | `frontend/src/pages/InterestForm.jsx` | class | 9 |
| 7 | `devDependencies` | `frontend/package.json` | function | 8 |
| 8 | `package.json` | `frontend/package.json` | function | 7 |

---

## 2. Dependency & Connection Analysis

### Relationship Types

| Relationship | Count | Share |
|-------------|-------|-------|
| `contains` | 51 | 41% |
| `imports` | 39 | 32% |
| `imports_from` | 18 | 15% |
| `calls` | 15 | 12% |

### Hub Dependency Diagram

```mermaid
flowchart TD
    frontend_src_components_admindashboard["AdminDashboard.jsx"]
    frontend_src_utils_storage["storage.js"]
    frontend_src_utils_validation_validatesubmission["validateSubmission()"]
    frontend_src_app["App.jsx"]
    frontend_src_utils_validation["validation.js"]
    frontend_src_pages_interestform["InterestForm.jsx"]
    frontend_package_devdependencies["devDependencies"]
    frontend_package["package.json"]
    frontend_package <--> frontend_package_devdependencies
    frontend_src_app <--> frontend_src_pages_interestform
    frontend_src_components_admindashboard <--> frontend_src_utils_storage
    frontend_src_pages_interestform <--> frontend_src_utils_storage
    frontend_src_pages_interestform <--> frontend_src_utils_validation
    frontend_src_pages_interestform <--> frontend_src_utils_validation_validatesubmission
    frontend_src_utils_storage <--> frontend_src_utils_validation
    frontend_src_utils_storage <--> frontend_src_utils_validation_validatesubmission
    frontend_src_utils_validation <--> frontend_src_utils_validation_validatesubmission
```

### Most Connected Pairs

| Component A | Component B | Shared Connections |
|-------------|-------------|-------------------|
| `dependencies` | `package.json` | 1 |
| `devDependencies` | `package.json` | 1 |
| `name` | `package.json` | 1 |
| `package.json` | `private` | 1 |
| `package.json` | `scripts` | 1 |
| `package.json` | `type` | 1 |
| `package.json` | `version` | 1 |
| `build` | `scripts` | 1 |
| `dev` | `scripts` | 1 |
| `scripts` | `test` | 1 |

---

## 3. Subsystem & Module Breakdown

### 3.1 frontend/src
**Nodes**: `88`  
**Files**: `frontend/e2e/public-interest.spec.js`, `frontend/index.html`, `frontend/package.json`, `frontend/playwright.config.js`, `frontend/src/App.jsx`, `frontend/src/components/AdminDashboard.jsx` +19 more

| Component | Type | File | Connections |
|-----------|------|------|-------------|
| `AdminDashboard.jsx` | class | `frontend/src/components/AdminDashboard.jsx` | 11 |
| `storage.js` | file | `frontend/src/utils/storage.js` | 11 |
| `validateSubmission()` | method | `frontend/src/utils/validation.js` | 11 |
| `App.jsx` | class | `frontend/src/App.jsx` | 10 |
| `validation.js` | file | `frontend/src/utils/validation.js` | 10 |
| `InterestForm.jsx` | class | `frontend/src/pages/InterestForm.jsx` | 9 |
| `devDependencies` | function | `frontend/package.json` | 8 |
| `package.json` | function | `frontend/package.json` | 7 |
| `getSubmissions()` | method | `frontend/src/utils/storage.js` | 7 |
| `storage.test.js` | file | `frontend/src/utils/storage.test.js` | 7 |


---

## 4. API Reference

Public classes and functions by subsystem.

### frontend/src

| Name | Type | File | Connections |
|------|------|------|-------------|
| `AdminDashboard.jsx` | class | `frontend/src/components/AdminDashboard.jsx` | 11 |
| `App.jsx` | class | `frontend/src/App.jsx` | 10 |
| `InterestForm.jsx` | class | `frontend/src/pages/InterestForm.jsx` | 9 |
| `devDependencies` | function | `frontend/package.json` | 8 |
| `package.json` | function | `frontend/package.json` | 7 |
| `dependencies` | function | `frontend/package.json` | 6 |
| `AdminPage.jsx` | class | `frontend/src/pages/AdminPage.jsx` | 6 |
| `scripts` | function | `frontend/package.json` | 5 |

---

## 5. Code Quality & Architectural Risk Hotspots

### Component Type Distribution

| Type | Count | Share |
|------|-------|-------|
| function | 41 | 47% |
| class | 25 | 28% |
| method | 13 | 15% |
| file | 9 | 10% |

### Dependency Cycles

**45** circular dependency loop(s) detected:

| # | Cycle Path |
|---|-----------|
| 1 | `frontend_src_utils_validation → frontend_src_utils_validation_validatesubmission → frontend_src_utils_validation_test` |
| 2 | `frontend_src_utils_validation → frontend_src_utils_validation_validatemobile → frontend_src_utils_validation_validatesubmission` |
| 3 | `frontend_src_utils_validation → frontend_src_utils_validation_validatefullname → frontend_src_utils_validation_validatesubmission` |
| 4 | `frontend_src_utils_validation → frontend_src_utils_validation_validateemail → frontend_src_utils_validation_validatesubmission` |
| 5 | `frontend_src_utils_validation → frontend_src_utils_validation_validatedepartment → frontend_src_utils_validation_validatesubmission` |
| 6 | `frontend_src_utils_storage → frontend_src_utils_storage_updatesubmission → frontend_src_utils_validation_validatesubmission` |
| 7 | `frontend_src_utils_storage → frontend_src_utils_storage_savesubmissions → frontend_src_utils_storage_updatesubmission` |
| 8 | `frontend_src_utils_storage_createsubmission → frontend_src_utils_storage_savesubmissions → frontend_src_utils_storage_updatesubmission → frontend_src_utils_validation_validatesubmission` |
| 9 | `frontend_src_components_admindashboard → frontend_src_utils_storage_deletesubmission → frontend_src_utils_storage_savesubmissions → frontend_src_utils_storage_updatesubmission` |
| 10 | `frontend_src_utils_storage → frontend_src_utils_storage_deletesubmission → frontend_src_utils_storage_savesubmissions` |

### Orphaned Components

**7** isolated node(s) with no connections:

| Component | File |
|-----------|------|
| `public-interest.spec.js` | `frontend/e2e/public-interest.spec.js` |
| `playwright.config.js` | `frontend/playwright.config.js` |
| `setup.js` | `frontend/src/test/setup.js` |
| `vite.config.js` | `frontend/vite.config.js` |
| `vitest.config.js` | `frontend/vitest.config.js` |
| `admin-submission-management` | `todos.yaml` |
| `HireHub Build Your Future` | `frontend/index.html` |

---

## 6. How to Navigate

1. **Interactive D3 Map** — open `graph.html` to explore node connections visually.
2. **Knowledge Graph Queries** — use MCP tools (`graph_query`, `graph_explain_node`, `graph_impact_radius`).
