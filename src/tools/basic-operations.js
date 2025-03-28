import { z } from 'zod';

// Schema definitions
const positionSchema = z.object({
  x: z.number().describe("X coordinate in the node graph"),
  y: z.number().describe("Y coordinate in the node graph")
});

const knobValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.union([z.string(), z.number(), z.boolean()])),
  z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
]).describe("Value to set on the knob");

// Basic operations for node manipulation
export const basicOperations = {
  createNode: {
    schema: {
      nodeType: z.string().describe("Type of node to create (e.g., 'Blur', 'Grade', 'Read')"),
      name: z.string().optional().describe("Optional name for the node"),
      position: positionSchema.optional().describe("Optional position for the node in the node graph"),
      inputs: z.array(z.string()).optional().describe("Optional array of input node names to connect")
    },
    handler: async ({ nodeType, name, position, inputs }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Created ${nodeType} node${name ? ` named "${name}"` : ''}${position ? ` at position (${position.x}, ${position.y})` : ''}${inputs ? ` with inputs: ${inputs.join(', ')}` : ''}`
        }]
      };
    },
    description: "Create a new node in the Nuke node graph"
  },

  setKnobValue: {
    schema: {
      nodeName: z.string().describe("Name of the node to modify"),
      knobName: z.string().describe("Name of the knob to set"),
      value: knobValueSchema
    },
    handler: async ({ nodeName, knobName, value }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set knob "${knobName}" on node "${nodeName}" to value: ${JSON.stringify(value)}`
        }]
      };
    },
    description: "Set a value on a node's knob"
  },

  getNode: {
    schema: {
      nodeName: z.string().describe("Name of the node to retrieve")
    },
    handler: async ({ nodeName }) => {
      // In a real implementation, this would communicate with the Python bridge
      // Mock response with node information
      const mockNodeInfo = {
        name: nodeName,
        type: "Blur",
        knobs: {
          size: 2.5,
          channels: "rgba",
          filter: "gaussian"
        },
        position: { x: 100, y: 200 }
      };

      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(mockNodeInfo, null, 2)
        }]
      };
    },
    description: "Retrieve information about a node including its knob values"
  },

  execute: {
    schema: {
      nodeName: z.string().describe("Name of the Write node to execute"),
      frameRange: z.string().optional().describe("Optional frame range to render (e.g., '1-10', '1,3,5')")
    },
    handler: async ({ nodeName, frameRange }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Executing Write node "${nodeName}"${frameRange ? ` for frame range: ${frameRange}` : ''}`
        }]
      };
    },
    description: "Render frames from a Write node"
  },

  connectNodes: {
    schema: {
      fromNode: z.string().describe("Name of the source node"),
      toNode: z.string().describe("Name of the destination node"),
      inputIndex: z.number().optional().describe("Optional input index on the destination node (defaults to 0)")
    },
    handler: async ({ fromNode, toNode, inputIndex = 0 }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Connected node "${fromNode}" to input ${inputIndex} of node "${toNode}"`
        }]
      };
    },
    description: "Connect two nodes in the node graph"
  },

  setNodePosition: {
    schema: {
      nodeName: z.string().describe("Name of the node to position"),
      position: positionSchema.describe("Position coordinates in the node graph")
    },
    handler: async ({ nodeName, position }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set position of node "${nodeName}" to (${position.x}, ${position.y})`
        }]
      };
    },
    description: "Set the position of a node in the node graph"
  },

  getNodePosition: {
    schema: {
      nodeName: z.string().describe("Name of the node to query")
    },
    handler: async ({ nodeName }) => {
      // In a real implementation, this would communicate with the Python bridge
      // Mock response with node position
      const mockPosition = { x: 100, y: 200 };

      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(mockPosition, null, 2)
        }]
      };
    },
    description: "Get the position of a node in the node graph"
  }
};
