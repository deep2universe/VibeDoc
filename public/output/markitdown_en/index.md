# Tutorial: markitdown

**MarkItDown** is a versatile document conversion tool that transforms various file formats (PDF, DOCX, HTML, images, etc.) into clean **Markdown** text. It features an *extensible architecture* with plugins that support additional formats and a powerful detection system that automatically identifies file types. The tool can be used via a **command-line interface**, as a Python library, or through an **MCP server** that integrates with AI applications like Claude Desktop. MarkItDown can even leverage **Large Language Models** to enhance conversions, particularly for describing image content.


**Source Repository:** [https://github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)

```mermaid
flowchart TD
    A0["MarkItDown Class
"]
    A1["DocumentConverter
"]
    A2["StreamInfo
"]
    A3["Format-specific Converters
"]
    A4["Plugin System
"]
    A5["Command Line Interface
"]
    A6["URI Processing
"]
    A7["LLM Integration
"]
    A8["MCP Server
"]
    A9["Exception Handling
"]
    A0 -- "Manages and coordinates" --> A1
    A0 -- "Uses for file type detection" --> A2
    A0 -- "Loads and registers" --> A4
    A1 -- "Defines interface for" --> A3
    A3 -- "Uses for enhanced features" --> A7
    A5 -- "Creates and uses" --> A0
    A6 -- "Provides content access met..." --> A0
    A8 -- "Exposes as API service" --> A0
    A9 -- "Reports conversion errors" --> A1
    A2 -- "Guides conversion process" --> A3
```

## Chapters

1. [MarkItDown Class
](01_markitdown_class_.md)
2. [Command Line Interface
](02_command_line_interface_.md)
3. [StreamInfo
](03_streaminfo_.md)
4. [DocumentConverter
](04_documentconverter_.md)
5. [Format-specific Converters
](05_format_specific_converters_.md)
6. [Plugin System
](06_plugin_system_.md)
7. [URI Processing
](07_uri_processing_.md)
8. [LLM Integration
](08_llm_integration_.md)
9. [MCP Server
](09_mcp_server_.md)
10. [Exception Handling
](10_exception_handling_.md)
