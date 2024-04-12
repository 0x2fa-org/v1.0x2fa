import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import { Abi } from 'viem'

export const save = async (chainId: number, address: string, abi: Abi) => {
  const contractsDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'web',
    'src',
    'constants',
    'deployedContracts.ts'
  )

  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir)

  fs.writeFileSync(
    path.join(contractsDir),
    await prettier.format(
      `import { Abi } from "viem";
      \n\n
      interface Artifact {
        [key: string]: {
          address: \`0x\${string}\`;
          abi: Abi;
        };
      }
      \n\n
      export const Contracts: Artifact = {
        ${chainId}: {
          address: "${address}",
          abi: ${JSON.stringify(abi, null, 2)},
        }
      }`,
      {
        parser: 'typescript',
      }
    )
  )

  console.log(`💾 Contract artifact has been saved to ${contractsDir}`)
}
