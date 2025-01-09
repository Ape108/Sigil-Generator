# Magic squares as matrices for Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon

import numpy as np

def generate_saturn_square():
    """Generate the specific Saturn magic square."""
    return np.array([
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 6]
    ])

def generate_jupiter_square():
    """Generate the specific Jupiter magic square."""
    return np.array([
        [4, 14, 15, 1],
        [9, 7, 6, 12],
        [5, 11, 10, 8],
        [16, 2, 3, 13]
    ])

def generate_mars_square():
    """Generate the specific Mars magic square."""
    return np.array([
        [11, 24, 7, 20, 3],
        [4, 12, 25, 8, 16],
        [17, 5, 13, 21, 9],
        [10, 18, 1, 14, 22],
        [23, 6, 19, 2, 15]
    ])

def generate_sun_square():
    """Generate the specific Sun magic square."""
    return np.array([
        [6, 32, 3, 34, 35, 1],
        [7, 11, 27, 28, 8, 30],
        [19, 14, 16, 15, 23, 24],
        [18, 20, 22, 21, 17, 13],
        [25, 29, 10, 9, 26, 12],
        [36, 5, 33, 4, 2, 31]
    ])

def generate_venus_square():
    """Generate the specific Venus magic square."""
    return np.array([
        [22, 47, 16, 41, 10, 35, 4],
        [5, 23, 48, 17, 42, 11, 29],
        [30, 6, 24, 49, 18, 36, 12],
        [13, 31, 7, 25, 43, 19, 37],
        [38, 14, 32, 1, 26, 44, 20],
        [21, 39, 8, 33, 2, 27, 45],
        [46, 15, 40, 9, 34, 3, 28]
    ])

def generate_mercury_square():
    """Generate the specific Mercury magic square."""
    return np.array([
        [8, 58, 59, 5, 4, 62, 63, 1],
        [49, 15, 14, 52, 53, 11, 10, 56],
        [41, 23, 22, 44, 45, 19, 18, 48],
        [32, 34, 35, 29, 28, 38, 39, 25],
        [40, 26, 27, 37, 36, 30, 31, 33],
        [17, 47, 46, 20, 21, 43, 42, 24],
        [9, 55, 54, 12, 13, 51, 50, 16],
        [64, 2, 3, 61, 60, 6, 7, 57]
    ])

def generate_moon_square():
    """Generate the specific Moon magic square."""
    return np.array([
        [37, 78, 29, 70, 21, 62, 13, 54, 5],
        [6, 38, 79, 30, 71, 22, 63, 14, 46],
        [47, 7, 39, 80, 31, 72, 23, 55, 15],
        [16, 48, 8, 40, 81, 32, 64, 24, 56],
        [57, 17, 49, 9, 41, 73, 33, 65, 25],
        [26, 58, 18, 50, 1, 42, 74, 34, 66],
        [67, 27, 59, 10, 51, 2, 43, 75, 35],
        [36, 68, 19, 60, 11, 52, 3, 44, 76],
        [77, 28, 69, 20, 61, 12, 53, 4, 45]
    ])

# Generate magic squares for each planet
magic_squares = {
    "Saturn": generate_saturn_square(),
    "Jupiter": generate_jupiter_square(),
    "Mars": generate_mars_square(),
    "Sun": generate_sun_square(),
    "Venus": generate_venus_square(),
    "Mercury": generate_mercury_square(),
    "Moon": generate_moon_square(),
}

# Print the magic squares
for planet, square in magic_squares.items():
    print(f"{planet} Magic Square:\n{square}\n")

