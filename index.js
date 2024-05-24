// index.js

const fs = require('fs');

// Загрузка данных из JSON файла
const transactions = JSON.parse(fs.readFileSync('transaction.json', 'utf8'));

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions;
    }

    // Метод для добавления новой транзакции
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    // Метод для получения всех транзакций
    getAllTransactions() {
        return this.transactions;
    }

    // Метод для получения уникальных типов транзакций
    getUniqueTransactionTypes() {
        const types = this.transactions.map(t => t.transaction_type);
        return [...new Set(types)];
    }

    // Метод для расчета общей суммы всех транзакций
    calculateTotalAmount() {
        return this.transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
    }

    // Метод для получения транзакций по типу
    getTransactionsByType(type) {
        return this.transactions.filter(t => t.transaction_type === type);
    }

    // Метод для получения транзакций в заданном диапазоне дат
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(t => {
            const date = new Date(t.transaction_date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
    }

    // Метод для получения транзакций по имени продавца
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(t => t.merchant_name === merchantName);
    }

    // Метод для расчета средней суммы транзакций
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    // Метод для получения транзакций в заданном диапазоне сумм
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
    }

    // Метод для расчета общей суммы дебетовых транзакций
    calculateTotalDebitAmount() {
        return this.transactions
            .filter(t => t.transaction_type === 'debit')
            .reduce((sum, t) => sum + t.transaction_amount, 0);
    }

    // Метод для нахождения месяца с наибольшим количеством транзакций
    findMostTransactionsMonth() {
        const months = this.transactions.map(t => new Date(t.transaction_date).getMonth() + 1);
        const count = {};
        months.forEach(month => count[month] = (count[month] || 0) + 1);
        return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    }

    // Метод для нахождения месяца с наибольшим количеством дебетовых транзакций
    findMostDebitTransactionMonth() {
        const months = this.transactions
            .filter(t => t.transaction_type === 'debit')
            .map(t => new Date(t.transaction_date).getMonth() + 1);
        const count = {};
        months.forEach(month => count[month] = (count[month] || 0) + 1);
        return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    }

    // Метод для получения типа транзакций с наибольшим количеством
    mostTransactionTypes() {
        const debitCount = this.transactions.filter(t => t.transaction_type === 'debit').length;
        const creditCount = this.transactions.filter(t => t.transaction_type === 'credit').length;
        if (debitCount > creditCount) return 'debit';
        if (creditCount > debitCount) return 'credit';
        return 'equal';
    }

    // Метод для получения транзакций, совершенных до указанной даты
    getTransactionsBeforeDate(date) {
        return this.transactions.filter(t => new Date(t.transaction_date) < new Date(date));
    }

    // Метод для поиска транзакции по идентификатору
    findTransactionById(id) {
        return this.transactions.find(t => t.transaction_id === id);
    }

    // Метод для создания массива описаний транзакций
    mapTransactionDescriptions() {
        return this.transactions.map(t => t.transaction_description);
    }
}

// Пример использования класса
const analyzer = new TransactionAnalyzer(transactions);

console.log("Все транзакции:", analyzer.getAllTransactions());
console.log("Уникальные типы транзакций:", analyzer.getUniqueTransactionTypes());
console.log("Общая сумма всех транзакций:", analyzer.calculateTotalAmount());
console.log("Средняя сумма транзакций:", analyzer.calculateAverageTransactionAmount());
console.log("Транзакции по типу 'debit':", analyzer.getTransactionsByType('debit'));
console.log("Транзакции по типу 'credit':", analyzer.getTransactionsByType('credit'));
console.log("Транзакции в диапазоне дат:", analyzer.getTransactionsInDateRange('2019-01-01', '2019-12-31'));
console.log("Транзакции по продавцу 'SuperMart':", analyzer.getTransactionsByMerchant('SuperMart'));
console.log("Транзакции в диапазоне сумм 50-100:", analyzer.getTransactionsByAmountRange(50, 100));
console.log("Общая сумма дебетовых транзакций:", analyzer.calculateTotalDebitAmount());
console.log("Месяц с наибольшим количеством транзакций:", analyzer.findMostTransactionsMonth());
console.log("Месяц с наибольшим количеством дебетовых транзакций:", analyzer.findMostDebitTransactionMonth());
console.log("Тип транзакций с наибольшим количеством:", analyzer.mostTransactionTypes());
console.log("Транзакции до даты '2019-06-01':", analyzer.getTransactionsBeforeDate('2019-06-01'));
console.log("Транзакция с идентификатором '3':", analyzer.findTransactionById('3'));
console.log("Описание транзакций:", analyzer.mapTransactionDescriptions());