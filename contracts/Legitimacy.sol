// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/ILegitimacy.sol";
import "./SQLHelpers.sol";

contract Legitimacy is RMRKNestableImpl, ILegitimacy {
    ITablelandTables private _tableland;
    uint256 private _metadataTableId;
    string private _tablePrefix = "legitimacy";
    string private _externalURL;
    string private _baseURIString;
    string private _metadataTable;

    constructor(
        string memory name,
        string memory symbol,
        string memory collectionMetadata,
        string memory tokenURI,
        InitData memory data,
        string memory externalURL,
        address registry
    ) RMRKNestableImpl(name, symbol, collectionMetadata, tokenURI, data) {
        require(registry != address(0), "Invalid registry address");
        /*
         * The Tableland address on your current chain
         */
        _tableland = ITablelandTables(registry);
        _externalURL = externalURL;
        _baseURIString = tokenURI;
        /*
         * Stores the unique ID for the newly created table.
         */
        _metadataTableId = _tableland.createTable(
            address(this),
            SQLHelpers.toCreateFromSchema(
                _tablePrefix,
                "id int, name text, year text, owner text,qType text"
            )
        );

        _metadataTable = string.concat(
            _tablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_metadataTableId)
        );
    }

    function mintToken(
        uint256 tokenId,
        string memory name,
        string memory qType
    ) external virtual override {
        //require(ownerOf(tokenId) == msg.sender, "Not owner"); remove this requirement for now because POC
        _tableland.runSQL(
            address(this),
            _metadataTableId,
            string.concat(
                "INSERT INTO ",
                _metadataTable,
                " (id, name, year,owner,qType) VALUES (",
                Strings.toString(tokenId),
                ", '",
                name,
                Strings.toHexString(msg.sender),
                qType,
                "')'"
            )
        );
    }

    function getTablelandURI(
        uint256 tokenId
    ) external view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );

        /*
         * SELECT json_object('id',id,'external_link',external_link,'x',x,'y',y)
         *  as meta FROM canvas_5_4 WHERE id=11
         */
        return
            string.concat(
                _baseURIString,
                "SELECT%20%json_object(%27id%27%,id,%name%27%,year,%owner%27%,qType)%20as%20meta%20FROM%20",
                _metadataTable,
                "%20WHERE%20id=",
                Strings.toString(tokenId),
                "&mode=list"
            );
    }
}
