namespace mapGenerator {
    /**
     * Generate Perlin Noise Grid
     */
    //% blockId=generate_perlin_noise_grid
    //% block="generate a grid from width $width, height $height and $randomNumberGenerator"
    //% inlineInputMode=external
    export function generatePerlinNoiseGrid(width: number, height: number, randomNumberGenerator: () => number): number[][] {
        const simplexGenerator = libs.perlinNoise.makeSimplexNoise(randomNumberGenerator);
        const grid: number[][] = [];
        for (let x = 0; x < width; x++) {
            grid[x] = [];
            for (let y = 0; y < height; y++) {
                grid[x][y] = simplexGenerator.noise2D(x, y);
            }
        }

        return grid;
    }
}
