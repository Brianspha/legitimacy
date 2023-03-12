const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MAX_QUALIFICATIONS, MAX_INSTITUTIONS } = require("./utils/index");
const { LocalTableland, getAccounts } = require("@tableland/local");
const lt = new LocalTableland({
  // use the silent option to avoid cluttering the test output
  silent: true,
});
const pricePerInstitution = ethers.utils.parseEther("1");
const pricePerQualification = ethers.utils.parseEther("0");

describe("Legitimacy", function () {
  let owner,
    user1,
    user2,
    user3,
    sqlHelpers,
    registry,
    legitimacy,
    primary,
    secondary,
    tertiary;

  before(async function () {
    this.timeout(1000000);
    lt.start();
    await lt.isReady();
    console.log(
      "================================================Assigning singers================================================"
    );
    [owner, user1, user2, user3] = await ethers.getSigners();
    console.log(
      "================================================Deploying SQLHelpers library================================================"
    );
    const SQLHelpersFactory = await ethers.getContractFactory("SQLHelpers");
    sqlHelpers = await SQLHelpersFactory.deploy();
    await sqlHelpers.deployed();
    console.log(
      `================================================SQLHelpers library deployed at ${sqlHelpers.address}================================================`
    );
    console.log(
      "================================================Deploying TablelandTables================================================"
    );
    const RegistryFactory = await ethers.getContractFactory("TablelandTables");
    registry = await RegistryFactory.deploy();
    await registry.deployed();
    await registry.connect(owner).initialize("http://localhost:8080/");
    console.log(
      `================================================TablelandTables deployed at ${registry.address}================================================`
    );
    console.log(
      "================================================Deploying Legitimacy contract================================================"
    );
    const Legitimacy = await ethers.getContractFactory("Legitimacy", {
      libraries: {
        SQLHelpers: sqlHelpers.address,
      },
    });
    legitimacy = await Legitimacy.deploy(
      "Legitimacy",
      "LGTY",
      "https://testnet.tableland.network/query?s=",
      "https://testnet.tableland.network/query?s=",
      {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await owner.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: MAX_INSTITUTIONS,
        pricePerMint: pricePerInstitution,
      },
      "not.implemented.com",
      registry.address
    );
    await legitimacy.deployed();
    console.log(
      `================================================Legitimacy deployed at ${legitimacy.address}================================================`
    );
    console.log(
      "================================================Deploying Primary contract================================================"
    );
    const Primary = await ethers.getContractFactory("Legitimacy", {
      libraries: {
        SQLHelpers: sqlHelpers.address,
      },
    });
    primary = await Primary.deploy(
      "Primary",
      "PRY",
      "https://testnet.tableland.network/query?s=",
      "https://testnet.tableland.network/query?s=",
      {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await owner.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: MAX_QUALIFICATIONS,
        pricePerMint: pricePerQualification,
      },
      "not.implemented.com",
      registry.address
    );
    await primary.deployed();
    console.log(
      `================================================Primary deployed at ${primary.address}================================================`
    );
    console.log(
      "================================================Deploying Primary contract================================================"
    );
    const Secondary = await ethers.getContractFactory("Legitimacy", {
      libraries: {
        SQLHelpers: sqlHelpers.address,
      },
    });
    secondary = await Primary.deploy(
      "Secondary",
      "SCY",
      "https://testnet.tableland.network/query?s=",
      "https://testnet.tableland.network/query?s=",
      {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await owner.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: MAX_QUALIFICATIONS,
        pricePerMint: pricePerQualification,
      },
      "not.implemented.com",
      registry.address
    );
    await secondary.deployed();
    console.log(
      `================================================Secondary deployed at ${secondary.address}================================================`
    );
    console.log(
      "================================================Deploying Tertiary contract================================================"
    );
    const Tertiary = await ethers.getContractFactory("Legitimacy", {
      libraries: {
        SQLHelpers: sqlHelpers.address,
      },
    });
    tertiary = await Tertiary.deploy(
      "Tertiary",
      "TRY",
      "https://testnet.tableland.network/query?s=",
      "https://testnet.tableland.network/query?s=",
      {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await owner.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: MAX_QUALIFICATIONS,
        pricePerMint: pricePerQualification,
      },
      "not.implemented.com",
      registry.address
    );
    await tertiary.deployed();
    console.log(
      `================================================Tertiary deployed at ${tertiary.address}================================================`
    );
  });
  it("Should check if the Legitimacy contract is deployed", async function () {
    expect(legitimacy.address).not.equal(null);
  });
  it("Should check if the Primary contract is deployed", async function () {
    expect(primary.address).not.equal(null);
  });
  it("Should check if the Secondary contract is deployed", async function () {
    expect(secondary.address).not.equal(null);
  });
  it("Should check if the Tertiary contract is deployed", async function () {
    expect(tertiary.address).not.equal(null);
  });
  it("Should mint a new token for representing the owner as parent user1", async () => {
    await legitimacy.connect(user1).mint(user1.address, 1, {
      value: pricePerInstitution,
    });
    expect(await legitimacy.ownerOf(1)).equal(user1.address);
  });
  it("Should add newly minted parent token metadata to Tableland for user1", async () => {
    await legitimacy.connect(user1).mintToken(1, "User 1", "Person");
    expect(await legitimacy.connect(user1).getTablelandURI(1)).not.equal("");
  });

  it("Should mint a new token for representing the owners Primary education", async () => {
    await primary.connect(user1).nestMint(legitimacy.address, 1, 1, {
      value: pricePerQualification,
    });
    expect(await primary.ownerOf(1)).equal(user1.address);
  });
  it("Should add newly minted Primary education token metadata to Tableland for user1", async () => {
    await primary.connect(user1).mintToken(1, "Primary Education", "Primary");
    expect(
      await primary.connect(user1).getTablelandURI(1)
    ).not.equal("");
  });
  it("Should mint a new token for representing the owners Secondary education", async () => {
    await secondary.connect(user1).nestMint(legitimacy.address, 1, 1, {
      value: pricePerQualification,
    });
    expect(await secondary.ownerOf(1)).equal(user1.address);
  });
  it("Should add newly minted Tertiary Education token metadata to Tableland for user1", async () => {
    await secondary
      .connect(user1)
      .mintToken(1, "Tertiary Education", "Tertiary");
    expect(await secondary.connect(user1).getTablelandURI(1)).not.equal("");
  });
});
