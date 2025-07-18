import { Repository } from '../stores/appStore';

export interface TutorialChapter {
  id: string;
  title: string;
  filename: string;
}

export interface Tutorial extends Repository {
  docPath: string;
  chapters: TutorialChapter[];
}

export const tutorials: Tutorial[] = [
  {
    id: 'stackblitz/bolt.new',
    name: 'bolt.new',
    owner: 'stackblitz',
    description: 'AI-Powered Development Environment',
    lastUpdated: new Date().toISOString(),
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/stackblitz/bolt.new',
    docPath: '/output/bolt.new_en',
    chapters: [
      { id: 'workbench', title: 'Workbench', filename: '01_workbench_.md' },
      { id: 'chat_system', title: 'Chat System', filename: '02_chat_system_.md' },
      { id: 'code_editor', title: 'Code Editor', filename: '03_code_editor_.md' },
      { id: 'webcontainer', title: 'WebContainer', filename: '04_webcontainer_.md' },
      { id: 'file_system', title: 'File System', filename: '05_file_system_.md' },
      { id: 'llm_integration', title: 'LLM Integration', filename: '06_llm_integration_.md' },
      { id: 'artifact_system', title: 'Artifact System', filename: '07_artifact_system_.md' },
      { id: 'store_system', title: 'Store System', filename: '08_store_system_.md' },
      { id: 'persistence_system', title: 'Persistence System', filename: '09_persistence_system_.md' }
    ]
  },
  {
    id: 'ionos-cloud/ionosctl',
    name: 'ionosctl',
    owner: 'ionos-cloud',
    description: 'IONOS Cloud Command Line Interface',
    lastUpdated: new Date().toISOString(),
    language: 'Go',
    stars: 0,
    url: 'https://github.com/ionos-cloud/ionosctl',
    docPath: '/output/ionosctl_en',
    chapters: [
      { id: 'command_framework', title: 'Command Framework', filename: '01_command_framework_.md' },
      { id: 'configuration_management', title: 'Configuration Management', filename: '02_configuration_management_.md' },
      { id: 'authentication_system', title: 'Authentication System', filename: '03_authentication_system_.md' },
      { id: 'resource_operations', title: 'Resource Operations', filename: '04_resource_operations_.md' },
      { id: 'output_formatting', title: 'Output Formatting', filename: '05_output_formatting_.md' },
      { id: 'kubernetes_management', title: 'Kubernetes Management', filename: '06_kubernetes_management_.md' },
      { id: 'service_clients', title: 'Service Clients', filename: '07_service_clients_.md' }
    ]
  },
  {
    id: 'NirDiamant/Prompt_Engineering',
    name: 'Prompt_Engineering',
    owner: 'NirDiamant',
    description: 'Advanced Prompt Engineering Techniques',
    lastUpdated: new Date().toISOString(),
    language: 'Python',
    stars: 0,
    url: 'https://github.com/NirDiamant/Prompt_Engineering',
    docPath: '/output/Prompt_Engineering_en',
    chapters: [
      { id: 'basic_prompt_structures', title: 'Basic Prompt Structures', filename: '01_basic_prompt_structures_.md' },
      { id: 'prompt_templates', title: 'Prompt Templates', filename: '02_prompt_templates_.md' },
      { id: 'zero_shot_prompting', title: 'Zero-Shot Prompting', filename: '03_zero_shot_prompting_.md' },
      { id: 'few_shot_learning', title: 'Few-Shot Learning', filename: '04_few_shot_learning_.md' },
      { id: 'chain_of_thought_cot_prompting', title: 'Chain of Thought (CoT) Prompting', filename: '05_chain_of_thought__cot__prompting_.md' },
      { id: 'prompt_chaining_and_sequencing', title: 'Prompt Chaining and Sequencing', filename: '06_prompt_chaining_and_sequencing_.md' },
      { id: 'constrained_and_guided_generation', title: 'Constrained and Guided Generation', filename: '07_constrained_and_guided_generation_.md' },
      { id: 'role_prompting', title: 'Role Prompting', filename: '08_role_prompting_.md' },
      { id: 'prompt_optimization_techniques', title: 'Prompt Optimization Techniques', filename: '09_prompt_optimization_techniques_.md' },
      { id: 'prompt_security_and_ethics', title: 'Prompt Security and Ethics', filename: '10_prompt_security_and_ethics_.md' }
    ]
  },
  {
    id: 'NirDiamant/Prompt_Engineering_DE',
    name: 'Prompt_Engineering_DE',
    owner: 'NirDiamant',
    description: 'Prompt-Engineering-Techniken (Deutsch)',
    lastUpdated: new Date().toISOString(),
    language: 'Python',
    stars: 0,
    url: 'https://github.com/NirDiamant/Prompt_Engineering',
    docPath: '/output/Prompt_Engineering_de',
    chapters: [
      { id: 'prompt_engineering', title: 'Prompt-Engineering', filename: '01_prompt_engineering_.md' },
      { id: 'prompt_strukturen', title: 'Prompt-Strukturen', filename: '02_prompt_strukturen_.md' },
      { id: 'prompt_vorlagen', title: 'Prompt-Vorlagen', filename: '03_prompt_vorlagen_.md' },
      { id: 'anweisungs_engineering', title: 'Anweisungs-Engineering', filename: '04_anweisungs_engineering_.md' },
      { id: 'zero_shot_prompting', title: 'Zero-Shot-Prompting', filename: '05_zero_shot_prompting_.md' },
      { id: 'few_shot_learning', title: 'Few-Shot-Learning', filename: '06_few_shot_learning_.md' },
      { id: 'gedankenketten_prompting', title: 'Gedankenketten-Prompting', filename: '07_gedankenketten_prompting_.md' },
      { id: 'eingeschraenkte_generierung', title: 'Eingeschränkte Generierung', filename: '08_eingeschraenkte_generierung_.md' },
      { id: 'rollen_prompting', title: 'Rollen-Prompting', filename: '09_rollen_prompting_.md' },
      { id: 'prompt_optimierung', title: 'Prompt-Optimierung', filename: '10_prompt_optimierung_.md' }
    ]
  },
  {
    id: 'cpjet64/vibecoding',
    name: 'vibecoding',
    owner: 'cpjet64',
    description: 'The Future of Intuitive Development',
    lastUpdated: new Date().toISOString(),
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/cpjet64/vibecoding',
    docPath: '/output/vibecoding_en',
    chapters: [
      { id: 'vibe_coding', title: 'Vibe Coding', filename: '01_vibe_coding_.md' },
      { id: 'product_requirements_document_prd', title: 'Product Requirements Document (PRD)', filename: '02_product_requirements_document__prd__.md' },
      { id: 'prompt_engineering', title: 'Prompt Engineering', filename: '03_prompt_engineering_.md' },
      { id: 'ai_collaboration_workflow', title: 'AI Collaboration Workflow', filename: '04_ai_collaboration_workflow_.md' },
      { id: 'vibe_translation', title: 'Vibe Translation', filename: '05_vibe_translation_.md' },
      { id: 'ai_orchestration_patterns', title: 'AI Orchestration Patterns', filename: '06_ai_orchestration_patterns_.md' },
      { id: 'development_environments', title: 'Development Environments', filename: '07_development_environments_.md' },
      { id: 'operational_procedures', title: 'Operational Procedures', filename: '08_operational_procedures_.md' },
      { id: 'quality_assurance', title: 'Quality Assurance', filename: '09_quality_assurance_.md' },
      { id: 'system_documentation', title: 'System Documentation', filename: '10_system_documentation_.md' }
    ]
  },
  {
    id: 'elevenlabs/elevenlabs-python',
    name: 'elevenlabs-python',
    owner: 'elevenlabs',
    description: 'Official Python Library for ElevenLabs API',
    lastUpdated: new Date().toISOString(),
    language: 'Python',
    stars: 0,
    url: 'https://github.com/elevenlabs/elevenlabs-python',
    docPath: '/output/elevenlabs-python_en',
    chapters: [
      { id: 'elevenlabs_client', title: 'ElevenLabs Client', filename: '01_elevenlabs_client_.md' },
      { id: 'voice_management', title: 'Voice Management', filename: '02_voice_management_.md' },
      { id: 'models_management', title: 'Models Management', filename: '03_models_management_.md' },
      { id: 'text_to_speech_conversion', title: 'Text-to-Speech Conversion', filename: '04_text_to_speech_conversion_.md' },
      { id: 'audio_processing', title: 'Audio Processing', filename: '05_audio_processing_.md' },
      { id: 'speech_to_speech_conversion', title: 'Speech-to-Speech Conversion', filename: '06_speech_to_speech_conversion_.md' },
      { id: 'speech_to_text_conversion', title: 'Speech-to-Text Conversion', filename: '07_speech_to_text_conversion_.md' },
      { id: 'conversational_ai', title: 'Conversational AI', filename: '08_conversational_ai_.md' },
      { id: 'webhooks_system', title: 'Webhooks System', filename: '09_webhooks_system_.md' }
    ]
  },
  {
    id: 'The-Pocket/PocketFlow',
    name: 'PocketFlow',
    owner: 'The-Pocket',
    description: 'A 100-line minimalist LLM framework',
    lastUpdated: new Date().toISOString(),
    language: 'Python',
    stars: 0,
    url: 'https://github.com/The-Pocket/PocketFlow',
    docPath: '/output/PocketFlow_en',
    chapters: [
      { id: 'node', title: 'Node', filename: '01_node_.md' },
      { id: 'flow', title: 'Flow', filename: '02_flow_.md' },
      { id: 'communication_shared_store', title: 'Communication (Shared Store)', filename: '03_communication__shared_store__.md' },
      { id: 'batch_processing', title: 'Batch Processing', filename: '04_batch_processing_.md' },
      { id: 'async_processing', title: 'Async Processing', filename: '05_async_processing_.md' },
      { id: 'parallel_processing', title: 'Parallel Processing', filename: '06_parallel_processing_.md' },
      { id: 'workflow_pattern', title: 'Workflow Pattern', filename: '07_workflow_pattern_.md' },
      { id: 'agent_pattern', title: 'Agent Pattern', filename: '08_agent_pattern_.md' },
      { id: 'rag_retrieval_augmented_generation', title: 'RAG (Retrieval Augmented Generation)', filename: '09_rag__retrieval_augmented_generation__.md' },
      { id: 'map_reduce_pattern', title: 'Map Reduce Pattern', filename: '10_map_reduce_pattern_.md' }
    ]
  },
  {
    id: 'microsoft/markitdown',
    name: 'markitdown',
    owner: 'microsoft',
    description: 'A lightweight Python utility for converting various files to Markdown',
    lastUpdated: new Date().toISOString(),
    language: 'Python',
    stars: 0,
    url: 'https://github.com/microsoft/markitdown',
    docPath: '/output/markitdown_en',
    chapters: [
      { id: 'markitdown_class', title: 'MarkItDown Class', filename: '01_markitdown_class_.md' },
      { id: 'command_line_interface', title: 'Command Line Interface', filename: '02_command_line_interface_.md' },
      { id: 'streaminfo', title: 'StreamInfo', filename: '03_streaminfo_.md' },
      { id: 'documentconverter', title: 'DocumentConverter', filename: '04_documentconverter_.md' },
      { id: 'format_specific_converters', title: 'Format Specific Converters', filename: '05_format_specific_converters_.md' },
      { id: 'plugin_system', title: 'Plugin System', filename: '06_plugin_system_.md' },
      { id: 'uri_processing', title: 'URI Processing', filename: '07_uri_processing_.md' },
      { id: 'llm_integration', title: 'LLM Integration', filename: '08_llm_integration_.md' },
      { id: 'mcp_server', title: 'MCP Server', filename: '09_mcp_server_.md' },
      { id: 'exception_handling', title: 'Exception Handling', filename: '10_exception_handling_.md' }
    ]
  }
];

export const findTutorialByRepo = (owner: string, repo: string): Tutorial | undefined => {
  return tutorials.find(
    t => t.owner.toLowerCase() === owner.toLowerCase() && 
         t.name.toLowerCase() === repo.toLowerCase()
  );
};

export const findTutorialByPath = (path: string): Tutorial | undefined => {
  return tutorials.find(t => t.docPath === path || t.docPath.includes(path));
};