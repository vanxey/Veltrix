# Welcome to Veltrix Technical Documentation

Veltrix is a trading journal built to solve a real problem one of our team members had — they were trading but had no structured way to review what they were doing. The goal was something more flexible than a spreadsheet but simpler than the expensive tools out there. It lets traders log, review, and analyze their trading activity, whether you're a day trader, swing trader, or someone who just wants to keep track of what they're doing.

---

## Who This Documentation Is For

- **Traders / end users** — Start with the [Tutorial](tutorials/first-trade.md) to log your first trade or go to the [Getting Started guide](guides/quickstart.md) if you want to self-host.
- **Developers / contributors** — The [Conceptual Overview](conceptual/architecture.md) explains how the app is built, and the [Contributor Guide](CONTRIBUTING.md) covers the Git workflow and testing setup.

---

## How the Docs Are Structured

I organized this documentation using the [Diataxis framework](https://diataxis.fr/), which separates docs by what you're actually trying to do — understand something, set it up, learn by doing, or look something up. I chose it because it forced me to think about the reader first instead of just dumping everything I knew into one page.

1.  **Explanation (Conceptual Overview)**: How Veltrix is built and why.
2.  **Procedural (Getting Started)**: Step-by-step instructions for installing and running Veltrix.
3.  **Tutorials**: Goal-oriented lessons, such as logging your first trade.
4.  **Reference**: Technical details on the API, Data Model, and Codebase.

---

## Core Features

Veltrix gives you a structured place to record and review your trades:

* **Trade Journaling**: Log detailed trade information including: Asset, Direction (Long/Short), Entry/Exit dates, Position size, P&L (Profit & Loss), Outcome, Strategy, and personal Notes.
* **Dynamic Trade Log**: View all logged trades in an interactive table with filtering and sorting.
* **Session Management**: Organize trades by trading sessions for focused review and pattern recognition.
* **Performance Analytics**: Foundation for a comprehensive analytics dashboard.
* **Responsive Design**: Optimized for seamless experience across various devices.

## Documentation Structure

This documentation is organized using the **Diataxis framework** to ensure clarity and easy navigation for all personas, from new users to core contributors:

* **Overview (`index.md`)**: You are here. A top-level introduction to the project.
* **Getting Started (Procedural)**: Hands-on guides for setting up the environment, including detailed steps for database and API configuration.
* **Conceptual Overview (Explanation)**: Detailed explanation of the project's architecture, including the 3-Tier model (Frontend, Backend, Database).
* **Tutorials**: Step-by-step guides for achieving specific goals, such as logging your first trade.
* **Reference**: Technical deep-dive for developers, including the complete API specification and data model schema.

## Next Steps

To begin developing or setting up Veltrix locally, please proceed to the [Getting Started (Procedural)](guides/quickstart.md) guide.