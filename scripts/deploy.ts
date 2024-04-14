import { task } from 'hardhat/config'
import { save } from './utils/save'
import { verify } from './utils/verify'
import {ethers} from 'ethers'
import { parseEther } from 'viem'

task('deploy', '📰 Deploys a contract, saves the artifact and verifies it.')
  .addParam('contract', 'Name of the contract to deploy.', 'TOTP')
  .addFlag('save', 'Flag to indicate whether to save the contract or not')
  .addFlag('verify', 'Flag to indicate whether to verify the contract or not')
  .setAction(async (args, { viem, run, network }) => {
    const Contract = await viem.deployContract(args.contract, [])
    console.log(
      `📰 Contract ${Contract.address} deployed to ${network.name} successfully!`
    )

    const chainId = (await viem.getPublicClient()).chain.id

    args.save && (await save(chainId, Contract.address, Contract.abi))
    args.verify && (await verify(run, Contract.address, []))
  })
