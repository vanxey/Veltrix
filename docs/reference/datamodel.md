# Data Model
This document details the PostgreSQL database schema and defines key, domain-specific terminology (Glossary) used throughout the Veltrix application.

## 1. Glossary of Terms

Table: Key Trading Terms

| Term     | Definition                                                                                                                                     | Context                     |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
| P&L      | Profit and Loss. The financial outcome of a trade. In the database, stored as `NUMERIC(20,8)`.                                                | Analytics, Trade Records    |
| Outcome  | The binary result of a trade: Win, Loss, or BE (Break Even).                                                                                   | Trade Records, Analytics    |
| Session  | A user-defined grouping of trades, often corresponding to major market periods (e.g., London Session, New York Session).                       | Trade Grouping              |
| Direction| The trade type: Buy (Long) or Sell (Short).                                                                                                    | Trade Records               |
| Tag      | User-defined labels for organizing trades by strategy, psychology, or market condition.                                                        | Trade Records, Filtering    |

## 2. Database Schema references

The database uses PostgreSQL and the `uuid-ossp` extension to generate UUID primary keys.


Table: Enumerated Types (Enums)

| Type Name          | Possible Values           | Description                                                            |
|--------------------|---------------------------|------------------------------------------------------------------------|
| trade_direction    | 'Buy', 'Sell'             | The direction of the trade.                                           |
| trade_outcome      | 'Win', 'Loss', 'BE'       | The final result of the trade ('BE' stands for Break Even).           |
| news_impact_level  | 'High', 'Medium', 'Low'   | The market impact level of an economic event.                         |

### Core Tables
`user`

Stores user authentication and profile data.

Table: User Table Schema

| Column        | Data Type      | Constraint/Description                               |
|---------------|----------------|-------------------------------------------------------|
| user_id       | UUID           | Primary Key.                                         |
| username      | VARCHAR(255)   | Not Null, Unique.                                    |
| email         | VARCHAR(255)   | Not Null, Unique.                                    |
| password_hash | VARCHAR(255)   | Not Null.                                            |
| is_verified   | BOOLEAN        | Default false, email verification status.            |
| is_admin      | BOOLEAN        | Default false, administrator privileges.             |

`session`

Stores custom trade session periods (e.g., London, Asia).

Table: Session Table Schema

| Column      | Data Type    | Constraint/Description      |
|-------------|--------------|-----------------------------|
| session_id  | UUID         | Primary Key.                |
| name        | VARCHAR(20)  | Not Null, Unique.           |
| start_time  | TIMESTAMP    |                             |
| end_time    | TIMESTAMP    |                             |

`tag`

Stores user-specific tags for categorizing trades (e.g., 'Double Bottom', 'Over-leveraged').

Table: Tag Table Schema

| Column   | Data Type     | Constraint/Description                                      |
|----------|---------------|--------------------------------------------------------------|
| tag_id   | UUID          | Primary Key.                                                |
| user_id  | UUID          | Foreign Key to users (ON DELETE CASCADE).                   |
| tag_name | VARCHAR(50)   | Not Null.                                                   |
| tag_type | VARCHAR(20)   | Not Null (e.g., 'Strategy', 'Psychology').                  |

`trade`

The core table storing all logged trade details.

Table: Trade Table Schema

| Column       | Data Type       | Constraint/Description                                      |
|--------------|------------------|--------------------------------------------------------------|
| trade_id     | UUID             | Primary Key.                                                |
| user_id      | UUID             | Foreign Key to users (ON DELETE CASCADE).                   |
| session_id   | UUID             | Foreign Key to session (ON DELETE CASCADE).                 |
| asset        | VARCHAR(50)      | Trading pair/asset.                                         |
| direction    | trade_direction  | 'Buy' or 'Sell'.                                            |
| size         | NUMERIC(20,8)    | Position size / lot size.                                   |
| pnl          | NUMERIC(20,8)    | Profit/Loss amount.                                         |
| entry_date   | TIMESTAMP        | Not Null.                                                   |
| exit_date    | TIMESTAMP        |                                                             |
| outcome      | trade_outcome    | 'Win', 'Loss', or 'BE' (Not Null).                          |
| is_reviewed  | BOOLEAN          | Default false.                                              |
| updated_at   | TIMESTAMP        | Automatically updated on row change.                        |

### Junction Tables (Many-to-Many Relationships)

Table: Tag Linking Tables

| Table              | Purpose                                                      | Primary Key          | Foreign Keys                                             |
|--------------------|--------------------------------------------------------------|-----------------------|-----------------------------------------------------------|
| trade_tags         | Links a trade (`trade_id`) to multiple tags (`tag_id`).      | (trade_id, tag_id)   | trade (ON DELETE CASCADE), tag (ON DELETE CASCADE)       |
| news_article_tags  | Links a news article (`article_id`) to multiple tags (`tag_id`). | (article_id, tag_id) | news_article, tag (ON DELETE CASCADE)                    |
