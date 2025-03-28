import { z } from 'zod';

// Schema definitions
const positionSchema = z.object({
  x: z.number().describe("X coordinate in the node graph"),
  y: z.number().describe("Y coordinate in the node graph")
});

// Node organization operations
export const nodeOrganization = {
  createGroup: {
    schema: {
      name: z.string().describe("Name for the group"),
      nodes: z.array(z.string()).describe("Array of node names to include in the group"),
      position: positionSchema.optional().describe("Optional position for the group in the node graph")
    },
    handler: async ({ name, nodes, position }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Created group "${name}" containing nodes: ${nodes.join(', ')}${position ? ` at position (${position.x}, ${position.y})` : ''}`
        }]
      };
    },
    description: "Package nodes into a Nuke group"
  },

  createLiveGroup: {
    schema: {
      name: z.string().describe("Name for the LiveGroup"),
      nodes: z.array(z.string()).describe("Array of node names to include in the LiveGroup"),
      position: positionSchema.optional().describe("Optional position for the LiveGroup in the node graph"),
      savePath: z.string().optional().describe("Optional path to save the LiveGroup")
    },
    handler: async ({ name, nodes, position, savePath }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Created LiveGroup "${name}" containing nodes: ${nodes.join(', ')}${position ? ` at position (${position.x}, ${position.y})` : ''}${savePath ? ` and saved to "${savePath}"` : ''}`
        }]
      };
    },
    description: "Create a LiveGroup for collaborative workflows"
  },

  loadTemplate: {
    schema: {
      templatePath: z.string().describe("Path to the template/toolset to load"),
      position: positionSchema.optional().describe("Optional position for the loaded template in the node graph")
    },
    handler: async ({ templatePath, position }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Loaded template from "${templatePath}"${position ? ` at position (${position.x}, ${position.y})` : ''}`
        }]
      };
    },
    description: "Load a Nuke toolset/template"
  },

  saveTemplate: {
    schema: {
      nodes: z.array(z.string()).describe("Array of node names to include in the template"),
      savePath: z.string().describe("Path to save the template/toolset"),
      name: z.string().describe("Name for the template/toolset")
    },
    handler: async ({ nodes, savePath, name }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Saved template "${name}" containing nodes: ${nodes.join(', ')} to "${savePath}"`
        }]
      };
    },
    description: "Save nodes as a Nuke toolset/template"
  },

  autoArrangeNodes: {
    schema: {
      nodes: z.array(z.string()).optional().describe("Optional array of node names to arrange (defaults to all nodes)"),
      direction: z.enum(["horizontal", "vertical"]).optional().describe("Direction of arrangement (defaults to horizontal)"),
      spacing: z.number().optional().describe("Spacing between nodes (defaults to 100)")
    },
    handler: async ({ nodes, direction = "horizontal", spacing = 100 }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Auto-arranged ${nodes ? `nodes: ${nodes.join(', ')}` : 'all nodes'} in ${direction} direction with spacing ${spacing}`
        }]
      };
    },
    description: "Automatically arrange nodes in the node graph"
  },

  createBackdrop: {
    schema: {
      name: z.string().describe("Name for the backdrop"),
      nodes: z.array(z.string()).describe("Array of node names to include in the backdrop"),
      label: z.string().optional().describe("Optional label for the backdrop"),
      color: z.string().optional().describe("Optional color for the backdrop (e.g., '#FF0000')")
    },
    handler: async ({ name, nodes, label, color }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Created backdrop "${name}" containing nodes: ${nodes.join(', ')}${label ? ` with label "${label}"` : ''}${color ? ` and color "${color}"` : ''}`
        }]
      };
    },
    description: "Create a backdrop to organize nodes"
  }
};
