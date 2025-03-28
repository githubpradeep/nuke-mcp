import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { basicOperations } from './tools/basic-operations.js';
import { nodeOrganization } from './tools/node-organization.js';
import { advancedVfxOperations } from './tools/advanced-vfx.js';
import { projectManagement } from './tools/project-management.js';
import { pythonBridgeCode } from './resources/python-bridge-code.js';

// Create an MCP server for Nuke Bridge
const server = new McpServer({
  name: "Nuke MCP Bridge",
  version: "1.0.0",
  description: "A bridge for automating VFX workflows in Foundry's Nuke software"
});

// Register all tools from the different modules
const registerTools = (toolsObject) => {
  Object.entries(toolsObject).forEach(([name, tool]) => {
    server.tool(
      name,
      tool.schema,
      tool.handler,
      { description: tool.description }
    );
  });
};

// Register all tools
registerTools(basicOperations);
registerTools(nodeOrganization);
registerTools(advancedVfxOperations);
registerTools(projectManagement);

// Add resources for Python bridge code
server.resource(
  "pythonBridge",
  { list: () => ["nuke_bridge.py", "nuke_bridge_vfx.py", "nuke_bridge_enhanced.py", "nuke_bridge_server.py", "full_bridge.py", "mcp_client.py"] },
  async (uri) => {
    const path = uri.pathname.split('/').pop();
    if (pythonBridgeCode[path]) {
      return {
        contents: [{
          uri: uri.href,
          text: pythonBridgeCode[path]
        }]
      };
    }
    return {
      contents: [{
        uri: uri.href,
        text: `Resource not found: ${path}`
      }]
    };
  }
);

// Add setup guide resource
server.resource(
  "setupGuide",
  { list: () => ["setup", "usage", "examples"] },
  async (uri) => {
    const path = uri.pathname.split('/').pop();
    
    if (path === "setup") {
      return {
        contents: [{
          uri: uri.href,
          text: `# Nuke MCP Bridge Setup Guide

1. Copy the Python bridge files to your .nuke directory:
   - nuke_bridge.py
   - nuke_bridge_vfx.py
   - nuke_bridge_enhanced.py
   - nuke_bridge_server.py
   - full_bridge.py
   - mcp_client.py

2. Add the following to your init.py in your .nuke directory:
   \`\`\`python
   import full_bridge
   \`\`\`

3. Launch Nuke and run the following in the Script Editor:
   \`\`\`python
   import nuke_bridge_server
   nuke_bridge_server.start_server()
   \`\`\`

4. The bridge server will start and listen for connections on port 8765 by default.
`
        }]
      };
    } else if (path === "usage") {
      return {
        contents: [{
          uri: uri.href,
          text: `# Nuke MCP Bridge Usage Guide

## Basic Node Operations
- createNode: Create nodes with optional naming and input connections
- setKnobValue: Set values on node parameters
- getNode: Retrieve node information including knob values
- execute: Render frames from a Write node with frame range control
- connectNodes: Connect nodes in the node graph with input indexing
- setNodePosition/getNodePosition: Control node placement in the UI

## Node Organization
- createGroup: Package nodes into Nuke groups
- createLiveGroup: Create LiveGroups for collaborative workflows
- loadTemplate/saveTemplate: Load and save Nuke toolsets with positioning

## Advanced VFX Operations
- setupCameraTracking: Create tracker nodes, solve camera tracks, set up 3D scenes
- setupDeepCompositing: Set up pipelines for deep image processing
- batchProcess: Process multiple files using a processing script
- setupMachineLearning: Interface with CopyCat for ML-based tools
- setupKeying: Create a keying setup with pre-configured nodes
- setupMotionBlur: Create a motion blur setup
- createBasicComp: Create a basic compositing setup

## Project Management
- loadScript: Load a Nuke script
- saveScript: Save the current Nuke script
- configureProjectSettings: Configure project settings
- listNodes: List all nodes in the script
- filterNodes: Filter nodes by type or name
`
        }]
      };
    } else if (path === "examples") {
      return {
        contents: [{
          uri: uri.href,
          text: `# Nuke MCP Bridge Examples

## Example 1: Creating a Simple Compositing Tree
\`\`\`json
{
  "operations": [
    {"tool": "createNode", "args": {"nodeType": "Read", "name": "ReadInput", "position": {"x": 0, "y": 0}}},
    {"tool": "setKnobValue", "args": {"nodeName": "ReadInput", "knobName": "file", "value": "/path/to/input.exr"}},
    {"tool": "createNode", "args": {"nodeType": "Grade", "name": "GradeNode", "position": {"x": 0, "y": 100}}},
    {"tool": "connectNodes", "args": {"fromNode": "ReadInput", "toNode": "GradeNode", "inputIndex": 0}},
    {"tool": "setKnobValue", "args": {"nodeName": "GradeNode", "knobName": "gamma", "value": 0.8}},
    {"tool": "createNode", "args": {"nodeType": "Write", "name": "WriteOutput", "position": {"x": 0, "y": 200}}},
    {"tool": "connectNodes", "args": {"fromNode": "GradeNode", "toNode": "WriteOutput", "inputIndex": 0}},
    {"tool": "setKnobValue", "args": {"nodeName": "WriteOutput", "knobName": "file", "value": "/path/to/output.exr"}},
    {"tool": "execute", "args": {"nodeName": "WriteOutput", "frameRange": "1-10"}}
  ]
}
\`\`\`

## Example 2: Setting Up Camera Tracking
\`\`\`json
{
  "operations": [
    {"tool": "createNode", "args": {"nodeType": "Read", "name": "PlateInput", "position": {"x": 0, "y": 0}}},
    {"tool": "setKnobValue", "args": {"nodeName": "PlateInput", "knobName": "file", "value": "/path/to/plate.exr"}},
    {"tool": "setupCameraTracking", "args": {"sourceName": "PlateInput", "trackingPoints": 15, "createScene": true}}
  ]
}
\`\`\`

## Example 3: Deep Compositing Setup
\`\`\`json
{
  "operations": [
    {"tool": "createNode", "args": {"nodeType": "Read", "name": "DeepInput", "position": {"x": 0, "y": 0}}},
    {"tool": "setKnobValue", "args": {"nodeName": "DeepInput", "knobName": "file", "value": "/path/to/deep.exr"}},
    {"tool": "setupDeepCompositing", "args": {"sourceName": "DeepInput", "outputName": "DeepOutput"}}
  ]
}
\`\`\`
`
        }]
      };
    }
    
    return {
      contents: [{
        uri: uri.href,
        text: `Available guides: setup, usage, examples`
      }]
    };
  }
);

export { server };
