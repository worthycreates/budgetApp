# budgetApp

## Features 
* Set categories and assign budgets. 
* View amount of budget used and left.  
* Add transactions and assign to categories. 
* Add uncategorised transactions that spread across categories based on the amount left and what wallet they fall under.
* Flexibility is key- what if a purchase falls under more than one category- the user should be able to spread the across the categories that it expands.
* Export data in the following formats: csv, excel (mid-tier), html (high-tier)
  * The excel sheet can be given to their accountants help thm manage their finances.
  * HTML report would allow people to click into months and view purchases etc.
  * All these would also be good for long term data storage- especially helpful tax / reconciliation purposes.
* Import data into the app.
  * Look into how one could import the kind of data that you can get from a bank.
* The focus is around budgets, it is optional to associate a category with a wallet.
  * Perhaps a user has specific budgets that they typically pay with one card, this allows them to track spending on that card.
  * However, if a user doesn't want to associate any of their categories with wallets, that should be allowed, too, their focus is moreso on tracking at the category level, as as opposed to the wallet / card.
  * Another option is that user can have a entity above a wallet, which have different categories. By default all categories are associated with one wallet, but a user can choose to put categories under different cards, but they can have many wallets to, each with different budgets. We need to brainstorm this, and finalise the architecture.


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
  * Notifications should be sent (perhaps a question, it is time for your montly / yearly sub is this still valid, perhaps users can have the ability to toggle this feature, some may want it to be automaticalkly deducted without asking for permission, they simply want to get notified that it has been deducted)

## Database
SQLite, PostgresSQL (will consider if it gets more data intense).
* Stores transaction data.
    * Name / Desc
    * Date
    * Amount
    * Wallet (inferred from category if given)
    * Category
    * Notes
    * IsSubscriptions (switching to sub id, since there will be a table for subs that handles necessary info (i.e. frequency, amount, start-date etc))
* Stores categories and wallets.
* Stores the last 6 months of data for comparison (could increase to 12- to compare across a year). 

## Lean Architecture
1. The Database Tables (My Entities)
   1. **wallets**: id (Primary Key), name, balance
   2. **categories**: id (PK), name, budget_limit, wallet_id (Foreign Key)
   3. **purchases**: id (PK), amount, date, description, category_id (FK), subscription_id (can be null, defaults to null)
   4. **subscriptions**: id (PK), start_date, frequency (monthly, yearly, quarterly, weekly, etc)
2. The Core REST API Endpoints to Write
   1. GET /api/categories - Fetch all categories and their budgets.
   2. POST /api/purchases - Add a new expense and subtract it from the category budget.
   3. GET /api/subscription - Fetch all subscriptions and their data.