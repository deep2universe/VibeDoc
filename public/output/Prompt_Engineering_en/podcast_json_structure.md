# Podcast JSON Structure Documentation

## Overview
The validated podcast JSON file (`podcast_*_validated.json`) is the final output of the podcast generation pipeline after validation and correction of all visualizations. This file is used by the video generation service to create the final video podcast.

## JSON Schema Structure

### Root Level
```typescript
interface PodcastJSON {
  metadata: Metadata;
  participants: Participant[];
  clusters: Cluster[];
}
```

### Metadata
```typescript
interface Metadata {
  podcast_id: string;                    // Unique 8-character ID (e.g., "4b0ddeaf")
  generated_at: string;                  // ISO timestamp of generation
  project_name: string;                  // Name of the project/tutorial
  generation_config: GenerationConfig;   // Configuration used for generation
  statistics: Statistics;                // Statistical summary
  mermaid_validation?: ValidationInfo;   // Added by ValidateMermaidDiagrams node
}

interface GenerationConfig {
  preset: "deep_dive" | "overview" | "custom";  // Generation preset
  language: string;                             // Language code (e.g., "english", "german")
  focus_areas: string[];                        // Areas of focus (e.g., ["architecture", "patterns"])
  custom_prompt: string;                        // Custom user prompt
  max_dialogues_per_cluster: number;            // Dialogue limit per cluster
}

interface Statistics {
  total_clusters: number;                // Number of clusters
  total_dialogues: number;               // Total dialogue count
  total_visualizations: number;          // Total visualization count
  average_dialogues_per_cluster: number; // Average dialogues per cluster
}

interface ValidationInfo {
  validated_at: string;                  // ISO timestamp of validation
  total_mermaid_diagrams: number;        // Original mermaid count
  corrections_applied: number;           // Number of corrections made
  conversions_to_markdown: number;       // Diagrams converted to markdown
  validation_version: string;            // Validation version (e.g., "1.0")
}
```

### Participants
```typescript
interface Participant {
  name: string;                          // Character name (e.g., "Emma", "Alex")
  role: string;                          // Character role (e.g., "Masters Student")
  personality: string;                   // Personality traits
  background: string;                    // Background information
  speaking_style: string;                // How they speak
}
```

### Clusters
```typescript
interface Cluster {
  cluster_id: string;                    // Unique cluster ID (e.g., "index", "01_flow_")
  cluster_title: string;                 // Human-readable title
  mckinsey_summary: string;              // Executive summary of cluster
  dialogues: Dialogue[];                 // Array of dialogues
}
```

### Dialogues
```typescript
interface Dialogue {
  dialogue_id: number;                   // Unique dialogue ID within cluster
  speaker: string;                       // Speaker name (lowercase)
  text: string;                          // Dialogue text content
  emotion: string;                       // Emotion state (e.g., "excited", "curious")
  visualization?: Visualization;         // Optional visualization
}
```

### Visualizations
```typescript
interface Visualization {
  type: "mermaid" | "markdown";          // Visualization type
  content: string;                       // Visualization content
  
  // Added by validation process:
  corrected?: boolean;                   // True if mermaid was corrected
  validation_status?: "corrected" | "converted_to_markdown";
  
  // For converted visualizations:
  original_type?: "mermaid";             // Original type before conversion
  converted_reason?: "mermaid_validation_failed";
}
```

## Example Structure

```json
{
  "metadata": {
    "podcast_id": "4b0ddeaf",
    "generated_at": "2025-06-19T11:50:35.626848",
    "project_name": "PocketFlow-Template-Python_en",
    "generation_config": {
      "preset": "deep_dive",
      "language": "english",
      "focus_areas": ["architecture", "patterns"],
      "custom_prompt": "Focus on practical examples",
      "max_dialogues_per_cluster": 4
    },
    "statistics": {
      "total_clusters": 8,
      "total_dialogues": 51,
      "total_visualizations": 51,
      "average_dialogues_per_cluster": 6.4
    },
    "mermaid_validation": {
      "validated_at": "2025-06-20T07:12:14.497174",
      "total_mermaid_diagrams": 3,
      "corrections_applied": 1,
      "conversions_to_markdown": 2,
      "validation_version": "1.0"
    }
  },
  "participants": [
    {
      "name": "Emma",
      "role": "Masters Student",
      "personality": "curious, analytical, eager to understand",
      "background": "Working on thesis about workflow orchestration systems",
      "speaking_style": "asks insightful questions, connects concepts to research"
    },
    {
      "name": "Alex",
      "role": "Senior Developer",
      "personality": "patient, enthusiastic, knowledgeable",
      "background": "10+ years experience building distributed systems",
      "speaking_style": "explains with practical examples, uses analogies"
    }
  ],
  "clusters": [
    {
      "cluster_id": "index",
      "cluster_title": "Introduction",
      "mckinsey_summary": "Foundational framework accelerating Python workflow development",
      "dialogues": [
        {
          "dialogue_id": 1,
          "speaker": "emma",
          "text": "Hey everyone, and welcome to 'Tech Topology'!...",
          "emotion": "excited",
          "visualization": {
            "type": "mermaid",
            "content": "graph TD\\n  A[Start] --> B[Process]\\n  B --> C[End]",
            "corrected": true,
            "validation_status": "corrected"
          }
        }
      ]
    }
  ]
}
```

## Key Points for Video Generation

1. **Dialogue IDs**: Used as prefixes for audio and video files (e.g., `dialogue_1_*.mp3`)
2. **Visualization IDs**: Constructed as `{cluster_id}_dialogue_{dialogue_id}` for unique identification
3. **Speaker Names**: Lowercase in JSON, mapped to voice IDs during audio generation
4. **Validation Status**: Indicates whether visualizations were corrected or converted
5. **Emotion States**: Used for voice modulation and visual effects

## Validation Process

The `ValidateMermaidDiagrams` node:
1. Extracts all mermaid diagrams from the JSON
2. Validates each using `mmdc` (mermaid CLI)
3. Attempts to fix invalid diagrams via LLM
4. Converts still-failing diagrams to markdown
5. Saves as `podcast_*_validated.json`

## Usage by Video Generator

The video generator (`VideoGenerator` class) uses this JSON to:
1. Extract unique visualizations for rendering
2. Generate audio for each dialogue using speaker and emotion
3. Synchronize visual assets with audio tracks
4. Compose the final video with transitions

The structure ensures all necessary data for video generation is present and validated.