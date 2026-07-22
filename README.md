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

### `backend/.env`
```
MONGO_URI=<your MongoDB connection string, e.g. mongodb://localhost:27017/certichain>
JWT_SECRET=<random secret string used to sign auth tokens>
ADMIN_EMAIL=<email used to log into the admin dashboard>
ADMIN_PASSWORD=<password used to log into the admin dashboard>
PORT=<port the backend server listens on, e.g. 5000>
```
- `MONGO_URI` — connection string for your MongoDB instance (local or Atlas).
- `JWT_SECRET` — used to sign and verify JSON Web Tokens for authentication.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for the seeded/hardcoded admin account.
- `PORT` — port number the Express server runs on.

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

## Future Improvements

- **OCR-based certificate data extraction** — instead of manually typing certificate fields (student name, course, grade, date, etc.), use OCR (e.g. Tesseract.js, Google Vision API, or AWS Textract) to auto-read and pre-fill fields directly from an uploaded PDF/scanned certificate. Admin/institute would just verify and confirm rather than type everything.
- **Automated KYC-style institute verification** — institutes upload registration/accreditation documents at signup, and the platform auto-verifies them (via a document-verification API, or rule-based checks like matching registration number, government ID format, or domain/email verification) to auto-approve or auto-reject, removing manual admin review for the common cases. Manual review would remain as a fallback for edge cases or documents that fail automated checks.
- **Improved Role-based access control** — support multiple admin roles (e.g. super-admin vs reviewer) with different permission levels, instead of a single hardcoded admin account.
- **Certificate revocation reason & appeal flow** — let admin attach a reason when revoking/rejecting, and let institutes respond or re-submit corrected documents.

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