# Tutorial: python-sdk

The Python SDK implements the **Model Context Protocol** (MCP), a standardized way for applications to interact with **Large Language Models**. It provides a server framework that manages tools, resources, and prompts, along with a *client interface* for connecting to MCP servers. The SDK supports different *transport mechanisms* (HTTP, WebSockets, stdio), **OAuth authentication**, and an **elicitation framework** allowing tools to request additional information from users during execution.


**Source Repository:** [https://github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)

```mermaid
flowchart TD
    A0["FastMCP Server
"]
    A1["Client Session
"]
    A2["Resource Management
"]
    A3["Tool Management
"]
    A4["Prompt Management
"]
    A5["Transport Mechanisms
"]
    A6["Authentication and Authorization
"]
    A7["Elicitation Framework
"]
    A0 -- "Delegates tool execution to" --> A3
    A0 -- "Uses for data access" --> A2
    A0 -- "Coordinates prompt renderin..." --> A4
    A0 -- "Communicates via" --> A5
    A1 -- "Sends requests to" --> A0
    A1 -- "Connects through" --> A5
    A3 -- "Requests user input via" --> A7
    A6 -- "Secures access to" --> A0
```

## Chapters

1. [Client Session
](01_client_session_.md)
2. [FastMCP Server
](02_fastmcp_server_.md)
3. [Tool Management
](03_tool_management_.md)
4. [Resource Management
](04_resource_management_.md)
5. [Prompt Management
](05_prompt_management_.md)
6. [Elicitation Framework
](06_elicitation_framework_.md)
7. [Transport Mechanisms
](07_transport_mechanisms_.md)
8. [Authentication and Authorization
](08_authentication_and_authorization_.md)
