DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Credit_Card;
DROP TABLE IF EXISTS Subitem;
DROP TABLE IF EXISTS Income;
DROP TABLE IF EXISTS Expense;
DROP TABLE IF EXISTS Wallet;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Item;

CREATE TABLE Account (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(128) NOT NULL,
    salt varchar(128) NOT NULL,
    
    CONSTRAINT "pk_Account" PRIMARY KEY (id),
    CONSTRAINT "uc_Account_Name" UNIQUE (name),
    CONSTRAINT "uc_Account_Email" UNIQUE (email)
);

CREATE TABLE Wallet (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    wage numeric(10,2) NOT NULL,
    patrimony numeric(10,2) NOT NULL,
    saved numeric(10,2) NOT NULL,
    cash_value numeric(10,2) NOT NULL,
    account_id int NOT NULL,
    
    CONSTRAINT "pk_Wallet" PRIMARY KEY (id)
);

CREATE TABLE Item (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(512) NOT NULL,
    amount numeric(10,2) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    percentage numeric(5,2) NOT NULL,
    frequency varchar(128) NOT NULL,
    
    CONSTRAINT "pk_Item" PRIMARY KEY (id),
    CONSTRAINT "ck_Item_Frequency" CHECK (frequency IN ('MONTHLY', 'ANNUAL', 'ONCE'))
);

CREATE TABLE Subitem (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    item_id int NOT NULL,
    title varchar(255) NOT NULL,
    amount numeric(10,2) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    percentage numeric(5,2) NOT NULL,
    
    CONSTRAINT "pk_Subitem" PRIMARY KEY (id)
);

CREATE TABLE Income (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    item_id int NOT NULL,
    receipt_method varchar(255) NOT NULL,
    blocked boolean NOT NULL,
    
    CONSTRAINT "pk_Income" PRIMARY KEY (id)
);

CREATE TABLE Expense (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    item_id int NOT NULL,
    current_cash_value numeric(10,2) NOT NULL,
    payment_method varchar(255) NOT NULL,
    establishment varchar(255) NOT NULL,
    
    CONSTRAINT "pk_Expense" PRIMARY KEY (id),
    CONSTRAINT "ck_Expense_PaymentMethod" CHECK (payment_method IN (
        'CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BANK_SLIP', 'OTHER'
    ))

);

CREATE TABLE Credit_Card (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    invoice_closing integer NOT NULL,
    amount_limit numeric(10,2) NOT NULL,
    surname varchar(255) NOT NULL,
    wallet_id int NOT NULL,
    
    CONSTRAINT "pk_CreditCard" PRIMARY KEY (id)
);

CREATE TABLE Category (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    title varchar(128) NOT NULL,
    custom boolean NOT NULL,
    category_type varchar(255) NOT NULL,
    account_id int NOT NULL,
    
    CONSTRAINT "pk_Category" PRIMARY KEY (id),
    CONSTRAINT "ck_Category_CategoryType" CHECK (category_type IN ('INCOME', 'EXPENSE', 'BOTH'))
);

ALTER TABLE Wallet ADD CONSTRAINT "fk_Wallet_AccountId" FOREIGN KEY(account_id)
REFERENCES Account (id);

ALTER TABLE Subitem ADD CONSTRAINT "fk_Subitem_ItemId" FOREIGN KEY(item_id)
REFERENCES Item (id);

ALTER TABLE Income ADD CONSTRAINT "fk_Income_ItemId" FOREIGN KEY(item_id)
REFERENCES Item (id);

ALTER TABLE Expense ADD CONSTRAINT "fk_Expense_ItemId" FOREIGN KEY(item_id)
REFERENCES Item (id);

ALTER TABLE Credit_Card ADD CONSTRAINT "fk_CreditCard_WalletId" FOREIGN KEY(wallet_id)
REFERENCES Wallet (id);

ALTER TABLE Category ADD CONSTRAINT "fk_Category_AccountId" FOREIGN KEY(account_id)
REFERENCES Account (id);

