import { getRepository, FindOneOptions } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Wallet } from "../../models/wallet";

class WalletService {
  private walletRepository = getRepository(Wallet);

  async createWallet(walletData: Omit<Wallet, "id">): Promise<Wallet> {
    const newWallet: Wallet = {
      id: uuidv4(),
      ...walletData,
    };

    const newWalletSaved = await this.walletRepository.save(newWallet);

    return newWalletSaved;
  }

  async updateWallet(id: string, walletData: Partial<Wallet>): Promise<Wallet | undefined> {
    const wallet = await this.walletRepository.findOne({where: {id}});

    if (wallet) {
      wallet.salary = walletData.salary || wallet.salary;
      wallet.cash = walletData.cash || wallet.cash;
      wallet.assets = walletData.assets || wallet.assets;
      wallet.saved = walletData.saved || wallet.saved;

      await this.walletRepository.save(wallet);
    }

    return wallet || undefined;
  }

  async getWallets(): Promise<Wallet[]> {
    const wallets = await this.walletRepository.find();

    return wallets;
  }

  async getWalletById(id: string): Promise<Wallet | undefined> {
    const options: FindOneOptions<Wallet> = { where: { id } };
    const wallet = await this.walletRepository.findOne(options);

    return wallet || undefined;
  }
}

export default new WalletService();
