// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VideoNFTMarketplace is ERC721URIStorage, Ownable {

    uint256 private _nextTokenId = 1; // Start token IDs from 1
    uint256 private _nextItemId = 1;  // Start item IDs from 1

    struct NFTItem {
        uint256 videoTokenId; // Always minted
        uint256 extraTokenId; // Optional extra NFT (0 if not minted)
        uint256 price;        // Price in wei
        address owner;        // Current owner
    }

    // Mapping from item ID to NFT item details.
    mapping(uint256 => NFTItem) public items;

    event NFTMinted(
        uint256 indexed itemId,
        uint256 videoTokenId,
        uint256 extraTokenId,
        uint256 price
    );

    event NFTSold(uint256 indexed itemId, address buyer, uint256 price);

    constructor() ERC721("VideoNFT", "VNFT") Ownable(msg.sender) {}

    /**
     * @notice Mint a video NFT (and an extra NFT if extraURI is provided).
     * @param videoTokenURI The token URI for the video NFT.
     * @param extraTokenURI The token URI for the extra NFT; pass an empty string if none.
     * @param price The sale price in wei.
     * @return itemId The ID for this minted NFT item.
     */
    function mintVideoNFT(
        string memory videoTokenURI,
        string memory extraTokenURI,
        uint256 price
    ) external returns (uint256 itemId) {
        require(price > 0, "Price must be greater than 0");

        itemId = _nextItemId++;
        
        // Mint the video NFT to the caller instead of owner
        uint256 videoTokenId = _nextTokenId++;
        _mint(msg.sender, videoTokenId);
        _setTokenURI(videoTokenId, videoTokenURI);

        uint256 extraTokenId = 0;
        // If an extra URI is provided, mint the extra NFT
        if (bytes(extraTokenURI).length > 0) {
            extraTokenId = _nextTokenId++;
            _mint(msg.sender, extraTokenId);
            _setTokenURI(extraTokenId, extraTokenURI);
        }

        // Save the item details with msg.sender as owner
        items[itemId] = NFTItem({
            videoTokenId: videoTokenId,
            extraTokenId: extraTokenId,
            price: price,
            owner: msg.sender
        });

        emit NFTMinted(itemId, videoTokenId, extraTokenId, price);
    }

    /**
     * @notice Buy the NFT item by sending at least the specified price in ETH.
     * @param itemId The ID of the NFT item to buy.
     */
    function buyNFT(uint256 itemId) external payable {
        NFTItem storage item = items[itemId];
        require(item.owner != address(0), "Item does not exist");
        require(msg.value >= item.price, "Insufficient ETH sent");

        address seller = item.owner;
        require(seller != msg.sender, "Cannot buy your own NFT");

        // Transfer the video NFT to the buyer.
        _transfer(seller, msg.sender, item.videoTokenId);

        // If an extra NFT was minted, transfer it as well.
        if (item.extraTokenId != 0) {
            _transfer(seller, msg.sender, item.extraTokenId);
        }

        // Update ownership
        item.owner = msg.sender;

        emit NFTSold(itemId, msg.sender, item.price);

        // Send the ETH to the seller.
        (bool success, ) = seller.call{value: msg.value}("");
        require(success, "ETH transfer failed");
    }
}