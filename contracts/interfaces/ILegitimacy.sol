// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/// @title ILegitimacy
/// @author brianspha
/// @notice This interface contains function signatures to be implemented by any child contract
interface ILegitimacy {
    /// @notice Function allows for the miniting of a new token to the Tableland DB
    /// @dev We could use bytes instead of strings here but eh we can optimise later
    /// @param tokenId The token id already minted
    /// @param tokenId The token id already minted

    function mintToken(
        uint256 tokenId,
        string memory name,
        string memory qType
    ) external;

    /// @notice Function allows for the fetching of the SQL statement where the URL is contained
    /// @dev WIP
    /// @param tokenId The token id already minted
    function getTablelandURI(
        uint256 tokenId
    ) external view returns (string memory);
}
