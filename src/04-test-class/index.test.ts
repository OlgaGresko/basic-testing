import { getBankAccount, BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);

    expect(newAccount).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);
    const withdrawAmount = 2000;

    expect(() => newAccount.withdraw(withdrawAmount)).toThrowError(new InsufficientFundsError(newAccount.getBalance()));
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);
    const transferInitialBalance = 100;
    const transferAccount = getBankAccount(transferInitialBalance);
    const transferAmount = 2000;

    expect(() => newAccount.transfer(transferAmount, transferAccount)).toThrowError(new InsufficientFundsError(newAccount.getBalance()));
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);
    const transferAmount = 100;

    expect(() => newAccount.transfer(transferAmount, newAccount)).toThrowError(new TransferFailedError());
  });

  test('should deposit money', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);
    const depositAmount = 100;
    const newBalance = initialBalance + depositAmount;

    newAccount.deposit(depositAmount);

    expect(newAccount.getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);
    const withdrawAmount = 100;
    const newBalance = initialBalance - withdrawAmount;

    newAccount.withdraw(withdrawAmount);

    expect(newAccount.getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);
    const transferInitialBalance = 100;
    const transferAccount = getBankAccount(transferInitialBalance);
    const transferAmount = 500;
    const newBalance = initialBalance - transferAmount;
    const newTranferBalance = transferInitialBalance + transferAmount;

    newAccount.transfer(transferAmount, transferAccount);

    expect(newAccount.getBalance()).toBe(newBalance);
    expect(transferAccount.getBalance()).toBe(newTranferBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);

    const balance = await newAccount.fetchBalance();
    const requestFailed = balance === null;

    if (!requestFailed) {
      expect(balance).not.toBeNull(); 
      expect(typeof balance).toBe('number');
    };
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);

    jest.spyOn(newAccount, 'fetchBalance').mockResolvedValue(2000);
    await newAccount.synchronizeBalance();

    expect(newAccount.getBalance()).toBe(2000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1500;
    const newAccount = getBankAccount(initialBalance);

    jest.spyOn(newAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(newAccount.synchronizeBalance()).rejects.toThrowError(new SynchronizationFailedError());
  });
});
