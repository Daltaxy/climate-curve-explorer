# Temperature Curves Images

## Setup Instructions

To use this application, you need to copy your temperature curve images from:
```
C:\Users\david\Downloads
```

To this folder:
```
public/images/
```

## Required Files

The application expects the following naming pattern:
- `{TempType}_lat{latitude}_exc{eccentricity}_obl{obliquity}_pre{precession}_alb{albedo}.png`

Where:
- **TempType**: `Temp` or `Var_temp`
- **latitude**: `0`, `50`, or `90`
- **eccentricity**: `constante` or `variable`
- **obliquity**: `constante` or `variable`
- **precession**: `constante` or `variable`
- **albedo**: `0.30` or `0.33`

## Example Filenames
```
Temp_lat0_excconstante_oblconstante_preconstante_alb0.30.png
Var_temp_lat50_excvariable_oblvariable_prevariable_alb0.33.png
```

## Total Images Needed
96 images in total (48 for each temperature type)
