// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/// @title IEducationHistory
/// @author brianspha
/// @notice Interface contains functions that manage a persons education history
/// @dev More function can be added as per requirement im just making assumptions
interface IEducationHistory {
    function addToPrePrimary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) external;

    function addToPrimary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) external;

    function addToSecondary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) external;

    function addToTetiary(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) external;

    function addToMisc(
        uint256 tokenId,
        string calldata name,
        string calldata qType
    ) external;
}
