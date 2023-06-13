import { EntityRepository, Repository } from "typeorm";
import { Wallet } from "../models/wallet";

@EntityRepository(Wallet)
class WalletRepository extends Repository<Wallet> {
}

export default WalletRepository;
