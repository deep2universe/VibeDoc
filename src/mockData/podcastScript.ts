import { PodcastData } from '../stores/appStore';

export const mockPodcastScript: PodcastData = {
  "metadata": {
    "podcast_id": "19e70ba6",
    "generated_at": "2025-06-23T17:52:10.565084",
    "project_name": "bolt.new_en",
    "generation_config": {
      "preset": "custom",
      "language": "english",
      "focus_areas": [
        "Bolt.new features",
        "WebContainers",
        "Live Preview",
        "Vibe Coding workflow"
      ],
      "custom_prompt": "Create a relaxed, enthusiastic tech podcast episode about 'Vibe Coding & the Bolt.new GitHub repository'. The tone should be authentic and conversational, like a real podcast. Hidden goal: listeners should leave curious to try Bolt.new themselves. Avoid buzz-word overload; weave selling points into anecdotes and examples. Include short reactions ('Wow!', 'Okay, that's wild...') and light humor. Make concrete feature mentions with personal 'aha' moments. Present 'Vibe Coding' as 'sketching ideas instead of typing code'.",
      "max_dialogues_per_cluster": 4
    },
    "statistics": {
      "total_clusters": 12,
      "total_dialogues": 84,
      "total_visualizations": 84,
      "average_dialogues_per_cluster": 7.0
    },
    "mermaid_validation": {
      "validated_at": "2025-06-23T17:54:18.246233",
      "total_mermaid_diagrams": 6,
      "corrections_applied": 6,
      "conversions_to_markdown": 0,
      "validation_version": "1.0"
    }
  },
  "participants": [
    {
      "name": "Emma",
      "role": "Masters Student",
      "personality": "curious, analytical, eager to understand",
      "background": "Working on thesis about workflow orchestration systems",
      "speaking_style": "asks insightful questions, connects concepts to research, occasionally shares thesis insights"
    },
    {
      "name": "Alex",
      "role": "Senior Developer",
      "personality": "patient, enthusiastic, knowledgeable",
      "background": "10+ years experience building distributed systems",
      "speaking_style": "explains with practical examples, uses analogies, encourages exploration"
    }
  ],
  "clusters": [
    {
      "cluster_id": "index",
      "cluster_title": "Introduction",
      "mckinsey_summary": "Transformative tech platform introduction establishes foundation for 40% productivity improvements.",
      "dialogues": [
        {
          "dialogue_id": 1,
          "speaker": "emma",
          "text": "Hey everyone, welcome to Tech Vibes, the podcast where we explore the coolest trends in development! I'm Emma, masters student and coding enthusiast who's still trying to figure out if vim is worth the learning curve. *laughs* I'm joined today by my awesome co-host Alex, who's been buzzing about something called 'Bolt.new' for weeks now. Alex, I swear every time we grab coffee you mention this thing. What's got you so excited?",
          "emotion": "curious",
          "visualization": {
            "type": "markdown",
            "content": "## Tech Vibes: Exploring Modern Development Tools\n\n### Today's Featured Tool: Bolt.new\n\n* **What is it?** An AI-powered web development environment\n* **Key innovation:** Runs entirely in your browser\n* **No installation required:** Code, build, and deploy instantly\n* **Perfect for:** Hackathons, quick prototyping, learning to code\n* **Integrated AI:** Get coding assistance as you work\n\n_Emma and Alex will explore how Bolt.new is transforming the development workflow_\n\n![VibeDoc Logo](https://vibedoc.s3.eu-central-1.amazonaws.com/VibeDocLogo.png)"
          }
        },
        {
          "dialogue_id": 2,
          "speaker": "alex",
          "text": "Thanks Emma! You're not wrong—I've basically become a Bolt evangelist since the hackathon last month. *laughs* So Bolt.new is this completely browser-based development environment that's, well... it's changing how I think about coding. Imagine describing what you want to build to an AI assistant, and watching as it generates not just code snippets, but an actual working application right in your browser. No servers, no complex setup—everything runs locally using this technology called WebContainers. I literally asked it to 'Build a Pomodoro timer with a cool animation' and had a finished, working app in under two minutes. It felt like... I don't know, like switching from painting with a tiny brush to using spray paint. Same outcome but completely different experience.",
          "emotion": "enthusiastic",
          "visualization": {
            "type": "mermaid",
            "content": "flowchart TD\n    bolt[Bolt.new Browser Environment]\n    webcontainer[WebContainer Technology]\n    ai[AI Assistant Interface]\n    editor[Code Editor]\n    fs[File System]\n    terminal[Terminal]\n    \n    bolt --> webcontainer\n    bolt --> ai\n    bolt --> editor\n    bolt --> fs\n    bolt --> terminal\n    \n    webcontainer -- \"Executes code locally\" --> editor\n    ai -- \"Generates solutions\" --> editor\n    editor -- \"Modifies\" --> fs\n    fs -- \"Stores project\" --> webcontainer\n    \n    style bolt fill:#f5f5ff,stroke:#333,stroke-width:2px\n    style webcontainer fill:#e1f5fe,stroke:#333,stroke-width:1px\n    style ai fill:#e8f5e9,stroke:#333,stroke-width:1px"
          }
        }
      ]
    },
    {
      "cluster_id": "01_workbench_",
      "cluster_title": "Workbench",
      "mckinsey_summary": "Integrated workbench environment accelerates development cycles by 35% through seamless VS Code integration.",
      "dialogues": [
        {
          "dialogue_id": 3,
          "speaker": "emma",
          "text": "So Alex, you've been raving about this Bolt.new thing for weeks now. You mentioned something called the 'Workbench' being a game-changer? What exactly is that all about?",
          "emotion": "curious",
          "visualization": {
            "type": "markdown",
            "content": "## What is the Workbench in Bolt.new?\n\nEmma is asking about the Workbench feature in Bolt.new that Alex has been excited about:\n\n- **Development Environment**: A complete coding setup accessible through a browser\n- **Game-Changer**: Transforms how developers interact with their tools\n- **Browser-Based**: Everything runs in a standard web browser tab\n\n### Key Questions:\n- How does it differ from traditional development setups?\n- What makes it so revolutionary?\n- Why is it more efficient than conventional tooling?"
          }
        },
        {
          "dialogue_id": 4,
          "speaker": "alex",
          "text": "Oh Emma, the Workbench is probably my favorite part! It's basically your entire development environment living right in your browser tab. Think about how frustrating it is when you're coding - you've got VS Code open, a terminal window, maybe file explorer, a browser to see your app... you're constantly switching between windows, right?",
          "emotion": "enthusiastic",
          "visualization": {
            "type": "mermaid",
            "content": "graph TD\n    subgraph \"Traditional Development Environment\"\n        LocalSetup[Local Setup]\n        Install[Install Software]\n        Config[Configure Environment]\n        Manage[Manage Dependencies]\n        \n        LocalSetup --> Install\n        Install --> Config\n        Config --> Manage\n        \n        style LocalSetup fill:#fbb,stroke:#933\n        style Install fill:#fbb,stroke:#933\n        style Config fill:#fbb,stroke:#933\n        style Manage fill:#fbb,stroke:#933\n    end\n    \n    subgraph \"Bolt.new Workbench\"\n        Browser[Browser Tab]\n        Editor[Code Editor]\n        Files[File Explorer]\n        Term[Terminal]\n        Preview[Live Preview]\n        \n        Browser --> Editor\n        Browser --> Files\n        Browser --> Term\n        Browser --> Preview\n        \n        style Browser fill:#ccf,stroke:#333\n        style Editor fill:#bbf,stroke:#333\n        style Files fill:#bfb,stroke:#333\n        style Term fill:#fbf,stroke:#333\n        style Preview fill:#fbb,stroke:#333\n    end"
          }
        }
      ]
    },
    {
      "cluster_id": "02_ai_features",
      "cluster_title": "AI-Powered Features",
      "mckinsey_summary": "Advanced AI integration delivers 50% faster development through intelligent code generation and real-time assistance.",
      "dialogues": [
        {
          "dialogue_id": 5,
          "speaker": "emma",
          "text": "This AI integration sounds incredible! Can you walk me through how it actually works in practice? Like, what does the AI assistant interface look like?",
          "emotion": "excited",
          "visualization": {
            "type": "markdown",
            "content": "## AI Assistant Features in Bolt.new\n\n### Core Capabilities:\n- **Natural Language Processing**: Understand development requests in plain English\n- **Code Generation**: Create complete applications from descriptions\n- **Real-time Assistance**: Provide suggestions and fixes as you code\n- **Context Awareness**: Understand your project structure and goals\n\n### Example Interactions:\n- \"Build a todo app with dark mode\"\n- \"Add authentication to this React component\"\n- \"Fix the CSS layout issues\"\n- \"Optimize this function for performance\"\n\n### Benefits:\n- Faster prototyping\n- Reduced boilerplate code\n- Learning through examples\n- Instant problem solving"
          }
        },
        {
          "dialogue_id": 6,
          "speaker": "alex",
          "text": "The AI interface is beautifully simple - there's a chat-like panel where you can just type what you want. But here's the magic: it doesn't just give you code snippets. It understands your entire project context. So if I say 'add a dark mode toggle to this app', it knows about my existing CSS, my component structure, my state management... and it implements the feature across all the necessary files. It's like having a senior developer pair programming with you, but one who never gets tired or impatient!",
          "emotion": "amazed",
          "visualization": {
            "type": "mermaid",
            "content": "sequenceDiagram\n    participant User\n    participant AI\n    participant Editor\n    participant FileSystem\n    participant Preview\n    \n    User->>AI: \"Add dark mode toggle\"\n    AI->>FileSystem: Analyze project structure\n    AI->>Editor: Generate CSS variables\n    AI->>Editor: Create toggle component\n    AI->>Editor: Update main app component\n    AI->>FileSystem: Save all changes\n    FileSystem->>Preview: Trigger rebuild\n    Preview->>User: Show updated app with dark mode\n    \n    Note over AI,FileSystem: AI understands full context\n    Note over Editor,Preview: Changes applied across multiple files"
          }
        }
      ]
    }
  ]
};