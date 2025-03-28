import { z } from 'zod';

// Advanced VFX operations
export const advancedVfxOperations = {
  setupCameraTracking: {
    schema: {
      sourceName: z.string().describe("Name of the source node containing footage to track"),
      trackingPoints: z.number().optional().describe("Number of tracking points to create (defaults to 10)"),
      createScene: z.boolean().optional().describe("Whether to create a 3D scene after tracking (defaults to false)"),
      solveMethod: z.enum(["MatchMove", "3DEqualizer", "PFTrack"]).optional().describe("Tracking solve method to use"),
      exportPath: z.string().optional().describe("Optional path to export tracking data")
    },
    handler: async ({ sourceName, trackingPoints = 10, createScene = false, solveMethod = "MatchMove", exportPath }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up camera tracking for "${sourceName}" with ${trackingPoints} tracking points using ${solveMethod} method${createScene ? ' and created a 3D scene' : ''}${exportPath ? ` and exported tracking data to "${exportPath}"` : ''}`
        }]
      };
    },
    description: "Set up camera tracking with optional 3D scene creation"
  },

  setupDeepCompositing: {
    schema: {
      sourceName: z.string().describe("Name of the source deep image node"),
      outputName: z.string().optional().describe("Optional name for the output node"),
      operations: z.array(z.enum(["DeepRecolor", "DeepMerge", "DeepToImage", "DeepFromImage"])).optional().describe("Deep operations to include in the pipeline")
    },
    handler: async ({ sourceName, outputName, operations = ["DeepRecolor", "DeepToImage"] }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up deep compositing pipeline from "${sourceName}" with operations: ${operations.join(', ')}${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up a deep compositing pipeline"
  },

  batchProcess: {
    schema: {
      scriptPath: z.string().describe("Path to the processing script"),
      inputFiles: z.array(z.string()).describe("Array of input file paths"),
      outputDir: z.string().describe("Output directory for processed files"),
      frameRange: z.string().optional().describe("Optional frame range to process"),
      fileType: z.string().optional().describe("Output file type (e.g., 'exr', 'dpx')"),
      threads: z.number().optional().describe("Number of threads to use for processing")
    },
    handler: async ({ scriptPath, inputFiles, outputDir, frameRange, fileType = "exr", threads = 4 }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Batch processed ${inputFiles.length} files using script "${scriptPath}" to output directory "${outputDir}" as ${fileType} files${frameRange ? ` for frame range: ${frameRange}` : ''} using ${threads} threads`
        }]
      };
    },
    description: "Batch process multiple files using a processing script"
  },

  setupMachineLearning: {
    schema: {
      modelPath: z.string().describe("Path to the CopyCat model"),
      inputNode: z.string().describe("Name of the input node"),
      outputNode: z.string().optional().describe("Optional name for the output node"),
      gpuEnabled: z.boolean().optional().describe("Whether to use GPU acceleration"),
      inferenceParams: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional().describe("Additional inference parameters")
    },
    handler: async ({ modelPath, inputNode, outputNode, gpuEnabled = true, inferenceParams = {} }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up machine learning pipeline using model "${modelPath}" with input node "${inputNode}"${outputNode ? ` and output node "${outputNode}"` : ''}, GPU ${gpuEnabled ? 'enabled' : 'disabled'}, inference parameters: ${JSON.stringify(inferenceParams)}`
        }]
      };
    },
    description: "Set up a machine learning pipeline using CopyCat"
  },

  setupKeying: {
    schema: {
      sourceName: z.string().describe("Name of the source node containing footage to key"),
      screenColor: z.enum(["green", "blue", "red", "custom"]).optional().describe("Screen color to key"),
      customColor: z.string().optional().describe("Custom color for keying (hex format, e.g. '#00FF00')"),
      keyerType: z.enum(["Primatte", "Keylight", "IBK", "UltraKeyer"]).optional().describe("Type of keyer to use"),
      despill: z.boolean().optional().describe("Whether to include despill correction"),
      edgeRefinement: z.boolean().optional().describe("Whether to include edge refinement"),
      outputName: z.string().optional().describe("Optional name for the output node")
    },
    handler: async ({ 
      sourceName, 
      screenColor = "green", 
      customColor = "#00FF00", 
      keyerType = "Keylight", 
      despill = true, 
      edgeRefinement = true, 
      outputName 
    }) => {
      // In a real implementation, this would communicate with the Python bridge
      const colorInfo = screenColor === "custom" ? customColor : screenColor;
      return {
        content: [{ 
          type: "text", 
          text: `Set up keying pipeline for "${sourceName}" using ${keyerType} with ${colorInfo} screen${despill ? ', despill correction' : ''}${edgeRefinement ? ', edge refinement' : ''}${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up a keying pipeline for green/blue screen footage"
  },

  setupMotionBlur: {
    schema: {
      sourceName: z.string().describe("Name of the source node"),
      vectorName: z.string().optional().describe("Optional name of the motion vector node"),
      vectorMethod: z.enum(["VectorGenerator", "OpticalFlow", "External"]).optional().describe("Method to generate motion vectors"),
      amount: z.number().optional().describe("Amount of motion blur (defaults to 1.0)"),
      samples: z.number().optional().describe("Number of motion blur samples"),
      shutterAngle: z.number().optional().describe("Shutter angle in degrees"),
      outputName: z.string().optional().describe("Optional name for the output node")
    },
    handler: async ({ 
      sourceName, 
      vectorName, 
      vectorMethod = "VectorGenerator", 
      amount = 1.0, 
      samples = 10, 
      shutterAngle = 180, 
      outputName 
    }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up motion blur for "${sourceName}"${vectorName ? ` using vector node "${vectorName}"` : ` using ${vectorMethod}`} with amount ${amount}, ${samples} samples, ${shutterAngle}° shutter angle${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up a motion blur pipeline"
  },

  createBasicComp: {
    schema: {
      foregroundPath: z.string().describe("Path to the foreground footage"),
      backgroundPath: z.string().describe("Path to the background footage"),
      outputPath: z.string().describe("Path for the output file"),
      includeGrade: z.boolean().optional().describe("Whether to include grade nodes"),
      includeLensEffects: z.boolean().optional().describe("Whether to include lens effects (flare, chromatic aberration)"),
      includeGrain: z.boolean().optional().describe("Whether to include film grain"),
      colorSpace: z.string().optional().describe("Color space for the comp (e.g., 'ACES', 'sRGB')")
    },
    handler: async ({ 
      foregroundPath, 
      backgroundPath, 
      outputPath, 
      includeGrade = true, 
      includeLensEffects = false, 
      includeGrain = true,
      colorSpace = "ACES" 
    }) => {
      // In a real implementation, this would communicate with the Python bridge
      const effects = [];
      if (includeGrade) effects.push("grade nodes");
      if (includeLensEffects) effects.push("lens effects");
      if (includeGrain) effects.push("film grain");
      
      return {
        content: [{ 
          type: "text", 
          text: `Created basic comp with foreground "${foregroundPath}" and background "${backgroundPath}" in ${colorSpace} color space with output to "${outputPath}"${effects.length > 0 ? ' including ' + effects.join(', ') : ''}`
        }]
      };
    },
    description: "Create a basic compositing setup with foreground and background"
  },

  setupStereoRig: {
    schema: {
      sourceName: z.string().describe("Name of the source node"),
      interocularDistance: z.number().optional().describe("Interocular distance (eye separation)"),
      convergenceDistance: z.number().optional().describe("Convergence distance"),
      outputName: z.string().optional().describe("Optional name for the output node")
    },
    handler: async ({ sourceName, interocularDistance = 6.5, convergenceDistance = 200, outputName }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up stereo rig for "${sourceName}" with ${interocularDistance}cm interocular distance and ${convergenceDistance}cm convergence distance${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up a stereo 3D rig"
  },

  setupParticleSystem: {
    schema: {
      emitterType: z.enum(["point", "sphere", "box", "geometry"]).describe("Type of particle emitter"),
      particleCount: z.number().optional().describe("Number of particles to emit"),
      lifetime: z.number().optional().describe("Particle lifetime in frames"),
      velocityControl: z.boolean().optional().describe("Whether to include velocity control"),
      forceNodes: z.array(z.enum(["gravity", "wind", "turbulence", "custom"])).optional().describe("Force nodes to add"),
      outputName: z.string().optional().describe("Optional name for the output node")
    },
    handler: async ({ 
      emitterType, 
      particleCount = 1000, 
      lifetime = 100, 
      velocityControl = true, 
      forceNodes = ["gravity"], 
      outputName 
    }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up particle system with ${emitterType} emitter, ${particleCount} particles, ${lifetime} frames lifetime${velocityControl ? ', velocity control' : ''}${forceNodes.length > 0 ? ', forces: ' + forceNodes.join(', ') : ''}${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up a particle system"
  },

  setupLensDistortion: {
    schema: {
      sourceName: z.string().describe("Name of the source node"),
      distortionModel: z.enum(["3DE4", "NukeX", "LensDistortion"]).optional().describe("Distortion model to use"),
      k1: z.number().optional().describe("K1 distortion parameter"),
      k2: z.number().optional().describe("K2 distortion parameter"),
      undistort: z.boolean().optional().describe("Whether to undistort (true) or distort (false)"),
      outputName: z.string().optional().describe("Optional name for the output node")
    },
    handler: async ({ 
      sourceName, 
      distortionModel = "LensDistortion", 
      k1 = 0.1, 
      k2 = 0.05, 
      undistort = true, 
      outputName 
    }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up ${undistort ? 'undistortion' : 'distortion'} for "${sourceName}" using ${distortionModel} model with parameters k1=${k1}, k2=${k2}${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up lens distortion/undistortion"
  },

  setupGrainManagement: {
    schema: {
      sourceName: z.string().describe("Name of the source node"),
      operation: z.enum(["add", "match", "remove"]).describe("Grain operation to perform"),
      grainType: z.enum(["Kodak5248", "Kodak5279", "KodakTri-X", "custom"]).optional().describe("Type of film grain"),
      grainSize: z.number().optional().describe("Size of grain"),
      grainAmount: z.number().optional().describe("Amount of grain"),
      outputName: z.string().optional().describe("Optional name for the output node")
    },
    handler: async ({ 
      sourceName, 
      operation, 
      grainType = "Kodak5248", 
      grainSize = 1.0, 
      grainAmount = 0.5, 
      outputName 
    }) => {
      // In a real implementation, this would communicate with the Python bridge
      return {
        content: [{ 
          type: "text", 
          text: `Set up grain ${operation} for "${sourceName}" using ${grainType} grain with size ${grainSize} and amount ${grainAmount}${outputName ? ` and output node "${outputName}"` : ''}`
        }]
      };
    },
    description: "Set up film grain management (add, match, or remove grain)"
  }
};
