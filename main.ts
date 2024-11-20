let mySprite = sprites.create(assets.image`player`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
let tileMapGrid = mapGenerator.generateTileMap(
10,
10,
[mapGenerator.createTileMapping(1, sprites.dungeon.floorDark2, false)]
)
tiles.setCurrentTilemap(tileMapGrid)
