namespace mapGenerator {
    /**
     * Generate Perlin Noise Grid
     * @param number width Width of grid
     * @param number height Height of grid
     * @param () => number randomNumberGenerator body code to execute
     */
    //% blockId=generate_perlin_noise_grid
    //% block="generate a grid from width $width and height $height"
    //% blockSetVariable=tileMapGrid
    export function generatePerlinNoiseGrid(width: number, height: number, randomNumberGenerator: () => number): number[][] {
        const simplexGenerator = libs.perlinNoise.makeSimplexNoise(randomNumberGenerator);
        const grid: number[][] = [];
        for (let x = 0; x < width; x++) {
            grid[x] = [];
            for (let y = 0; y < height; y++) {
                const value = simplexGenerator.noise2D(x, y);
                grid[x][y] = Math.floor(value * 10);
            }
        }

        return grid;
    }

    /**
     * Generate Tile Map
     * @param number width Width of tilemap
     * @param number height Height of tilemap
     * @param () => number randomNumberGenerator body code to execute
     */
    //% blockId=generate_tile_map
    //% block="generate a tilemap of width $width and height $height with Tile Mappings $tileMappings || and a seed $seed"
    //% blockSetVariable=tileMapGrid
    export function generateTileMap(width: number, height: number, tileMappings: TileMapping[] = [], seed: number = null): tiles.TileMapData {
        const mapGenerator = new MapGenerator(width, height, tileMappings, seed);
        return mapGenerator.generate();
    }

    /**
     * Create Tile Mappping
     * @param number value
     * @param Image tileToMap
     * @param boolean isWall
     */
    //% blockId=create_tile_mapping
    //% block="map tile image $tileToMap to value $value || Is this mapping a wall $isWall?"
    export function createTileMapping(value: number, tileToMap: Image, isWall: boolean = false) : TileMapping
    {
        return new TileMapping(value, tileToMap, isWall);
    }

    export class TileMapping {
        public tile: Image;
        public value: number;
        public isWall: boolean = false;

        constructor(value: number, tileToMap: Image, isWall:boolean = false){
            this.tile = tileToMap;
            this.value = value;
            this.isWall = isWall;
        }
    }

    export class MapGenerator {
        public tileMappings: TileMapping[];
        public tileset: Image[];
        public width: number;
        public height: number; 
        public seed: number;
        public grid: number[][];

        constructor(width: number, height: number, tileMappings: TileMapping[] = [], seed: number = null){
            this.seed = seed == null ? Math.random() * 100 : seed;
            this.width = width;
            this.height = height;
            this.tileMappings = tileMappings;
            this.tileset = tileMappings.map(tm=>tm.tile);
            this.grid = generatePerlinNoiseGrid(width, height, () => {
                const rng = new Math.FastRandom(this.seed);
                return rng.randomRange(0, 1);
            });
        }

        public generate(): tiles.TileMapData{
            const tileMap = tiles.createTilemap(this.generateBuffer(), img``, this.tileset, TileScale.Sixteen);
            return tileMap;
        }

        private generateBuffer(): Buffer {
            let buffer = '';
            for (let x = 0; x < this.grid.length; x++) {
                for (let y = 0; y < this.grid[x].length; y++) {
                    buffer += ` ${this.grid[x][y]}`;
                }
                buffer += '\n';
            }

            return Buffer.fromUTF8(buffer);
        }
    }
}
