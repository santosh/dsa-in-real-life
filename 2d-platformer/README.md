# covid-fighter

covid fighter is a 2d platformer where the player has to dodge the virus

## Requirements

- Spritesheet, Assets
- Player, Controls
- Virus oscillating up, then down, indefinately
- Collision detection

## Up for grabs

- [ ] Add health variable to the player and make certain 
- [ ] From optimization perspective, we can load all the images in memory at once, then use spritesheets.
- [ ] From optimization perspective, currently we are doing collision detection for all the germs, per frame. This might not scale well if we have 100s and 1000s of germs. A good approach would be to enable collision detection of germs only if player is in certain pixel range to germs.

## Credits

- Background image is by [IMX](https://gamedev.stackexchange.com/q/54542)
- Germ image is by [opentextbc](https://opentextbc.ca/abealf2/chapter/chapter-7/)
