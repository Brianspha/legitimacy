// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IEducationHistory.sol";
import "./Legitimacy.sol";

/// @title EducationHistory
/// @author brianspha
/// @notice This contract implements the IEducationHistory
/// @dev This is for learning purposes the code is not written well due to complexity
contract EducationHistory is
    IEducationHistory,
    OwnableUpgradeable,
    PausableUpgradeable
{
    using Counters for Counters.Counter;
    Counters.Counter private prePrimaryIds;
    Counters.Counter private primaryIds;
    Counters.Counter private secondaryIds;
    Counters.Counter private tetiaryIds;
    Counters.Counter private miscIds;
    address public immutable registry;
    Legitimacy public person;
    Legitimacy public prePrimary;
    Legitimacy public primary;
    Legitimacy public secondary;
    Legitimacy public tetiary;
    Legitimacy public misc;
    uint256 public immutable personID;
    error ZeroAddress();
    modifier personMinted() {
        require(person.ownerOf(personID) == msg.sender, "Person not minted");
        _;
    }

    constructor(address registryAddress) initializer {
        if (registryAddress == address(0)) {
            revert ZeroAddress();
        }
        registry = registryAddress;
        personID = 1;
        __Ownable_init();
        __Pausable_init();
        initialiseHistory();
    }

    function initialiseHistory() internal virtual {
        person = new Legitimacy(
            "Person",
            "PRSN",
            "https://testnet.tableland.network/query?s=",
            "https://testnet.tableland.network/query?s=",
            IRMRKInitData.InitData(address(0), true, msg.sender, 10, 10000, 0),
            "not.implemented.com",
            registry
        );
        prePrimary = new Legitimacy(
            "PrePrimary",
            "PreP",
            "https://testnet.tableland.network/query?s=",
            "https://testnet.tableland.network/query?s=",
            IRMRKInitData.InitData(address(0), true, msg.sender, 10, 10000, 0),
            "not.implemented.com",
            registry
        );
        primary = new Legitimacy(
            "Primary",
            "PrP",
            "https://testnet.tableland.network/query?s=",
            "https://testnet.tableland.network/query?s=",
            IRMRKInitData.InitData(address(0), true, msg.sender, 10, 10000, 0),
            "not.implemented.com",
            registry
        );
        secondary = new Legitimacy(
            "Seconadry",
            "SCY",
            "https://testnet.tableland.network/query?s=",
            "https://testnet.tableland.network/query?s=",
            IRMRKInitData.InitData(address(0), true, msg.sender, 10, 10000, 0),
            "not.implemented.com",
            registry
        );
        tetiary = new Legitimacy(
            "Tetiary",
            "TTY",
            "https://testnet.tableland.network/query?s=",
            "https://testnet.tableland.network/query?s=",
            IRMRKInitData.InitData(address(0), true, msg.sender, 10, 10000, 0),
            "not.implemented.com",
            registry
        );
        misc = new Legitimacy(
            "Misc",
            "Misc",
            "https://testnet.tableland.network/query?s=",
            "https://testnet.tableland.network/query?s=",
            IRMRKInitData.InitData(address(0), true, msg.sender, 10, 10000, 0),
            "not.implemented.com",
            registry
        );
        person.mint{value: 0}(msg.sender, personID);
        require(person.ownerOf(personID) == msg.sender, "Person not minted");
        person.mintToken(personID, Strings.toHexString(msg.sender), "Person");
        prePrimaryIds.increment();
        primaryIds.increment();
        secondaryIds.increment();
        tetiaryIds.increment();
        miscIds.increment();
        prePrimary.nestMint{value: 0}(
            address(person),
            1,
            prePrimaryIds.current()
        );
    
    }

    function addToPrePrimary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) external virtual override onlyOwner personMinted {
        prePrimary.nestMint{value: 0}(
            address(person),
            1,
            prePrimaryIds.current()
        );
     
    }

    function addToPrimary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) public virtual override onlyOwner personMinted {}

    function addToSecondary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) public virtual override onlyOwner personMinted {}

    function addToTetiary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) public virtual override onlyOwner personMinted {}

    function addToMisc(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) public virtual override onlyOwner personMinted {}
}
