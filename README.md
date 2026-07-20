# CertiChain

## Project Structure

```
CERTICHAIN/            → Frontend (React + Vite)
├── src/
├── public/
├── index.html
├── vite.config.js
├── .env.development
├── .env.production
├── package.json
│
├── backend/        → Backend (Node.js + Express + MongoDB)
│   ├── admin/
│   ├── institute/
│   ├── student/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── blockchain/     → Smart contract (Solidity + Hardhat)
    ├── contracts/
    ├── scripts/
    ├── ignition/
    ├── test/
    ├── hardhat.config.ts
    ├── .env
    └── package.json
```

## Requirements

- Node.js + npm
- MongoDB
- MetaMask (browser extension)

## Install Dependencies

**Frontend**
```bash
cd CERTICHAIN
npm install
```
Installs: `react`, `react-dom`, `react-router-dom`, `axios`, `wagmi`, `viem`, `@wagmi/core`, `@tanstack/react-query`, `qrcode.react`, `react-icons`

Or install individually:
```bash
npm install react react-dom react-router-dom axios wagmi viem @wagmi/core @tanstack/react-query qrcode.react react-icons
```

**Backend**
```bash
cd CERTICHAIN/backend
npm install
```
Installs: `express`, `mongoose`, `mongodb`, `jsonwebtoken`, `bcrypt`, `cors`, `dotenv` (+ dev: `nodemon`)

Or install individually:
```bash
npm install express mongoose mongodb jsonwebtoken bcrypt cors dotenv
npm install --save-dev nodemon
```

**Blockchain**
```bash
cd CERTICHAIN/blockchain
npm install
```
Installs: `@openzeppelin/contracts`, `@openzeppelin/hardhat-upgrades`, `dotenv` (+ dev: `hardhat`, `ethers`, `@nomicfoundation/hardhat-toolbox-mocha-ethers`, `@nomicfoundation/hardhat-ethers`, `@nomicfoundation/hardhat-ignition`, `@nomicfoundation/hardhat-verify`, `@nomicfoundation/hardhat-network-helpers`, `typescript`, `mocha`, `chai`, `@types/node`, `@types/mocha`, `@types/chai`, `@types/chai-as-promised`, `forge-std`)

Or install individually:
```bash
npm install @openzeppelin/contracts @openzeppelin/hardhat-upgrades dotenv
npm install --save-dev hardhat ethers @nomicfoundation/hardhat-toolbox-mocha-ethers @nomicfoundation/hardhat-ethers @nomicfoundation/hardhat-ignition @nomicfoundation/hardhat-verify @nomicfoundation/hardhat-network-helpers typescript mocha chai @types/node @types/mocha @types/chai @types/chai-as-promised forge-std@github:foundry-rs/forge-std#v1.9.4
```

## Environment Variables

Add these files with the required variables:

- `.env.development` (frontend)
- `backend/.env`
- `blockchain/.env`

## Hardhat Setup (Blockchain)

### 1. `.env` file — `blockchain/.env`
```
SEPOLIA_RPC_URL=<your RPC URL, e.g. from Alchemy/Infura>
PRIVATE_KEY=<deployer wallet private key>
ETHERSCAN_API_KEY=<your Etherscan API key>
```
- `SEPOLIA_RPC_URL` — endpoint used to connect to the Sepolia testnet.
- `PRIVATE_KEY` — private key of the wallet that deploys the contract (must hold Sepolia test ETH for gas).
- `ETHERSCAN_API_KEY` — used to verify the deployed contract on Etherscan.

### 2. Config file — `blockchain/hardhat.config.ts`

### 3. Deploy script — `blockchain/scripts/deployAcademicCertificate.ts`
- Connects to the network defined in `hardhat.config.ts`.
- Deploys `AcademicCertificate` with the deployer's address as the contract owner.
- Logs the deployed contract address to the terminal — copy this address into `src/config/contract.js` on the frontend.

### 4. Compile, deploy, and verify
```bash
cd CERTICHAIN/blockchain
npx hardhat compile
npx hardhat run scripts/deployAcademicCertificate.ts --network sepolia
npx hardhat verify --network sepolia <deployed_contract_address> <owner_address>
```

---

## How to Run

**1. Backend**
```bash
cd CERTICHAIN/backend
npm run dev
```

**2. Frontend**
```bash
cd CERTICHAIN
npm run dev
```

**3. Smart contract** — see [Hardhat Setup](#hardhat-setup-blockchain) above for compile/deploy/verify commands.

Start MongoDB first, then backend, then frontend.

## Other Commands

```bash
npm create vite@latest  #to setup react vite project
```