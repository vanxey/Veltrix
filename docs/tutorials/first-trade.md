# Logging Your First Trade

This tutorial guides you through the process of logging a new trade, including setting up an account and inputting the necessary data into the Trade Journal.

## Prerequisites

1.  **Register an Account:** Before logging trades, you must register and verify your account.
2.  **Login:** Access the application via the [Login](guides/quickstart.md) page.

## Step 1: Navigate to the Journal

After logging in, navigate to the **Journaling** page using the main navigation bar.

1.  On the Journaling page, click the **Add Journal** button to open the trade input form.

## Step 2: Input Core Trade Details

The Trade Form is divided into required fields for accurate logging.

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

1.  **Tags**: Select any relevant tags by clicking on the custom tag buttons. These can represent market conditions (`Volatile`), psychology (`FOMO`), or secondary setups.
2.  **Notes & Reflection**: Use the large text area for detailed journaling, explaining execution, mindset, and any lessons learned.
3.  **Reviewed**: Check the **Reviewed** box if you have fully analyzed this trade. This helps with filtering in the trade log.

## Step 4: Save and View

1.  Click the **Save Trade** button. This sends a `POST /trades` request to the backend API.
2.  The trade log refreshes, and your new trade should appear at the top of the table.