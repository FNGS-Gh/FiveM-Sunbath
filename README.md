# FiveM-Sunbath
`by Ghost @ FNGS / 2026` → [Author's GitHub](https://github.com/GhostQck) / [Publish Github](https://github.com/FNGS-Gh)

This standalone script precisely calculates whether the selected entity (via any of its bones) is exposed to the Sun rays directly. It also implements a neat formula to calculate the Sun precise vector on the sky map.

*More details can be found below under the* **"2. Description"** *section ▼*

## 1. Installation
❗️ *This project is published under the MIT License. Upon using it, please make sure to keep the credits and apply the same type of licensing.*

---

###
If you don't care about the code readability and you just want to deploy the resource straight away, you can delete everything except of the following files and folders (and their content respectively):

```
fxmanifest.lua
config.json
dist/
```

The `config.json` file can be modified anytime with no need to rebuild the scripts.

---

###
If you want to modify the code, you'll find the source TypeScript files within the `src/` folder. Please note that this repo doesn't contain any TS builder and etc, so you'll need to set up your dev environment accordingly.

Also make sure that you have the `@citizenfx` packages:

```
npm install -D typescript @citizenfx/client @citizenfx/server
```

## 2. Description

This resource tracks the Sun precise vector over the sky map by applying a custom formula to the in-game clock value. Then the main script casts a corresponding amount of rays through the Sun vector. The rays quantity is defined by the amount of bones passed down as the `Sun` class constructor arguments.

The script ended up being fairly optimized. During the testing I've tracked the exposure of 5 Ped bones at once. Despite casting 5 rays and checking whether they hit anything in 1,200 distance units, the processor time stays within the `0.02ms-0.03ms` range. The sun tracking formula also memoizes the calculated values, so with a longer client runtime the processor time should be even less.

### Sun Tracking (gif):

![Sun Tracking](https://github.com/FNGS-Gh/FiveM-Sunbath/blob/dev/GIF/demo.gif?raw=true)

### Light Collision (gif):

![Light Collision](https://github.com/FNGS-Gh/FiveM-Sunbath/blob/dev/GIF/demo2.gif?raw=true)

### Light Collision Through a Car (gif):

![Light Collision Through a Car](https://github.com/FNGS-Gh/FiveM-Sunbath/blob/dev/GIF/demo3.gif?raw=true)

### Light Collision Through a Window (gif):

![Light Collision Through a Window](https://github.com/FNGS-Gh/FiveM-Sunbath/blob/dev/GIF/demo4.gif?raw=true)

## 3. Known Issues

- The Sun tracking formula has been created based on the vanilla GTA V sky map and graphics. I don't know if there are any mods (NVE and etc) that can change the Sun vector. If there are any, this resource might work incorrectly.