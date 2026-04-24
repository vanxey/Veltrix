# Logging Your First Trade

This tutorial walks through logging a trade in Veltrix from start to finish — opening the journal form, filling in the details, and seeing your entry appear in the trade log. By the end you'll have a saved trade with all the core fields, tags, and notes filled in.

## Prerequisites

Before starting, make sure you've done the following:

1. **Register an Account:** Sign up and verify your account at the registration page.
2. **Log in:** Access the application via the login screen. If you haven't set up Veltrix locally yet, see the [Getting Started guide](../guides/quickstart.md) first.

## Step 1: Navigate to the Journal

After logging in, navigate to the **Journaling** page using the main navigation bar.

1.  On the Journaling page, click the **Add Journal** button to open the trade input form.

## Step 2: Input Core Trade Details

The trade form has a set of required fields. Filling these in accurately matters because they drive the filtering and analytics throughout the rest of the app — if the data going in is wrong, the analysis coming out won't be useful.

| Field | Required Input | Notes |
| :--- | :--- | :--- |
| **Asset/Pair** | e.g., `EUR/USD` | The instrument traded. |
| **Direction** | Select `Long` (Buy) or `Short` (Sell). | |
| **Entry Date** | Date picker | The date the trade was opened. |
| **Exit Date** | Date picker | The date the trade was closed. |
| **Size** | Numeric value | The position size or lot size. |
| **Session** | Select from list | Organize your trade under an existing Trading Session. |
| **Strategy** | Text input | The primary strategy used (e.g., `Breakout`, `Impulse`). |
| **Outcome** | Select `Win`, `Loss`, or `BE`. | |
| **PnL ($)** | Numeric value | The amount of Profit or Loss (enter a positive value; the `Outcome` handles the sign for the database). |

## Step 3: Add Tags and Notes (Optional)

These fields aren't required to save a trade, but they're where most of the journaling value actually comes from.

1.  **Tags**: Select any relevant tags by clicking on the custom tag buttons. These can represent market conditions (`Volatile`), psychology (`FOMO`), or secondary setups.
2.  **Notes & Reflection**: Use the large text area for detailed journaling, explaining execution, mindset, and any lessons learned.
3.  **Reviewed**: Check the **Reviewed** box if you have fully analyzed this trade. This helps with filtering in the trade log.

## Step 4: Save and View

1.  Click the **Save Trade** button. This sends a `POST /trades` request to the backend API.
2.  The trade log refreshes, and your new trade should appear at the top of the table.