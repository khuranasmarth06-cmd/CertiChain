# CertiChain — User Guide

CertiChain is a website where academic certificates are issued and checked using blockchain technology, so anyone can confirm a certificate is real without calling the school or college.

This guide is written for everyday users — no technical or blockchain knowledge needed. It works the same way whether you're on a **phone, tablet, or computer**; the site automatically adjusts to your screen size.

---

## 1. Who is this website for?

CertiChain has three types of users:

| I am a... | I use CertiChain to... |
|---|---|
| 🎓 **Student** | View and share the certificates issued to me |
| 🏫 **Institute** (school/college/university) | Issue certificates to students |
| 🏢 **Company / Verifier** | Check if a certificate someone gave me is genuine |

Pick the section below that matches you.

---

## 2. Getting to the website

1. Open any browser (Chrome, Safari, Edge, Firefox) on your phone or computer.
2. Go to the website link given to you.
3. On mobile, if the menu doesn't fit on screen, tap the **☰ (menu)** icon at the top-right to open the navigation menu. On desktop, the menu links are visible at the top of the page.
4. There's a **light/dark mode switch** (a small sun/moon icon) in the top menu — tap it if you prefer a darker or lighter screen.

---

## 3. Anyone: Verifying a Certificate

You don't need to log in to check if a certificate is genuine.

1. Click/tap **"Verify a certificate"** on the home page, or go to the **Verify** page from the menu.
2. Enter the **Token ID** (the certificate's unique number, usually given to you by the certificate holder or found on the certificate/QR code).
3. Tap **Verify**.
4. The result will show:
   - Student name, course, and grade
   - Date issued
   - **Status**: Valid ✅, Revoked ❌, or Expired ⏰
5. If you scan a **QR code** on a printed or shared certificate, it will take you straight to this verification result automatically.

> 💡 Tip: If nothing shows up, double-check the Token ID — a wrong or missing ID will say "not found."

---

## 4. Setting Up MetaMask (required before you sign up)

Both **Students** and **Institutes** need a **MetaMask wallet** connected before they can sign up — the site uses your wallet address as your unique ID and digital signature, instead of an email. You only need to do this once per device.

> Don't have MetaMask yet? It's a free app that stores a secure digital identity for you. Install it first using the steps below, then come back to sign up.

### On a laptop/desktop (Chrome, Edge, Brave, or Firefox)
1. Go to **metamask.io** and click **Download**, or search your browser's extension/add-on store for "MetaMask" and add it.
2. Once installed, click the **MetaMask fox icon** in your browser's toolbar (top-right corner).
3. Click **Create a new wallet**.
4. Set a strong password for this device.
5. MetaMask will show you a **Secret Recovery Phrase** (12 words).
   - **Write these words down on paper and keep them safe.** Anyone with this phrase can access your wallet — never share it, type it into a website, or send it to anyone, including "support staff."
   - Confirm the phrase when asked, and finish setup.
6. Your wallet is now ready. Keep this browser extension installed — you'll use it every time you sign up or log in on this computer.

### On a mobile phone (Android or iPhone)
1. Open the **App Store** (iPhone) or **Play Store** (Android).
2. Search for **"MetaMask"** and install the official app by *MetaMask / Consensys*.
3. Open the app and tap **Create a new wallet**.
4. Set a password/PIN for the app.
5. You'll be shown a **Secret Recovery Phrase** (12 words).
   - **Write these words down and store them somewhere safe and offline.** Never share this phrase with anyone or enter it on any website.
   - Confirm the phrase to finish setup.
6. Your mobile wallet is ready.

**To connect your mobile wallet to the CertiChain website:**
- Open the CertiChain site using the **browser built into the MetaMask app** (MetaMask app → menu → Browser), and type/paste the website address there. This lets MetaMask link directly to the page.
- Alternatively, if you open CertiChain in your regular phone browser, tap **Connect Wallet** on the site and choose the option to connect via **WalletConnect/QR code**, then scan the code with the MetaMask app if prompted.

> ⚠️ Keep your Secret Recovery Phrase private and offline forever. CertiChain, MetaMask, or your institute will never ask you for it. If someone asks for it, it's a scam.

---

## 5. Students: Signing Up and Viewing Your Certificates

### Sign up (first time only)
1. Make sure MetaMask is installed and set up (see Section 4).
2. From the menu, go to **Student → Sign Up**.
3. Enter your **Full Name**.
4. Tap/click **Connect Wallet** and approve the connection request that pops up in MetaMask.
   - Your wallet address will now appear automatically in the form — you don't need to type it.
5. Create a **password** for logging into the site later and confirm it.
6. Submit the form. You're now registered.

### Log in
1. Go to **Student → Login**.
2. Enter your registered name/wallet details and password as prompted by the login form.

### View your certificates
1. Once logged in, you'll land on your **Student Dashboard**.
2. All certificates issued to you by institutes will be listed here as cards, showing the course, grade, and status.
3. Tap a certificate to see full details, or use the **Verify** page and enter its Token ID to generate a shareable QR code/link for employers.

### Logging out
- Tap the **Logout** button in the top corner of your dashboard.

---

## 6. Institutes: Signing Up and Issuing Certificates

Institutes also need MetaMask connected before signing up (see Section 4) — this wallet becomes your institute's official digital signature, proving that any certificate you issue really came from you.

### Sign up
1. Make sure MetaMask is installed and set up (see Section 4).
2. From the menu, go to **Institute → Sign Up**.
3. Enter your **Institute Name**.
4. Tap/click **Connect Wallet** and approve the connection request in MetaMask.
   - Your wallet address fills in automatically — this becomes your institute's official on-chain identity.
5. Create a **password** and confirm it.
6. Submit. Note: your institute account will need **approval from the platform admin** before you can start issuing certificates.

### Log in
1. Once approved, go to **Institute → Login** and sign in.

### Connect your wallet each session
1. On your **Institute Dashboard**, tap **Connect Wallet** (MetaMask must be installed and unlocked).
2. Approve the connection when MetaMask prompts you. This same wallet is what "signs" every certificate you issue, so always use the same device/wallet you signed up with, unless your admin has authorized a new one.

### Issue a certificate
1. On the dashboard, fill in the **student's wallet address, name, course, and grade**.
2. Tap **Issue Certificate**.
3. Confirm the transaction in your wallet app when prompted.
4. Once confirmed, the certificate appears in your **Issued Certificates** list — it's now permanently recorded and can be verified by anyone using its Token ID.

### Managing certificates
- From the dashboard you can also **revoke** or **expire** a certificate you previously issued (for example, if it was issued by mistake).

---

## 7. Companies / Employers: Checking a Candidate's Certificate

You do **not** need an account to verify a certificate — just use the **Verify** page as described in Section 3.

If you'd like a saved account to keep a history of checks, you can:
1. Go to **Company → Sign Up**, fill in your details.
2. Go to **Company → Login** to sign in going forward.

---

## 8. Using it on Mobile vs Desktop

| Feature | Mobile | Desktop |
|---|---|---|
| Menu | Tap ☰ to open the sliding menu | Menu links shown across the top |
| Forms & dashboards | Stack vertically, scroll to see all fields | Shown side-by-side for a wider view |
| QR codes | Great for scanning certificates directly with your camera | View or download the QR code image |
| Wallet connection | Use a mobile wallet app (e.g. MetaMask mobile) | Use a browser wallet extension |

No matter the device, all the same features are available — just laid out to fit your screen.

---
