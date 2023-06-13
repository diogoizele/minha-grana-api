import { getRepository, Repository } from "typeorm";
import { Wallet } from "../../models/wallet";

export class WalletService {
  private walletRepository: Repository<Wallet>;

  constructor() {
    this.walletRepository = getRepository(Wallet);
  }

  public async createWallet(
    wage: number,
    patrimony: number,
    saved: number,
    cashValue: number,
    accountId: number
  ): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.wage = wage;
    wallet.patrimony = patrimony;
    wallet.saved = saved;
    wallet.cashValue = cashValue;
    wallet.accountId = accountId;

    return await this.walletRepository.save(wallet);
  }

  public async getWallets(): Promise<Wallet[]> {
    return await this.walletRepository.find();
  }

  public async getWallet(walletId: number): Promise<Wallet | null> {
    return await this.walletRepository.findOne({ where: { id: walletId } });
  }

  public async updateWallet(
    walletId: number,
    wage: number,
    patrimony: number,
    saved: number,
    cashValue: number,
    accountId: number
  ): Promise<Wallet | undefined> {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId } });
    if (wallet) {
      wallet.wage = wage;
      wallet.patrimony = patrimony;
      wallet.saved = saved;
      wallet.cashValue = cashValue;
      wallet.accountId = accountId;
      return await this.walletRepository.save(wallet);
    }
    return undefined;
  }

  public async deleteWallet(walletId: number): Promise<Wallet | undefined> {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId } });
    if (wallet) {
      await this.walletRepository.remove(wallet);
      return wallet;
    }
    return undefined;
  }
}
