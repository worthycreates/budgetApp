# budgetApp

## Features 
* Set categories and assign budgets. 
* View amount of budget used and left.  
* Add transactions and assign to categories. 
* Add uncategorised transactions that spread across categories based on the amount left and what wallet they fall under.


## Technologies
### Front end
HTML, CSS, JS, React, Electron (considering making it a Desktop app, perhaps a phone app too).
* Add / edit / delete categories.
* Add / edit / delete transactions.
* Display categories.
* Display totals.
* Group categories by wallet.
* Display usage graphs across a month.
* Form validation (the given data for the transactions).

## Back end
NodeJS with Typscript and Express. Express.js REST API (enables the frontend to talk to the backend over the internet using standard web rules - needed for web app or phone, not necessary with Electron though).
* Calculates the amount left and percentages.
    * Based on date, categories, wallets, etc.
* Generates the data required for the visualisations.
* Subscriptions or reoccurring payments, automatically taken out of budget at the right time, and db entries created + updated UI.

## Database
SQLite, (will consider if it gets more data intense).
* Stores transaction data.
    * Name / Desc
    * Date
    * Amount
    * Wallet (inferred from category if given)
    * Category
    * Notes
    * IsSubscriptions
* Stores categories and wallets.
* Stores the last 6 months of data for comparison (could increase to 12- to compare across a year). 

## Lean Architecture
1. The Database Tables (Your Entities)
   1. **wallets**: id (Primary Key), name, balance
   2. **categories**: id (PK), name, budget_limit, wallet_id (Foreign Key)
   3. **transactions**: id (PK), amount, date, description, category_id (FK), is_subscription (Boolean)
2. The Core REST API Endpoints to Write
   1. GET /api/categories - Fetch all categories and their budgets.
   2. POST /api/transactions - Add a new expense and subtract it from the category budget.