import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepository {
  title: string;
  value: number;
  type: "income" | "outcome";
}
enum Type {
  INCOME = 'income',
  OUTCOME = 'outcome',
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }
  public getBalance(): Balance {  
    const {income,outcome} = this.transactions.reduce((resultado,transaction) => {
      if (transaction.type == 'income') { resultado.income += transaction.value } 
      if (transaction.type == 'outcome') { resultado.outcome += transaction.value }
      return resultado;
    },{
      income: 0,
      outcome: 0,
      total: 0
    });
    const total = income - outcome; 
    return {income, outcome, total };
  }

  public create({title, value, type}: CreateRepository): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;    
  }
}

export default TransactionsRepository;
